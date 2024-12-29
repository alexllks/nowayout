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
let RIGHT_WALL_X = 7500; // Σταθερή θέση δεξιού τοίχου
let WALL_WIDTH = 50;   // Νέο πλάτος τοίχου
let MIDDLE_WALL_X= 4000;

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

let secretRoomStartX = 12000; // Θέση έναρξης του secret room στον άξονα X
let secretRoomWidth = 10000;  // Πλάτος του secret room
let NEW_WALL_X = 11900; // Θέση του νέου τοίχου στον άξονα X
let NEW_WALL_X2 = 22000; // Θέση του νέου τοίχου στον άξονα X


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

function setup() {
  createCanvas(1224, 576);
  horrorbackgroundMusic();
  bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight); // Δημιουργία buffer canvas
  
  player = new Player();
  initializeLevelTracker();
  setupRoom();
  initializeNPCs(); // Δημιουργία NPCs
  //createGhosts(1);
  //setRandomAnomaly(); // Επιλογή τυχαίου παραθύρου για ανωμαλία
  platforms = Platform.createPlatforms();
  // Άλλος κώδικας για το παιχνίδι σου
  
  // Ρύθμιση του ήχου για περπάτημα
  footstepSound.setVolume(0); // Αρχικά μηδενική ένταση
  footstepSound.loop(); 

  // Ρύθμιση του ήχου των σκαλιών
  stairStepSound.setVolume(0); // Αρχικά μηδενική ένταση
  stairStepSound.loop();

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
  else if (gameState === "secretRoom") {
    playSecretRoom(); // Νέα κατάσταση
  }
}



function initializeGame() {

  isGameOver = false;
  score = 0;

  // when gameOver, update the current level
  // currentLevel = 1;
  // updateLevelTracker();
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
  drawDoor();
  drawWalls();
  checkWallCollision();
  drawNoSmokingSign(); // Σχεδίαση σήματος "No Smoking"
  drawSofa2();
  drawDoors();
  drawWindow();
  drawBookshelfs();
  drawScaryObjects();
  drawSignBoard1(270, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard1(5450, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard2(875, height - PLATFORM_HEIGHT - 210); // Θέση 2ης πινακίδας
  drawSignBoard3(1590, height - PLATFORM_HEIGHT - 210);
  drawCosmicDoor(secretRoomStartX + secretRoomWidth - 215, height - 200);

  


  if (
    !npcActivated &&
    player.x + player.width / 2 > 1590 - 50 &&
    player.x - player.width / 2 < 1590+ 50
) {
    npcActivated = true; // Ενεργοποίηση του NPC
}

// Ενημέρωση και σχεδίαση NPCs
if (npcActivated) {
    updateNPCs(platforms, player.x, player.y);
    drawNPCs();
}

  

  Platform.drawPlatforms(platforms);
  

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


function playBattle() {
  player.x = 2550; // Νέα θέση μετά τον τοίχο
  text("Battle Mode! Defeat the enemy!", width / 2, 50);
  player.y = height - PLATFORM_HEIGHT - player.height;
  
  console.log(`Player X: ${player.x}, Camera X: ${player.y}`);

  // Σχεδίαση εχθρού
  fill(200, 0, 0);
  ellipse(width / 2, height / 2, 100); // Εχθρός ως κύκλος

  // Προσωρινός έλεγχος: Παίκτης νικάει πατώντας Space
  if (keyIsDown(32)) { // Space key
      gameState = "playing"; // Επιστροφή στο επίπεδο
      isTransitioning = false;
      player.x = 200; // Επαναφορά παίκτη
      player.y = height - PLATFORM_HEIGHT - player.height; // Τοποθέτηση στην αρχή επόμενου επιπέδου
      currentLevel++; // Ενημέρωση επιπέδου
      updateLevelTracker(); // Αναβάθμιση λίστας επιπέδων
  }
}
  
function enterSecretRoom() {
  
  // Μεταφορά του παίκτη στη νέα θέση
  player.x = secretRoomStartX + 100; // Τοποθετούμε τον παίκτη μέσα στο δωμάτιο
  player.y = height - PLATFORM_HEIGHT - player.height;
  // Απελευθέρωση του flag μετά τη μετάβαση
  setTimeout(() => {
    isTransitioning = false; // Επαναφορά του flag
}, 500); // Χρονική καθυστέρηση για να ολοκληρωθεί η μετάβαση
}

function playSecretRoom() {
  // Σχεδίαση νέου περιβάλλοντος
  background(50, 50, 100); // Σκούρο φόντο
  fill(255);
  textSize(32);
  text("Welcome to the Secret Room!", secretRoomStartX + 50, 50);

  // Δημιουργία νέων αντικειμένων ή περιβάλλοντος
  rect(secretRoomStartX + 200, height - 100, 100, 50); // Πλατφόρμα στο δωμάτιο
  // Μπορείτε να προσθέσετε περισσότερα στοιχεία ή NPCs εδώ

  // Επιστροφή στο αρχικό επίπεδο
  if (keyIsDown(66)) { // Πατά το "B" για επιστροφή
      player.x = 100; // Επαναφορά αρχικής θέσης
      player.y = height - PLATFORM_HEIGHT - player.height;
      gameState = "playing";
  }
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


//    // Επιστροφή στο κύριο επίπεδο αν φτάσει το τέλος
//    if (player.x >= secretRoomStartX + secretRoomWidth - 20) {
//     returnToMainTrack(); // Κλήση της συνάρτησης επιστροφής
// }

}

function returnToMainTrack() {
  player.x = 6000; // Θέση κοντά στον δεξιό τοίχο της κύριας πίστας
  player.y = height - PLATFORM_HEIGHT - player.height; // Βεβαιωθείτε ότι ο παίκτης βρίσκεται στην πλατφόρμα
  gameState = "playing"; // Επιστροφή στην κύρια πίστα
  showMessage("You have returned to the main track!");
}

function displayMenu() {
  background(30);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text("Welcome to the Game", width / 2, height / 2 - 20);
  textSize(20);
  text("Press ENTER to Play", width / 2, height / 2 + 20);
  if (keyIsDown(ENTER)) {
      gameState = "playing";
      initializeGame();
      setupRoom();
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

function initializeObstacles() {
  obstacleSprites = new Group();
}




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







