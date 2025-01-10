// main.js



let player;
let platforms = [];
let objects = [];
let objects2 = [];
let bufferCanvas;
let gameStarted = false;
let totalLevels = 9;
let levels = Array.from({ length: totalLevels }, (_, i) => i + 1); // [1, 2, 3, ..., 9]
let hasAnomaly = false;
var isGameOver;
let PLATFORM_HEIGHT = 20; // Ύψος πλατφόρμας
let PLATFORM_WIDTH = 25100; // Πλάτος σκηνής
let CEILING_HEIGHT = 50; // Ύψος ταβανιού
let backgroundMusic = { isPlaying: () => false, loop: () => {} }; // Dummy αντικείμενο ήχου
let showDoorMessage = false;
let playerImage;
var gameState = "menu"; // Αρχικό μενού
let currentLevel = 0;
let savedLevel = 0;
var isGameOver;
//GRAMMI 26 ALLAGI
let RIGHT_WALL_X = 9370; // Σταθερή θέση δεξιού τοίχου
//---------------------------------------------------------------
let END_WALL_X = 21642;
let WALL_WIDTH = 50;   // Νέο πλάτος τοίχου

let MIDDLE_WALL_X= 7240;
let FIRST_WALL = 4920;
let SECOND_WALL = 5760;
let THIRD_WALL = 2540;
let FIFTH_WALL =6480;
let FORTH_WALL = 3960;
let obstacles = []; // Δήλωση πίνακα για τα εμπόδια

let npcActivated = false; // Αρχικά ο NPC είναι ανενεργός


let lights = []; // Φωτισμός
var lightToggleTime = 0; // Χρόνος για αναβόσβημα

let enemy;
let showCosmicDoor1 = false;

let battleStartTime;

let npcs = []; // Λίστα NPCs

let backgroundHorrorMusic;
let footstepSound;
let stairStepSound;
let npcFootstepSound;
let tvSound;
let secretRoomStartX = 12000; // Θέση έναρξης του secret room στον άξονα X
let secretRoomWidth = 10000;  // Πλάτος του secret room
let NEW_WALL_X = 11900; // Θέση του νέου τοίχου στον άξονα X
//let FIRST_WALL_SECRET=13900;
let NEW_WALL_X2 = 22000; // Θέση του νέου τοίχου στον άξονα X
let UPPER_WALL = 1;

let audioStarted = false; // Έναρξη ήχου

let tvSoundActive = false;  // Σημαία για την ενεργοποίηση ήχου


let rainSoundActive = false; // Σημαία για την κατάσταση του ήχου βροχής
let npcFootstepSoundActive = false; // Σημαία για την κατάσταση του ήχου NPC



let debugMode = false;
let noclipMode = false; // Για το debug mode

function preload() {
  soundManager = new SoundManager();
  soundManager.load('rain', 'assets/sounds/rain.wav');
  soundManager.load('bats', 'assets/sounds/bats.wav');
  soundManager.load('cosmicdoor', 'assets/sounds/cosmicdoor.wav');
  soundManager.load('waters', 'assets/sounds/waters.mp3');
  soundManager.load('jump', 'assets/sounds/jumping.wav');
  soundManager.load('background', 'assets/sounds/horror_background.mp3');
  soundFormats('mp3', 'ogg','wav'); // Ορισμός μορφών για συμβατότητα
  //playerImage = loadImage("assets/images/evil.png"); // Βεβαιώσου ότι το αρχείο υπάρχει
  doorSound = loadSound ("assets/sounds/scary-background.mp3")

  tvSound = loadSound('assets/sounds/tv.mp3'); // Φόρτωση του ήχου
  footstepSound = loadSound('assets/sounds/footsteps.wav');//Φορτωση ηχου 
  npcFootstepSound = loadSound('assets/sounds/npc_footsteps.wav');//Φορτωση ηχου 
  stairStepSound = loadSound('assets/sounds/stair_footsteps.wav');
  //rainSound = loadSound('assets/sounds/rain.wav'); // Ήχος βροχής

  lightImg = loadImage('assets/images/light.png');
  mooonImg= loadImage('assets/images/hotelscary.jpg');
  receptionImg = loadImage ( 'assets/images/imagereception.jpg');
  castleImg = loadImage('assets/images/castle.jpg');
  libraryImg = loadImage('assets/images/library.jpg');
  menubackground = loadImage('assets/images/menu-background3.png');
  moon2Img = loadImage('assets/images/moon2.jpg');
  toRoomsImg =loadImage('assets/images/toRooms.jpg');
  paintingImg = loadImage('assets/images/haunting_painting.jpg'); // Βεβαιώσου ότι η διαδρομή είναι σωστή
  graveyardImg = loadImage('assets/images/graveyard_painting.jpg');
  houseImg = loadImage('assets/images/house_painting.jpg'); 
  stairsghostImg = loadImage('assets/images/stairsghost.jpg'); 
  bloodyHandprintImg = loadImage('assets/images/bloodyHandprint.png'); // Βεβαιώσου ότι το αρχείο είναι στη σωστή διαδρομή
}

// function setup() {
//   createCanvas(1224, 576);
//   bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight); // Δημιουργία buffer canvas

//   player = new Player();
//   initializeLevelTracker();
//   setupRoom();
//   initializeNPCs(); // Δημιουργία NPCs
//   platforms = Platform.createPlatforms();

//   // Προτροπή στον χρήστη να κάνει κλικ για τον ήχο
//   textSize(20);
//   fill(255);
//   textAlign(CENTER);
//   text("Click to start audio and music", width / 2, height / 2);
// }



function setup() {
  createCanvas(1224, 576);
  bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight); // Δημιουργία buffer canvas

  player = new Player();
  initializeLevelTracker();
  platforms = Platform.createPlatforms();
  // Ενεργοποίηση Debug Mode
  if (debugMode) {
    enterSecretRoom(); // Τοποθέτηση του παίκτη στο secret room
  }

  document.getElementById('volume-slider').addEventListener('input', (event) => {
    const newVolume = parseFloat(event.target.value); // Τρέχουσα τιμή του slider
    soundManager.setMasterVolume(newVolume); // Ενημέρωση της master έντασης
});

// Πιθανότητα εμφάνισης της πόρτας
  showCosmicDoor1 = random() < 0.9;
 // Debug: Εκτύπωση της τιμής της `showCosmicDoor1`
 //console.log("Show Cosmic Door 1:", showCosmicDoor1);
  // Προτροπή στον χρήστη να κάνει κλικ για τον ήχο
  // textSize(20);
  // fill(255);
  // textAlign(CENTER);
  // text("Click to start audio and music", width / 2, height / 2);
}



 
 


  


function draw() {
 
  if (gameState === "menu") {
      displayMenu();
  } else if (gameState === "complete") {
      displayGz();
  } else if (gameState === "playing") {
      playGame();
  } else if (gameState === "gameover") {
     playGameAfterLost();
  }else if (gameState === "lost"){
    displayLost();
  }
}
function displayLost() {
  background(0);

  // Εμφάνιση μηνύματος θανάτου
  fill(255, 0, 0); // Κόκκινο χρώμα
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 50);

  // Εμφάνιση προτροπής για επιστροφή στο μενού
  textSize(16);
  fill(255); // Λευκό χρώμα
  text("Press M to return to the menu", width / 2, height / 2);

  // Έλεγχος αν ο χρήστης πατάει το πλήκτρο 'M'
  if (keyIsDown(77)) { // 77 είναι ο κωδικός για το πλήκτρο 'M'
      currentLevel = 0; // Επαναφορά επιπέδων
      updateLevelTracker(); // Ενημέρωση του tracker
      gameState = "menu"; // Επιστροφή στο μενού
      initializeGame(); // Επαναφορά του παιχνιδιού
  }
}




function drawWater() {
  // Βασικές ρυθμίσεις για το νερό
  let waveHeight = 20; // Ύψος κυμάτων
  let waveFrequency = 0.02; // Συχνότητα κυμάτων
  let waveSpeed = 2; // Ταχύτητα κυμάτων

  // Χρώμα και διαφάνεια νερού
  fill(0, 0, 255, 180);
  rect(secretRoomStartX-51 , height-50 - PLATFORM_HEIGHT, secretRoomWidth-410, PLATFORM_HEIGHT+50);

  // Σχεδίαση κυμάτων στην επιφάνεια
  fill(135, 206, 250, 100); // Ανοιχτό μπλε για κύματα
  noStroke();
  beginShape();
  for (let x = secretRoomStartX; x <= secretRoomStartX+51+secretRoomWidth-500; x += 100) {
      let y = height - PLATFORM_HEIGHT-50+ Math.sin((x + frameCount * waveSpeed) * waveFrequency) * waveHeight;
      vertex(x, y);
  }
  vertex(secretRoomStartX + 51 +secretRoomWidth-500, height - PLATFORM_HEIGHT-50); // Κλείσιμο δεξιά
  vertex(secretRoomStartX-51, height - PLATFORM_HEIGHT-50); // Κλείσιμο αριστερά
  endShape(CLOSE);
}

function checkWaterCollision(player) {
  if (player.x >= secretRoomStartX-50 && player.y + player.height >= height - PLATFORM_HEIGHT) {
    if(player.x<=secretRoomStartX+secretRoomWidth-400){
      console.log("Ο παίκτης έπεσε στο νερό!");
      // isGameOver = true; // Ορισμός της κατάστασης "game over
      soundManager.stop('bats'); // Διακοπή του ήχου νυχτερίδων
      soundManager.stop('waters');
      soundManager.stopAllSounds();
      allowRainSound = true; // Επαναφορά του ήχου της βροχής
    
        // isGameOver = true; // Ενεργοποίηση του flag για game over
      isDying();
  }
}
}

function isDying(){

       // Ξεκινά το animation θανάτου
       player.isDying = true;

       // Μετατροπή σε κατάσταση "lost" μετά από 3 δευτερόλεπτα
       setTimeout(() => {
           gameState = "lost"; // Ορισμός της κατάστασης σε lost
       }, 1000);
}



function initializeGame() {

  soundManager.play('background', false, 0.2); // Έναρξη του ήχου νυχτερίδων
  isGameOver = false;
  player.isDying = false;
  player.x = 730; // Θέση εκκίνησης του παίκτη
  player.y = height - PLATFORM_HEIGHT - player.height;
  player.velocityY = 0;
 
 // gameState = "menu"; // Επιστροφή στο μενού
}

function playGame() {
  // Εξασφαλίζουμε ότι η κάμερα ακολουθεί τον παίκτη
  let cameraX = constrain(player.x - width / 2, 0, PLATFORM_WIDTH - width + 100);
  translate(-cameraX, 0);
  // Σχεδίαση 2D στοιχείων
  background(240, 230, 140);

  drawWall();
 drawStairs(); // Σχεδίαση σκάλας
  //drawTopBorder();
  drawWallLights();
  drawGhosts();
  drawObjects();


  //drawDoor();
   // Σχεδίαση της πρώτης Cosmic Door
   if (showCosmicDoor1) {
     // Debug: Εκτύπωση της τιμής της `showCosmicDoor1`
     //console.log("Show Cosmic Door 1:", showCosmicDoor1);
    drawCosmicDoor(3400, 370);
} else {
  console.log("Cosmic Door 1 not shown.");
}
checkCosmicDoorSound(player,showCosmicDoor1);
 
  drawWalls();
  // drawLights();
  checkWallCollision();
  drawNoSmokingSign(); // Σχεδίαση σήματος "No Smoking"
  //drawSofa2();
  drawDoors();
  drawWindow();
  drawBookshelfs();
  drawScaryObjects();
  drawCourageSign(secretRoomStartX -40, height - PLATFORM_HEIGHT - 500);
  drawExitSignArrow(5670, height - PLATFORM_HEIGHT - 240);
  drawExitSign(9390, height - PLATFORM_HEIGHT - 240);
  drawExitSign(30, height - PLATFORM_HEIGHT - 240);
  drawSignBoard1(875, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard2(9630, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard2(270, height - PLATFORM_HEIGHT - 210); // Θέση 2ης πινακίδας
  drawSignBoard3(1590, height - PLATFORM_HEIGHT - 210);
  drawCosmicDoor(secretRoomStartX + secretRoomWidth - 215, height - 200);
 // checkCosmicSecretDoorSound(player);
  drawSpikes();
  drawReceptionDesk();
  drawFireplaces();
   // Σχεδίαση NPC σε σταθερό σημείο
   //drawNpc(2820, 550); // Ο NPC θα εμφανιστεί στη θέση (200, 300)

  // Έλεγχος σύγκρουσης με καρφιά
  if (checkSpikeCollision(player)) {
      console.log("Ο παίκτης χτύπησε σε καρφιά!");
     // gameState = "gameover"; // Ορισμός της κατάστασης σε "gameover"
      soundManager.stop('bats'); // Διακοπή του ήχου νυχτερίδων
        soundManager.stop('waters');
        soundManager.stopAllSounds();
        allowRainSound = true; // Επαναφορά του ήχου της βροχής
    
     isDying();
      // isGameOver = true;
      //resetPlayerPosition(); // Επιστροφή παίκτη στην αρχή
  }




  


updateBats(bats); // Ενημέρωση των νυχτερίδων
drawBats(bats); // Σχεδίαση των νυχτερίδων


updatePlatforms(platforms); 
  Platform.drawPlatforms(platforms);

  Platform.drawPlatforms(platforms); // Σχεδίαση πλατφορμών//
  

  for (let obstacle of obstacles) {
    if (typeof obstacle.update === "function") {
        obstacle.update(); // Ενημέρωση αν έχει λογική κίνησης
    }
    obstacle.show(); // Σχεδίαση εμποδίου
}

  drawWater(); // Σχεδίαση νερού
  checkWaterCollision(player); // Έλεγχος σύγκρουσης με το νερό



    // Έλεγχος αν ο παίκτης βγήκε εκτός ορίων
  if (player.x > PLATFORM_WIDTH) {
    checkExit(false); // Έξοδος από δεξιά
  } else if (player.x < 0) {
    checkExit(true); // Έξοδος από αριστερά
  } 
 checkCosmicDoorInteraction(player);
 checkDoorInteraction(player,showCosmicDoor1); // Έλεγχος για άνοιγμα πόρτας

 
 // Εμφάνιση μηνύματος αν ο παίκτης είναι κοντά στην πόρτα
 if (showDoorMessage) {
   fill(255, 255, 255);
   stroke(0);
   strokeWeight(2);
   textSize(24);
   textAlign(CENTER);
   text("Press F to pass this door", player.x - 500 + width / 2, height - 100);
 }
  // Εμφάνιση μηνύματος αν ο παίκτης είναι κοντά στην πόρτα
  if (showDoorCosmicMessage) {
    fill(255, 255, 255);
    stroke(0);
    strokeWeight(2);
    textSize(24);
    textAlign(CENTER);
    text("Press F to pass this door", player.x - 500 + width / 2, height - 100);
  }





  
 // Ενημέρωση θέσης και φυσικής του παίκτη
 player.update();
 // Σχεδίαση παίκτη
 player.show();

 if (currentLevel > totalLevels) {
  showMessage("Congratulations! You've completed all levels!");
  gameState = "complete";
  currentLevel = 0;
 }
}


let spikes = []; // Πίνακας για τα καρφιά



function keyPressed() {
  // Navigate up and down using arrow keys
  if (keyCode === ENTER && gameState === "complete") {
    gameState = "menu";
    stopAllSounds();
    console.log(`---- ${gameState}`);  // Correct string interpolation
    currentLevel = 0;
    updateLevelTracker();
  }
  if ((keyIsDown(ALT) && key === 'n' || key === 'N') && gameState === "playing") {
    noclipMode = !noclipMode; // Εναλλαγή noclip mode
    console.log("Noclip Mode: player speed " + (noclipMode ? "Activated" : "Deactivated"));
  }
  if ((keyIsDown(ALT) && keyCode === 80) && gameState === "playing") { // 83 is the keycode for 'S'
    console.log("Alt + P pressed");
    showMessage("Game paused on level ${currentLevel}");
    stopAllSounds();
    gameState = "menu";
    savedLevel = currentLevel;
  }
  if ((keyIsDown(18) && keyCode === 77) && gameState === "playing") {
    console.log('Alt + M was pressed!');
    stopAllSounds();
    gameState = "menu";
    currentLevel = 0;
    updateLevelTracker();
  }
}

// function stopAllSounds() {
//   const allSounds = [backgroundHorrorMusic, tvSound, npcFootstepSound, rainSound];

//   for (const sound of allSounds) {
//     if (sound && sound.isLoaded() && sound.isPlaying()) {
//       console.log(`Stopping sound: ${sound}`);
//       sound.stop();
//     } else if (!sound.isPlaying()) {
//       console.log(`Sound is not playing: ${sound}`);
//     }
//   }
// }


 
function enterSecretRoom() {
  //soundManager.stopAllSounds(); // Σταματάει όλους τους ήχους
  stopAllSounds();
  soundManager.stopAllSounds();
  soundManager.play('bats', true, 0.5); // Έναρξη του ήχου νυχτερίδων
  soundManager.play('waters', true, 0.8); // Ένταση στο 80%

  

  // Μεταφορά του παίκτη στη νέα θέση
  player.x = secretRoomStartX; // Τοποθετούμε τον παίκτη μέσα στο δωμάτιο
  player.y = 240;
  
  // Απελευθέρωση του flag μετά τη μετάβαση
  setTimeout(() => {
    isTransitioning = false; // Επαναφορά του flag
}, 500); // Χρονική καθυστέρηση για να ολοκληρωθεί η μετάβαση
}


function checkWallCollision() {
  // Έλεγχος αν ο παίκτης ακουμπά τον αριστερό τοίχο
  if (player.x <= 20) {
      checkExit(true);
  }

  // Έλεγχος αν ο παίκτης ακουμπά τον δεξιό τοίχο
  if (player.x + player.width >= RIGHT_WALL_X && player.x + player.width <= secretRoomStartX-2000) {
      checkExit(false);
  }
  // Έλεγχος σύγκρουσης με τον νέο τοίχο (από δεξιά)
  if (player.x < NEW_WALL_X + 50 && player.x + player.width / 2 > NEW_WALL_X) {
    player.x = NEW_WALL_X + 50; // Σταματάει δεξιά από τον τοίχο
}



// Έλεγχος για τον δεξιό τοίχο μέσα στο secret room
if (player.x + player.width > NEW_WALL_X2) {
  player.x = NEW_WALL_X2 - player.width; // Σταματάει στον δεξιό τοίχο
}

// Έλεγχος σύγκρουσης με τον τελικό τοίχο πριν απο την πόρτα (από δεξιά)
if (
  player.x < END_WALL_X + 50 &&
  player.x + player.width / 2 > END_WALL_X &&
  player.y + player.height > height - 160 && // Προσθήκη συνθήκης για τον άξονα Y
  player.y < height - 160 + 200 // Το ύψος του τοίχου είναι 200
) {
  player.x = END_WALL_X + 50; // Σταματάει δεξιά από τον τοίχο
}
// Έλεγχος σύγκρουσης κάτω από το ταβάνι
if (
  player.x + player.width > UPPER_WALL && // Ο παίκτης βρίσκεται στο εύρος X του τοίχου
  player.x < UPPER_WALL + 30000 && // Το μήκος του τοίχου
  player.y < height - 575 + 40 && // Ο παίκτης βρίσκεται σε επαφή με το κάτω μέρος του τοίχου
  player.y + player.height > height - 575 // Ο παίκτης προσπαθεί να περάσει κάτω από το τοίχο
) {
  player.y = height - 575 + 40; // Σταθεροποίηση ακριβώς πάνω από το ταβάνι
  player.velocityY = 0; // Επαναφορά ταχύτητας
}




// // Έλεγχος για τον Πρωτο τοίχο μέσα στο secret room
// if (player.x + player.width > FIRST_WALL_SECRET) {
//   player.x = FIRST_WALL_SECRET - player.width; // Σταματάει στον δεξιό τοίχο
// }

}

function returnToMainTrack() {
  player.x = 6000; // Θέση κοντά στον δεξιό τοίχο της κύριας πίστας
  player.y = height - PLATFORM_HEIGHT - player.height; // Βεβαιωθείτε ότι ο παίκτης βρίσκεται στην πλατφόρμα
  gameState = "playing"; // Επιστροφή στην κύρια πίστα
  showMessage("You have returned to the main track!");
}

let showInstructions = false;
let menuBoxes = [
  { text: "New game", x: 500, y: 200, width: 200, height: 50 },
  { text: "Resume game", x: 500, y: 275, width: 200, height: 50 },
  { text: "Instructions", x: 500, y: 350, width: 200, height: 50 }
];
function displayMenu() {
  background(menubackground);
  textAlign(CENTER, CENTER);
  textSize(20);

  // Εμφάνιση κουτιών με hover εφέ
  for (let box of menuBoxes) {
    // Ελέγχουμε αν το ποντίκι είναι πάνω στο κουτί
    if (
      mouseX > box.x &&
      mouseX < box.x + box.width &&
      mouseY > box.y &&
      mouseY < box.y + box.height
    ) {
      fill(200, 100, 100); // Κόκκινο για hover
    } else {
      fill(100, 100, 100); // Γκρι για κανονική κατάσταση
    }

    rect(box.x, box.y, box.width, box.height, 10); // Σχεδίαση του κουτιού
    fill(255); // Χρώμα κειμένου
    text(box.text, box.x + box.width / 2, box.y + box.height / 2);
  }
}

function mousePressed() {
  // Έλεγχος για click στα κουτιά
  for (let box of menuBoxes) {
    if (
      mouseX > box.x &&
      mouseX < box.x + box.width &&
      mouseY > box.y &&
      mouseY < box.y + box.height
    ) {
      if (box.text === "New game") {
        console.log("Game started!"); // Παράδειγμα λειτουργίας
        gameState = "playing"; // Ξεκινάει το παιχνίδι
        initializeGame();
        allowRainSound = true;
        setupRoom();
        currentLevel = 0;
        updateLevelTracker();
      } else if (box.text === "Resume game") {
        gameState = "playing";
        currentLevel = savedLevel;
        console.log("Loading Game...");
        allowRainSound = true;
        initializeGame();
        setupRoom();
      } else if (box.text === "Instructions") {
        console.log("Instructions displayed!"); // Παράδειγμα λειτουργίας
        showInstructions = true; // Εμφάνιση οδηγιών
      }
    }
  }
}


function displayGz() {
  background(30);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text("Gongratulations you have complete all levels", width / 2, height / 2 - 20);
  textSize(20);
  text("Press ENTER to play again", width / 2, height / 2 + 20);
  if (keyIsDown(ENTER)) {
      gameState = "playing";
      initializeGame();
      setupRoom();
  }
}

function  playGameAfterLost() {
      
      gameState = "playing";
      currentLevel = 0;
      updateLevelTracker();
      initializeGame();
      //setupRoom();
      if (currentLevel > totalLevels) {
        showMessage("Congratulations! You've completed all levels!");
        gameState = "gameover";
    } else {
        setupRoom(); // Επαναφορά σκηνής για το νέο επίπεδο
        player.x = 730; // Επαναφορά παίκτη
        player.y = height - PLATFORM_HEIGHT - player.height;
    }
  }


function checkExit(isBackExit) {

   // Έλεγχος αν ο παίκτης βρίσκεται στο secret room
   if (gameState === "secretRoom") {
    if ((!isBackExit)){
      setupRoom(); // Επαναφορά σκηνής για το νέο επίπεδο
      player.x = 4000; // Επαναφορά παίκτη
      player.y = height - PLATFORM_HEIGHT - player.height;
    }
    // return ; // Δεν ενεργοποιείται η μετάβαση
}

  if ((isBackExit && hasAnomaly) || (!isBackExit && !hasAnomaly)) {
      showMessage("Correct! Moving to the next level.");
      currentLevel++;
      updateLevelTracker();
      
      
      if (currentLevel > totalLevels) {
          showMessage("Congratulations! You've completed all levels!");
          gameState = "gameover";
      } else {
          setupRoom(); // Επαναφορά σκηνής για το νέο επίπεδο
          player.x = 730; // Επαναφορά παίκτη
          player.y = height - PLATFORM_HEIGHT - player.height;
        
      }
  } else {
      showMessage("Game Over!");
      gameState = "gameover";
  }
  
  
}


function showMessage(newMessage) {
  message = newMessage;
  messageTime = millis();
}




// function initializeObstacles() {
//   obstacleSprites = new Group();
// }




function initializeLevelTracker() {
  const levelsList = document.getElementById('levels-list');
  levelsList.innerHTML = ''; // Καθαρισμός λίστας

  for (let i = 1; i <= totalLevels; i++) {
      const levelItem = document.createElement('li');
      levelItem.textContent = `Level ${i}`;
      if (i < currentLevel) {
          levelItem.classList.add('completed'); // Μαρκάρισμα περασμένων επιπέδων
      }
      levelsList.appendChild(levelItem);
  }
}

function updateLevelTracker() {
  showCosmicDoor1 = random() < 0.9; // ανανέωση τιμής σε κάθε γύρο
  const levelsList = document.getElementById('levels-list').children;
  for (let i = 0; i < levelsList.length; i++) {
      if (i  < currentLevel) {
          levelsList[i].classList.add('completed'); // Μαρκάρισμα περασμένων επιπέδων
      } else {
          levelsList[i].classList.remove('completed'); // Επαναφορά για μη περασμένα επίπεδα
      }
  }
  console.log(`Level tracker updated. Current level: ${currentLevel}`);
}








