// main.js



let player;

let platforms = [];
let ghosts = [];
let objects = [];
let obstacles = [];
let spikes = []; 
let bufferCanvas;
let gameStarted = false;
let totalLevels = 9;

let hasAnomaly = false;
var isGameOver;

let PLATFORM_HEIGHT = 20; // Ύψος πλατφόρμας
let PLATFORM_WIDTH = 25100; // Πλάτος σκηνής
let CEILING_HEIGHT = 50; // Ύψος ταβανιού

let showDoorMessage = false;

var gameState = "menu"; // Αρχικό μενού
let currentLevel = 0;
let savedLevel = 0;
var isGameOver;


let RIGHT_WALL_X = 9370; // Σταθερή θέση δεξιού τοίχου
let END_WALL_X = 21642;
let WALL_WIDTH = 50;   // Νέο πλάτος τοίχου
let MIDDLE_WALL_X= 7240;
let FIRST_WALL = 4920;
let SECOND_WALL = 5760;
let THIRD_WALL = 2540;
let FIFTH_WALL =6480;
let FORTH_WALL = 3960;
let NEW_WALL_X = 11900; // Θέση του νέου τοίχου στον άξονα X
let NEW_WALL_X2 = 22000; // Θέση του νέου τοίχου στον άξονα X
let UPPER_WALL = 1;
let UPPER_WALL_SECRET = 18250;
let secretRoomStartX = 12000; // Θέση έναρξης του secret room στον άξονα X
let secretRoomWidth = 10000;  // Πλάτος του secret room

let lights = []; // Φωτισμός
var lightToggleTime = 0; // Χρόνος για αναβόσβημα


let showCosmicDoor1 = false;
let playerImage;
let backgroundHorrorMusic;
let footstepSound;
let stairStepSound;
let npcFootstepSound;
let tvSound;
let tvSoundActive = false;  // Σημαία για την ενεργοποίηση ήχου
let audioStarted = false; // Έναρξη ήχου

let isTransitioning = false; // Αρχικά η πόρτα δεν βρίσκεται σε μετάβαση
let debugMode = false;
let noclipMode = false; // Για το debug mode

//key pressed
let saved_x;
let saved_y;
let saved_anomaly;
let isResume = false;


//window
let isRainPlaying = false; // Σημαία για να παρακολουθεί αν ο ήχος βροχής παίζει
let allowRainSound = true; // Ελέγχει αν ο ήχος της βροχής μπορεί να παίξει
let allowWaterSound = true;



function preload() {
  soundManager = new SoundManager();
  soundManager.load('rain', 'assets/sounds/rain.wav');
  soundManager.load('bats', 'assets/sounds/bats.wav');
  soundManager.load('cosmicdoor', 'assets/sounds/cosmicdoor.wav');
  soundManager.load('waters', 'assets/sounds/waters.mp3');
  soundManager.load('jump', 'assets/sounds/jumping.wav');
  soundManager.load('background', 'assets/sounds/horror_background.mp3');
  soundManager.load('death', 'assets/sounds/death.wav');
  tvSound = loadSound('assets/sounds/tv.mp3'); // Φόρτωση του ήχου

  soundFormats('mp3', 'ogg','wav'); // Ορισμός μορφών για συμβατότητα

  lightImg = loadImage('assets/images/light.png');
  mooonImg= loadImage('assets/images/hotelscary.jpg');
  smileyfaceImg = loadImage('assets/images/SmileyFace.jpg');
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



function setup() {

  createCanvas(1224, 576);
  bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight); 
  player = new Player();
  platforms = Platform.createPlatforms();
  document.getElementById('volume-slider').addEventListener('input', (event) => {
    const newVolume = parseFloat(event.target.value); 
    soundManager.setMasterVolume(newVolume);
});
// Πιθανότητα εμφάνισης της πόρτας
  showCosmicDoor1 = random() < 0.5;
}


function draw() {
 
  if (gameState === "menu") {
      displayMenu();
  } else if (gameState === "complete") {
      displayGz();
  } else if (gameState === "playing") {
      playGame();
  } else if (gameState === "instructions") {
    displayInstructions(); // Εμφάνιση οδηγιών
  } else if (gameState === "controls") {
    displayControls(); // Εμφάνιση οδηγιών
  } else if (gameState === "gameover") {
     playGameAfterLost();
  }else if (gameState === "lost"){
    displayLost();
  }
}





function drawWater() {
  
  let waveHeight = 20; 
  let waveFrequency = 0.02; 
  let waveSpeed = 2; 

  // Χρώμα και διαφάνεια νερού
  fill(0, 0, 255, 180);
  rect(secretRoomStartX-51 , height-50 - PLATFORM_HEIGHT, secretRoomWidth-410, PLATFORM_HEIGHT+50);

  // Σχεδίαση κυμάτων στην επιφάνεια
  fill(135, 206, 250, 100); 
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
      
      soundManager.stop('bats'); 
      soundManager.stop('waters');
      soundManager.stopAllSounds();
      allowRainSound = true; 
      isDying();
    }
  }
  for (let obj of objects) {
    if (obj.type === 'flood' && obj.active) {
        // Έλεγχος αν ο παίκτης έρχεται σε επαφή με το νερό
        if (
            player.x + player.width > obj.x - obj.width && 
            player.x < obj.x && 
            player.y + player.height > obj.y
        ) {
            console.log("Player drowned in the water!");
            isDying();
            break; 
        }
    }
}
}

function isDying(){
       // Ξεκινά το animation θανάτου
       player.isDying = true;
           // Παίζει τον ήχο θανάτου
           soundManager.stopAllSounds
    soundManager.play('death', false, 0.7);
    gameState = "lost"; 

}



function initializeGame() {

  soundManager.play('background', false, 0.2); // Έναρξη του ήχου νυχτερίδων
  isGameOver = false;
  player.isDying = false;
  if (isResume) {
    player.x = saved_x;
    player.y = saved_y;
  } else {
    player.x = 730; // Θέση εκκίνησης του παίκτη
    player.y = height - PLATFORM_HEIGHT - player.height;
  }
  player.velocityY = 0;
}

function playGame() {

  // Εξασφαλίζουμε ότι η κάμερα ακολουθεί τον παίκτη
  let cameraX = constrain(player.x - width / 2, 0, PLATFORM_WIDTH - width + 100);
  translate(-cameraX, 0);


  drawWall();
    
  drawStairs();
  drawWallLights();
  drawGhosts();

  drawInclined();
  if (showCosmicDoor1) {drawCosmicDoor(3400, 370);} 
  checkCosmicDoorSound(player,showCosmicDoor1);
  drawWalls();
  checkWallCollision();
  drawNoSmokingSign();
  drawDoors();
  drawWindow();
  drawBookshelfs();
  drawCourageSign(secretRoomStartX -40, height - PLATFORM_HEIGHT - 500);
  drawExitSignArrow(5670, height - PLATFORM_HEIGHT - 240);
  drawExitSign(9390, height - PLATFORM_HEIGHT - 240);
  drawExitSign(30, height - PLATFORM_HEIGHT - 240);
  drawSignBoard1(875, height - PLATFORM_HEIGHT - 210); 
  drawSignBoard2(9630, height - PLATFORM_HEIGHT - 210); 
  drawSignBoard2(270, height - PLATFORM_HEIGHT - 210); 
  drawSignBoard3(1590, height - PLATFORM_HEIGHT - 210);
  
  
  drawScaryObjects();
  drawFireplaces();
  drawReceptionDesk();
  drawObjects();


  drawCosmicDoor(secretRoomStartX + secretRoomWidth - 215, height - 200);
  drawSpikes();
 
  




  updateBats(bats); 
  drawBats(bats);


  updatePlatforms(platforms); 
  Platform.drawPlatforms(platforms); 


  checkWaterCollision(player); 


  checkCosmicDoorInteraction(player);
  checkDoorInteraction(player,showCosmicDoor1);
  
  checkSpikeCollision(player);



    // Έλεγχος αν ο παίκτης βγήκε εκτός ορίων
  if (player.x > PLATFORM_WIDTH) {
    checkExit(false); // Έξοδος από δεξιά
  } else if (player.x < 0) {
    checkExit(true); // Έξοδος από αριστερά
  } 


 
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

drawLevel(cameraX);
  

 player.update();
 player.show();

 checkFloodTrigger(player);
 drawWater(); 
  drawLightsPosition();
 if (currentLevel > totalLevels) {
  showMessage("Congratulations! You've completed all levels!");
  gameState = "complete";
  currentLevel = 0;
 }
}

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

function exitSecretRoom() {
  soundManager.stop('bats'); // Διακοπή του ήχου νυχτερίδων
  soundManager.stop('waters');
  soundManager.stopAllSounds();

  // Μεταφορά του παίκτη στη νέα θέση
  player.x =730; // Τοποθετούμε τον παίκτη μέσα στο δωμάτιο
  player.y = height - PLATFORM_HEIGHT - player.height;
  currentLevel += 4;

  console.log(`Exited secret room. Current level: ${currentLevel}`);
  allowRainSound = true; // Επαναφορά του ήχου της βροχής
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
    player.x = NEW_WALL_X + 50; 
}

// Έλεγχος για τον δεξιό τοίχο μέσα στο secret room
if (player.x + player.width > NEW_WALL_X2) {
  player.x = NEW_WALL_X2 - player.width; 
}

// Έλεγχος σύγκρουσης με τον τελικό τοίχο πριν απο την πόρτα (από δεξιά)
if (
  player.x < END_WALL_X + 50 &&
  player.x + player.width / 2 > END_WALL_X &&
  player.y + player.height > height - 160 && 
  player.y < height - 160 + 200 
) {
  player.x = END_WALL_X + 50; 
}
// Έλεγχος σύγκρουσης κάτω από το ταβάνι
if (
  player.x + player.width > UPPER_WALL && 
  player.x < UPPER_WALL + 30000 && 
  player.y < height - 575 + 40 && 
  player.y + player.height > height - 575 
) {
  player.y = height - 575 + 40; 
  player.velocityY = 0; // Επαναφορά ταχύτητας
}

// Έλεγχος σύγκρουσης κάτω από το ταβάνι
if(player.y>=354 && player.y<height - 170 + 50 ){
  if (
    player.x + player.width > UPPER_WALL_SECRET && 
    player.x < UPPER_WALL_SECRET + 80 && 
    player.y < height - 170 + 50 && 
    player.y + player.height > height - 575 
  ) {
    player.y = height - 170 + 50; 
    player.velocityY = 0;
  }
  }
  
}

let isTransitioningCosmic = false;
let showDoorCosmicMessage = false;



function  checkCosmicDoorInteraction(player) {
  if (
      player.x + player.width > secretRoomStartX &&
      player.x >= secretRoomStartX + secretRoomWidth - 185 &&
      player.y + player.height > doorY &&
      player.y < doorY + height - 200
  ) {
      showDoorCosmicMessage = true

      if (keyIsDown(70) && !isTransitioningCosmic) { // Πατά το "F"
        isTransitioningCosmic = true;
        gameState =="playing"; 
        
        exitSecretRoom(); // Μετάβαση στο secret δωμάτιο

        
        setupRoom();
        isChasing = false;
        
        // Απελευθέρωση του flag μετά τη μετάβαση
        setTimeout(() => {
          isTransitioningCosmic = false;
      }, 500); // Χρονική καθυστέρηση για να ολοκληρωθεί η μετάβαση
      }
  } else {
      showDoorCosmicMessage = false;
  }
}

function checkDoorInteraction(player,showCosmicDoor1) {
  if (showCosmicDoor1) {
  if (
      player.x + player.width > doorX &&
      player.x < doorX + doorWidth &&
      player.y + player.height > doorY &&
      player.y < doorY + doorHeight
  ) {
      showDoorMessage = true;

      if (keyIsDown(70) && !isTransitioning) { // Πατά το "F"
          isTransitioning = true;

          enterSecretRoom();
          //isTransitioning = false;
      }
  }else{ showDoorMessage = false;} 
}else {
      showDoorMessage = false;
  }
}


function checkSpikeCollision(player) {
  
  for (let spike of Spikes) {
      if (
          player.x-40 + player.width > spike.x &&
          player.x < spike.x + spike.width &&
          player.y + player.height >= spike.y &&
          player.y < spike.y + spike.height
      ) {
        if(player.x<=secretRoomStartX+secretRoomWidth-400){
          console.log("Ο παίκτης έπεσε στο καρφιά!");
        
          soundManager.stop('bats'); 
          soundManager.stop('waters');
          soundManager.stopAllSounds();
          isDying();
        }
      }
  }
  return false;
}

function returnToMainTrack() {
  player.x = 6000; 
  player.y = height - PLATFORM_HEIGHT - player.height; 
  gameState = "playing"; 
  showMessage("You have returned to the main track!");
}

let showInstructions = false;
let menuBoxes = [
  { text: "New game", x: 500, y: 200, width: 200, height: 50 },
  { text: "Controls", x: 500, y: 275, width: 200, height: 50 },
  { text: "Instructions", x: 500, y: 350, width: 200, height: 50 }
];
function displayMenu() {
      // Σχεδίασε την εικόνα λίγο πιο αριστερά, αλλάζοντας την τιμή x
      let xOffset = -40; // Μετατόπιση προς τα αριστερά κατά 100 pixels
      let yOffset = -22;    // Αν δεν θες αλλαγές στον κατακόρυφο άξονα
      
      image(menubackground, xOffset, yOffset, width, height);
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
      fill(200, 100, 100); 
    } else {
      fill(100, 100, 100); 
    }

    rect(box.x, box.y, box.width, box.height, 10); 
    fill(255);
    text(box.text, box.x + box.width / 2, box.y + box.height / 2);
  }
}
function displayLost() {

  background(0);

  // Εμφάνιση μηνύματος θανάτου
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 50);

  // Εμφάνιση προτροπής για επιστροφή στο μενού
  textSize(16);
  fill(255); // Λευκό χρώμα
  text("Press M to return to the menu", width / 2, height / 2);

  // Έλεγχος αν ο χρήστης πατάει το πλήκτρο 'M'
  if (keyIsDown(77)) { 
      currentLevel = 0;
      gameState = "menu"; 
      initializeGame(); 
  }
}



function displayGz() {
  background(30);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text("Gongratulations you have complete all levels", width / 2, height / 2 - 20);
  textSize(20);
  text("Press ENTER to return to Menu", width / 2, height / 2 + 20);
  if (keyIsDown(ENTER)) {
      gameState = "playing";
      initializeGame();
      setupRoom();
  }
}

function  playGameAfterLost() {
      
      gameState = "playing";
      currentLevel = 0;
      initializeGame();
      //setupRoom();
      if (currentLevel > totalLevels) {
        showMessage("Congratulations! You've completed all levels!");
        gameState = "gameover";
    } else {
        setupRoom(); 
        player.x = 730; 
        player.y = height - PLATFORM_HEIGHT - player.height;
    }
  }


function checkExit(isBackExit) {

   // Έλεγχος αν ο παίκτης βρίσκεται στο secret room
   if (gameState === "secretRoom") {
    if ((!isBackExit)){
      setupRoom();
      player.x = 4000; // Επαναφορά παίκτη
      player.y = height - PLATFORM_HEIGHT - player.height;
    }
    // return ; // Δεν ενεργοποιείται η μετάβαση
}

  if ((isBackExit && hasAnomaly) || (!isBackExit && !hasAnomaly)) {
      showMessage("Correct! Moving to the next level.");
      currentLevel++;
      
      
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


function mousePressed() {
  if (gameState === 'playing' || gameState === 'lost'
  || gameState === 'complete' || gameState === 'gameover' 
  ) {
    return;
  }

  if (gameState === "instructions" || gameState === "controls") {
    // Έλεγχος για το κουμπί "Back to Menu"
    if (
        mouseX > width / 2 - 100 + 500 &&
        mouseX < width / 2 + 100 + 500 &&
        mouseY > height - 100  &&
        mouseY < height - 50
    ) {
        console.log("Returning to menu...");
        gameState = "menu"; 
    }
  }
  else if (gameState === 'menu') {
      // Έλεγχος για click στα κουτιά
      for (let box of menuBoxes) {
        if (
          mouseX > box.x &&
          mouseX < box.x + box.width &&
          mouseY > box.y &&
          mouseY < box.y + box.height
        ) {
          if (box.text === "New game") {
            console.log("Game started!"); 
            gameState = "playing"; 
            isResume = false;
            initializeGame();
            allowRainSound = true;
            setupRoom();
            currentLevel = 0;
          } else if (box.text === "Controls") {
            gameState = "controls";
          } 
          else if (box.text === "Instructions") {


            gameState = "instructions"; 
            
        }
        }
      }
    }
  }


 
let scrollOffset = 0; 
let contentHeight = 600; 
let contentHeightControls = 300;

function displayControls() {
  background(30); 

  fill(255); 
  textAlign(CENTER);
  textSize(32);
  text("CONTROLS", width / 2, 50 - scrollOffset); 

  textSize(18);
  textAlign(CENTER);
  const controlsText = `
    Movement:
    - Use ARROW keys to move left,right and jump.

   .
   
   Interactions:
    - Press F for doors. 

    .

    Shortcuts:
    - ALT + M: Exit the game.
    - P: Pause the game.
    - ALT + N: Activate cheat mode.
    `;

  // Εμφάνιση περιεχομένου με μετατόπιση
  text(controlsText, 100, 100 - scrollOffset, width - 200, contentHeightControls);

  // Κουμπί επιστροφής
  fill(200, 50, 50);
  rect(width / 2 - 100 + 500, height - 100, 200, 50, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Back to Menu", width / 2 + 500, height - 75);
}

function displayInstructions() {
    background(30); // Σκούρο φόντο

    fill(255); // Λευκό κείμενο
    textAlign(CENTER);
    textSize(32);
    text("INSTRUCTIONS", width / 2, 50 - scrollOffset);

    textSize(18);
    textAlign(CENTER);
    const story = `
Welcome to the mysterious corridor.
Your goal is to escape by making 9 correct decisions.
Each decision determines whether you can proceed or remain trapped.

How it Works:
- If there is an anomaly, exit through the LEFT door.
- If everything seems normal, proceed through the RIGHT door.

Be observant and careful!

Examples of Anomalies:
- A sofa suddenly changes color.
- Objects move on their own.
- Strange noises echo in the room, noises that weren’t there before.
- A painting looks different than the last time you saw it.

Tips:
- Explore every corner of the room carefully.
- Use your hearing to identify sounds that shouldn’t exist.
- Focus on details: What looks or feels “off” to you?

Remember: You must make 9 correct decisions to escape!
Good luck!
    `;

    // Εμφάνιση περιεχομένου με μετατόπιση
    text(story, 100, 100 - scrollOffset, width - 200, contentHeight);

    // Κουμπί επιστροφής
    fill(200, 50, 50);
    rect(width / 2 - 100 + 500, height - 100, 200, 50, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Back to Menu", width / 2 + 500, height - 75);
}

function mouseWheel(event) {
    // Ενημέρωση κύλισης
    scrollOffset += event.delta; 
    scrollOffset = constrain(scrollOffset, 0, contentHeight - height); 
}




function drawLevel(cameraX) {
  push(); 

  // Θέση και σχεδίαση του level
  let levelOffsetX = cameraX + 1084; 
  let levelOffsetY = 10;        

  fill(0, 0, 0, 150); 
  rect(levelOffsetX - 10, levelOffsetY - 10, 150, 40, 10); 

  // Κείμενο με σκιά
  fill(0, 0, 0, 200); 
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Level: ${currentLevel}`, levelOffsetX + 2, levelOffsetY + 2);

  // Κύριο κείμενο
  fill(255, 255, 255); // Λευκό
  text(`Level: ${currentLevel}`, levelOffsetX, levelOffsetY);

  // Πλαίσιο γύρω από το φόντο
  noFill();
  stroke(255, 255, 255); // Λευκό περίγραμμα
  strokeWeight(2);
  rect(levelOffsetX - 10, levelOffsetY - 10, 150, 40, 10);

  pop(); // Επαναφορά της προηγούμενης κατάστασης σχεδίασης
}
function showMessage(newMessage) {
  message = newMessage;
  messageTime = millis();
}



let paused = false;



function keyPressed() {


    // Navigate up and down using arrow keys
  if (keyCode === ENTER && gameState === "complete") {
    gameState = "menu";
    stopAllSounds();
    console.log(`---- ${gameState}`);  // Correct string interpolation
    currentLevel = 0;
  }
  if ((keyIsDown(ALT) && key === 'n' || key === 'N') && gameState === "playing") {
    noclipMode = !noclipMode; // Εναλλαγή noclip mode
    console.log("Noclip Mode: player speed " + (noclipMode ? "Activated" : "Deactivated"));
  }
    if ((keyIsDown(18) && keyCode === 77) && gameState === "playing") {
    console.log('Alt + M was pressed!');
    stopAllSounds();
    gameState = "menu";
    currentLevel = 0;
  }
  if (key === 'p' || key === 'P' || (keyIsDown(ALT) && keyCode === 80)) { // Παύση με "P"
      if (paused) {
          loop(); // Επανεκκίνηση
          paused = false;
          soundManager.setMasterVolume(0.4);
      } else {
          soundManager.setMasterVolume(0.0);
          noLoop(); // Παύση
          paused = true;
      }
  }
}



