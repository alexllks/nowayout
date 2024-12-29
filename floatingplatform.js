class FloatingPlatform extends Platform {
    constructor(x, yStart, yEnd, width, speed) {
        super(x, yStart, width);
        this.yStart = yStart;
        this.yEnd = yEnd;
        this.speed = speed;
        this.direction = 1; // 1 = up, -1 = down
    }

    update() {
        this.y += this.speed * this.direction;
        if (this.y < this.yEnd || this.y > this.yStart) {
            this.direction *= -1; // Reverse direction
        }
    }

    show() {
        fill(100, 150, 255); // Blue color
        rect(this.x, this.y, this.width, this.height);
    }
}
