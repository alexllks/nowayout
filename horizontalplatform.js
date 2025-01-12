class HorizontalPlatform extends Platform {
    constructor(xStart, xEnd, y, width, speed) {
        super(xStart, y, width);
        this.xStart = xStart;
        this.xEnd = xEnd;
        this.speed = speed;
        this.direction = 1; // 1 = right, -1 = left
        this.height=20;
    }

    update() {
        this.x += this.speed * this.direction;
        if (this.x < this.xStart || this.x > this.xEnd) {
            this.direction *= -1;  
        }
    }

    show() {
        fill(200, 100, 100);  
        rect(this.x, this.y, this.width, this.height);
    }


    static createHorizontalPlatforms() {
        const platforms = [];

        
             
            const horizontalPlatformPositions = [
                { xStart: secretRoomStartX + 700, xEnd: secretRoomStartX + 1100, y:350, width:200, speed:3 },
                { xStart: secretRoomStartX + 2300, xEnd:secretRoomStartX + 2800, y:300, width:200, speed:3 },
                { xStart: secretRoomStartX + 8800, xEnd:secretRoomStartX + 9300, y:300, width:200, speed:3 }
                //{ x: secretRoomStartX + 700, yStart: height - PLATFORM_HEIGHT - 200, yEnd: height - PLATFORM_HEIGHT - 400 },
                //{ x: secretRoomStartX + 1100, yStart: height - PLATFORM_HEIGHT - 250, yEnd: height - PLATFORM_HEIGHT - 450 },
                 
              ];
        
               
              for (let pos of horizontalPlatformPositions) {
                platforms.push(new HorizontalPlatform(pos.xStart, pos.xEnd,pos.y, pos.width,pos.speed));
               // xStart, xEnd, y, width, speed
              }
        return platforms;
    }
}
function updatePlatforms(platforms) {
    for (let platform of platforms) {
        if (platform instanceof FloatingPlatform || platform instanceof HorizontalPlatform) {
            platform.update();
        }
    }
}

function drawPlatforms(platforms) {
    for (let platform of platforms) {
        platform.show();
    }
}
