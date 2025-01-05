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
let currentLevel = 1;
var isGameOver;

//GRAMMI 26 ALLAGI
let RIGHT_WALL_X = 9370; // Σταθερή θέση δεξιού τοίχου
//---------------------------------------------------------------

let WALL_WIDTH = 50;   // Νέο πλάτος τοίχου

let MIDDLE_WALL_X= 7240;
let FIRST_WALL = 4675;
let SECOND_WALL = 5890;
let obstacles = []; // Δήλωση πίνακα για τα εμπόδια

let npcActivated = false; // Αρχικά ο NPC είναι ανενεργός


let lights = []; // Φωτισμός
var lightToggleTime = 0; // Χρόνος για αναβόσβημα

let enemy;
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

let audioStarted = false; // Έναρξη ήχου

let tvSoundActive = false;  // Σημαία για την ενεργοποίηση ήχου


let rainSoundActive = false; // Σημαία για την κατάσταση του ήχου βροχής
let npcFootstepSoundActive = false; // Σημαία για την κατάσταση του ήχου NPC


let debugMode = false;
let noclipMode = false; // Για το debug mode

function preload() {
  soundFormats('mp3', 'ogg','wav'); // Ορισμός μορφών για συμβατότητα
  //playerImage = loadImage("assets/images/evil.png"); // Βεβαιώσου ότι το αρχείο υπάρχει
  doorSound = loadSound ("assets/sounds/scary-background.mp3")
  backgroundHorrorMusic = loadSound ("assets/sounds/horror_background.mp3", () => {
  console.log('Music loaded!');
}, (err) => {
    console.error('Error loading music:', err);
});
  tvSound = loadSound('assets/sounds/tv.mp3'); // Φόρτωση του ήχου
  footstepSound = loadSound('assets/sounds/footsteps.wav');//Φορτωση ηχου 
  npcFootstepSound = loadSound('assets/sounds/npc_footsteps.wav');//Φορτωση ηχου 
  stairStepSound = loadSound('assets/sounds/stair_footsteps.wav');
  rainSound = loadSound('assets/sounds/rain.wav'); // Ήχος βροχής
  paintingImg = loadImage('assets/images/haunting_painting.jpg'); // Βεβαιώσου ότι η διαδρομή είναι σωστή
  graveyardImg = loadImage('assets/images/graveyard_painting.jpg');
  houseImg = loadImage('assets/images/house_painting.jpg'); 
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
  
  // Ενεργοποίηση Debug Mode
  if (debugMode) {
    enterSecretRoom(); // Τοποθέτηση του παίκτη στο secret room
  } else {
    setupRoom();
  }

  initializeNPCs(); // Δημιουργία NPCs
  platforms = Platform.createPlatforms();


 

  // Προτροπή στον χρήστη να κάνει κλικ για τον ήχο
  textSize(20);
  fill(255);
  textAlign(CENTER);
  text("Click to start audio and music", width / 2, height / 2);
}


function mousePressed() {
  if (!audioStarted) {
    userStartAudio(); // Ξεκινά το AudioContext
    
    audioStarted = true;
    console.log("Audio started and sounds initialized");
  }

  //  // Ξεκινά η μουσική τρόμου
  //  horrorbackgroundMusic();

  if(!backgroundHorrorMusic.isPlaying()){
  
      backgroundHorrorMusic.setVolume(0.2);
      backgroundHorrorMusic.loop();
    console.log("Backgound music is playing");
      // Ξεκινά η μουσική τρόμου
  

    
  }

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
  if (player.x >= secretRoomStartX + 200 && player.y + player.height >= height - PLATFORM_HEIGHT) {
    if(player.x<=secretRoomStartX+secretRoomWidth-300){
      console.log("Ο παίκτης έπεσε στο νερό!");
      // isGameOver = true; // Ορισμός της κατάστασης "game over
    
      gameState = "gameover";
  }
}
}


function initializeGame() {
  isGameOver = false;
}

function playGame() {
  
  // Εξασφαλίζουμε ότι η κάμερα ακολουθεί τον παίκτη
  let cameraX = constrain(player.x - width / 2, 0, PLATFORM_WIDTH - width + 100);
  translate(-cameraX, 0);
  // Σχεδίαση 2D στοιχείων
  background(240, 230, 140);

  drawWall();
 drawStairs(); // Σχεδίαση σκάλας
  drawTopBorder();
  drawWallLights();
  drawGhosts();
  drawObjects();


  //drawDoor();
  drawCosmicDoor(1800,420);
  
  drawWalls();
  checkWallCollision();
  drawNoSmokingSign(); // Σχεδίαση σήματος "No Smoking"
  drawSofa2();
  drawDoors();
  drawWindow();
  drawBookshelfs();
  drawScaryObjects();
  drawSignBoard1(875, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard1(9760, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard2(270, height - PLATFORM_HEIGHT - 210); // Θέση 2ης πινακίδας
  drawSignBoard3(1590, height - PLATFORM_HEIGHT - 210);
  drawCosmicDoor(secretRoomStartX + secretRoomWidth - 215, height - 200);
  drawSpikes();
  drawReceptionDesk();

  // Έλεγχος σύγκρουσης με καρφιά
  if (checkSpikeCollision(player)) {
      console.log("Ο παίκτης χτύπησε σε καρφιά!");
      gameState = "gameover"; // Ορισμός της κατάστασης σε "gameover"
      isGameOver = true;
      //resetPlayerPosition(); // Επιστροφή παίκτη στην αρχή
  }




  if (
    !npcActivated &&
    player.x + player.width / 2 > 1590 - 50 &&
    player.x - player.width / 2 < 1590+ 50)
 {
    npcActivated = true; // Ενεργοποίηση του NPC
 }

// Ενημέρωση και σχεδίαση NPCs
if (npcActivated) {
    updateNPCs(platforms, player.x, player.y);
    drawNPCs();
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
 checkDoorInteraction(player); // Έλεγχος για άνοιγμα πόρτας

 
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
  if (key === 'n' || key === 'N') {
      noclipMode = !noclipMode; // Εναλλαγή noclip mode
      console.log("Noclip Mode: " + (noclipMode ? "Activated" : "Deactivated"));
  }
}



function enterSecretRoom() {
  
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

function displayMenu() {
  background(30);
  textAlign(CENTER, CENTER);
  fill(255);

  if (showInstructions) {
    // Εμφάνιση Οδηγιών
    textSize(28);
    text("How to Play", width / 2, height / 2 - 100);
    textSize(20);
    text("Use the arrow keys to move.", width / 2, height / 2 - 40);
    text("Press UP or SPACE to jump.", width / 2, height / 2);
    textSize(16);
    text("Press BACKSPACE to return", width / 2, height / 2 + 100);

    if (keyIsDown(BACKSPACE)) {
      showInstructions = false; // Επιστροφή στο κύριο μενού
    }
  } else {
    // Κύριο Μενού
    textSize(32);
    text("Welcome to the Game", width / 2, height / 2 - 20);
    textSize(20);
    text("Press ENTER to Play", width / 2, height / 2 + 20);
    text("Press 'I' for Instructions", width / 2, height / 2 + 60);

    if (keyIsDown(ENTER)) {
      gameState = "playing";
      initializeGame();
      setupRoom();
    }

    if (keyIsDown(73)) { // 'I' key
      showInstructions = true;
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
        player.x = 100; // Επαναφορά παίκτη
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
          player.x = 100; // Επαναφορά παίκτη
          player.y = height - PLATFORM_HEIGHT - player.height;
        
      }
  } else {
      showMessage("Game Over!");
      gameState = "gameover";
  }
  resetNPCs(); // Επαναφορά NPCs στην αρχική κατάσταση
  
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
  const levelsList = document.getElementById('levels-list').children;
  for (let i = 0; i < levelsList.length; i++) {
      if (i + 1 < currentLevel) {
          levelsList[i].classList.add('completed'); // Μαρκάρισμα περασμένων επιπέδων
      } else {
          levelsList[i].classList.remove('completed'); // Επαναφορά
      }
  }
}







