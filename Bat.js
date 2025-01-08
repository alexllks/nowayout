class Bat {
    constructor(x, y, range, speed) {
        this.x = x; // Σταθερή θέση X
        this.y = y; // Αρχική θέση Y
        this.startY = y; // Αρχική θέση για το εύρος κίνησης
        this.range = range; // Εύρος κίνησης στον άξονα Y
        this.speed = speed; // Ταχύτητα κίνησης
        this.direction = 1; // 1 = πάνω, -1 = κάτω
    }

    update() {
        this.y += this.speed * this.direction; // Κίνηση στον άξονα Y

        // Αντιστροφή κατεύθυνσης όταν φτάσει στα όρια
        if (this.y >= this.startY + this.range || this.y <= this.startY) {
            this.direction *= -1;
        }
    
  
        // // Debugging
        // console.log(`Νυχτερίδα X: ${this.x}, Y: ${this.y}`);
         // Έλεγχος σύγκρουσης με τον παίκτη
         if (
            player.x + player.width / 2 > this.x - 20 &&
            player.x - player.width / 2 < this.x + 20 &&
            player.y + player.height > this.y - 20 &&
            player.y < this.y + 20
        ) {
            gameState = "gameover"; // Τερματισμός παιχνιδιού
        }
    }

    show() {
        let scale = 0.6; // Κλίμακα μεγέθους

        // Σώμα της νυχτερίδας
        fill(0); // Μαύρο
        beginShape();
        vertex(this.x, this.y); // Κέντρο
        bezierVertex(this.x - 50 * scale, this.y - 20 * scale, this.x - 70 * scale, this.y - 50 * scale, this.x - 90 * scale, this.y - 30 * scale); // Αριστερό φτερό
        bezierVertex(this.x - 70 * scale, this.y - 10 * scale, this.x - 90 * scale, this.y + 40 * scale, this.x - 50 * scale, this.y + 30 * scale); // Κάτω μέρος αριστερού φτερού
        vertex(this.x, this.y + 50 * scale); // Κέντρο σώματος
        bezierVertex(this.x + 50 * scale, this.y + 30 * scale, this.x + 90 * scale, this.y + 40 * scale, this.x + 70 * scale, this.y); // Κάτω μέρος δεξιού φτερού
        bezierVertex(this.x + 70 * scale, this.y - 50 * scale, this.x + 50 * scale, this.y - 20 * scale, this.x, this.y); // Δεξί φτερό
        endShape(CLOSE);

        // Κεφάλι
        triangle(this.x - 15 * scale, this.y, this.x, this.y - 30 * scale, this.x + 15 * scale, this.y); // Τρίγωνο κεφάλι

        // Αυτιά
        triangle(this.x - 10 * scale, this.y - 30 * scale, this.x - 20 * scale, this.y - 40 * scale, this.x - 5 * scale, this.y - 30 * scale); // Αριστερό αυτί
        triangle(this.x + 10 * scale, this.y - 30 * scale, this.x + 20 * scale, this.y - 40 * scale, this.x + 5 * scale, this.y - 30 * scale); // Δεξί αυτί

        // Μάτια
        fill(255, 0, 0); // Κόκκινα μάτια
        ellipse(this.x - 5 * scale, this.y - 10 * scale, 3 * scale, 3 * scale);
        ellipse(this.x + 5 * scale, this.y - 10 * scale, 3 * scale, 3 * scale);
    }
}

function updateBats(bats) {
    let closestBat = null;
    let closestDistance = Infinity;

    for (let bat of bats) {
        bat.update();

        // Υπολογισμός της απόστασης από τον παίκτη
        let distance = dist(player.x, player.y, bat.x, bat.y);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestBat = bat;
        }
    }

    // Ρύθμιση έντασης μόνο για την πλησιέστερη νυχτερίδα
    if (closestBat) {
        let maxDistance = 500; // Μέγιστη απόσταση για ήχο
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

let bats = []; // Αρχικοποίηση λίστας νυχτερίδων