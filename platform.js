class Platform {
    constructor(x, y, width) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = 20; // Ύψος πλατφόρμας
    }
  
    show() {
      fill(100);
      rect(this.x, this.y, this.width, this.height);
      console.assert(this.y % 1 === 0, 'Η θέση y της πλατφόρμας δεν είναι ακέραια:', this.y);

    }
    static createPlatforms() {
      let platforms = [];
      let numPlatforms = Math.ceil(width / PLATFORM_WIDTH); // Υπολογισμός πλήθους πλατφορμών
  
      for (let i = 0; i < numPlatforms; i++) {
          let x = i * PLATFORM_WIDTH; // Θέση x κάθε πλατφόρμας
          let y = height - PLATFORM_HEIGHT; // Θέση y (π.χ., στο έδαφος)
          platforms.push(new Platform(x, y, PLATFORM_WIDTH));
      }
      for (let i = 0; i < numPlatforms; i++) {
        let x = 2500; // Ξεκινάμε από το x = 200 για να αφήσουμε κενό
        let y = height - PLATFORM_HEIGHT - 300; // Κανονική θέση Y της πλατφόρμας
        platforms.push(new Platform(x, y, 9400));
    }
      // Adding obstacles after secretRoomStartX
      for (let x = secretRoomStartX; x < PLATFORM_WIDTH; x += 200) {
        let y = height - PLATFORM_HEIGHT - Math.floor(Math.random() * 200); // Στρογγυλοποίηση σε ακέραιο
        let obstacleWidth = Math.random() * 50 + 50; // Τυχαίο πλάτος για τα εμπόδια
        platforms.push(new Platform(x, y, obstacleWidth)); // Δημιουργία πλατφόρμας
      }

      // Adding obstacles between secretRoomStartX and newWALLX2
for (let x = secretRoomStartX + 200; x < NEW_WALL_X2; x += Math.floor(Math.random() * 300 + 100)) {
  let y = height - PLATFORM_HEIGHT - Math.floor(Math.random() * 250 + 50); // Random height
  let obstacleWidth = Math.random() * 70 + 30; // Random width
  platforms.push(new Platform(x, y, obstacleWidth)); // Create platform

  // Optionally add a "stacked" effect
  if (Math.random() > 0.5) {
      platforms.push(new Platform(x + Math.random() * 50, y - 50, obstacleWidth / 2));
  }
}
// Moving obstacles
for (let x = secretRoomStartX + 200; x < NEW_WALL_X2; x += 400) {
  let y = height - PLATFORM_HEIGHT - Math.floor(Math.random() * 200 + 50);
  let obstacleWidth = Math.random() * 70 + 30;
  let speed = Math.random() * 2 + 1; // Random speed
  platforms.push(new MovingPlatform(x, y, obstacleWidth, speed)); // Moving platform
}
// Rotating blades
for (let x = secretRoomStartX + 300; x < NEW_WALL_X2; x += 600) {
  let y = height - PLATFORM_HEIGHT - Math.floor(Math.random() * 150 + 100);
  obstacles.push(new RotatingBlade(x, y, 40)); // Add rotating blade
}
// Floating platforms
for (let x = secretRoomStartX + 250; x < NEW_WALL_X2; x += 500) {
  let yStart = height - PLATFORM_HEIGHT - Math.floor(Math.random() * 150 + 100);
  let yEnd = yStart - 100; // Floating range
  platforms.push(new FloatingPlatform(x, yStart, yEnd, 60, 2)); // Floating platform
}


      // Προσθήκη επιπλέον πλατφορμών σε διαφορετικά ύψη
      platforms.push(new Platform(2200, height - 160, 120));
      
      return platforms;
  }
  
  
  
    static drawPlatforms(platforms) {
      for (let platform of platforms) {
        platform.show();
      }
    }
  }
  