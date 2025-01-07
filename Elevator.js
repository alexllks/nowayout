// Elevator class definition
class Elevator {
    constructor(x, yStart, yEnd, width, height, speed) {
        this.x = x;
        this.y = yStart;
        this.yStart = yStart;
        this.yEnd = yEnd;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 0; // 0 = stationary, 1 = up, -1 = down
    }

    update() {
        if (this.direction !== 0) {
            this.y += this.speed * this.direction;
            if (this.y <= this.yEnd) {
                this.y = this.yEnd;
                this.direction = 0; // Stop at the lower limit
            } else if (this.y >= this.yStart) {
                this.y = this.yStart;
                this.direction = 0; // Stop at the upper limit
            }
        }
    }

    show() {
        fill(150, 150, 150); // Gray color for the elevator
        rect(this.x, this.y, this.width, this.height);
        fill(100);
        rect(this.x + 5, this.y + 5, this.width - 10, this.height - 10); // Inner rectangle for effect
    }

    // Check if player is colliding with the elevator
    isColliding(player) {
        return (
            player.x + player.width > this.x &&
            player.x < this.x + this.width &&
            player.y + player.height >= this.y &&
            player.y + player.height <= this.y + this.height + 5 // Allow slight overlap
        );
    }

    // Activate elevator movement
    activate(direction) {
        this.direction = direction;
    }
}