class FloatingPlatform extends Platform {
    constructor(x, yStart, yEnd, width, speed) {
        super(x, yStart, width);
        this.yStart = yStart;
        this.yEnd = yEnd;
        this.speed = speed;
        this.direction = 1; // 1 = up, -1 = down
        this.height=20;
    }

    update() {
        this.y += this.speed * this.direction;
        if (this.y < this.yEnd || this.y > this.yStart) {
            this.direction *= -1; // Reverse direction
        }
    }

    show() {
        // Δημιουργία gradient για πιο μοντέρνα εμφάνιση
        for (let i = 0; i < this.height; i++) {
            let gradient = map(i, 0, this.height, 150, 255); // Απόχρωση του μπλε
            fill(100, gradient, 255); // Gradient από σκούρο σε ανοιχτό μπλε
            rect(this.x, this.y + i, this.width, 1); // Γραμμή για το εφέ gradient
        }
    
        // Σχεδίαση πλατφόρμας
        fill(100, 150, 255); // Κυρίως χρώμα
        rect(this.x, this.y, this.width, this.height, 10); // Στρογγυλεμένες γωνίες
    
        // Σκίαση στο κάτω μέρος της πλατφόρμας για 3D εφέ
        fill(0, 0, 0, 50); // Διαφανές μαύρο για σκιά
        rect(this.x, this.y + this.height, this.width, 5, 5); // Λεπτή σκιά
    }

    static createFloatingPlatforms() {
        const platforms = [];

            // // Reduce floating platforms
      const floatingPlatformPositions = [
        //{ x: 600, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300,width:100, speed:2 },
        { x: secretRoomStartX + 1400, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300,width:100, speed:2  },
        { x: secretRoomStartX + 1800, yStart: height - PLATFORM_HEIGHT - 130, yEnd: height - PLATFORM_HEIGHT - 300,width:100, speed:2  },
        { x: secretRoomStartX + 6500, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 400 ,width:100, speed:2 },
        
        //{ x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
        // Πρόσθεσε κι άλλες πλατφόρμες όπως χρειάζεται
      ];

      // Δημιουργία των πλατφορμών
      for (let pos of floatingPlatformPositions) {
        platforms.push(new FloatingPlatform(pos.x, pos.yStart, pos.yEnd, pos.width, pos.speed));
      }

      return platforms;
    }
}


function updatePlatforms(platforms) {
    for (let platform of platforms) {
        if (platform instanceof FloatingPlatform) {
            platform.update();
        }
    }
}

function drawPlatforms(platforms) {
    for (let platform of platforms) {
        platform.show();
    }

}
