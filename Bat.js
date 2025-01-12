class Bat {
    constructor(x, y, range, speed) {
        this.x = x;  
        this.y = y;  
        this.startY = y;  
        this.range = range;  
        this.speed = speed;  
        this.direction = 1;
    }

    update() {
        this.y += this.speed * this.direction;  

         
        if (this.y >= this.startY + this.range || this.y <= this.startY) {
            this.direction *= -1;
        }
    
  
         
        // console.log(`Νυχτερίδα X: ${this.x}, Y: ${this.y}`);
          
         if (
            player.x + player.width / 2 > this.x - 20 &&
            player.x - player.width / 2 < this.x + 20 &&
            player.y + player.height > this.y - 20 &&
            player.y < this.y + 20
        ) {
            gameState = "gameover";  
        }
    }

    show() {
        let scale = 0.6;  

         
        fill(0);  
        beginShape();
        vertex(this.x, this.y);  
        bezierVertex(this.x - 50 * scale, this.y - 20 * scale, this.x - 70 * scale, this.y - 50 * scale, this.x - 90 * scale, this.y - 30 * scale);  
        bezierVertex(this.x - 70 * scale, this.y - 10 * scale, this.x - 90 * scale, this.y + 40 * scale, this.x - 50 * scale, this.y + 30 * scale);  
        vertex(this.x, this.y + 50 * scale);  
        bezierVertex(this.x + 50 * scale, this.y + 30 * scale, this.x + 90 * scale, this.y + 40 * scale, this.x + 70 * scale, this.y);  
        bezierVertex(this.x + 70 * scale, this.y - 50 * scale, this.x + 50 * scale, this.y - 20 * scale, this.x, this.y);  
        endShape(CLOSE);

         
        triangle(this.x - 15 * scale, this.y, this.x, this.y - 30 * scale, this.x + 15 * scale, this.y);  

         
        triangle(this.x - 10 * scale, this.y - 30 * scale, this.x - 20 * scale, this.y - 40 * scale, this.x - 5 * scale, this.y - 30 * scale);  
        triangle(this.x + 10 * scale, this.y - 30 * scale, this.x + 20 * scale, this.y - 40 * scale, this.x + 5 * scale, this.y - 30 * scale);  

         
        fill(255, 0, 0);  
        ellipse(this.x - 5 * scale, this.y - 10 * scale, 3 * scale, 3 * scale);
        ellipse(this.x + 5 * scale, this.y - 10 * scale, 3 * scale, 3 * scale);
    }


}

function updateBats(bats) {
    let closestBat = null;
    let closestDistance = Infinity;

    for (let bat of bats) {
        bat.update();

         
        let distance = dist(player.x, player.y, bat.x, bat.y);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestBat = bat;
        }
    }

     
    if (closestBat) {
        let maxDistance = 500;  
        let volume = map(closestDistance, 0, maxDistance, 1.0, 0.0);
        volume = constrain(volume, 0.0, 1.0);

        soundManager.setVolume('bats', volume);

        if (!soundManager.sounds['bats'].isPlaying()) {
            soundManager.play('bats', true, volume);
        }
    }
}

function drawBats(bats) {
    for (let bat of bats) {
        bat.show();
    }
}

let bats = [];  