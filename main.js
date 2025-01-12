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

let PLATFORM_HEIGHT = 20;  
let PLATFORM_WIDTH = 25100;  
let CEILING_HEIGHT = 50;  

let showDoorMessage = false;

var gameState = "menu";  
let currentLevel = 0;
let savedLevel = 0;
var isGameOver;


let RIGHT_WALL_X = 9370;  
let END_WALL_X = 21642;
let WALL_WIDTH = 50;    
let MIDDLE_WALL_X= 7240;
let FIRST_WALL = 4920;
let SECOND_WALL = 5760;
let THIRD_WALL = 2540;
let FIFTH_WALL =6480;
let FORTH_WALL = 3960;
let NEW_WALL_X = 11900;  
let NEW_WALL_X2 = 22000;  
let UPPER_WALL = 1;
let UPPER_WALL_SECRET = 18250;
let secretRoomStartX = 12000;  
let secretRoomWidth = 10000;   

let lights = [];  
var lightToggleTime = 0;  


let showCosmicDoor1 = false;
let playerImage;
let backgroundHorrorMusic;
let footstepSound;
let stairStepSound;
let npcFootstepSound;
let tvSound;
let tvSoundActive = false;   
let audioStarted = false;  

let isTransitioning = false;  
let debugMode = false;
let noclipMode = false;  

 
let saved_x;
let saved_y;
let saved_anomaly;
let isResume = false;


 
let isRainPlaying = false;  
let allowRainSound = true;  
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
  tvSound = loadSound('assets/sounds/tv.mp3');  

  soundFormats('mp3', 'ogg','wav');  

  lightImg = loadImage('assets/images/light.png');
  mooonImg= loadImage('assets/images/hotelscary.jpg');
  smileyfaceImg = loadImage('assets/images/SmileyFace.jpg');
  receptionImg = loadImage ( 'assets/images/imagereception.jpg');
  castleImg = loadImage('assets/images/castle.jpg');
  libraryImg = loadImage('assets/images/library.jpg');
  menubackground = loadImage('assets/images/menu-background3.png');
  moon2Img = loadImage('assets/images/moon2.jpg');
  toRoomsImg =loadImage('assets/images/toRooms.jpg');
  paintingImg = loadImage('assets/images/haunting_painting.jpg');  
  graveyardImg = loadImage('assets/images/graveyard_painting.jpg');
  houseImg = loadImage('assets/images/house_painting.jpg'); 
  stairsghostImg = loadImage('assets/images/stairsghost.jpg'); 
  bloodyHandprintImg = loadImage('assets/images/bloodyHandprint.png');  
}

// function setup() {
//   createCanvas(1224, 576);
//   bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight);  

//   player = new Player();
//   initializeLevelTracker();
//   setupRoom();
//   initializeNPCs();  
//   platforms = Platform.createPlatforms();

 
//   textSize(20);
//   fill(255);
//   textAlign(CENTER);
//   text("Click to start audio and music", width / 2, height / 2);
// }



function setup() {

  createCanvas(1224, 576);
  bufferCanvas = createGraphics(settings.canvasWidth, settings.canvasHeight);  
  player = new Player();
  platforms = Platform.createPlatforms();
  document.getElementById('volume-slider').addEventListener('input', (event) => {
    const newVolume = parseFloat(event.target.value);  
    soundManager.setMasterVolume(newVolume);  
});
 
  showCosmicDoor1 = random() < 0.9;
}


function draw() {
 
  if (gameState === "menu") {
      displayMenu();
  } else if (gameState === "complete") {
      displayGz();
  } else if (gameState === "playing") {
      playGame();
  } else if (gameState === "instructions") {
    displayInstructions();  
  } else if (gameState === "controls") {
    displayControls();  
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

   
  fill(0, 0, 255, 180);
  rect(secretRoomStartX-51 , height-50 - PLATFORM_HEIGHT, secretRoomWidth-410, PLATFORM_HEIGHT+50);

   
  fill(135, 206, 250, 100);  
  noStroke();
  beginShape();
  for (let x = secretRoomStartX; x <= secretRoomStartX+51+secretRoomWidth-500; x += 100) {
      let y = height - PLATFORM_HEIGHT-50+ Math.sin((x + frameCount * waveSpeed) * waveFrequency) * waveHeight;
      vertex(x, y);
  }
  vertex(secretRoomStartX + 51 +secretRoomWidth-500, height - PLATFORM_HEIGHT-50);  
  vertex(secretRoomStartX-51, height - PLATFORM_HEIGHT-50);  
  endShape(CLOSE);
}

function checkWaterCollision(player) {
  if (player.x >= secretRoomStartX-50 && player.y + player.height >= height - PLATFORM_HEIGHT) {
    if(player.x<=secretRoomStartX+secretRoomWidth-400){
      console.log("Ο παίκτης έπεσε στο νερό!");
      // isGameOver = true; // Ορισμός της κατάστασης "game over
      soundManager.stop('bats');  
      soundManager.stop('waters');
      soundManager.stopAllSounds();
      allowRainSound = true;  
    
        // isGameOver = true;  
      isDying();
    }
  }
  for (let obj of objects) {
    if (obj.type === 'flood' && obj.active) {
         
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

        
       player.isDying = true;
            
    soundManager.play('death', false, 1.0);

       // Μετατροπή σε κατάσταση "lost" μετά από 3 δευτερόλεπτα
       setTimeout(() => {
           gameState = "lost";  
       }, 800);
}



function initializeGame() {

  soundManager.play('background', false, 0.2);  
  isGameOver = false;
  player.isDying = false;
  if (isResume) {
    player.x = saved_x;
    player.y = saved_y;
  } else {
    player.x = 730;  
    player.y = height - PLATFORM_HEIGHT - player.height;
  }
  player.velocityY = 0;
 
 // gameState = "menu";  
}

function playGame() {

   
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
  drawNoSmokingSign(); // Σχεδίαση σήματος "No Smoking"
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



     
  if (player.x > PLATFORM_WIDTH) {
    checkExit(false);  
  } else if (player.x < 0) {
    checkExit(true);  
  } 


 
  
 if (showDoorMessage) {
   fill(255, 255, 255);
   stroke(0);
   strokeWeight(2);
   textSize(24);
   textAlign(CENTER);
   text("Press F to pass this door", player.x - 500 + width / 2, height - 100);
 }
   
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
  //soundManager.stopAllSounds();  
  stopAllSounds();
  soundManager.stopAllSounds();
  soundManager.play('bats', true, 0.5);  
  soundManager.play('waters', true, 0.8); // Ένταση στο 80%

  

   
  player.x = secretRoomStartX;  
  player.y = 240;
  
   
  setTimeout(() => {
    isTransitioning = false;  
}, 500);  
}

function exitSecretRoom() {
  soundManager.stop('bats');  
  soundManager.stop('waters');
  soundManager.stopAllSounds();

   
  player.x =730;  
  player.y = height - PLATFORM_HEIGHT - player.height;
  currentLevel += 4;

  console.log(`Exited secret room. Current level: ${currentLevel}`);
  allowRainSound = true;  
}


function checkWallCollision() {
   
  if (player.x <= 20) {
      checkExit(true);
  }

   
  if (player.x + player.width >= RIGHT_WALL_X && player.x + player.width <= secretRoomStartX-2000) {
      checkExit(false);
  }
  // Έλεγχος σύγκρουσης με τον νέο τοίχο (από δεξιά)
  if (player.x < NEW_WALL_X + 50 && player.x + player.width / 2 > NEW_WALL_X) {
    player.x = NEW_WALL_X + 50;  
}

 
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
 
if (
  player.x + player.width > UPPER_WALL &&  
  player.x < UPPER_WALL + 30000 &&  
  player.y < height - 575 + 40 &&  
  player.y + player.height > height - 575  
) {
  player.y = height - 575 + 40;  
  player.velocityY = 0;  
}

 
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
        
        exitSecretRoom();  

        
        setupRoom();
        isChasing = false;  
        
         
        setTimeout(() => {
          isTransitioningCosmic = false;  
      }, 500);  
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
          console.log("Ο παίκτης έπεσε στο νερό!");
          // isGameOver = true; // Ορισμός της κατάστασης "game over
          soundManager.stop('bats');  
          soundManager.stop('waters');
          soundManager.stopAllSounds();
          
        
            // isGameOver = true;  
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
  background(menubackground);
  textAlign(CENTER, CENTER);
  textSize(20);

   
  for (let box of menuBoxes) {
     
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

   
  fill(255, 0, 0);  
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 50);

   
  textSize(16);
  fill(255);  
  text("Press M to return to the menu", width / 2, height / 2);

  // Έλεγχος αν ο χρήστης πατάει το πλήκτρο 'M'
  if (keyIsDown(77)) { // 77 είναι ο κωδικός για το πλήκτρο 'M'
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

    
   if (gameState === "secretRoom") {
    if ((!isBackExit)){
      setupRoom();  
      player.x = 4000;  
      player.y = height - PLATFORM_HEIGHT - player.height;
    }
    // return ;  
}

  if ((isBackExit && hasAnomaly) || (!isBackExit && !hasAnomaly)) {
      showMessage("Correct! Moving to the next level.");
      currentLevel++;
      
      
      if (currentLevel > totalLevels) {
          showMessage("Congratulations! You've completed all levels!");
          gameState = "gameover";
      } else {
          setupRoom();  
          player.x = 730;  
          player.y = height - PLATFORM_HEIGHT - player.height;
        
      }
  } else {
      showMessage("Game Over!");
      gameState = "gameover";
  }
  
  
}


// function keyPressed() {
 
//   if (keyCode === ENTER && gameState === "complete") {
//     gameState = "menu";
//     stopAllSounds();
//     console.log(`---- ${gameState}`);   
//     currentLevel = 0;
//   }
//   if ((keyIsDown(ALT) && key === 'n' || key === 'N') && gameState === "playing") {
//     noclipMode = !noclipMode;  
//     console.log("Noclip Mode: player speed " + (noclipMode ? "Activated" : "Deactivated"));
//   }
//   if ((keyIsDown(ALT) && keyCode === 80) && gameState === "playing") { // 83 is the keycode for 'S'
//     console.log("Alt + P pressed");
//     showMessage("Game paused on level ${currentLevel}");
//     stopAllSounds();
//     isResume = true;
//     saved_x = player.x;
//     saved_y = player.y;
//     gameState = "menu";
//     savedLevel = currentLevel;
//   }
  // if ((keyIsDown(18) && keyCode === 77) && gameState === "playing") {
  //   console.log('Alt + M was pressed!');
  //   stopAllSounds();
  //   gameState = "menu";
  //   currentLevel = 0;
  // }
// }



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
            //console.log("Instructions displayed!");

            gameState = "instructions"; // Αλλαγή κατάστασης σε "instructions"
            
        }
        }
      }
    }
  }


 
let scrollOffset = 0;  
let contentHeight = 600;  

function displayControls() {
  background(30);  

  fill(255);  
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

   
  text(story, 100, 100 - scrollOffset, width - 200, contentHeight);

   
  fill(200, 50, 50);
  rect(width / 2 - 100 + 500, height - 100, 200, 50, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Back to Menu", width / 2 + 500, height - 75);
}

function displayInstructions() {
    background(30);  

    fill(255);  
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

     
    text(story, 100, 100 - scrollOffset, width - 200, contentHeight);

     
    fill(200, 50, 50);
    rect(width / 2 - 100 + 500, height - 100, 200, 50, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Back to Menu", width / 2 + 500, height - 75);
}

function mouseWheel(event) {
     
    scrollOffset += event.delta;  
    scrollOffset = constrain(scrollOffset, 0, contentHeight - height);  
}




function drawLevel(cameraX) {
  push();  

   
  let levelOffsetX = cameraX + 1084;  
  let levelOffsetY = 10;           

   
  fill(0, 0, 0, 150);  
  rect(levelOffsetX - 10, levelOffsetY - 10, 150, 40, 10);  

   
  fill(0, 0, 0, 200);  
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Level: ${currentLevel}`, levelOffsetX + 2, levelOffsetY + 2);

   
  fill(255, 255, 255);  
  text(`Level: ${currentLevel}`, levelOffsetX, levelOffsetY);

   
  noFill();
  stroke(255, 255, 255);  
  strokeWeight(2);
  rect(levelOffsetX - 10, levelOffsetY - 10, 150, 40, 10);  

  pop();  
}
function showMessage(newMessage) {
  message = newMessage;
  messageTime = millis();
}



let paused = false;



function keyPressed() {


     
  if (keyCode === ENTER && gameState === "complete") {
    gameState = "menu";
    stopAllSounds();
    console.log(`---- ${gameState}`);   
    currentLevel = 0;
  }
  if ((keyIsDown(ALT) && key === 'n' || key === 'N') && gameState === "playing") {
    noclipMode = !noclipMode;  
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
          loop();  
          paused = false;
          soundManager.setMasterVolume(0.4);
      } else {
          soundManager.setMasterVolume(0.0);
          noLoop();  
          paused = true;
      }
  }
}



