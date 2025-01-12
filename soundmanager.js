class SoundManager {
    constructor() {
        this.sounds = {};
        this.masterVolume=1.0;
    }

    load(name, path) {
        this.sounds[name] = loadSound(path);
    }

    setMasterVolume(volume) {
        this.masterVolume = constrain(volume, 0.0, 1.0);  
        for (let name in this.sounds) {
            this.sounds[name].setVolume(this.masterVolume);  
        }
    }

     play(name, loop = false, volume = 1.0) {
        const sound = this.sounds[name];
        const adjustedVolume = volume * this.masterVolume;  
        if (sound && adjustedVolume > 0) {
            sound.setVolume(adjustedVolume);
            if (loop) sound.loop();
            else sound.play();
        }
    }

    stop(name) {
        let sound = this.sounds[name];
        if (sound && sound.isPlaying()) {
            sound.stop();
        }
    }

    stopAllSounds() {
        for (let name in this.sounds) {
            let sound = this.sounds[name];
            if (sound && sound.isPlaying()) {
                sound.stop();
            }
        }
    }

    setVolume(name, volume) {
        let sound = this.sounds[name];
        if (sound) {
            sound.setVolume(volume);
        }
    }
}




function stopAllSounds() {
    allowRainSound = false;  
    soundManager.stopAllSounds();  
  }

function calculateVolume(player, windowX, windowY, maxDistance) {
    let distance = dist(player.x, player.y, windowX, windowY);
    let volume = map(distance, 0, maxDistance, 1.0, 0.1); // Ενταση από 1.0 (κοντά) σε 0.1 (μακριά)
    return constrain(volume, 0.1, 1.0); // Περιορισμός μεταξύ 0.1 και 1.0
}
