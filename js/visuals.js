// visuals.js


let windowPositions = [
  
  { x: 140, y: 350 },  
  
  { x: 2780, y: 97 }, 
  { x: 3263, y: 90 },  
  { x: 3739, y: 90 }, 
  { x: 3739, y: 350 }, 
  { x: 9500, y: 350}, 
  { x: 5300, y: 350 }, 
  { x: 5900, y: 350 }, 
  { x: 6260, y: 350 }, 
];


let doors = [

  { type: 'roomDoor', x: 8310, y: 417, roomNumber: 108 },
  { type: 'roomDoor', x: 8550, y: 417, roomNumber: 109 },
  { type: 'roomDoor', x: 8790, y: 417, roomNumber: 120 },

  { type: 'roomDoor', x: 6630, y: 417, roomNumber: 100 },
  { type: 'roomDoor', x: 6870, y: 417, roomNumber: 101 },
  { type: 'roomDoor', x:  7110, y: 417, roomNumber: 102 },
  { type: 'roomDoor', x:  7350, y: 417, roomNumber: 103 },
  { type: 'roomDoor', x:  7590, y: 417, roomNumber: 104 },
  { type: 'roomDoor', x:  7830, y: 417, roomNumber: 105 },
  { type: 'roomDoor', x:  8070, y: 417, roomNumber: 106 },
  { type: 'roomDoor', x: 8310, y: 417, roomNumber: 107 },
  { type: 'roomDoor', x: 8550, y: 417, roomNumber: 108 },
  { type: 'roomDoor', x: 8790, y: 417, roomNumber: 109 },
  
 

  { type: 'roomDoor', x: 2670, y: 115, roomNumber: 110 },
  { type: 'roomDoor', x: 3030, y: 115, roomNumber: 111 },
  { type: 'roomDoor', x: 3510, y: 115, roomNumber: 112 },
  



  
  { type: 'roomDoor', x: 6630, y: 115, roomNumber: 113 },
  { type: 'roomDoor', x: 6870, y: 115, roomNumber: 114 },
  { type: 'roomDoor', x: 7110, y: 115, roomNumber: 115 },
  { type: 'roomDoor', x: 7350, y: 115, roomNumber: 116 },
  { type: 'roomDoor', x: 7830, y: 115, roomNumber: 118 },
  { type: 'roomDoor', x: 8070, y: 115, roomNumber: 119 },
  { type: 'roomDoor', x: 8310, y: 115, roomNumber: 120 },
  { type: 'roomDoor', x: 8550, y: 115, roomNumber: 121 },
  { type: 'roomDoor', x: 8790, y: 115, roomNumber: 122 },
  
];


let Bookshelfs= [
  {  x: 4230, y: 437},
  {  x: 4350, y: 437}, 
  {  x: 4590, y: 437},

]


let stairs = [
  { x: 1990, y: 540, steps: 7, stepWidth: 30, stepHeight: 21 },
  { x: 2289, y: 395, steps: 7, stepWidth: 30, stepHeight: 23 }


  
];
let ReceptionDesk = [
  { x: 2810, y: 510 } 
];

let inclinedEscalators = [
  { x: 1980, y: 540, width: 220, height: 140, speedX: 0, speedY: -0.5 },  
  { x: 2285, y:415, width: 220, height: 175, speedX: 0, speedY: -1 },   
];




let lightsPosition = [ 
  {type : 'light', x: 4225 , y: 300},
  {type : 'light', x: 4463 , y: 300},
  {type : 'light', x: 6690 , y: 300},
  {type : 'light', x: 7400 , y: 300},
  {type : 'light', x: 8130 , y: 300},
  {type : 'light', x: 8840 , y: 300},
  {type : 'light', x: 5425 , y: 300},
];

let scaryObjects = [
  //{ type: 'normal_doll', x:5880, y: 227},
  
  { type: 'door', x: 400, y: 100 },

 
  
 

  
  { type: 'clockss', x: 5762, y: 650 ,hour:12,minute:0},
  { type: 'bed', x: 4180, y: 230 },
  
  {type: 'normalsuitcase', x: 3010, y: 522 },
  {type: 'normalsuitcase', x: 3080, y: 522 },
  { type: 'normal_mirror', x:5950, y: 150},
  {type: 'normalsuitcase', x: 3150, y: 522 },
  {type: 'normalsuitcase', x: 3220, y: 522 },

  {type: 'to_Rooms', x: 3870, y: 135, width: 25, height: 45 },
  { type: 'candle', x: 5950, y: 255 },
  { type: 'candle', x: 5915, y: 255 },
  { type: 'candle', x: 5985, y: 255 },
  {type: 'moon_painting', x: 6250, y: 95, width: 25, height: 45 },
  {type: "reception_banner",x: 2665, y: 390, widh:300, height: 200},
  { type: 'normal_doll', x:5880, y: 227},
  {type: 'paintingreception',x: 3055, y: 380, widh:500, height: 200},
  {type: 'castle_image',x: 5030, y: 380, widh:500, height: 200},
  {type: 'library_image',x: 3870, y: 420, widh:500, height: 200},
  {type: 'g_painting', x: 4235, y: 95, width: 25, height: 45 },
  {type: 'house_painting', x: 7230, y: 415, width: 150, height: 200 },
  {type: 'stairsghost', x: 6054, y: 360, width: 150, height: 100 },
  { type: 'candle', x: 4570, y: 235 },
  { type: 'candle', x: 4690, y: 235 },
  {type: 'painting', x: 7960, y: 415, width: 150, height: 200 },
  {type: 'desk', x: 5470, y: 500 },

  {type: 'ElegantChair', x: 4110, y:520},
  {type: 'ElegantChair', x: 5200, y:520},
  
  
];


let walllights= [
  {x:70 ,y:100},
  {x:310 ,y:100},
  {x:550 ,y:100},
  {x:790 ,y:100},
  {x:1030 ,y:100},
  {x:1270 ,y:100},
  {x:1510 ,y:100},
  {x:1750 ,y:100},
  {x:1990 ,y:100},
  {x:2230 ,y:100},
  {x:2470 ,y:100},

]

let Spikes = [
  { x: 15750, y: 256, width: 200, height: 20 },
  { x: 15245, y: 256, width: 200, height: 20 }
];


let sofaPositions = [
  {x:9580, y:555}
];


let fireplaces = [
  { x: 4400, y: 181 },
  { x: 6130, y: 181 },
];


function drawScaryObjects() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes()

  
    for (let obj of scaryObjects) {

      if(obj.type == 'normalsuitcase'){
        drawNormalSuitcase(obj.x,obj.y);
        }
      

      if( obj.type === 'to_Rooms' ) {
        drawToRooms(obj.x,obj.y);
      }

      
      if(obj.type == 'stairsghost'){
        drawStairsGhost(obj.x,obj.y);
        }
      
        
      if( obj.type === 'moon_painting' ) {
        drawMoonPainting(obj.x,obj.y);
      }
       if(obj.type ==="reception_banner"){
        drawReceptionBanner(obj.x,obj.y)
    }
       if (obj.type==='library_image'){
        drawLibraryImage(obj.x,obj.y);
       }

      if (obj.type=== 'castle_image'){
        drawCasteImage(obj.x,obj.y);

      }

      if (obj.type=== 'paintingreception'){

        drawPaintingReception(obj.x,obj.y);

      }
      if (obj.type === 'normal_doll') {
        drawNormalDoll(obj.x, obj.y);
      }

      if (obj.type === 'normal_mirror') {
        drawNormalMirror(obj.x, obj.y);
      }

      if (obj.type === 'painting') {
        drawPaintingimage(obj.x, obj.y, obj.width, obj.height);
      }
      if (obj.type === 'g_painting') {
      drawGraveyardPaintingimage(obj.x, obj.y, obj.width, obj.height);
      }
      if (obj.type === 'house_painting') {
      drawHousePaintingimage(obj.x, obj.y, obj.width, obj.height);
      }
      if (obj.type === 'bloodyHandprint') {
        drawBloodyHandprint(obj.x, obj.y);
      }
      if (obj.type === 'sofa2') {
        drawRealisticSofa(obj.x, obj.y);
      }
      if (obj.type === 'ElegantChair') {
        drawElegantChair(obj.x, obj.y);
      }
      

      if (obj.type === 'book') {
        drawOpenBook(obj.x, obj.y);
    } else if (obj.type === 'lantern') {
        drawLantern(obj.x, obj.y);
    } else if (obj.type === 'rope') {
        drawHangingRope(obj.x, obj.y);
    } else if (obj.type === 'bed') {
        drawBed(obj.x, obj.y);
    } else if (obj.type === 'candle') {
          drawCandle(obj.x, obj.y);
      } else if (obj.type === 'brokenImage') {
          drawBrokenImage(obj.x, obj.y);
      } else if (obj.type === 'clockss') {
        drawWallClock(obj.x, obj.y,currentHour, currentMinute);
      }  else if (obj.type === 'desk') {
      drawDesk(obj.x, obj.y);
      } else if( obj.type ==='ReceptionDesk'){
        drawReceptionItem(obj.x,obj.y);
      }
  }
  }




function drawInclined(){
  for (let escalator of inclinedEscalators) {
    drawInclinedEscalator(escalator.x, escalator.y, escalator.width, escalator.height);
}
}


function drawInclinedEscalator(x, y, width, height) {
 

  noFill();
  noStroke();
  beginShape();
  vertex(x, y); // Κάτω-αριστερά
  vertex(x + width, y - height); // Πάνω-δεξιά
  vertex(x + width, y - height + 10);  
  vertex(x, y + 10);  
  endShape(CLOSE);

  
}
function checkInclinedEscalatorCollision(player) {
  let onEscalator = false;

  for (let escalator of inclinedEscalators) {
      let slope = escalator.height / escalator.width;  
      let relativeX = player.x - escalator.x;  

       
      if (relativeX >= 0 && relativeX <= escalator.width) {
          let expectedY = escalator.y - relativeX * slope;  

          if (
              player.y + player.height >= expectedY &&  
              player.y + player.height <= expectedY + 10  
          ) {
              player.x += escalator.speedX;  
              player.y = expectedY - player.height;  
              player.velocityY = 0;  
              player.isFalling = false;  
              player.canJump = true;  
              onEscalator = true;
              
              break;  
          }
      }
  }

  if (!onEscalator) {
      player.isFalling = true;  
  }
}





function drawReceptionDesk() {
  for (let item of ReceptionDesk) {
    drawReceptionDeskStructure(item.x, item.y);
  }
}



function drawReceptionDeskStructure(x, y) {
  let scale = 0.5;


   
  fill(245, 222, 179);  
  rect(x, y, 300 * scale, 100 * scale, 10);  

   
  stroke(210, 180, 140);
  strokeWeight(1);
  line(x + 20 * scale, y + 20 * scale, x + 280 * scale, y + 40 * scale);
  line(x + 50 * scale, y + 60 * scale, x + 270 * scale, y + 80 * scale);
  noStroke();

 

   
  fill(139, 69, 19);  
  rect(x, y - 20 * scale, 300 * scale, 20 * scale, 5);

   
  fill(20, 20, 120);
  rect(x + 155 * scale, y - 60 * scale, 50 * scale, 40 * scale, 5);  

  rect(x + 175 * scale, y - 20 * scale, 10 * scale, 5 * scale);  
  fill(255, 255, 255, 80);
  quad(
      x + 15 * scale, y + 15 * scale,
      x + 45 * scale, y + 15 * scale,
      x + 35 * scale, y + 30 * scale,
      x + 15 * scale, y + 30 * scale
  );

   
  fill(255, 215, 0);  
  ellipse(x + 80 * scale, y - 30 * scale, 20 * scale, 20 * scale);  
  fill(255, 240, 180);
  ellipse(x + 80 * scale, y - 35 * scale, 10 * scale, 10 * scale);  
}



 
 
function drawFireplace(x, y) {
  const scale = 0.5;  

   
  fill(139, 69, 19);  
  rect(x + 80 * scale, y - 281 * scale, 40 * scale, 281 * scale);  

   
  fill(139, 69, 19);  
  rect(x, y, 200 * scale, 150 * scale);  

   
  fill(0);  
  rect(x + 50 * scale, y + 50 * scale, 100 * scale, 80 * scale);

   
  for (let i = 0; i < 5; i++) {
      fill(255, random(100, 200), 0, random(180, 255));  
      beginShape();
      vertex(x + 75 * scale + i * 10 * scale, y + 120 * scale);
      vertex(x + 70 * scale + i * 10 * scale, y + 100 * scale - random(10, 30) * scale);
      vertex(x + 80 * scale + i * 10 * scale, y + 120 * scale);
      endShape(CLOSE);
  }

   
  fill(100, 50, 25);
  rect(x, y, 200 * scale, 20 * scale);  
  fill(80, 40, 20);
  rect(x + 20 * scale, y + 140 * scale, 160 * scale, 10 * scale);  

   
  stroke(120, 60, 30);
  strokeWeight(2 * scale);
  for (let i = 0; i < 4; i++) {
      line(x + 50 * scale + i * 40 * scale, y, x + 50 * scale + i * 40 * scale, y + 50 * scale);
  }
  noStroke();
}

 
function drawFireplaces() {
  for (let fireplace of fireplaces) {
      drawFireplace(fireplace.x, fireplace.y);
  }
}




function drawNormalSuitcase(x,y){
  const scale = 0.5;

   
  fill(139,  69,  19);  
  rect(x, y, 100 * scale, 70 * scale, 5);  

   
  fill(100);
  rect(x + 30 * scale, y - 10 * scale, 40 * scale, 10 * scale, 5);

   
  stroke(80);
  strokeWeight(2);
  line(x + 10 * scale, y + 20 * scale, x + 90 * scale, y + 20 * scale);
  line(x + 10 * scale, y + 50 * scale, x + 90 * scale, y + 50 * scale);
  noStroke();

}









  
function  drawNormalDoll(x,y){
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
  
   
    drawNormalDollFace(x, y - 50 * scale);
  }
  
  
  function drawNormalDollFace(x,y){
    const scale = 0.6;
  
    fill(0);
    ellipse(x - 10 * scale, y - 5 * scale, 5 * scale, 5 * scale);  
    ellipse(x + 10 * scale, y - 5 * scale, 5 * scale, 5 * scale);
    noFill();
    stroke(0);
    arc(x, y + 10 * scale, 10 * scale, 5 * scale, 0, PI);
    noStroke();
    }


  
function drawNormalMirror(x,y){
const width = 90;   
    const height = 140;  

     
    fill(100, 50, 20);  
    rect(x - width / 2, y - height / 2, width, height);

     
    fill(50, 70, 100, 200); // Σκούρο μπλε-γκρι για το γυαλί
    rect(x - width / 2 + 5, y - height / 2 + 5, width - 10, height - 10);


}

  function drawElegantChair(x, y) {
    const scale = 0.7;  

     
    fill(120, 60, 30);  
    rect(x + 20 * scale, y - 80 * scale, 60 * scale, 100 * scale, 20);  
    fill(90, 45, 20);  
    rect(x + 30 * scale, y - 70 * scale, 40 * scale, 80 * scale, 15);  

     
    fill(50, 25, 15);
    for (let i = 0; i < 5; i++) {
        ellipse(
            x + 50 * scale,
            y - 60 * scale + i * 15 * scale,
            8 * scale,
            8 * scale
        );
    }

     
    fill(120, 60, 30);
    ellipse(x + 10 * scale, y + 10 * scale, 20 * scale, 40 * scale);  
    ellipse(x + 90 * scale, y + 10 * scale, 20 * scale, 40 * scale);  

     
    fill(139, 69, 19);  
    rect(x + 10 * scale, y, 80 * scale, 30 * scale, 5);  

     
    fill(100, 50, 25);
    rect(x + 20 * scale, y + 30 * scale, 10 * scale, 30 * scale, 5);  
    rect(x + 70 * scale, y + 30 * scale, 10 * scale, 30 * scale, 5);  
    rect(x + 30 * scale, y + 30 * scale, 40 * scale, 10 * scale);  

     
    fill(160, 82, 45);
    arc(x + 50 * scale, y - 75 * scale, 40 * scale, 20 * scale, PI, TWO_PI);

     
    fill(255, 215, 0);  
    ellipse(x + 50 * scale, y - 80 * scale, 10 * scale, 10 * scale);
}



function drawSpikes() {
  for (let spike of Spikes) {
      drawSpikeRow(spike.x, spike.y, spike.width, spike.height);
  }
}

function drawSpikeRow(x, y, width, height) {
  fill(150);
  noStroke();
  for (let i = 0; i < width; i += 10) {
      triangle(
          x + i, y,                  
          x + i + 5, y - height,     
          x + i + 10, y              
      );
  }
}


  function drawRealisticSofa(x, y) {
    const scale =0.4;  

     
    fill(139, 69, 19);  
    rect(x, y, 200 * scale, 100 * scale, 20);  

     
    fill(160, 82, 45);  
    arc(x + 100 * scale, y, 200 * scale, 150 * scale, PI, TWO_PI);  

     
    fill(120, 60, 30);
    ellipse(x + 100 * scale, y - 50 * scale, 30 * scale, 20 * scale);

     
    fill(110, 55, 15);  
    for (let i = 1; i <= 4; i++) {
        ellipse(x + i * 40 * scale, y - 30 * scale, 10 * scale, 10 * scale);
    }

     
    fill(139, 69, 19);
    rect(x - 20 * scale, y + 20 * scale, 40 * scale, 60 * scale, 10);  
    rect(x + 180 * scale, y + 20 * scale, 40 * scale, 60 * scale, 10);  

     
    fill(100, 50, 25);
    rect(x + 20 * scale, y + 90 * scale, 20 * scale, 20 * scale);  
    rect(x + 160 * scale, y + 90 * scale, 20 * scale, 20 * scale);  
    rect(x + 90 * scale, y + 90 * scale, 20 * scale, 20 * scale);  
}

function drawDesk(x, y) {
  const scale = 0.6;  

   
  fill(139, 69, 19);  
  rect(x, y - 10 * scale, 200 * scale, 20 * scale, 5);  

   
  fill(200);  
  rect(x, y, 60 * scale, 100 * scale);
  for (let i = 0; i < 3; i++) {
      rect(x + 10 * scale, y + 10 * scale + i * 30 * scale, 40 * scale, 20 * scale);
  }

   
  rect(x + 140 * scale, y, 60 * scale, 100 * scale);
  for (let i = 0; i < 3; i++) {
      rect(x + 150 * scale, y + 10 * scale + i * 30 * scale, 40 * scale, 20 * scale);
  }

   
  fill(120);
  rect(x + 60 * scale, y, 80 * scale, 100 * scale);  

   
  fill(50);
  for (let i = 0; i < 3; i++) {
      ellipse(x + 30 * scale, y + 20 * scale + i * 30 * scale, 5 * scale, 5 * scale);
      ellipse(x + 170 * scale, y + 20 * scale + i * 30 * scale, 5 * scale, 5 * scale);
  }
}

function drawStairs() {
  for (let stair of stairs) {
      drawStair(stair.x, stair.y, stair.steps, stair.stepWidth, stair.stepHeight);
  }
}

function drawStair(x, y, steps, stepWidth, stepHeight) {
  let stepColor = [70, 40, 20];  
    let supportColor = [50, 30, 15];  
    let shadowColor = [30, 15, 5, 150];  
    let highlightColor = [100, 60, 40];  

     
    fill(supportColor);
    noStroke();
    beginShape();
    vertex(x, y);
    vertex(x + steps * stepWidth, y - steps * stepHeight);
    vertex(x + steps * stepWidth - 5, y - steps * stepHeight + 5);
    vertex(x - 5, y + 5);
    endShape(CLOSE);

     
    for (let i = 0; i < steps; i++) {
        let stepX = x + i * stepWidth;
        let stepY = y - i * stepHeight;

         
        fill(stepColor);
        rect(stepX, stepY, stepWidth, stepHeight);

         
        stroke(highlightColor);
        strokeWeight(1);
        for (let j = 1; j <= 3; j++) {
            line(stepX + j * 10, stepY + 2, stepX + j * 10, stepY + stepHeight - 2);
        }

         
        noStroke();
        fill(shadowColor);
        rect(stepX + 2, stepY + stepHeight - 3, stepWidth - 4, 3);
    }

     
    for (let i = 0; i <= steps; i++) {
        let columnX = x + i * stepWidth;
        fill(supportColor);
        rect(columnX - 2, y - i * stepHeight, 4, stepHeight);

         
        ellipse(columnX, y - i * stepHeight + stepHeight, 6, 6);
    }
}

function drawLightsPosition() {
  for (let light of lightsPosition) {
      drawLightsStructure(light.x, light.y);
  }
}


function  drawStairsGhost(x,y){
  image (stairsghostImg,x,y, 150,100);
}
function  drawLightsStructure(x,y){
  image (lightImg,x,y, 200,320);
}

function   drawToRooms(x,y){
  image(toRoomsImg,x,y,75,75);
}

function drawMoonPainting(x,y){
  image(moon2Img,x,y,125,75);
}
function drawReceptionBanner(x,y){
  image(receptionImg,x,y,95,60);
}

function drawLibraryImage(x,y){
  image(libraryImg, x, y, 75, 40);  
}
function drawCasteImage(x,y){
  image(castleImg, x, y, 150, 100);  
}

function drawPaintingReception(x,y){
image(mooonImg, x, y, 150, 100);  
}

function drawPaintingimage(x, y, width, height) {
  image(paintingImg, x, y, 70, 100);  
}

function drawGraveyardPaintingimage(x, y, width, height) {
  image(graveyardImg , x, y, 70, 100);  
}
function drawHousePaintingimage(x, y, width, height) {
  image( houseImg , x, y, 70, 100);  
}



function drawBloodyHandprint(x, y) {
  image(bloodyHandprintImg, x, y, 40, 40); // Σχεδίαση εικόνας (x, y, πλάτος, ύψος)
}


function drawOpenBook(x, y) {
   
  fill(165, 42, 42);  
  rect(x, y, 50, 10);  

   
  fill(255);  
  beginShape();
  for (let i = 0; i < 50; i += 10) {
      let offset = sin(frameCount * 0.1 + i * 0.3) * 2;  
      vertex(x + i, y + offset);
  }
  vertex(x + 50, y + 10);
  vertex(x, y + 10);
  endShape(CLOSE);

   
  stroke(200);
  line(x + 10, y, x + 10, y + 10);
  line(x + 20, y, x + 20, y + 10);
}


function drawLantern(x, y) {
   
  fill(50);  
  rect(x, y, 20, 30);  

   
  fill(255, 165, 0, random(100, 255));  
  ellipse(x + 10, y + 10, 10, 15);  

   
  stroke(50);
  line(x + 5, y - 5, x + 15, y - 5);  
}

function drawHangingRope(x, y) {
  stroke(139, 69, 19);  
  strokeWeight(4);
  let offset = sin(frameCount * 0.1) * 5;  
  line(x, y, x + offset, y + 100);  
}


function drawBed(x, y) {
   
  fill(139, 69, 19);  
  rect(x, y, 150, 30);  

   
  fill(200);  
  rect(x + 5, y - 10, 130, 10);  

   
  fill(255);  
  ellipse(x + 17, y - 15, 20, 10);  
}












function drawCandle(x, y) {
  fill(255);  
  rect(x - 5, y-20, 10, 40);

  fill(255, 165, 0, 200);  
  let flameOffset = random(-2, 2);
  ellipse(x, y - 25 + flameOffset, 10, 15);
}

function drawBrokenImage(x, y) {
  fill(139, 69, 19);  
  rect(x, y, 60, 80);

  fill(255);  
  rect(x + 5, y + 5, 50, 70);

  stroke(0);
  strokeWeight(1);
  line(x + 10, y + 10, x + 50, y + 70);  
  line(x + 50, y + 10, x + 10, y + 70);
}

// function drawBloodyDoll(x, y) {
//   fill(250, 220, 200);  
//   ellipse(x, y - 30, 20, 20);  

//   fill(200, 0, 0);  
//   rect(x - 10, y - 20, 20, 30);

//   fill(200, 0, 0, 150);  
//   ellipse(x, y + 10, 15, 10);
// }

function drawWallClock(x, y, stoppedHour = 3, stoppedMinute = 15, reverse = false) {
   
let scale = 0.5;
  fill(80, 40, 30);  
  stroke(0);
  strokeWeight(3);
  ellipse(x*scale, y*scale, 80*scale, 80*scale);  

   
  fill(255);  
  noStroke();
  ellipse(x*scale, y*scale, 70*scale, 70*scale);
  

   
  let hourAngle = map(stoppedHour % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(stoppedMinute, 0, 60, 0, TWO_PI) - HALF_PI;

  if (reverse) {
     
    clockRotation -= 0.02;  
    hourAngle += clockRotation;
    minuteAngle += clockRotation * 12;
  }

   
  stroke(0);
  strokeWeight(4);
  line(x*scale, y*scale, (x*scale) + 10 * cos(hourAngle), (y*scale) + 10 * sin(hourAngle));

   
  strokeWeight(2);
  line(x*scale, y*scale, (x*scale) + 17 * cos(minuteAngle),  (y*scale) + 17 * sin(minuteAngle));

   
  fill(0);
  noStroke();
  ellipse(x*scale, y*scale, 5*scale, 5*scale);
}




// function horrorbackgroundMusic(){
//   if ( backgroundHorrorMusic.isLoaded()) {
//     backgroundHorrorMusic.setVolume(0.2);
//     backgroundHorrorMusic.loop();
// } else {
//     console.log('Music is still loading...');
// }
//   }






function drawBookshelfs(){
  for (let Books of Bookshelfs){
    drawBookshelf2(Books.x,Books.y);
  }
}

function drawBookshelf2(x,y){
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

}





function drawDoors() {
  for (let door of doors) {
    if (door.type === 'roomDoor') {
      drawHorrorDoor(door.x, door.y, door.roomNumber);
    } 
  }
}

function drawHorrorDoor(x, y, roomNumber) {
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

   
  fill(200, 0, 0);  
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Room ${roomNumber}`, x + doorWidth / 2, y + 20);
}



function drawRoomDoor(x, y, roomNumber) {
   
  fill(139, 69, 19);  
  rect(x, y, 80, 120);  

   
  // noFill();
  // stroke(100);  
  // strokeWeight(4);
  // rect(x - 5, y - 5, 90, 130);  

   
  fill(255, 223, 0);  
  ellipse(x + 65, y + 60, 10, 10);  

   
  noStroke();
  fill(255);  
  textAlign(CENTER, CENTER);
  textSize(14);
  text(`Room ${roomNumber}`, x + 40, y + 20);  
}
















function drawSofa2() {
  for (let pos of sofaPositions) {
  noStroke();
  fill(139, 69, 19);  
  rect(pos.x - 30, pos.y - 20, 60, 20);  
  fill(165, 42, 42);  
  rect(pos.x - 25, pos.y - 30, 50, 10);  
  }
}



function drawWindow() {
  const windowWidth = 100;  
  const windowHeight = 150;  
  let closestDistance = Infinity;  
  const windowX = 300; // X-συντεταγμένη παραθύρου
  const windowY = 200; // Y-συντεταγμένη παραθύρου
  const maxDistance = 500;  

  for (let pos of windowPositions) {
     
    fill(139, 69, 19);
    rect(pos.x, pos.y, windowWidth, windowHeight);

    // Εσωτερική περιοχή παραθύρου (γυαλί)
    fill(173, 216, 230, 150);
    rect(pos.x + 5, pos.y + 5, windowWidth - 10, windowHeight - 10);

     
    stroke(139, 69, 19);
    line(pos.x + windowWidth / 2, pos.y + 5, pos.x + windowWidth / 2, pos.y + windowHeight - 5);
    line(pos.x + 5, pos.y + windowHeight / 2, pos.x + windowWidth - 5, pos.y + windowHeight / 2);
    noStroke();

     
    drawRain(pos.x + 5, pos.y + 5, windowWidth - 10, windowHeight - 20);
    drawLightning(pos.x, pos.y, windowWidth -20, windowHeight - 100);

     
    let distance = dist(player.x, player.y, pos.x + windowWidth / 2, pos.y + windowHeight / 2);
    if (distance < closestDistance) {
      closestDistance = distance;  
    }
  }

     
    if (allowRainSound) {
      if (!soundManager.sounds['rain'].isPlaying()) {
          soundManager.play('rain', true, 0.5);  
      }
  } else {
       
      if (soundManager.sounds['rain']?.isPlaying()) {
          soundManager.stop('rain');
      }
  }
}








function drawRain(x, y, width, height) {
  const drops = 50; 
  fill(135, 206, 235, 150); 
  noStroke();

  for (let i = 0; i < drops; i++) {
      const dropX = x + random(width);
      const dropY = y + random(height);
      rect(dropX, dropY/1.005, 2, 10); 
  }
}
function drawLightning(x, y, width, height) {
  if (random() > 0.98) { 
      stroke(255, 255, 0); 
      strokeWeight(2);
      let startX = x + 50;
      let startY = y + 10;
      let endX = startX + random(-20, 20);
      let endY = y + random(height / 2, height);

       
      for (let i = 0; i < 5; i++) {
          line(startX, startY, endX, endY);
          startX = endX;
          startY = endY;
          endX = startX + random(-20, 20);
          endY = startY + random(10, 30);
      }

      noStroke();
  }
}




function displayScore(score) {
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
  }



  function drawWall() {
     
    fill(20, 20, 20);  
    rect(0, 0, PLATFORM_WIDTH, height);

     
    fill(50, 30, 20);  
    for (let x = 0; x < secretRoomStartX; x += 120) {
        rect(x, 0, 20, height);  
    }

   

     
    fill(0, 0, 0, 80);  
    rect(0, height / 2 + 20, PLATFORM_WIDTH, height / 2);  

   
}

 
function drawLamps() {
    for (let x = 100; x < width; x += 100) {  
        noStroke();

         
        for (let r = 120; r > 0; r -= 20) {
            fill(255, 220, 150, 150 - r);  
            ellipse(x, 150, r, r / 2);
        }

         
        fill(255, 230, 180);  
        ellipse(x, 150, 30, 40);  

         
        fill(80, 60, 40);  
        rect(x - 5, 170, 10, 30);  
    }
}



  



  function drawWallLights() {
     
    for (let wall of walllights) {
        drawLight(wall.x, wall.y);
    }
}





function drawPoster(){
     
    let posterWidth = 90, posterHeight = 90;
    fill(255);
    rect( 1550, height -150 ,posterWidth, posterHeight);  
    image(posterImage, 1550, height-150, posterWidth, posterHeight);  

    fill(255);
    rect( 1050, height -150 ,posterWidth, posterHeight);  
    image(posterImage2, 1050, height-150, posterWidth, posterHeight);  


    fill(255);
    rect( 700, height -150 ,posterWidth, posterHeight);  
    image(posterImage3, 700, height-150, posterWidth, posterHeight);  
  }






  
function drawLight(x, y) {
     
    noStroke();
    for (let i = 100; i > 0; i -= 10) {
        fill(255, 220, 150, 255 - i * 2);
        ellipse(x, y, i, i / 2);
    }
     
    fill(255, 240, 200);
    rect(x - 20, y - 10, 40, 20);
}   
let doorCosmicX = 4000;
let doorCosmicY = 420;

let doorX = 3420;  
let doorY = 420;  
let doorWidth = 70;  
let doorHeight = 150;  
let doorOffset = 0;  
let doorOpening = false;  
function drawDoor() {
    // Σχεδίαση λευκής πόρτας (εξωτερικό πλαίσιο)
    fill(255, 255, 255);
    rect(doorX, doorY, doorWidth + 10, doorHeight + 10);

     
    fill(60, 30, 15);
    rect(doorX + doorOffset, doorY + 3, doorWidth + 10, doorHeight + 13);
}


function drawWalls() {
   
  fill(60, 60, 60);
  rect(0, 0, 20, height);

   
  fill(60, 60, 60);
  rect(RIGHT_WALL_X, 0, 20, height);



   
  drawElegantExitDoor(5, height - 170);  
  drawElegantExitDoor(RIGHT_WALL_X + 5, height - 170);  

  fill(60, 60, 60);

  rect(FIRST_WALL, 0, 20, height);
  
 drawRealisticDoor(FIRST_WALL , height / 2 +120);
 drawRealisticDoor(FIRST_WALL , height / 4-40);


 fill(60, 60, 60);

 rect(END_WALL_X, height - 160, 1, 200);

 fill(60, 60, 60);

 rect(UPPER_WALL, height - 580, 30000, 45);


 fill(100, 100, 100);  
 rect(UPPER_WALL_SECRET, height - 170, 80, 5);



 fill(60, 60, 60);

 rect(SECOND_WALL, 0, 20, height);
 
drawRealisticDoor(SECOND_WALL , height / 2 +120);
drawRealisticDoor(SECOND_WALL , height / 4-40);

fill(60, 60, 60);
rect(THIRD_WALL, 0, 20, height);
 
drawRealisticDoor(THIRD_WALL , height / 2 +120);
drawRealisticDoor(THIRD_WALL , height / 4-40);

  

fill(60, 60, 60);

rect(FORTH_WALL, 0, 20, height);
 
drawRealisticDoor(FORTH_WALL , height / 2 +120);
drawRealisticDoor(FORTH_WALL , height / 4-40);

 

fill(60, 60, 60);

rect(FIFTH_WALL, 0, 20, height);



    
   fill(60, 60, 60);
   rect(NEW_WALL_X, 0,WALL_WIDTH, height);



 
   fill(60, 60, 60);
   rect(NEW_WALL_X2, 0,WALL_WIDTH, height);

 
}

function drawElegantExitDoor(x, y) {
  const width = 50;  
  const height = 150;  

   
  fill(139, 69, 19);  
  rect(x, y, width, height);

   
  noFill();
  stroke(255, 223, 0, 150);  
  strokeWeight(4);
  rect(x - 5, y - 5, width + 10, height + 10, 5);

   
  fill(255, 215, 0);  
  ellipse(x + width - 10, y + height / 2, 8, 8);  

   
  noStroke();
  fill(255);  
  textSize(14);
  textAlign(CENTER, CENTER);
  text("EXIT", x + width / 2, y + height + 15);
}


function drawRealisticDoor(x, y) {
   
  fill(100, 50, 30);  
  rect(x, y, 15, 150, 2);  

   
  noStroke();
  for (let i = 0; i < 15; i++) {
      let colorValue = map(i, 0, 15, 120, 80);  
      fill(colorValue, 50, 30);
      rect(x + i, y + 3, 1, 144);  
  }

   
  fill(180, 180, 0);  
  ellipse(x + 12, y + 75, 4, 4);  

   
  fill(50, 30, 20, 100);  
  rect(x + 2, y + 5, 11, 140, 2);
}



 
function drawElegantDoor(x, y) {
  const scale = 0.9;  

   
  fill(120, 60, 30);  
  rect(x, y, 60 * scale, 120 * scale, 10);  

     
fill(0);  
rect(x + 55, y , 20, 115);  

   
  fill(100, 50, 25);  
  rect(x + 10 * scale, y + 10 * scale, 40 * scale, 20 * scale, 5);  
  rect(x + 10 * scale, y + 40 * scale, 40 * scale, 20 * scale, 5);  
  rect(x + 10 * scale, y + 70 * scale, 40 * scale, 30 * scale, 5);  

   
  fill(255, 215, 0);  
  ellipse(x + 15 * scale, y + 60 * scale, 8 * scale, 8 * scale);  

}



 
function drawCosmicDoor(x, y) {
  const scale = 1.2;  

   
  noStroke();
  for (let i = 0; i < 12; i++) {
    fill(20, 70, 150, 100 - i * 8);  
      rect(
          x - 20 * scale - i * 6, 
          y - 30 * scale - i * 6, 
          130 * scale + i * 12, 
          210 * scale + i * 12, 
          20
      );
  }

 
   
  fill(10, 10, 40);  
  rect(x + 15, y, 70 * scale, 150 * scale, 5);  

   
  stroke(80, 200, 255);
  strokeWeight(6);
  noFill();
  rect(x + 15, y, 70 * scale, 150 * scale, 5);

   
  noStroke();
  fill(255, 200, 50, 200);  


   
  for (let i = 0; i < 40; i++) {
      let particleX = x + 25 * scale + Math.random() * 40 * scale;
      let particleY = y + 20 * scale + Math.random() * 110 * scale;
      fill(255, 255, 200, 180);
      ellipse(particleX, particleY, 3, 3);
  }

   
  fill(10, 10, 40);  
  rect(x - 60, y, 60 * scale, 150 * scale, 5);  
  rect(x + 101, y, 60 * scale, 150 * scale, 5);  

   
  fill(200, 200, 200);
  rect(x - 35, y + 70, 8, 4);  
  rect(x + 110, y + 70, 8, 4);  
}

function checkCosmicDoorSound(player, showCosmicDoor1) {
  let doorX = 3470;  
  let doorX2 = 28320;  
  let range = 600;  
  let volume;  

   
  if (player.x >= doorX - range && player.x <= doorX + range) {
    let distance = Math.abs(player.x - doorX);
    volume = map(distance, 0, range, 1.0, 0.0); // Υπολογισμός έντασης (1.0 όταν είναι κοντά, 0.0 όταν είναι μακριά)
    volume = constrain(volume, 0.0, 1.0); // Περιορισμός στα όρια [0.0, 1.0]

    if (showCosmicDoor1) {
      if (!soundManager.sounds['cosmicdoor'].isPlaying()) {
        soundManager.play('cosmicdoor', true, volume);  
      }
      soundManager.setVolume('cosmicdoor', volume);  
    }
  } 
   
  else if (player.x >= doorX2 - range && player.x <= doorX2 + range) {
    let distance = Math.abs(player.x - doorX2);
    volume = map(distance, 0, range, 1.0, 0.0);  
    volume = constrain(volume, 0.0, 1.0); // Περιορισμός στα όρια [0.0, 1.0]

    if (!soundManager.sounds['cosmicdoor'].isPlaying()) {
      soundManager.play('cosmicdoor', true, volume);  
    }
    soundManager.setVolume('cosmicdoor', volume);  
  } 
   
  else {
    soundManager.stop('cosmicdoor');  
  }
}




function updateCosmicDoorSound(player, cosmicDoorX, cosmicDoorY) {
  let doorCenterX = cosmicDoorX + 70 / 2; 
  let doorCenterY = cosmicDoorY + 150 / 2; 

  let distance = dist(player.x, player.y, doorCenterX, doorCenterY);
  let maxDistance = 600;

  let volume = map(distance, 0, maxDistance, 1.0, 0.0);
  volume = constrain(volume, 0.0, 1.0);

  soundManager.setVolume('cosmicdoor', volume);

  if (volume > 0 && !soundManager.sounds['cosmicdoor'].isPlaying()) {
      soundManager.play('cosmicdoor', true, volume);
  }

  if (volume === 0) {
      soundManager.stop('cosmicdoor');
  }
}


function drawNoSmokingSign() {
  const x = width +550;
  const y = 480;
  const diameter = 25;  

  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, diameter);

  stroke(255);
  strokeWeight(2);  
  line(x - diameter / 2.5, y - diameter / 2.5, x + diameter / 2.5, y + diameter / 2.5);

  noStroke();
  fill(255);
  rect(x - 5, y + 2, 12, 2);  
  fill(255, 165, 0);
  rect(x + 5, y + 2, 2, 2);  

  noFill();
  stroke(255);
  strokeWeight(1);
  arc(x - 7, y - 2, 5, 5, PI / 4, (3 * PI) / 4);  
  arc(x - 8, y - 4, 4, 4, PI / 4, (3 * PI) / 4);
}



// ************************* SIGN BOARDS *******************************  


function drawExitSignArrow(x, y) {
  const signWidth = 80;  
  const signHeight = 30;  
  const lightHeight = 10;  

   
  fill(200);  
  rect(x, y - lightHeight, signWidth, lightHeight);

   
  fill(255);  
  noStroke();
  rect(x, y - lightHeight + 2, signWidth, 2);

   
  fill(0, 128, 0);  
  rect(x, y, signWidth, signHeight);

  // Κείμενο "EXIT"
  textSize(12);  
  textAlign(CENTER, CENTER);
  fill(255);  
  text("EXIT", x + signWidth / 2 - 6, y + signHeight / 2);

   
  fill(255);  
  noStroke();
  beginShape();
  vertex(x + signWidth - 20, y + signHeight / 2 - 8);  
  vertex(x + signWidth - 4, y + signHeight / 2);  
  vertex(x + signWidth - 20, y + signHeight / 2 + 8);  
  vertex(x + signWidth - 24, y + signHeight / 2 + 8);  
  vertex(x + signWidth - 24, y + signHeight / 2 - 8);  
  endShape(CLOSE);
}
function drawExitSign(x, y) {
  const signWidth = 80;  
  const signHeight = 30;  
  const lightHeight = 10;  

   
  fill(200);  
  rect(x, y - lightHeight, signWidth, lightHeight);

   
  fill(255);  
  noStroke();
  rect(x, y - lightHeight + 2, signWidth, 2);

   
  fill(0, 128, 0);  
  rect(x, y, signWidth, signHeight);

  // Κείμενο "EXIT"
  textSize(12);  
  textAlign(CENTER, CENTER);
  fill(255);  
  text("EXIT", x + signWidth / 2, y + signHeight / 2);
}





function drawCourageSign(x, y) {
  const boardWidth = 200;  
  const boardHeight = 80;  

   
  fill(139, 69, 19);  
  rect(x, y, boardWidth, boardHeight, 5);  

   
  fill(240, 255, 240);  
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

   
  fill(0);  
  textSize(14);  
  textAlign(CENTER, CENTER);
  text("Stay Strong!", x + boardWidth / 2, y + 30);

  textSize(12);  
  text("Reach the end to gain 4 levels!", x + boardWidth / 2, y + 55);

    
}


function drawSignBoard1(x, y) {
  const boardWidth = 300;  
  const boardHeight = 150;  

   
  fill(139, 69, 19);  
  rect(x, y, boardWidth, boardHeight, 5);  

   
  fill(255, 240, 240);  
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

   
  fill(0);  
  textSize(14);  
  textAlign(CENTER, CENTER);
  text("Anomalies Rules", x + boardWidth / 2, y + 30);
  
  textSize(12);  
  text("- Don't overlook any anomalies.", x + boardWidth / 2, y + 65);
  text("- If you find anomalies, turn back immediately.", x + boardWidth / 2, y + 85);
  text("- If you don't find anomalies, do not turn back.", x + boardWidth / 2, y + 105);
}


function drawSignBoard2(x, y) {
  const boardWidth = 350;  
  const boardHeight = 150;  

   
  fill(139, 69, 19);  
  rect(x, y, boardWidth, boardHeight, 5);  


   
  fill(255, 240, 240);  
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);

   
  fill(0);  
  textSize(14);  
  textAlign(CENTER, CENTER);
  text("Welcome!", x + boardWidth / 2, y + 30);
  textSize(12);
  text("- You are trapped in an endless corridor.", x + boardWidth / 2, y + 60);
  text("- Observe your surroundings carefully to reach The Exit.", x + boardWidth / 2, y + 85);
  text("- Press F for doors.", x + boardWidth / 2, y + 105);
}

function drawSignBoard3(x, y) { 
  
  const boardWidth = 200;  
  const boardHeight = 150;  

   
  fill(139, 69, 19);  
  rect(x, y, boardWidth, boardHeight, 5);  

   
  fill(255, 240, 240);  
  rect(x + 5, y + 5, boardWidth - 10, boardHeight - 10, 5);
  image(smileyfaceImg,x + 80, y + 70,40, 40);
   
  fill(0);  
  textSize(16); 
  textAlign(CENTER, CENTER);
  text("Good Luck!!!", x + boardWidth / 2, y + 50);


  // image (stairsghostImg,x,y, 150,100);
  
   
  // fill(255, 220, 0);  
  // ellipse(x + boardWidth / 2, y + 100, 40, 40);  

  // fill(0);  
  // ellipse(x + boardWidth / 2 - 10, y + 95, 5, 5);  
  // ellipse(x + boardWidth / 2 + 10, y + 95, 5, 5);  

  // noFill();
  // stroke(0);  
  // arc(x + boardWidth / 2, y + 105, 20, 10, 0, PI);  
}


