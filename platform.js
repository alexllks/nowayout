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
      const platforms = [];
      platforms.push(...Platform.createStaticPlatforms());
      platforms.push(...FloatingPlatform.createFloatingPlatforms());
      platforms.push(...HorizontalPlatform.createHorizontalPlatforms());
      return platforms;
  }
  
    static createStaticPlatforms() {
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
        //{ x: secretRoomStartX + 50, y: height - PLATFORM_HEIGHT - 200, width: 150 ,height:20},
        { x: secretRoomStartX + 200, y: height - PLATFORM_HEIGHT - 200, width: 100,height:20},
        { x: secretRoomStartX + 150, y: height - PLATFORM_HEIGHT - 300, width: 50,height:20 },
        { x: secretRoomStartX + 400, y: height - PLATFORM_HEIGHT - 400, width: 200,height:20 },
    
        { x: secretRoomStartX + 1500, y: height - PLATFORM_HEIGHT - 300, width: 100,height:20 },
        
        { x: 14100, y: height - 1000, width: 50,height:600 }, // upper wall before horizontal
        { x: 14075, y:  height - 160, width: 100,height:200 }, //big platform before horizontal
        { x: secretRoomStartX + 2250, y: height - PLATFORM_HEIGHT - 150, width: 150,height:40 }, //platform before  horizontal 

        { x: secretRoomStartX + 3000, y: height - PLATFORM_HEIGHT - 300, width: 500,height:1000 },

        { x: secretRoomStartX + 3650, y: height - PLATFORM_HEIGHT - 300, width: 500,height:1000 },
        { x: secretRoomStartX + 4100, y: height - PLATFORM_HEIGHT - 300, width: 600,height:50 }, //brigde
        { x: secretRoomStartX + 4700, y: height - PLATFORM_HEIGHT - 300, width: 300,height:1000 },

        { x: secretRoomStartX + 5200, y: height - PLATFORM_HEIGHT - 200, width: 80,height:30 },
        { x: secretRoomStartX + 5400, y: height - PLATFORM_HEIGHT - 300, width: 80,height:30 },
        { x: secretRoomStartX + 5600, y: height - PLATFORM_HEIGHT - 350, width: 80,height:30 },

        { x: secretRoomStartX + 5800, y: height - PLATFORM_HEIGHT - 350, width: 300,height:30 }, //up small
        { x: secretRoomStartX + 5750, y: height - PLATFORM_HEIGHT - 250, width: 400,height:30 }, //down big

        { x: secretRoomStartX + 6250, y: height - PLATFORM_HEIGHT - 420, width: 80,height:270 }, //big wall
        { x: secretRoomStartX + 6250, y: height - PLATFORM_HEIGHT - 72, width: 100,height:100 }, //down


        { x: secretRoomStartX + 6700, y: height - PLATFORM_HEIGHT - 400, width:80 ,height:50 }, //platform after 3rd floating


        { x: secretRoomStartX + 6900, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones 
        { x: secretRoomStartX + 7050, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7200, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7350, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7500, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7650, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7800, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones
        { x: secretRoomStartX + 7950, y: height - PLATFORM_HEIGHT - 400, width: 40,height:500 }, // kolones


        { x: secretRoomStartX + 8100, y: height - PLATFORM_HEIGHT - 200, width: 40,height:300 }, // kolones
        { x: secretRoomStartX + 8250, y: height - PLATFORM_HEIGHT - 200, width: 40,height:300 }, // kolones
        { x: secretRoomStartX + 8400, y: height - PLATFORM_HEIGHT - 200, width: 40,height:300 }, // kolones

        { x: secretRoomStartX + 8600, y: height - PLATFORM_HEIGHT - 300, width: 100,height:50 },

        
        { x: 2200, y: height - 160, width: 120,height:50 }, // platform at stairs
  

        //{ x: 14100, y: height - 160, width: 50,height:400 },

        { x: 21542, y: height - 160, width: 100,height:200 }, // wall before door

  
        // Πρόσθεσε κι άλλες πλατφόρμες αν χρειάζεται
      ];

      // Δημιουργία πλατφορμών
      for (let pos of specificPlatformPositions) {
        platforms.push(new Platform(pos.x, pos.y, pos.width,pos.height));
      }

        // Συγκεκριμένες θέσεις και χαρακτηριστικά για τις νυχτερίδες
        const specificBatPositions = [
          { x: secretRoomStartX + 1700, y: 150, range: 100, speed: 2 }, //1st bat
           { x: secretRoomStartX + 6400, y: 200, range: 250, speed: 1.2 }, //2nd bat

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
  
