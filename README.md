# 🎮 No Way Out

<div align="center">

**A psychological horror 2D platformer where reality bends and anomalies lurk in every corner.**

*Make 9 correct decisions to escape... or be trapped forever.*

[![Made with p5.js](https://img.shields.io/badge/Made%20with-p5.js-ED225D?style=flat-square&logo=p5.js)](https://p5js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Server-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

</div>

---

## 📖 About

**No Way Out** is an atmospheric horror platformer that challenges your perception and observation skills. Navigate through a mysterious hotel corridor where nothing is as it seems. Each level presents you with a choice: identify the anomaly and escape through the left door, or trust your instincts and exit right if everything appears normal.

### 🎯 Core Concept

You find yourself trapped in an endless corridor. The only way to escape is to make **9 consecutive correct decisions**. Each room may contain subtle (or not-so-subtle) anomalies that defy the laws of reality. Your survival depends on your ability to distinguish between the normal and the paranormal.

---

## ✨ Features

### 🎭 Gameplay Mechanics
- **Anomaly Detection System**: 30+ unique anomaly types ranging from subtle to terrifying
- **Decision-Based Progression**: Choose the correct exit based on your observations
- **9 Challenging Levels**: Each level increases in difficulty and psychological tension
- **Secret Rooms**: Discover hidden areas with unique challenges
- **Dynamic Difficulty**: Anomalies become more subtle and harder to detect as you progress

### 👻 Horror Elements
- **Ghost AI**: Intelligent enemies that chase and hunt the player
- **Environmental Hazards**: Spikes, flooding water, and deadly traps
- **Atmospheric Sound Design**: Distance-based audio system for immersive horror
- **Psychological Horror**: Reality-bending anomalies that mess with your perception

### 🎨 Technical Features
- **Smooth Physics System**: Custom gravity and collision detection
- **Moving Platforms**: Dynamic escalators and floating platforms
- **Interactive Objects**: TVs, radios, mirrors, dolls, and more
- **Visual Effects**: Lighting system, particle effects, and animations
- **Sound Management**: Spatial audio with volume based on player proximity

---

## 🎮 Controls

| Action | Key |
|--------|-----|
| **Move Left** | ← Arrow Key |
| **Move Right** | → Arrow Key |
| **Jump** | ↑ Arrow Key / W |
| **Interact with Doors** | F |
| **Pause Game** | P |
| **Exit Game** | ALT + M |
| **Debug Mode** | ALT + N |

---

## 🕹️ How to Play

### Objective
Make **9 correct decisions** to escape the hotel corridor.

### Rules
1. **If you see an anomaly** → Exit through the **LEFT door** ⬅️
2. **If everything is normal** → Exit through the **RIGHT door** ➡️
3. **Wrong decision** → Game Over 💀

### What Counts as an Anomaly?

Anomalies can be:
- **Visual Changes**: Objects changing color, size, or position
- **Moving Objects**: Items that shouldn't be moving
- **Audio Cues**: Strange sounds that weren't there before
- **Supernatural Entities**: Ghosts, apparitions, or mysterious figures
- **Environmental Changes**: Flooding, unusual lighting, or structural changes
- **Object Behavior**: TVs showing static, radios playing on their own
- **Reflections**: Mirrors showing disturbing images

### Tips for Success
- 🔍 **Observe carefully** - Take your time to scan each room
- 🎧 **Listen closely** - Audio cues can reveal hidden anomalies
- 🧠 **Trust your instincts** - If something feels off, it probably is
- 📝 **Remember details** - Compare each room to the previous one
- ⚡ **Stay alert** - Some anomalies are subtle and easy to miss

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v12.0 or higher) - [Download here](https://nodejs.org/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/No-way-out.git
   cd No-way-out
   ```

2. **Start the server**
   ```bash
   node server.js
   ```

3. **Open your browser**
   - Navigate to `http://localhost:3000/`
   - The game will start automatically

4. **Adjust volume**
   - Use the volume slider in the game interface
   - Recommended: 50-70% for optimal horror experience

### Troubleshooting

**Server won't start?**
- Verify Node.js installation: `node --version`
- Ensure port 3000 is not in use
- Restart your terminal after installing Node.js

**No sound?**
- Check browser audio permissions
- Ensure volume slider is not at 0
- Try refreshing the page

---

## 🛠️ Technical Stack

### Core Technologies
- **p5.js v1.6.0** - Graphics rendering and canvas management
- **p5.sound** - Audio playback and spatial sound
- **Node.js** - Local HTTP server
- **Vanilla JavaScript (ES6)** - Game logic and mechanics

### Architecture

```
No-way-out/
├── index.html              # Main HTML entry point
├── server.js              # Node.js HTTP server
├── js/
│   ├── main.js           # Game loop and state management
│   ├── player.js         # Player physics and controls
│   ├── anomalies.js      # Anomaly system and object rendering
│   ├── platform.js       # Platform collision system
│   ├── visuals.js        # Visual effects and rendering
│   ├── soundmanager.js   # Audio management system
│   ├── characterRender.js # Character animation
│   ├── Bat.js            # Enemy AI
│   ├── floatingplatform.js
│   ├── horizontalplatform.js
│   └── settings.js       # Game configuration
├── assets/
│   ├── images/           # Sprites and textures
│   └── sounds/           # Audio files
└── README.md
```

### Key Systems

#### 🎯 Anomaly System
- **Pool-based spawning**: Random selection from 30+ anomaly types
- **State management**: Each object tracks its anomaly status
- **Dynamic behavior**: Anomalies can move, change, or interact with the player

#### 🏃 Player Physics
- **Custom gravity system**: Realistic falling and jumping
- **Collision detection**: Precise platform and wall collision
- **Movement states**: Walking, jumping, falling, dying animations

#### 🔊 Sound Management
- **Distance-based volume**: Audio intensity changes based on proximity
- **Looping system**: Background ambience and music
- **Event-triggered sounds**: Jump, death, door interactions

#### 🎨 Rendering Pipeline
- **Layered rendering**: Background → Platforms → Objects → Player → UI
- **Camera system**: Follows player with smooth scrolling
- **Canvas size**: 1224x576 resolution

---

## 🎨 Anomaly Types

The game features over 30 unique anomalies:

| Category | Examples |
|----------|----------|
| **Objects** | Color-changing sofa, moving suitcase, animated doll |
| **Furniture** | Overfilled bookshelf, open fridge, floating table |
| **Electronics** | Static TV, playing radio, flickering lights |
| **Supernatural** | Ghosts, scary mirror reflections, haunted paintings |
| **Environmental** | Flooding water, room number changes, door anomalies |
| **NPCs** | Disappearing characters, chasing entities |

---

## 🎵 Audio Design

### Sound Effects
- **Footsteps** - Player movement feedback
- **Jump** - Satisfying jump sound
- **Death** - Game over audio cue
- **Rain** - Atmospheric weather effects
- **Bats** - Secret room ambience
- **Water** - Environmental hazard sounds
- **TV Static** - Anomaly-specific audio
- **Cosmic Door** - Portal sound effects

### Music
- **Horror Background** - Continuous atmospheric tension
- **Spatial Audio** - Volume adjusts based on player position

---

## 🎓 Development Insights

### Design Philosophy
The game is built around the concept of **"spot the difference"** meets **psychological horror**. Each anomaly is carefully designed to either be:
- **Obvious** (for newer players) - Ghosts, flooding, dramatic changes
- **Subtle** (for experienced players) - Color shifts, small movements, audio cues

### Technical Challenges Solved
1. **Collision Detection**: Custom algorithm for precise platform interactions
2. **Camera System**: Smooth scrolling that follows the player
3. **State Management**: Complex game state transitions (menu, playing, game over)
4. **Audio Synchronization**: Distance-based volume calculations
5. **Anomaly Randomization**: Ensuring fair distribution and no duplicates

### Performance Optimizations
- Object pooling for frequently created/destroyed entities
- Efficient collision detection with spatial partitioning
- Optimized rendering with canvas buffering
- Lazy loading of audio assets

---

## 🎮 Game States

The game manages multiple states:

1. **Menu** - Initial screen with New Game, Controls, Instructions
2. **Playing** - Active gameplay
3. **Lost** - Death screen with retry option
4. **Complete** - Victory screen after 9 correct decisions
5. **Instructions** - Tutorial and gameplay explanation
6. **Controls** - Key bindings reference

---

## 🐛 Debug Features

For developers and testers:

- **Debug Mode** (ALT + N): Enable noclip and enhanced movement
- **Noclip Mode**: Fly through walls and obstacles
- **Console Logging**: Anomaly selection and game events
- **Coordinate Display**: Player position tracking

---

## 📝 Credits

### Development
- **Game Design & Programming**: [Your Name]
- **Built with**: p5.js, JavaScript, Node.js

### Assets
- **Sound Effects**: Custom and royalty-free sources
- **Images**: Custom artwork and textures

---

## 📄 License

This project is available for educational and personal use. Please credit the original creator if you use or modify this code.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

## 📧 Contact

For questions, feedback, or bug reports, please open an issue on GitHub.

---

<div align="center">

**Can you escape the corridor?**

*Or will you be trapped... forever?*

🎮 **[Play Now](http://localhost:3000/)** 🎮

</div>
