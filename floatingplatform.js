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
        fill(100, 150, 255); // Blue color
        rect(this.x, this.y, this.width*2, this.height);
    }

    static createFloatingPlatforms() {
        const platforms = [];

            // // Reduce floating platforms
      const floatingPlatformPositions = [
        //{ x: 600, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 1400, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 1800, yStart: height - PLATFORM_HEIGHT - 130, yEnd: height - PLATFORM_HEIGHT - 300 },
        { x: secretRoomStartX + 6500, yStart: height - PLATFORM_HEIGHT - 150, yEnd: height - PLATFORM_HEIGHT - 400 },
        
        //{ x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
        // Πρόσθεσε κι άλλες πλατφόρμες όπως χρειάζεται
      ];

      // Δημιουργία των πλατφορμών
      for (let pos of floatingPlatformPositions) {
        platforms.push(new FloatingPlatform(pos.x, pos.yStart, pos.yEnd, 50, 2));
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
