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
        let x = i * PLATFORM_WIDTH + 2500; // Ξεκινάμε από το x = 200 για να αφήσουμε κενό
        let y = height - PLATFORM_HEIGHT - 300; // Κανονική θέση Y της πλατφόρμας
    
        platforms.push(new Platform(x, y, PLATFORM_WIDTH));
    }
  
      // Προσθήκη επιπλέον πλατφορμών σε διαφορετικά ύψη
      platforms.push(new Platform(2200, height - 161, 120));
      
      return platforms;
  }
  
  
  
    static drawPlatforms(platforms) {
      for (let platform of platforms) {
        platform.show();
      }
    }
  }
  