
let isFlooding = false;  
let floodX = 0;  

function setupRoom() {

  // pool 
  const anomalies = ['wideSofa','suitcase','suitcase','roomDoorNumber','roomDoorNumber','roomDoorNumber',"sofa","sofa",'door', "fridge",
     "kitchen", "table","mirror","mirror", "doll", "TV","TV", "Bookshelf","radio", "ghost", "ghost","npc","none","none","none","none" ];
  //const anomalies = ["none"];

  let selectedAnomaly = "";

  if (gameState != 'menu'){  
    selectedAnomaly = random(anomalies);  
    console.log(`Selected anomaly: ${selectedAnomaly}`);


    hasAnomaly = true;  
    objects = [
     
      {x: 6010, y: height - 347, type: 'doll', isAnomaly: false, speed: 2, direction: 1},
      {x: 5510, y: height - 110, type: 'radio', isAnomaly: false },
      {x: 5930, y: height - 55, type: 'suitcase', isAnomaly: false },
      {x: 6055, y: height - 55, type: 'wideSofa', isAnomaly: false },
      {x: 7590,  y: 115, type: 'roomDoorNumber', roomNumber: 117,isAnomaly:false },
      {x: 2870, y: height - 55, type: 'npc', isAnomaly: false },
      {x: 5510, y: height - 110, type: 'radio', isAnomaly: false },
      {x: 4630, y: height - 400, type: 'mirror', isAnomaly: false },
     
      {x: 2685, y: height - 20, type: 'sofa', isAnomaly: false },
      {x: 5340, y: height - 320, type: 'fridge', isAnomaly: false },
      {x: 4980, y: height - 350, type: 'kitchen', isAnomaly: false },
      {x: 5555, y: height - 410, type: 'TV', isAnomaly:false},
      {x: 4470, y: height -140, type: 'Bookshelf', isAnomaly:false},
      {x: 5545, y: height - 365, type: 'table', isAnomaly: false },
      {x: 5530, y: height - 330, type: 'chair', isAnomaly: false },
      {x: 5650, y: height - 330, type: 'chair', isAnomaly: false },
      {x: 2845, y: height - 200, type: 'Painting', isAnomaly: false },
      {x: 2650, y: height - 20, type: 'sofa2', isAnomaly: false },
      {x: 2910, y: height - 20, type: 'fridge2', isAnomaly: false },
      {x: 2650, y: height - 20, type: 'sofa2', isAnomaly: false },
      {x: 400, y: 300, type: 'ghost', isAnomaly: false },
      { x: secretRoomStartX - 100, y: 200, type: 'flood', isAnomaly: false, active: false, width: 0, speed: 10 }
    ];

 

    // Αν επιλεγεί "none", δεν υπάρχει ανωμαλία
    if (selectedAnomaly === "none") {
      console.log("No anomalies in this room.");
      hasAnomaly = false;  
      ghosts = [];  
      return;  
    }

    if (selectedAnomaly === "radio") {
      for (let obj of objects) {
          if (obj.type === "radio") {
              obj.isAnomaly = true;  
              console.log("Radio anomaly activated!");
          }
      }
  }

    if (selectedAnomaly === "character") {
      for (let obj of objects) {
          if (obj.type === "character") {
              obj.speed = 3;  
          }
      }
  }
    if (selectedAnomaly === "ghost") {
        createGhosts(1);  
        console.log("Ghost anomaly activated!");
    } else {
         
        for (let obj of objects) {
            if (obj.type === selectedAnomaly && gameState != 'menu') {
                obj.isAnomaly = true;  
                console.log(`${selectedAnomaly} anomaly activated!`);
            }
        }
        ghosts = [];  
    }
  }
}


function drawObjects() {
  for (let obj of objects) {
    if (obj.type === 'doll') {drawDoll(6025, obj.y, obj.isAnomaly); updateDoll(obj, player);}
  if (obj.type === 'suitcase') {drawSuitcase(obj.x, obj.y, obj.isAnomaly);}
  if (obj.type === 'wideSofa') drawWideSofa(obj.x, obj.y, obj.isAnomaly);
 
    if(obj.type === 'roomDoorNumber') drawRoomDoorNumber(obj.x,obj.y,obj.roomNumber,obj.isAnomaly);
    if (obj.type === 'npc') drawNpc(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'door') drawDoor2(obj.x, obj.y, obj.isMoving);
      if (obj.type === 'mirror') drawMirror(obj.x, obj.y, obj.isAnomaly);
   
      if (obj.type === 'sofa') drawSofa(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'fridge') drawFridge(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'kitchen') drawKitchen(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'cart') drawCart(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'chair') drawChair(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'table') drawDiningTable(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'TV') drawTV(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'Bookshelf') drawBookshelf(obj.x, obj.y, obj.isAnomaly);
      if (obj.type === 'Painting') drawPainting(obj.x, obj.y, obj.isAnomaly);
      if(obj.type === 'ghost') drawGhosts();

      if (obj.type === 'radio') drawRadio(obj.x, obj.y, obj.isAnomaly ? 'anomaly' : 'normal');

       

         if (obj.type === 'flood') {drawFlood(obj.x, obj.y, obj.active, obj, obj.isAnomaly);}
  }
  
}



function createGhosts(count) {
  for (let i = 0; i < count; i++) {
      ghosts.push({
          x: 3460,
          y: random(100, height - 1350),
          size: 50,
          speed: random(1, 3),
          direction: 1
      });
  }
}

function drawGhosts() {
if (ghosts.length === 0) return;  

for (let ghost of ghosts) {
     
    fill(255, 255, 255, 180); // Semi-transparent
    noStroke();
    beginShape();  
    vertex(ghost.x - ghost.size / 2, ghost.y);
    bezierVertex(
        ghost.x - ghost.size / 2,
        ghost.y - ghost.size,
        ghost.x + ghost.size / 2,
        ghost.y - ghost.size,
        ghost.x + ghost.size / 2,
        ghost.y
    );
    vertex(ghost.x + ghost.size / 2, ghost.y + ghost.size / 2);
    vertex(ghost.x + ghost.size / 3, ghost.y + ghost.size);
    vertex(ghost.x, ghost.y + ghost.size / 2);
    vertex(ghost.x - ghost.size / 3, ghost.y + ghost.size);
    vertex(ghost.x - ghost.size / 2, ghost.y + ghost.size / 2);
    endShape(CLOSE);

     
    fill(0);
    ellipse(ghost.x - ghost.size / 4, ghost.y - ghost.size / 4, ghost.size / 8, ghost.size / 8);
    ellipse(ghost.x + ghost.size / 4, ghost.y - ghost.size / 4, ghost.size / 8, ghost.size / 8);

     
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(ghost.x, ghost.y, ghost.size / 3, ghost.size / 6, 0, PI);

     
    if (player.x > 3400  && player.x < 10000) { // Start chasing if player is past x=100
        let dx = player.x - ghost.x;
        let dy = player.y - ghost.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
         
        ghost.x += (dx / distance) * ghost.speed;
        ghost.y += (dy / distance) * ghost.speed;

         
        if (
            Math.abs(player.x - ghost.x) < ghost.size / 2 &&
            Math.abs(player.y - ghost.y) < ghost.size / 2
        ) {
            playGameAfterLost();
        }
    }
}
}


function drawFlood(x, y, isActive, floodObj, isAnomaly) {
  if (!isActive) return; // Αν δεν είναι ενεργή, σταμάτα την πλημμύρα
  if (!isAnomaly) return;
  let waveHeight = 10;
  let waveFrequency = 0.02;

   
  let waveSpeed = floodObj.speed * 2;  

  fill(0, 0, 255, 180);  
  noStroke();
  beginShape();
  for (let posX = x; posX >= x - floodObj.width; posX--) {
      let waveY = y + sin((posX + frameCount * waveSpeed) * waveFrequency) * waveHeight;
      vertex(posX, waveY);
  }
  vertex(x - floodObj.width, height);
  vertex(x, height);
  endShape(CLOSE);

  // Αύξησε το πλάτος της πλημμύρας μόνο αν το speed > 0
  floodObj.width += floodObj.speed; 
  if (x - floodObj.width <= 0) {
      floodObj.width = x;  
  }
}


function checkFloodTrigger(player) {
for (let obj of objects) {
    if (obj.type === 'flood' && player.x >= 1000 && !obj.active && obj.isAnomaly) {
        obj.active = true;
        console.log("Flood triggered!");
        soundManager.play('waters', true, 0.5);  
    }
}
}


  function drawLights() {
    for (let light of lights) {
        if (millis() - lightToggleTime > 500) light.isOn = !light.isOn;
        fill(light.isOn ? 255 : 50);
        rect(light.x, light.y, light.length, 5);
    }
    if (millis() - lightToggleTime > 500) lightToggleTime = millis();
  }


  
function drawSuitcase(x, y, isAnomaly) {
    const scale = 0.5;

     
    fill(isAnomaly ? 101 : 139, isAnomaly ? 67 : 69, isAnomaly ? 33 : 19); // Σκούρο καφέ αν είναι ανωμαλία, καφέ κανονικά
    rect(x, y, 100 * scale, 70 * scale, 5);  

     
    fill(100);
    rect(x + 30 * scale, y - 10 * scale, 40 * scale, 10 * scale, 5);

     
    stroke(80);
    strokeWeight(2);
    line(x + 10 * scale, y + 20 * scale, x + 90 * scale, y + 20 * scale);
    line(x + 10 * scale, y + 50 * scale, x + 90 * scale, y + 50 * scale);
    noStroke();
}
 
function drawWideSofa(x, y, isAnomaly) {
  const scale = 0.5;  

   
  fill(139, 69, 19);  
  rect(x, y, 300 * scale, 100 * scale);  

   
  fill(160, 82, 45);  
  rect(x, y - 70 * scale, 300 * scale, 70 * scale);  

   
  fill(210, 180, 140);  
  rect(x + 20 * scale, y - 60 * scale, 120 * scale, 60 * scale);  
  rect(x + 160 * scale, y - 60 * scale, 120 * scale, 60 * scale);  

   
  fill(139, 69, 19);  
  rect(x - 20 * scale, y, 40 * scale, 100 * scale);  
  rect(x + 280 * scale, y, 40 * scale, 100 * scale);  

   
  stroke(100, 50, 30);
  strokeWeight(2);
  line(x + 20 * scale, y - 30 * scale, x + 140 * scale, y - 30 * scale);  
  line(x + 160 * scale, y - 30 * scale, x + 280 * scale, y - 30 * scale);  
  noStroke();

   
  fill(101, 67, 33);  
  rect(x + 20 * scale, y + 100 * scale, 20 * scale, 20 * scale);  
  rect(x + 260 * scale, y + 100 * scale, 20 * scale, 20 * scale);  

   
  if (isAnomaly) {
      fill(101, 67, 33, 150);  
      rect(x, y, 300 * scale, 100 * scale);  
      triangle(x + 50 * scale, y + 30 * scale, x + 150 * scale, y - 20 * scale, x + 250 * scale, y + 30 * scale);  
  }
}


function drawRoomDoorNumber(x,y,roomNumber,isAnomaly){


  const doorWidth = 80;        
  const doorHeight = 140;     // Αυξημένο ύψος πόρτας (π.χ., 160 αντί για 120)
  const doorHandleY = y + doorHeight / 2; // Νέα θέση του πομολού, στο μέσο του ύψους
  noStroke();

   
  fill(100, 50, 30);  
  rect(x, y, doorWidth, doorHeight);

   
  fill(60, 30, 15);  
  rect(x, y, 10, doorHeight);  
  rect(x + doorWidth - 10, y, 10, doorHeight);  

   
  stroke(80);
  strokeWeight(1);
  line(x + 10, y + 0.3 * doorHeight, x + 30, y + 0.5 * doorHeight);  
  line(x + 50, y + 0.2 * doorHeight, x + 60, y + 0.4 * doorHeight);  

   
  noStroke();
  fill(150, 0, 0, 200);  
  ellipse(x + 20, y + doorHeight - 40, 10, 20);  
  ellipse(x + 25, y + doorHeight - 30, 8, 18);  

  // Χερούλι πόρτας (παλιό και σπασμένο)
  fill(150, 150, 100);  
  ellipse(x + doorWidth - 15, doorHandleY, 8, 8);  

   
  fill(0);  
  rect(x + 30, y + doorHeight - 50, 20, 5);  
  fill(255, 0, 0);  
  ellipse(x + 35, y + doorHeight - 48, 3, 3);  
  ellipse(x + 45, y + doorHeight - 48, 3, 3);  

  if(!isAnomaly){
   
  fill(200, 0, 0);  
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Room ${roomNumber}`, x + doorWidth / 2, y + 20);
  }else if(isAnomaly){
      
  fill(200, 0, 0);  
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Room ${roomNumber+1}`, x + doorWidth / 2, y + 20);
  }
}


function drawFloodingWater(startX, startY, isAnomaly) {
  let waveHeight = 10;  
  let waveSpeed = 2; // Speed of the waves' motion
  let waveFrequency = 0.02;  
  let floodWidth = isAnomaly ? frameCount * 2 : 0;  
  
   
  fill(0, 0, 255, 180);  
  noStroke();
  beginShape();
  for (let x = startX; x >= startX - floodWidth; x--) {
      let y = startY + sin((x + frameCount * waveSpeed) * waveFrequency) * waveHeight;
      vertex(x, y);
  }
  vertex(startX - floodWidth, height);  
  vertex(startX, height); // Bottom-right corner
  endShape(CLOSE);
  
   
  if (startX - floodWidth <= 0) {
      floodWidth = startX; 
  }
}

function drawNpc(x, y, isAnomaly) {
  if(isAnomaly){
    return ;
  }

  const scale = 1.0;  
  noStroke();

   
  fill(200, 100, 100);  
  ellipse(x, y - 50 * scale, 22 * scale, 22 * scale);  

   
  fill(100, 0, 0);  
  arc(x, y - 55 * scale, 26 * scale, 15 * scale, PI, TWO_PI);  
  fill(80, 0, 0);  
  arc(x, y - 55 * scale, 26 * scale, 10 * scale, PI, TWO_PI);  

   
  fill(255);  
  ellipse(x - 5 * scale, y - 52 * scale, 5 * scale, 3 * scale);  
  ellipse(x + 5 * scale, y - 52 * scale, 5 * scale, 3 * scale);  

  fill(0);  
  ellipse(x - 5 * scale, y - 52 * scale, 2 * scale, 2 * scale);  
  ellipse(x + 5 * scale, y - 52 * scale, 2 * scale, 2 * scale);  

   
  fill(255, 100, 100);  
  arc(x, y - 46 * scale, 10 * scale, 4 * scale, 0, PI);  

   
  fill(150, 30, 30);  
  rect(x - 10 * scale, y - 42 * scale, 20 * scale, 40 * scale);  
  rect(x - 8 * scale, y - 40 * scale, 16 * scale, 36 * scale);  

   
  fill(150, 30, 30);  
  rect(x - 15 * scale, y - 42 * scale, 5 * scale, 20 * scale);  
  rect(x + 10 * scale, y - 42 * scale, 5 * scale, 20 * scale);  

 
//   fill(100, 20, 20);  
//   rect(x - 8 * scale, y - 5 * scale, 6 * scale, 15 * scale);  
//   rect(x + 2 * scale, y - 5 * scale, 6 * scale, 15 * scale);  
//   fill(50);  
//   rect(x - 8 * scale, y + 10 * scale, 6 * scale, 5 * scale);  
//   rect(x + 2 * scale, y + 10 * scale, 6 * scale, 5 * scale);  
// }
 
fill(245, 222, 179);  
rect(2810, 510, 300 * 0.5, 100 * 0.5);  

 
fill(139, 69, 19);
rect(2810, 510 - 20 * 0.5, 300 * 0.5, 20 * 0.5);
}
  function drawRadio(x, y, isAnomaly) {
    const scale = 0.3;  
    if (!isAnomaly) {
     
         
        fill(50, 20, 20);  
         
      //fill(139, 69, 19);  
      rect(x, y, 150 * scale, 100 * scale, 10);  
  
       
      stroke(255, 215, 0);  
      strokeWeight(2);
      line(x + 5 * scale, y + 10 * scale, x + 145 * scale, y + 10 * scale);  
      line(x + 5 * scale, y + 90 * scale, x + 145 * scale, y + 90 * scale);  
      noStroke();
  
       
      fill(50);
      rect(x + 20 * scale, y + 20 * scale, 110 * scale, 30 * scale);  
  
       
      fill(200, 200, 200);  
      ellipse(x + 30 * scale, y + 75 * scale, 20 * scale, 20 * scale);  
      ellipse(x + 120 * scale, y + 75 * scale, 20 * scale, 20 * scale);  
  
       
      fill(255, 165, 0);  
      rect(x + 50 * scale, y + 60 * scale, 50 * scale, 15 * scale, 2);  
  
       
      fill(0);  
      textSize(10 * scale);
      textAlign(CENTER, CENTER);
      text("88.5 FM", x + 75 * scale, y + 67.5 * scale);
  
      // Διακοσμητικά κουμπιά/πλήκτρα
      fill(150);
      for (let i = 0; i < 5; i++) {
          rect(x + 50 * scale + i * 10 * scale, y + 80 * scale, 8 * scale, 5 * scale);
      }
  
       
      stroke(200);
      strokeWeight(2);
      line(x + 10 * scale, y, x - 20 * scale, y - 30 * scale);  
      noStroke();
    } else {
         
        fill(50, 20, 20);  
         
      //fill(139, 69, 19);  
      rect(x, y, 150 * scale, 100 * scale, 10);  
  
       
      stroke(255, 215, 0);  
      strokeWeight(2);
      line(x + 5 * scale, y + 10 * scale, x + 145 * scale, y + 10 * scale);  
      line(x + 5 * scale, y + 90 * scale, x + 145 * scale, y + 90 * scale);  
      noStroke();
  
       
      fill(50);
      rect(x + 20 * scale, y + 20 * scale, 110 * scale, 30 * scale);  
  
       
      stroke(200);
      strokeWeight(2);
      line(x + 10 * scale, y, x - 20 * scale, y - 30 * scale);  
      noStroke();
}

  }



  function drawMirror(x, y, isAnomaly) {
    const width = 90;   
    const height = 140;  

     
    fill(100, 50, 20);  
    rect(x - width / 2, y - height / 2, width, height);

     
    fill(50, 70, 100, 200); // Σκούρο μπλε-γκρι για το γυαλί
    rect(x - width / 2 + 5, y - height / 2 + 5, width - 10, height - 10);

    if (isAnomaly) {

         
        drawScaryReflection(x, y, width, height);

    }
}



// Στοιχείο: Τρομακτική αντανάκλαση
function drawScaryReflection(x, y, width, height) {
    const offsetX = sin(frameCount * 0.1) * 5;  
    const offsetY = cos(frameCount * 0.1) * 2; // Κίνηση πάνω-κάτω

    fill(0);  
    ellipse(x + offsetX, y - height / 4 + offsetY, 30, 40);  

    fill(255, 0, 0);  
    ellipse(x + offsetX - 5, y - height / 4 - 5 + offsetY, 8, 8);  
    ellipse(x + offsetX + 5, y - height / 4 - 5 + offsetY, 8, 8);  

    noFill();
    stroke(255, 0, 0, 150);
    arc(x + offsetX, y - height / 4 + 10 + offsetY, 20, 10, 0, PI);  
    noStroke();
}



function drawDoll(x, y, isAnomaly) {
  const scale = 0.6;

   
  fill(250, 220, 200);  
  ellipse(x, y - 50 * scale, 40 * scale, 50 * scale);

  fill(150, 50, 50);  
  rect(x - 20 * scale, y - 30 * scale, 40 * scale, 60 * scale);

  fill(250, 220, 200);  
  ellipse(x - 25 * scale, y - 20 * scale, 15 * scale, 15 * scale);
  ellipse(x + 25 * scale, y - 20 * scale, 15 * scale, 15 * scale);

  fill(150, 50, 50);  
  rect(x - 15 * scale, y + 30 * scale, 10 * scale, 20 * scale);
  rect(x + 5 * scale, y + 30 * scale, 10 * scale, 20 * scale);

   
  drawDollFace(x, y - 50 * scale, scale, isAnomaly);
}

function drawDollFace(x, y, scale, isAnomaly) {
  if (!isAnomaly) {
      fill(0);
      ellipse(x - 10 * scale, y - 5 * scale, 5 * scale, 5 * scale);  
      ellipse(x + 10 * scale, y - 5 * scale, 5 * scale, 5 * scale);
      noFill();
      stroke(0);
      arc(x, y + 10 * scale, 10 * scale, 5 * scale, 0, PI);
      noStroke();
  } else {
      fill(255, 0, 0);  
      ellipse(x - 10 * scale, y - 5 * scale, 8 * scale, 8 * scale);
      ellipse(x + 10 * scale, y - 5 * scale, 8 * scale, 8 * scale);

      fill(0);
      beginShape();
      vertex(x - 15 * scale, y + 10 * scale);
      bezierVertex(x - 10 * scale, y + 20 * scale, x + 10 * scale, y + 20 * scale, x + 15 * scale, y + 10 * scale);
      vertex(x + 10 * scale, y + 15 * scale);
      vertex(x - 10 * scale, y + 15 * scale);
      endShape(CLOSE);
  }
}

function updateDoll(obj, player) {
  if (obj.isAnomaly) {
       
      let dx = player.x - obj.x - 5300;
      let dy = player.y - obj.y ;
      let distance = Math.sqrt(dx * dx + dy * dy);

       
      if (distance > 10) {  
          obj.x += (dx / distance) * obj.speed;
          obj.y += (dy / distance) * obj.speed;
      }

       
      obj.x = constrain(obj.x, 50, width - 50);
      obj.y = constrain(obj.y, 50, height - 50);
  }
}



  function drawDoor2(x, y, isMoving) {
    fill(139, 69, 19);  
    if (isMoving) x += sin(frameCount * 0.05) * 5; // Κίνηση αριστερά-δεξιά
    rect(x, y - 100, 50, 100);  
    fill(255);
    ellipse(x + 40, y - 50, 10);  
}


function drawTV(x, y, isAnomaly) {
  let scale = 0.5;

   
  fill(50);
  rect(x, y, 140 * scale, 80 * scale, 5 * scale);

  if (isAnomaly) {
     
    fill(200);
    for (let i = 0; i < 100; i++) {
      let px = random(x + 10 * scale, x + 130 * scale);
      let py = random(y + 10 * scale, y + 70 * scale);
      rect(px, py, 2, 2);
    }

     
    let distance = dist(player.x, player.y, x + 70 * scale, y + 40 * scale);  

    if (distance < 300) {  
       
      let volume = map(distance, 0, 300, 0.3, 0); // Μέγιστη ένταση 0.5
      volume = constrain(volume, 0, 0.3); // Περιορισμός στο εύρος [0, 0.5]

       
      tvSound.setVolume(volume);

       
      if (!tvSound.isPlaying()) {
        tvSound.loop();
      }
    } else {
       
      tvSound.stop();
    }
  } else {
    // Κανονική τηλεόραση (χωρίς ανωμαλία)
    fill(20, 20, 60);
    rect(x + 10 * scale, y + 10 * scale, 120 * scale, 60 * scale, 3 * scale);

    fill(255, 255, 255, 80);
    quad(
      x + 15 * scale, y + 15 * scale,
      x + 45 * scale, y + 15 * scale,
      x + 35 * scale, y + 30 * scale,
      x + 15 * scale, y + 30 * scale
    );

     
    tvSound.stop();
  }

   
  fill(70);
  rect(x + 60 * scale, y + 80 * scale, 20 * scale, 10 * scale);
}
function drawPainting(x, y, isAnomaly) {
  let scale = 0.6;

   
  fill(139, 69, 19);  
  rect(x, y, 120 * scale, 80 * scale);  

   
  if (!isAnomaly) {
    fill(200, 200, 150);  
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 70 * scale);

    // Κανονικό έργο τέχνης (τοπίο)
    fill(50, 150, 255);  
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 35 * scale);
    fill(0, 200, 100);  
    rect(x + 5 * scale, y + 40 * scale, 110 * scale, 35 * scale);

    fill(255, 200, 0);  
    ellipse(x + 100 * scale, y + 15 * scale, 15 * scale, 15 * scale);
  } 
   
  else {
    fill(50, 50, 50);  
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 70 * scale);

    // Αλλοιωμένο έργο τέχνης (μάτια και τρομακτικά στοιχεία)
    fill(255, 0, 0);  
    ellipse(x + 40 * scale, y + 30 * scale, 10 * scale, 10 * scale);
    ellipse(x + 80 * scale, y + 30 * scale, 10 * scale, 10 * scale);

    fill(0);
    arc(x + 60 * scale, y + 60 * scale, 30 * scale, 15 * scale, 0, PI);  
  }
}



function drawBookshelf(x, y, isAnomaly) {
  let scale = 0.6; // Μείωση μεγέθους κατά 40%

   
  fill(120, 70, 50);  
  rect(x, y, 120 * scale, 200 * scale);

   
  fill(100, 50, 30);  
  rect(x, y + 50 * scale, 120 * scale, 5 * scale);
  rect(x, y + 100 * scale, 120 * scale, 5 * scale);
  rect(x, y + 150 * scale, 120 * scale, 5 * scale);
  

   
  fill(200, 50, 50);  
  rect(x + 10 * scale, y + 10 * scale, 15 * scale, 40 * scale);
  fill(50, 100, 200);  
  rect(x + 30 * scale, y + 10 * scale, 15 * scale, 40 * scale);
  fill(50, 200, 100);  
  rect(x + 50 * scale, y + 10 * scale, 15 * scale, 40 * scale);

   
  fill(255, 200, 0);
  rect(x + 10 * scale, y + 60 * scale, 15 * scale, 40 * scale);
  fill(150, 0, 150);
  rect(x + 30 * scale, y + 60 * scale, 15 * scale, 40 * scale);
  fill(100, 100, 100);
  rect(x + 50 * scale, y + 60 * scale, 15 * scale, 40 * scale);


    // Ανωμαλία: Προσθήκη επιπλέον σειράς βιβλίων στα ράφια
    if (isAnomaly) {
      fill(250, 100, 50); rect(x + 10 * scale, y + 110 * scale, 15 * scale, 40 * scale);  
      fill(0, 150, 200); rect(x + 30 * scale, y + 110 * scale, 15 * scale, 40 * scale);  
      fill(180, 80, 40); rect(x + 50 * scale, y + 110 * scale, 15 * scale, 40 * scale);  
  
       
      fill(255, 150, 50); rect(x + 10 * scale, y + 160 * scale, 15 * scale, 40 * scale);  
      fill(100, 200, 100); rect(x + 30 * scale, y + 160 * scale, 15 * scale, 40 * scale);  
      fill(50, 50, 200); rect(x + 50 * scale, y + 160 * scale, 15 * scale, 40 * scale);  
    }


}




  function drawSofa(x, y, isAnomaly) {
    if (isAnomaly) {
     
        fill(255, 0, 0);  
        rect(x - 30, y - 25, 120, 80);  
        rect(x - 25, y - 30, 110, 70);  
    } else {
        fill(139, 69, 19);  
        rect(x - 30, y - 25, 120, 80);  
        fill(165, 42, 42);  
        rect(x - 25, y - 30, 110, 70);  
    }
  }
  
  function drawFridge(x, y, isAnomaly) {
    let fridgeWidth = 60;   
    let fridgeHeight = 120;  
    let freezerHeight = 40;  
    let doorHeight = fridgeHeight - freezerHeight;  
    let handleWidth = 4;  
    let handleHeightFreezer = 20;  
    let handleHeightDoor = 40;  

    if (isAnomaly) {
         
        fill(0, 255, 255);  
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, fridgeHeight);  
        fill(255, 0, 0);  
        rect(x + fridgeWidth / 2 - handleWidth - 5, y - fridgeHeight + 10, handleWidth + 2, handleHeightDoor + 10);  
    } else {
         
        fill(192, 192, 192);  
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, fridgeHeight);

         
        fill(220, 220, 220);  
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, freezerHeight);

         
        fill(200, 200, 200);  
        rect(x - fridgeWidth / 2, y - fridgeHeight + freezerHeight, fridgeWidth, doorHeight);

         
        fill(0);  
        rect(x + fridgeWidth / 2 - handleWidth - 2, y - fridgeHeight + 10, handleWidth, handleHeightFreezer);

         
        rect(x + fridgeWidth / 2 - handleWidth - 2, y - fridgeHeight + freezerHeight + 10, handleWidth, handleHeightDoor);
    }

     
    stroke(50);  
    line(x - fridgeWidth / 2, y - fridgeHeight + freezerHeight, x + fridgeWidth / 2, y - fridgeHeight + freezerHeight);
    noStroke();
}


  
function drawKitchen(x, y, isAnomaly) {
  let scale = 0.7;  

  if (isAnomaly) {
    // Ανωμαλία: Ο νεροχύτης γεμίζει νερό και ξεχειλίζει
    fill(0, 100, 255);  
    rect(x + 90 * scale, y + 20 * scale, 80 * scale, 40 * scale);
  }

   
  fill(120, 100, 80);  
  rect(x, y, 300 * scale, 40 * scale);

   
  fill(160);  
  rect(x, y - 100 * scale, 70 * scale, 60 * scale);
  rect(x + 80 * scale, y - 100 * scale, 70 * scale, 60 * scale);
  rect(x + 160 * scale, y - 100 * scale, 70 * scale, 60 * scale);

  if (!isAnomaly) {
    fill(100, 100, 255);
    rect(x + 100 * scale, y, 60 * scale, 20 * scale);  
  }
  

   
  stroke(80);
  strokeWeight(2);
  noFill();
  arc(x + 130 * scale, y - 10 * scale, 20 * scale, 20 * scale, PI, TWO_PI);
  noStroke();

   
  // fill(80);  
  // rect(x + 220 * scale, y - 40 * scale, 50 * scale, 80 * scale);
  // fill(40);
  // rect(x + 230 * scale, y - 30 * scale, 30 * scale, 40 * scale);

   
  fill(50);
  ellipse(x + 60 * scale, y - 70 * scale, 5 * scale, 5 * scale);
  ellipse(x + 140 * scale, y - 70 * scale, 5 * scale, 5 * scale);
  ellipse(x + 220 * scale, y - 70 * scale, 5 * scale, 5 * scale);
}

function drawDiningTable(x, y) {
  let scale = 0.6;  

   
  fill(120, 70, 50);  
  rect(x, y, 150 * scale, 80 * scale);

   
  fill(90, 50, 30);
  rect(x + 10 * scale, y + 70 * scale, 10 * scale, 30 * scale);
  rect(x + 130 * scale, y + 70 * scale, 10 * scale, 30 * scale);

   
  // fill(150, 80, 60);  
  // rect(x - 30 * scale, y + 20 * scale, 20 * scale, 50 * scale);  
  // rect(x + 160 * scale, y + 20 * scale, 20 * scale, 50 * scale);  
}
  
  function drawCart(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(255, 0, 255);  
        rect(x - 15, y - 15, 30, 25);  
        fill(0, 255, 0);  
        ellipse(x - 10, y + 10, 15, 15);  
        ellipse(x + 10, y + 10, 15, 15);  
    } else {
        fill(102, 51, 0);  
        rect(x - 15, y - 10, 30, 15);  
        fill(0);  
        ellipse(x - 10, y + 5, 10, 10);  
        ellipse(x + 10, y + 5, 10, 10);  
    }
  }
  

  
  function drawChair(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(0, 128, 128);  
        rect(x - 15, y - 15, 30, 15);  
        fill(139, 69, 19);  
        rect(x - 14, y, 5, 20);  
        rect(x + 9, y, 5, 20);
        rect(x - 14, y - 30, 5, 10);  
        rect(x + 9, y - 30, 5, 10);
        fill(139, 69, 19);  
        rect(x - 15, y - 40, 30, 5);  
    } else {
        fill(205, 133, 63);  
        rect(x - 10, y - 10, 20, 10);  
        fill(139, 69, 19);  
        rect(x - 9, y, 4, 10);  
        rect(x + 5, y, 4, 10);  
        rect(x - 9, y - 20, 4, 10);  
        rect(x + 5, y - 20, 4, 10);  
        rect(x - 10, y - 30, 20, 5);  
    }
  }