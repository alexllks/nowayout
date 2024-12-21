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
let PLATFORM_WIDTH = 6000; // Πλάτος σκηνής
let CEILING_HEIGHT = 50; // Ύψος ταβανιού
let backgroundMusic = { isPlaying: () => false, loop: () => {} }; // Dummy αντικείμενο ήχου
let showDoorMessage = false;
let playerImage;
var gameState = "menu"; // Αρχικό μενού
let currentLevel = 1;
var isGameOver;
let RIGHT_WALL_X = 5200; // Σταθερή θέση δεξιού τοίχου

let npcActivated = false; // Αρχικά ο NPC είναι ανενεργός


var lights = []; // Φωτισμός
var lightToggleTime = 0; // Χρόνος για αναβόσβημα

let enemy;
let battleStartTime;




let npcs = []; // Λίστα NPCs

let backgroundHorrorMusic;
let footstepSound;
let stairStepSound;
let npcFootstepSound;

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



function drawAnomaliesSignBoard(x, y) {
  const boardWidth = 300; // Μικρότερο πλάτος
  const boardHeight = 150; // Μικρότερο ύψος

  // Πλαίσιο πινακίδας
  fill(139, 69, 19); // Καφέ για το ξύλο
  rect(x, y, boardWidth, boardHeight, 5); // Πλαίσιο με στρογγυλεμένες γωνίες

  // Εσωτερικό πινακίδας
  fill(255, 240, 240); // Απαλό κόκκινο για σχετική προειδοποίηση
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

  // Κείμενο
  fill(0); // Μαύρο για το κείμενο
  textSize(14); // Τίτλος
  textAlign(CENTER, CENTER);
  text("Anomalies Rules", x + boardWidth / 2, y + 30);
  
  textSize(12); // Κανόνες
  text("- Don't overlook any anomalies.", x + boardWidth / 2, y + 65);
  text("- If you find anomalies, turn back immediately.", x + boardWidth / 2, y + 85);
  text("- If you don't find anomalies, do not turn back.", x + boardWidth / 2, y + 105);
}


function drawSignBoard(x, y) {
  const boardWidth = 350; // Μικρότερο πλάτος
  const boardHeight = 150; // Μικρότερο ύψος

  // Πλαίσιο πινακίδας
  fill(139, 69, 19); // Καφέ για το ξύλο
  rect(x, y, boardWidth, boardHeight, 5); // Στρογγυλεμένες γωνίες


  // Εσωτερικό πινακίδας
  fill(255, 240, 240); // Απαλό κόκκινο για σχετική προειδοποίηση
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

  // Κείμενο
  fill(0); // Μαύρο για το κείμενο
  textSize(14); // Μικρότερη γραμματοσειρά
  textAlign(CENTER, CENTER);
  text("Welcome!", x + boardWidth / 2, y + 30);
  textSize(12);
  text("- You are trapped in an endless corridor.", x + boardWidth / 2, y + 60);
  text("- Observe your surroundings carefully to reach The Exit.", x + boardWidth / 2, y + 85);
  text("- Press F for doors.", x + boardWidth / 2, y + 105);
}

function drawSignBoard3(x, y) { 
  const boardWidth = 200; // Πλάτος
  const boardHeight = 150; // Ύψος

  // Πλαίσιο πινακίδας
  fill(139, 69, 19); // Καφέ για το ξύλο
  rect(x, y, boardWidth, boardHeight, 5); // Στρογγυλεμένες γωνίες

  // Εσωτερικό πινακίδας
  fill(255, 240, 240); // Απαλό κόκκινο για σχετική προειδοποίηση
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

  // Κείμενο
  fill(0); // Μαύρο για το κείμενο
  textSize(16); 
  textAlign(CENTER, CENTER);
  text("Good Luck!!!", x + boardWidth / 2, y + 50);

  // Χαμογελαστή φατσούλα
  fill(255, 220, 0); // Κίτρινο για το πρόσωπο
  ellipse(x + boardWidth / 2, y + 100, 40, 40); // Κύκλος για πρόσωπο

  fill(0); // Μαύρο για τα μάτια
  ellipse(x + boardWidth / 2 - 10, y + 95, 5, 5); // Αριστερό μάτι
  ellipse(x + boardWidth / 2 + 10, y + 95, 5, 5); // Δεξί μάτι

  noFill();
  stroke(0); // Μαύρο περίγραμμα για χαμόγελο
  arc(x + boardWidth / 2, y + 105, 20, 10, 0, PI); // Χαμόγελο
}



function initializeGame() {

  
  isGameOver = false;
  score = 0;

  // when gameOver, update the current level
  // currentLevel = 1;
  // updateLevelTracker();
}




  


function draw() {
  if (gameState === "menu") {
      displayMenu();
  } else if (gameState === "playing") {
      playGame();
  } else if (gameState === "gameover") {
     playGameAfterLost();
  }
  else if(gameState === "battle"){
    playBattle();
  }
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

function drawWalls() {
  // Αριστερός τοίχος
  fill(60, 60, 60);
  rect(0, 0, 20, height);

  // Δεξιός τοίχος
  fill(60, 60, 60);
  rect(RIGHT_WALL_X, 0, 20, height);

  
  

  // Φανταστικές πόρτες
  drawRealisticDoor(5, height - 170); // Αριστερή πόρτα
  drawRealisticDoor(RIGHT_WALL_X + 5, height - 170); // Δεξιά πόρτα
}

function drawRealisticDoor(x, y) {
  // Σχεδίαση πλαισίου πόρτας
  fill(100, 50, 30); // Καφέ για το ξύλο
  rect(x, y, 15, 150, 2); // Πλαίσιο με μικρή καμπύλη

  // Χρωματική διαβάθμιση για 3D εφέ
  noStroke();
  for (let i = 0; i < 15; i++) {
      let colorValue = map(i, 0, 15, 120, 80); // Από ανοιχτό σε σκούρο καφέ
      fill(colorValue, 50, 30);
      rect(x + i, y + 3, 1, 144); // Σκίαση προς τα δεξιά
  }

  // Χερούλι πόρτας
  fill(180, 180, 0); // Χρυσό
  ellipse(x + 12, y + 75, 4, 4); // Κυκλικό χερούλι

  // Εσωτερικό σκούρο μέρος για βάθος
  fill(50, 30, 20, 100); // Σκούρο καφέ με διαφάνεια
  rect(x + 2, y + 5, 11, 140, 2);
}





function checkWallCollision() {
  // Έλεγχος αν ο παίκτης ακουμπά τον αριστερό τοίχο
  if (player.x <= 20) {
      checkExit(true);
  }

  // Έλεγχος αν ο παίκτης ακουμπά τον δεξιό τοίχο
  if (player.x + player.width >= RIGHT_WALL_X) {
      checkExit(false);
  }
}

// function playGame() {
//   let cameraX = constrain(player.x - width / 2, 0, PLATFORM_WIDTH - width);
//   translate(-cameraX, 0);

//   background(240, 230, 140);

//   drawWalls(); // Σχεδιάζει τους τοίχους
//   checkWallCollision(); // Ελέγχει αν ο παίκτης ακουμπά τους τοίχους

//   Platform.drawPlatforms(platforms);
//   player.update();
//   player.show();
//   drawDoor(); // Σχεδιάζει την πόρτα (αν υπάρχει)
// }



function playGame() {
  // Εξασφαλίζουμε ότι η κάμερα ακολουθεί τον παίκτη
  let cameraX = constrain(player.x - width / 2, 0, PLATFORM_WIDTH - width + 100);
  translate(-cameraX, 0);
  
  // Σχεδίαση 2D στοιχείων
  background(240, 230, 140);

  drawWall();
  //drawLamps();
 // drawLamp();
 


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

  drawSignBoard(270, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
  drawSignBoard(5450, height - PLATFORM_HEIGHT - 210); // Νέες συντεταγμένες
 

  drawAnomaliesSignBoard(875, height - PLATFORM_HEIGHT - 210); // Θέση 2ης πινακίδας


  drawSignBoard3(1590, height - PLATFORM_HEIGHT - 210);
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



 
  // updateNPCs(platforms); // Ενημέρωση NPCs
  // drawNPCs(); // Σχεδίαση NPCs
 
  // if (frameCount % 180 === 0) {
  //   setRandomAnomaly();
  // }

  // drawNormalWindow();
  // drawWindow2();
  // drawWindow3();
  //drawPoster();
  
    //   // Draw flooding water as an anomaly
    //   if (hasAnomaly) {
    //     drawFloodingWater(PLATFORM_WIDTH, height - 100, hasAnomaly);
    // }
  
  

  Platform.drawPlatforms(platforms);
  

    // Έλεγχος αν ο παίκτης βγήκε εκτός ορίων
  if (player.x > PLATFORM_WIDTH) {
    checkExit(false); // Έξοδος από δεξιά
  } else if (player.x < 0) {
    checkExit(true); // Έξοδος από αριστερά
  }

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
 
 // Ενημέρωση θέσης και φυσικής του παίκτη
 player.update();
 // Σχεδίαση παίκτη
 player.show();

 

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







