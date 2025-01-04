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
            this.direction *= -1; // Αντιστροφή κατεύθυνσης
        }
    }

    show() {
        fill(200, 100, 100); // Κόκκινο χρώμα
        rect(this.x, this.y, this.width, this.height);
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
