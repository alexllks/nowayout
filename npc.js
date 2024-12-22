class NPC extends Player {
    constructor(x, y, speed = 3, direction = 1) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.speed = speed; // Ταχύτητα NPC
        this.direction = direction; // Κατεύθυνση (1 = δεξιά, -1 = αριστερά)
    }

    // Ενημέρωση θέσης NPC
// Ενημέρωση θέσης NPC
update(platforms) {
    // Ελαφρές παύσεις
    if (frameCount % 150 === 0 && random() < 0.2) {
        this.speed = 0; // Ο NPC σταματάει στιγμιαία
    } else {
        this.speed = 5; // Επιστροφή στην κανονική ταχύτητα
    }

    // Κίνηση δεξιά/αριστερά
    this.x += this.speed * this.direction;

    // Αναστροφή κατεύθυνσης αν φτάσει στα όρια
    if (this.x < 10 || this.x > 5000) {
        this.direction *= -1; // Αλλαγή κατεύθυνσης
    }

    // Έλεγχος αν βρίσκεται σε πλατφόρμα
    let onPlatform = false;
    for (let platform of platforms) {
        if (
            this.x + this.width / 2 > platform.x &&
            this.x - this.width / 2 < platform.x + platform.width &&
            this.y + this.height >= platform.y &&
            this.y + this.height <= platform.y + Math.abs(this.velocityY + 5)
        ) {
            onPlatform = true;
            this.y = platform.y - this.height; // Σταθεροποίηση πάνω στην πλατφόρμα
            this.velocityY = 0;
            break;
        }
    }

    // Αν δεν είναι σε πλατφόρμα, εφαρμόζεται η βαρύτητα
    if (!onPlatform) {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
    }

    // Υπολογισμός απόστασης από τον παίκτη
    let distance = dist(this.x, this.y, player.x, player.y);

    // Ρύθμιση έντασης ήχου βάσει απόστασης
    let maxDistance = 300; // Μέγιστη απόσταση για πλήρη ένταση
    let volume = map(distance/3, 0, maxDistance, 1, 0); // Χαμηλότερη ένταση όσο μεγαλώνει η απόσταση
    volume = constrain(volume, 0, 1/2); // Περιορισμός της έντασης μεταξύ 0 και 1
    npcFootstepSound.setVolume(volume);

    // Παίξε ήχο αν κινείται
    if (!npcFootstepSound.isPlaying() && this.speed > 0) {
        npcFootstepSound.loop();
    }

    // Στρογγυλοποίηση τιμών θέσης για αποφυγή τρεμουλώματος
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
}

    show() {
        const scale = 1.0; // Κλίμακα μεγέθους
        noStroke();
    
        // Κεφάλι με λεπτομέρεια
        fill(200, 100, 100); // Σκούρο κόκκινο για το κεφάλι
        ellipse(this.x, this.y - 50 * scale, 22 * scale, 22 * scale); // Κεφάλι
    
        // Καπέλο με σκίαση
        fill(100, 0, 0); // Σκούρο κόκκινο καπέλο
        arc(this.x, this.y - 55 * scale, 26 * scale, 15 * scale, PI, TWO_PI); // Πάνω μέρος καπέλου
        fill(80, 0, 0); // Πιο σκούρα απόχρωση για σκίαση
        arc(this.x, this.y - 55 * scale, 26 * scale, 10 * scale, PI, TWO_PI); // Εσωτερική σκίαση
    
        // Μάτια με σκιάσεις
        fill(255); // Λευκά των ματιών
        ellipse(this.x - 5 * scale, this.y - 52 * scale, 5 * scale, 3 * scale); // Αριστερό μάτι
        ellipse(this.x + 5 * scale, this.y - 52 * scale, 5 * scale, 3 * scale); // Δεξί μάτι
    
        fill(0); // Κόρες
        ellipse(this.x - 5 * scale, this.y - 52 * scale, 2 * scale, 2 * scale); // Αριστερή κόρη
        ellipse(this.x + 5 * scale, this.y - 52 * scale, 2 * scale, 2 * scale); // Δεξιά κόρη
    
        // Στόμα με ρεαλιστική έκφραση
        fill(255, 100, 100); // Χείλη
        arc(this.x, this.y - 46 * scale, 10 * scale, 4 * scale, 0, PI); // Στόμα
    
        // Σώμα με υφή
        fill(150, 30, 30); // Σκούρο κόκκινο για το σώμα
        rect(this.x - 10 * scale, this.y - 42 * scale, 20 * scale, 40 * scale); // Σώμα
       // fill(130, 20, 20); // Σκιά στο σώμα
        rect(this.x - 8 * scale, this.y - 40 * scale, 16 * scale, 36 * scale); // Εσωτερική σκίαση
    
        // Χέρια
        fill(150, 30, 30); // Ίδιο χρώμα με το σώμα
        rect(this.x - 15 * scale, this.y - 42 * scale, 5 * scale, 20 * scale); // Αριστερό χέρι
        rect(this.x + 10 * scale, this.y - 42 * scale, 5 * scale, 20 * scale); // Δεξί χέρι
    
        // Πόδια με μπότες
        fill(100, 20, 20); // Σκούρο κόκκινο για τα πόδια
        rect(this.x - 8 * scale, this.y - 5 * scale, 6 * scale, 15 * scale); // Αριστερό πόδι
        rect(this.x + 2 * scale, this.y - 5 * scale, 6 * scale, 15 * scale); // Δεξί πόδι
        fill(50); // Μαύρες μπότες
        rect(this.x - 8 * scale, this.y + 10 * scale, 6 * scale, 5 * scale); // Μπότες αριστερό πόδι
        rect(this.x + 2 * scale, this.y + 10 * scale, 6 * scale, 5 * scale); // Μπότες δεξί πόδι
    }
    
    
}    


function initializeNPCs() {
    npcs.push(new NPC(5000,540)); // Δημιουργία ενός NPC
}

function updateNPCs(platforms) {
    for (let npc of npcs) {
        npc.update(platforms);
    }
}

function drawNPCs() {
    for (let npc of npcs) {
        npc.show();
    }
}


function resetNPCs() {
  npcs = []; // Καθαρίζει τη λίστα NPCs
  initializeNPCs(); // Επαναρχικοποίηση των NPCs
  npcActivated = false; // Επαναφορά της κατάστασης ενεργοποίησης
}

