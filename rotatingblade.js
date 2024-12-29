class RotatingBlade {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = 0;
    }

    update() {
        this.angle += 0.05; // Rotate
    }

    show() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill(200);
        ellipse(0, 0, this.radius * 2, this.radius * 2); // Blade base
        fill(255, 0, 0);
        for (let i = 0; i < 4; i++) {
            rotate(PI / 2);
            rect(0, -5, this.radius, 10); // Blades
        }
        pop();
    }
}
