let canvas2D;
let playerX, playerY; // Θέση του παίκτη
let velocityY = 0; // Ταχύτητα στον άξονα Y
let velocityX = 0; // Ταχύτητα στον άξονα X
const GRAVITY = 0.3; // Βαρύτητα
const JUMP = -16; // Ταχύτητα άλματος
const SPEED = 9; // Ταχύτητα κίνησης στον άξονα X
let platforms = []; // Λίστα για τις πλατφόρμες

const PLATFORM_HEIGHT = 50; // Ύψος πλατφόρμας
const PLATFORM_WIDTH = 5000; // Μήκος πλατφόρμας
const CEILING_HEIGHT = 0; // Ύψος ταβανιού

let gameStarted = false; // Αρχική κατάσταση του παιχνιδιού

let showDoorMessage = false; // Αν το μήνυμα πρέπει να εμφανιστεί

let doorX = 4550; // Θέση της κύριας πόρτας στον άξονα X
let doorY = 355; // Θέση της πόρτας στον άξονα Y
let doorWidth = 70; // Πλάτος της πόρτας
let doorHeight = 150; // Ύψος της πόρτας
let doorOffset = 0; // Μετατόπιση της πόρτας
let doorOpening = false; // Κατάσταση ανοίγματος

let backgroundMusic = false; // Μεταβλητή για τον ήχο φόντου
let doorSound = false; // Ήχος για την πόρτα

function preload() {
    doorSound = loadSound("sounds/door-open.mp3"); // Φόρτωση ήχου για την πόρτα
    playerImage = loadImage("evil.png");
    backgroundMusic = loadSound("sounds/scary-background.mp3");
}

function setup() {
  createCanvas(1224, 576);

  

  // Αρχική θέση παίκτη
  playerX = 100;
  playerY = height - PLATFORM_HEIGHT - 50; // Τοποθέτηση πάνω από την πλατφόρμα

  createPlatforms();
}

// Συνάρτηση για να ξεκινήσει το παιχνίδι όταν ο χρήστης πατήσει Enter
function keyPressed() {
    if (!gameStarted && keyCode === ENTER) {
        gameStarted = true; // Το παιχνίδι ξεκινάει
        if (!backgroundMusic.isPlaying()) {
            backgroundMusic.loop(); // Ξεκινά ο ήχος όταν ξεκινά το παιχνίδι
        }
    }
}

function draw() {
    
    
    if (!gameStarted) {
        // Μαύρη οθόνη με μήνυμα
        background(0); // Μαύρο φόντο
        fill(255); // Λευκό κείμενο
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Welcome. Press Enter to play", width / 2, height / 2);
        return; // Διακοπή της σχεδίασης αν το παιχνίδι δεν έχει ξεκινήσει
    }

    // Κίνηση κάμερας για 2D παιχνίδι
    translate(-playerX + width / 2, 0);
    

    // Σχεδίαση 2D στοιχείων
    background(240, 230, 140);

    // Πλατφόρμα
    fill(100);
    rect(0, height - PLATFORM_HEIGHT, PLATFORM_WIDTH, PLATFORM_HEIGHT);

    // Ταβάνι
    fill(100);
    rect(0, CEILING_HEIGHT, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    drawNoSmokingSign(); // Σχεδίαση σήματος "No Smoking"
    // Κορνίζες με πρόσωπα
    drawFrames(); // Σχεδίαση κορνιζών με πρόσωπα

    // Πλατφόρμες
    drawPlatforms();

    // Πόρτα
    drawDoor();
    checkDoorInteraction(); // Έλεγχος για άνοιγμα πόρτας

    // Εμφάνιση μηνύματος αν ο παίκτης είναι κοντά στην πόρτα
    if (showDoorMessage) {
        fill(255, 255, 255);
        stroke(0);
        strokeWeight(2);
        textSize(24);
        textAlign(CENTER);
        text("Press F to pass this door", playerX - 500 + width / 2, height - 100);
    }


    // Ενημέρωση θέσης και φυσικής του παίκτη
    updatePlayer();

    // Σχεδίαση παίκτη ως εικόνα
    image(playerImage, playerX, playerY, 50, 50); // Σχεδίαση της εικόνας στις διαστάσεις του παίκτη
}

function drawDoor() {
    // Σχεδίαση λευκής πόρτας (εξωτερικό πλαίσιο)
    fill(255, 255, 255);
    rect(doorX, doorY, doorWidth + 10, doorHeight + 10);

    // Σχεδίαση εσωτερικής καφέ πόρτας που κινείται
    fill(60, 30, 15);
    rect(doorX + doorOffset, doorY + 3, doorWidth + 10, doorHeight + 13);
}

function checkDoorInteraction() {
  if (
    playerX + 50 > doorX && // Παίκτης αγγίζει την αριστερή πλευρά της πόρτας
    playerX < doorX + doorWidth && // Παίκτης αγγίζει τη δεξιά πλευρά της πόρτας
    playerY + 50 > doorY && // Παίκτης στο ύψος της πόρτας
    playerY < doorY + doorHeight
  ) { 
     showDoorMessage = true;
    }
  else {
    showDoorMessage=false;
  }
  // Ελέγχει αν ο παίκτης βρίσκεται μπροστά στην πόρτα και πατάει 'F'
  if (
      playerX + 50 > doorX && // Παίκτης αγγίζει την αριστερή πλευρά της πόρτας
      playerX < doorX + doorWidth && // Παίκτης αγγίζει τη δεξιά πλευρά της πόρτας
      playerY + 50 > doorY && // Παίκτης στο ύψος της πόρτας
      playerY < doorY + doorHeight && // Παίκτης βρίσκεται εντός των ορίων της πόρτας
      keyIsDown(70) // Παίκτης πατάει το πλήκτρο 'F'
  ) {
   
      if (!doorOpening) {
          doorOpening = true; // Η πόρτα ανοίγει
          if (!doorSound.isPlaying()) {
              doorSound.play(); // Παίζει ο ήχος της πόρτας
          }
      }
  }

  // Διαχείριση της μετακίνησης της πόρτας όταν ανοίγει
  if (doorOpening && doorOffset < 50) {
        doorOffset += 5; // Αργή κίνηση της πόρτας για εφέ
    } else if (doorOpening && doorOffset >= 50) {
        setTimeout(() => { // Καθυστέρηση πριν την είσοδο του παίκτη
            playerX = 100; // Επαναφορά παίκτη στην αρχική θέση
            playerY = height - PLATFORM_HEIGHT - 50;
            doorOpening = false; // Επαναφορά κατάστασης πόρτας
            doorOffset = 0; // Επαναφορά μετατόπισης πόρτας
            showDoorMessage = false; // Απόκρυψη μηνύματος
        }, 2700);
  } else if (doorOpening && doorOffset >= 50) {
      // Ο παίκτης περνάει την πόρτα και επαναφέρεται
      playerX = 100; // Επαναφορά παίκτη στην αρχική θέση
      playerY = height - PLATFORM_HEIGHT - 50;
      doorOpening = false; // Επαναφορά κατάστασης πόρτας
      doorOffset = 0; // Επαναφορά μετατόπισης πόρτας
      showDoorMessage = false; // Απόκρυψη μηνύματος
  }
}


function createPlatforms() {
    // Προσθήκη πλατφορμών με κενά
    platforms = [
        { x: 0, y: height - PLATFORM_HEIGHT, width: 400 }, // Αρχική πλατφόρμα
        { x: 600, y: height - 200, width: 200 }, // Δεύτερη πλατφόρμα με κενό
        { x: 1000, y: height - 300, width: 300 }, // Μεγαλύτερη πλατφόρμα ψηλά
        { x: 1500, y: height - 250, width: 150 }, // Μικρή πλατφόρμα με κενό
        { x: 1900, y: height - 230, width: 150 },
        { x: 3400, y: height - 230, width: 150 },
        { x: 4000, y: height - 300, width: 150 },
        { x: 4500, y: height - 400, width: 150 }, // Μικρή πλατφόρμα με κενό
        { x: 2000, y: height - PLATFORM_HEIGHT, width: 400 }, // Επιστροφή στο έδαφος
    ];
}

function drawPlatforms() {
    fill(100);
    for (let platform of platforms) {
        rect(platform.x, platform.y, platform.width, PLATFORM_HEIGHT); // Σχεδίαση πλατφόρμας
    }
}

function drawFrames() {
    // Λίστα κορνιζών με θέσεις και διαστάσεις
    const frames = [
        { x: 200, y: 100, width: 80, height: 100 },
        { x: 400, y: 150, width: 80, height: 100 },
        { x: 600, y: 200, width: 80, height: 100 }
    ];

    // Χρώμα κορνίζας
    fill(139, 69, 19);
    stroke(0);
    strokeWeight(2);

    // Σχεδίαση κάθε κορνίζας
    for (let frame of frames) {
        rect(frame.x, frame.y, frame.width, frame.height); // Σχεδίαση κορνίζας

        // Προσθήκη προσώπου μέσα στην κορνίζα
        fill(255, 224, 189); // Χρώμα δέρματος
        noStroke();
        ellipse(frame.x + frame.width / 2, frame.y + frame.height / 2, frame.width * 0.6, frame.height * 0.6); // Πρόσωπο

        // Προσθήκη ματιών
        fill(0);
        ellipse(frame.x + frame.width / 3, frame.y + frame.height / 2.5, 5, 5); // Αριστερό μάτι
        ellipse(frame.x + 2 * frame.width / 3, frame.y + frame.height / 2.5, 5, 5); // Δεξί μάτι

        // Προσθήκη χαμόγελου
        noFill();
        stroke(0);
        strokeWeight(1);
        arc(frame.x + frame.width / 2, frame.y + frame.height / 1.8, frame.width / 2.5, frame.height / 4, 0, PI);
    }
}

function drawNoSmokingSign() {
    // Τοποθεσία και μέγεθος του σήματος
    const x = width - 150;
    const y = 200;
    const diameter = 100;

    // Σχεδίαση κύκλου
    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, diameter);

    // Σχεδίαση διαγώνιας γραμμής
    stroke(255);
    strokeWeight(10);
    line(x - diameter / 2.5, y - diameter / 2.5, x + diameter / 2.5, y + diameter / 2.5);

    // Σχεδίαση εικονιδίου τσιγάρου
    noStroke();
    fill(255);
    rect(x - 20, y + 10, 40, 10); // Σώμα του τσιγάρου
    fill(255, 165, 0);
    rect(x + 20, y + 10, 10, 10); // Άκρη του τσιγάρου

    // Σχεδίαση καπνού
    noFill();
    stroke(255);
    strokeWeight(2);
    arc(x - 30, y - 10, 20, 20, PI / 4, (3 * PI) / 4);
    arc(x - 35, y - 20, 15, 15, PI / 4, (3 * PI) / 4);
}

function updatePlayer() {
    // Εφαρμογή βαρύτητας
    velocityY += GRAVITY;
    playerY += velocityY;

    // Κίνηση δεξιά/αριστερά
    if (keyIsDown(RIGHT_ARROW)) {
        velocityX = SPEED;
    } else if (keyIsDown(LEFT_ARROW)) {
        velocityX = -SPEED;
    } else {
        velocityX = 0;
    }
    playerX += velocityX;

    // Έλεγχος αν ο παίκτης βρίσκεται πάνω σε πλατφόρμα
    let onPlatform = false;
    for (let platform of platforms) {
        if (
            playerX + 50 > platform.x && // Δεξιά άκρη του παίκτη πάνω στην πλατφόρμα
            playerX < platform.x + platform.width && // Αριστερή άκρη του παίκτη πάνω στην πλατφόρμα
            playerY + 50 >= platform.y && // Πόδια του παίκτη πάνω στην πλατφόρμα
            playerY + 50 <= platform.y + 15 // Ο παίκτης κοντά στην επιφάνεια της πλατφόρμας
        ) {
            onPlatform = true;
            playerY = platform.y - 50; // Σταθεροποίηση του παίκτη πάνω στην πλατφόρμα
            velocityY = 0; // Σταμάτημα της πτώσης
            break;
        }
    }

    // Έλεγχος για το έδαφος αν ο παίκτης δεν βρίσκεται σε πλατφόρμα
    if (!onPlatform && playerY + 50 >= height - PLATFORM_HEIGHT) {
        playerY = height - PLATFORM_HEIGHT - 50; // Σταθεροποίηση στο έδαφος
        velocityY = 0;
        onPlatform = true;
    }

    // Έλεγχος για το ταβάνι
    if (playerY <= CEILING_HEIGHT + PLATFORM_HEIGHT) {
        playerY = CEILING_HEIGHT + PLATFORM_HEIGHT; // Περιορισμός στο ύψος
        velocityY = 0;
    }

    // Άλμα μόνο αν είναι σε πλατφόρμα ή στο έδαφος
    if (keyIsDown(UP_ARROW) && onPlatform) {
        velocityY = JUMP;
    }

    // Περιορισμός εντός του κόσμου
    playerX = constrain(playerX, 0, PLATFORM_WIDTH - 50);
}
