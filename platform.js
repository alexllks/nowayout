class Platform {
    constructor(x, y, width) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = 50; // Ύψος πλατφόρμας
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


      // Adding obstacles between secretRoomStartX and newWALLX2
      

      
      // Συγκεκριμένες θέσεις πλατφορμών
      const specificPlatformPositions = [
        { x: secretRoomStartX + 200, y: height - PLATFORM_HEIGHT - 100, width: 300 },
        { x: secretRoomStartX + 700, y: height - PLATFORM_HEIGHT - 150, width: 200 },
        { x: secretRoomStartX + 1200, y: height - PLATFORM_HEIGHT - 200, width: 250 },
        // Πρόσθεσε κι άλλες πλατφόρμες αν χρειάζεται
      ];

      // Δημιουργία πλατφορμών
      for (let pos of specificPlatformPositions) {
        platforms.push(new Platform(pos.x, pos.y, pos.width));
      }






      // Συγκεκριμένες θέσεις περιστρεφόμενων λεπίδων
      const specificBladePositions = [
        { x: secretRoomStartX + 300, y: height - PLATFORM_HEIGHT - 120, radius: 40 },
        { x: secretRoomStartX + 1000, y: height - PLATFORM_HEIGHT - 200, radius: 50 },
        { x: secretRoomStartX + 1700, y: height - PLATFORM_HEIGHT - 150, radius: 60 },
        // Πρόσθεσε κι άλλες περιστρεφόμενες λεπίδες αν χρειάζεται
      ];

      // Δημιουργία περιστρεφόμενων λεπίδων
      for (let blade of specificBladePositions) {
        obstacles.push(new RotatingBlade(blade.x, blade.y, blade.radius));
      }




      // // Reduce floating platforms
      const floatingPlatformPositions = [
        { x: secretRoomStartX + 50, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 700, yStart: height - PLATFORM_HEIGHT - 200, yEnd: height - PLATFORM_HEIGHT - 400 },
        { x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
        // Πρόσθεσε κι άλλες πλατφόρμες όπως χρειάζεται
      ];

      // Δημιουργία των πλατφορμών
      for (let pos of floatingPlatformPositions) {
        platforms.push(new FloatingPlatform(pos.x, pos.yStart, pos.yEnd, 60, 2));
      }

      

        // Συγκεκριμένες θέσεις και χαρακτηριστικά για τις νυχτερίδες
        const specificBatPositions = [
          { x: secretRoomStartX + 300, y: 150, range: 100, speed: 2 },
          { x: secretRoomStartX + 600, y: 200, range: 150, speed: 1.5 },
          { x: secretRoomStartX + 900, y: 250, range: 200, speed: 2.5 },
          { x: secretRoomStartX + 1200, y: 180, range: 120, speed: 1.8 },
          { x: secretRoomStartX + 1500, y: 300, range: 180, speed: 2.2 },
          // Πρόσθεσε κι άλλες νυχτερίδες αν χρειάζεται
        ];

        // Δημιουργία νυχτερίδων
        for (let bat of specificBatPositions) {
          bats.push(new Bat(bat.x, bat.y, bat.range, bat.speed));
        }


      // Προσθήκη επιπλέον πλατφορμών(πλατφορμα μικρη στην αρχη) σε διαφορετικά ύψη
      platforms.push(new Platform(2200, height - 160, 120));
      
      return platforms;
    }
  
    static drawPlatforms(platforms) {
      for (let platform of platforms) {
        platform.show();
      }
    }

  }
  