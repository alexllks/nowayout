class Platform {
    constructor(x, y, width,height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height; // Ύψος πλατφόρμας
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
          platforms.push(new Platform(x, y, PLATFORM_WIDTH,50));
      }
      for (let i = 0; i < numPlatforms; i++) {
        let x = 2500; // Ξεκινάμε από το x = 200 για να αφήσουμε κενό
        let y = height - PLATFORM_HEIGHT - 300; // Κανονική θέση Y της πλατφόρμας
        platforms.push(new Platform(x, y, 9400,50));
      }


      // Adding obstacles between secretRoomStartX and newWALLX2
      
      // Συγκεκριμένες θέσεις πλατφορμών
      const specificPlatformPositions = [
        { x: secretRoomStartX - 20 , y: height - PLATFORM_HEIGHT - 100, width: 100,height:20 },
        { x: secretRoomStartX + 100, y: height - PLATFORM_HEIGHT - 200, width: 150 ,height:20},
        { x: secretRoomStartX + 200, y: height - PLATFORM_HEIGHT - 200, width: 250,height:20},
        { x: secretRoomStartX + 400, y: height - PLATFORM_HEIGHT - 400, width: 200,height:20 },
        { x: secretRoomStartX + 150, y: height - PLATFORM_HEIGHT - 300, width: 100,height:20 },
        { x: secretRoomStartX + 1500, y: height - PLATFORM_HEIGHT - 300, width: 100,height:20 },
        { x: secretRoomStartX + 3000, y: height - PLATFORM_HEIGHT - 300, width: 1000,height:1000 },





        { x: 2200, y: height - 160, width: 120,height:50 },
        { x: 21542, y: height - 160, width: 100,height:200 },
        { x: 14100, y:  height - 160, width: 100,height:200 },
        { x: 14100, y: height - 160, width: 50,height:400 },
        { x: 14100, y: height - 1000, width: 50,height:600 },
        { x: secretRoomStartX + 2200, y: height - PLATFORM_HEIGHT - 150, width: 150,height:40 },
  
        // Πρόσθεσε κι άλλες πλατφόρμες αν χρειάζεται
      ];

      // Δημιουργία πλατφορμών
      for (let pos of specificPlatformPositions) {
        platforms.push(new Platform(pos.x, pos.y, pos.width,pos.height));
      }


      // Συγκεκριμένες θέσεις περιστρεφόμενων λεπίδων
      const specificBladePositions = [
        // { x: secretRoomStartX + 300, y: height - PLATFORM_HEIGHT - 120, radius: 40 },
        // { x: secretRoomStartX + 1000, y: height - PLATFORM_HEIGHT - 200, radius: 50 },
        // { x: secretRoomStartX + 1700, y: height - PLATFORM_HEIGHT - 150, radius: 60 },
        // Πρόσθεσε κι άλλες περιστρεφόμενες λεπίδες αν χρειάζεται
      ];

      // Δημιουργία περιστρεφόμενων λεπίδων
      for (let blade of specificBladePositions) {
        obstacles.push(new RotatingBlade(blade.x, blade.y, blade.radius));
      }




      // // Reduce floating platforms
      const floatingPlatformPositions = [
        { x: 600, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 1400, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 1800, yStart: height - PLATFORM_HEIGHT - 130, yEnd: height - PLATFORM_HEIGHT - 300 },
        //{ x: secretRoomStartX + 700, yStart: height - PLATFORM_HEIGHT - 200, yEnd: height - PLATFORM_HEIGHT - 400 },
        //{ x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
        // Πρόσθεσε κι άλλες πλατφόρμες όπως χρειάζεται
      ];

      // Δημιουργία των πλατφορμών
      for (let pos of floatingPlatformPositions) {
        platforms.push(new FloatingPlatform(pos.x, pos.yStart, pos.yEnd, 50, 2));
      }


            // // Reduce floating platforms
            const horizontalPlatformPositions = [
              { xStart: secretRoomStartX + 500, xEnd: secretRoomStartX + 900, y:500, width:200, speed:3 },
              { xStart: secretRoomStartX + 2300, xEnd:secretRoomStartX + 2800, y:300, width:200, speed:3 }
              //{ x: secretRoomStartX + 700, yStart: height - PLATFORM_HEIGHT - 200, yEnd: height - PLATFORM_HEIGHT - 400 },
              //{ x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
              // Πρόσθεσε κι άλλες πλατφόρμες όπως χρειάζεται
            ];
      
            // Δημιουργία των πλατφορμών
            for (let pos of horizontalPlatformPositions) {
              platforms.push(new HorizontalPlatform(pos.xStart, pos.xEnd,pos.y, pos.width,pos.speed));
             // xStart, xEnd, y, width, speed
            }
      

        // Συγκεκριμένες θέσεις και χαρακτηριστικά για τις νυχτερίδες
        const specificBatPositions = [
          { x: secretRoomStartX + 1700, y: 150, range: 100, speed: 2 },
          // { x: secretRoomStartX + 600, y: 200, range: 150, speed: 1.5 },
          // { x: secretRoomStartX + 900, y: 250, range: 200, speed: 2.5 },
          // { x: secretRoomStartX + 1200, y: 180, range: 120, speed: 1.8 },
          // { x: secretRoomStartX + 1500, y: 300, range: 180, speed: 2.2 },
          // Πρόσθεσε κι άλλες νυχτερίδες αν χρειάζεται
        ];

        // Δημιουργία νυχτερίδων
        for (let bat of specificBatPositions) {
          bats.push(new Bat(bat.x, bat.y, bat.range, bat.speed));
        }

      
      return platforms;
    }
  
    static drawPlatforms(platforms) {
      for (let platform of platforms) {
        platform.show();
      }
    }


  

  }
  
