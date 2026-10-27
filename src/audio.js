// All sound goes through the Web Audio API. Short samples are decoded once;
// ambience (rain, hum, static, water) is synthesised so there are no multi-
// megabyte loops to download.

const SAMPLES = {
  ambience: 'assets/sounds/ambience.mp3',
  menu: 'assets/sounds/menu.mp3',
  death: 'assets/sounds/death.wav',
  jump: 'assets/sounds/jump.wav',
  door: 'assets/sounds/door.mp3',
};

class Audio {
  constructor() {
    this.ctx = null;
    this.buffers = {};
    this.loops = {};
    this.volume = 0.7;
    this.ready = false;
    this.muted = false;
  }

  // Must be called from a user gesture (autoplay policy).
  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);

    this.sfx = this.ctx.createGain();
    this.sfx.connect(this.master);
    this.music = this.ctx.createGain();
    this.music.gain.value = 0.55;
    this.music.connect(this.master);
    this.amb = this.ctx.createGain();
    this.amb.connect(this.master);

    this.noiseBuffer = this.makeNoise(2);
    this.brownBuffer = this.makeNoise(2, true);

    await Promise.all(
      Object.entries(SAMPLES).map(async ([name, url]) => {
        try {
          const res = await fetch(url);
          const data = await res.arrayBuffer();
          this.buffers[name] = await this.ctx.decodeAudioData(data);
        } catch (err) {
          console.warn('Audio sample failed:', name, err);
        }
      }),
    );
    this.ready = true;
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
  }

  makeNoise(seconds, brown = false) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * white) / 1.02;
        d[i] = last * 3.5;
      } else d[i] = white;
    }
    return buf;
  }

  // ---- samples -------------------------------------------------------------

  play(name, { volume = 1, loop = false, rate = 1, bus = 'sfx' } = {}) {
    if (!this.ctx || !this.buffers[name]) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffers[name];
    src.loop = loop;
    src.playbackRate.value = rate;
    const g = this.ctx.createGain();
    g.gain.value = volume;
    src.connect(g).connect(this[bus]);
    src.start();
    const handle = {
      gain: g,
      src,
      stop(fade = 0.05) {
        try {
          g.gain.setTargetAtTime(0, src.context.currentTime, fade);
          src.stop(src.context.currentTime + fade * 4 + 0.05);
        } catch {
          /* already stopped */
        }
      },
    };
    return handle;
  }

  startLoop(name, opts) {
    if (this.loops[name]) return this.loops[name];
    const h = this.play(name, { ...opts, loop: true });
    if (h) this.loops[name] = h;
    return h;
  }

  stopLoop(name, fade = 0.4) {
    const h = this.loops[name];
    if (!h) return;
    h.stop(fade);
    delete this.loops[name];
  }

  setLoopVolume(name, v, tc = 0.1) {
    const h = this.loops[name];
    if (h) h.gain.gain.setTargetAtTime(v, this.ctx.currentTime, tc);
  }

  stopAll(fade = 0.3) {
    for (const k of Object.keys(this.loops)) this.stopLoop(k, fade);
    for (const k of Object.keys(this.synthLoops || {})) this.stopSynth(k, fade);
  }

  // ---- synthesised ambience ---------------------------------------------

  // Generic looping noise voice through a filter. Returns a handle stored by key.
  startSynth(key, { brown = false, type = 'lowpass', freq = 800, q = 0.7, volume = 0.2 } = {}) {
    if (!this.ctx) return null;
    this.synthLoops ??= {};
    if (this.synthLoops[key]) return this.synthLoops[key];
    const src = this.ctx.createBufferSource();
    src.buffer = brown ? this.brownBuffer : this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.5);
    src.connect(filter).connect(g).connect(this.amb);
    src.start();
    const h = { src, filter, gain: g, target: volume };
    this.synthLoops[key] = h;
    return h;
  }

  setSynth(key, volume, tc = 0.15) {
    const h = this.synthLoops?.[key];
    if (h) h.gain.gain.setTargetAtTime(volume, this.ctx.currentTime, tc);
  }

  stopSynth(key, fade = 0.4) {
    const h = this.synthLoops?.[key];
    if (!h) return;
    h.gain.gain.setTargetAtTime(0, this.ctx.currentTime, fade);
    try {
      h.src.stop(this.ctx.currentTime + fade * 4);
    } catch {
      /* ignore */
    }
    delete this.synthLoops[key];
  }

  // A sustained oscillator (fluorescent hum, vending machine, drone).
  startTone(key, { freq = 60, type = 'sawtooth', volume = 0.03, lowpass = 300 } = {}) {
    if (!this.ctx) return null;
    this.synthLoops ??= {};
    if (this.synthLoops[key]) return this.synthLoops[key];
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = lowpass;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.4);
    osc.connect(filter).connect(g).connect(this.amb);
    osc.start();
    const h = { src: osc, osc, filter, gain: g };
    this.synthLoops[key] = h;
    return h;
  }

  // ---- one-shot synthesised effects --------------------------------------

  tone(freq, { type = 'sine', dur = 0.3, volume = 0.3, attack = 0.005, decay = null, slideTo = null } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (decay ?? dur));
    osc.connect(g).connect(this.sfx);
    osc.start(t);
    osc.stop(t + (decay ?? dur) + 0.05);
  }

  burst({ dur = 0.08, volume = 0.3, freq = 400, type = 'lowpass', q = 1, brown = false } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = brown ? this.brownBuffer : this.noiseBuffer;
    src.loopStart = Math.random();
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(this.sfx);
    src.start(t, Math.random() * 1.5);
    src.stop(t + dur + 0.02);
  }

  footstep(hard = false) {
    this.burst({ dur: 0.07, volume: hard ? 0.22 : 0.12, freq: hard ? 900 : 500, brown: true });
  }

  ding() {
    this.tone(1046, { dur: 1.2, volume: 0.18 });
    setTimeout(() => this.tone(1318, { dur: 1.6, volume: 0.16 }), 180);
  }

  knock() {
    this.burst({ dur: 0.12, volume: 0.5, freq: 180, brown: true, q: 2 });
  }

  drip() {
    this.tone(1800, { dur: 0.18, volume: 0.12, slideTo: 600 });
  }

  tick(reverse = false) {
    this.burst({ dur: 0.03, volume: reverse ? 0.16 : 0.09, freq: reverse ? 2600 : 3200, type: 'bandpass', q: 6 });
  }

  phoneRing() {
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.tone(1240, { type: 'square', dur: 0.35, volume: 0.06 });
        this.tone(1480, { type: 'square', dur: 0.35, volume: 0.05 });
      }, i * 420);
    }
  }

  heartbeat() {
    this.tone(55, { dur: 0.25, volume: 0.5, slideTo: 35 });
    setTimeout(() => this.tone(50, { dur: 0.22, volume: 0.35, slideTo: 32 }), 160);
  }

  glitch() {
    this.burst({ dur: 0.35, volume: 0.45, freq: 1200, type: 'highpass' });
    this.tone(220, { type: 'sawtooth', dur: 0.4, volume: 0.15, slideTo: 40 });
  }

  whoosh() {
    this.burst({ dur: 0.6, volume: 0.25, freq: 600, brown: true });
  }

  sting() {
    this.tone(180, { type: 'sawtooth', dur: 1.4, volume: 0.25, slideTo: 90 });
    this.burst({ dur: 0.5, volume: 0.3, freq: 2000, type: 'highpass' });
  }

  escapeChord() {
    [261.6, 329.6, 392, 523.3].forEach((f, i) =>
      setTimeout(() => this.tone(f, { dur: 3.5, volume: 0.12 }), i * 220),
    );
  }
}

export const audio = new Audio();
