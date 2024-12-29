// visuals.js


let ghosts = [];


let windowPositions = [
  
  { x: 140, y: 350 },  // Παράθυρο 2
  
  { x: 2665, y: 97 }, // Παράθυρο 1
  { x: 3263, y: 90 },  // Παράθυρο 2
  { x: 3739, y: 90 }, // Παράθυρο 3
  { x: 5300, y: 350} //  Παράθυρο 4
];

let sofaPositions = [
  {x:5350, y:555}
];


let doors = [
  { type: 'roomDoor', x: 2430, y: 417, roomNumber: 101 },
  { type: 'roomDoor', x: 2770, y: 417, roomNumber: 102 },
  { type: 'roomDoor', x: 4230, y: 417, roomNumber: 103 },
  { type: 'roomDoor', x: 4950, y: 417, roomNumber: 104 },
 // { type: 'lockedDoor', x: 430, y: 435 }
];


// let curtainRods = [
//   { x: 300, y: 90, width: 200 }, // Κοντάρι για την πρώτη κουρτίνα
//   { x: 800, y: 90, width: 200 }  // Κοντάρι για τη δεύτερη κουρτίνα
// ];


let Bookshelfs= [
  {  x: 3040, y: 437},
  {  x: 3270, y: 437}, 
  {  x: 3390, y: 437},

]


let stairs = [
  { x: 1990, y: 540, steps: 7, stepWidth: 30, stepHeight: 21 },
  { x: 2289, y: 395, steps: 7, stepWidth: 30, stepHeight: 23 }
];


let scaryObjects = [
  { type: 'curtain', x: 100, y: 330 },
  { type: 'door', x: 400, y: 100 },
  { type: 'candle', x: 3850, y: 535 },
  { type: 'candle', x: 3730, y: 535 },
  { type: 'candle', x: 3545, y: 485 },
  { type: 'candle', x: 3580, y: 515 },
  { type: 'candle', x: 3510, y: 515 },
  //{ type: 'bloodyDoll', x: 950, y: 400 },
  { type: 'clockss', x: 5300, y: 650 ,hour:12,minute:0},
  { type: 'curtainRods', x: 105, y: 329 ,width:172},


  // { type: 'book', x: 800, y: 400 },
  // //{ type: 'lantern', x: 500, y: 250 },
 //  { type: 'rope', x: 1600, y: 50 },
  { type: 'bed', x: 4000, y: 210 },

  { type: 'bloodyHandprint', x: 2700, y: 450 },
    { type: 'bloodyHandprint', x: 2550, y: 450 },

   
    { type: 'g_painting', x: 4350, y: 415, width: 150, height: 200 },
    { type: 'house_painting', x: 4595, y: 415, width: 150, height: 200 },
    { type: 'painting', x: 4835, y: 415, width: 150, height: 200 },
    { type: 'desk', x: 4500, y: 200 },
   // { type: 'sofa2', x: 700, y:500},
    { type: 'ElegantChair', x: 4100, y:520}

];




function drawScaryObjects() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  let playerX = player.x; // Συντεταγμένες του παίκτη
  let playerY = player.y;

  
    for (let obj of scaryObjects) {

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
    } else if (obj.type === 'curtain') {
        drawCurtain(obj.x, obj.y, playerX, playerY);
        // drawCurtainRod(obj.x, obj.y - 10, 200); // Σχεδίαση κονταριού (πλάτος 200)
      } else if (obj.type === 'door') {
          drawDoor3(obj.x, obj.y);
      } else if (obj.type === 'candle') {
          drawCandle(obj.x, obj.y);
      } else if (obj.type === 'brokenImage') {
          drawBrokenImage(obj.x, obj.y);
      } else if (obj.type === 'bloodyDoll') {
          drawBloodyDoll(obj.x, obj.y);
      } else if (obj.type === 'clockss') {
        drawWallClock(obj.x, obj.y,currentHour, currentMinute);
      } else if (obj.type === 'curtainRods') {
      drawCurtainRod(obj.x,obj.y,obj.width);
      } else if (obj.type === 'desk') {
      drawDesk(obj.x, obj.y);
      } 
  }
  }
  function drawElegantChair(x, y) {
    const scale = 0.7; // Κλίμακα για μέγεθος

    // Πλάτη της καρέκλας
    fill(120, 60, 30); // Καφέ ξύλινο πλαίσιο
    rect(x + 20 * scale, y - 80 * scale, 60 * scale, 100 * scale, 20); // Πλαίσιο
    fill(90, 45, 20); // Σκούρο καφέ
    rect(x + 30 * scale, y - 70 * scale, 40 * scale, 80 * scale, 15); // Εσωτερικό

    // Σχέδιο στην πλάτη
    fill(50, 25, 15);
    for (let i = 0; i < 5; i++) {
        ellipse(
            x + 50 * scale,
            y - 60 * scale + i * 15 * scale,
            8 * scale,
            8 * scale
        );
    }

    // Μπράτσα της καρέκλας
    fill(120, 60, 30);
    ellipse(x + 10 * scale, y + 10 * scale, 20 * scale, 40 * scale); // Αριστερό
    ellipse(x + 90 * scale, y + 10 * scale, 20 * scale, 40 * scale); // Δεξί

    // Καθίσμα
    fill(139, 69, 19); // Καφέ για το κάθισμα
    rect(x + 10 * scale, y, 80 * scale, 30 * scale, 5); // Κάλυψη για ενιαίο σχέδιο

    // Σκαλιστά πόδια
    fill(100, 50, 25);
    rect(x + 20 * scale, y + 30 * scale, 10 * scale, 30 * scale, 5); // Αριστερό μπροστινό
    rect(x + 70 * scale, y + 30 * scale, 10 * scale, 30 * scale, 5); // Δεξί μπροστινό
    rect(x + 30 * scale, y + 30 * scale, 40 * scale, 10 * scale); // Στήριξη μέσης

    // Διακοσμητική κορυφή
    fill(160, 82, 45);
    arc(x + 50 * scale, y - 75 * scale, 40 * scale, 20 * scale, PI, TWO_PI);

    // Κόσμημα κορυφής
    fill(255, 215, 0); // Χρυσό
    ellipse(x + 50 * scale, y - 80 * scale, 10 * scale, 10 * scale);
}


  function drawRealisticSofa(x, y) {
    const scale =0.4; // Κλίμακα για το μέγεθος

    // Πλήρες σώμα του καναπέ
    fill(139, 69, 19); // Σκούρο καφέ
    rect(x, y, 200 * scale, 100 * scale, 20); // Κυρίως σώμα

    // Πλάτη του καναπέ
    fill(160, 82, 45); // Ανοιχτό καφέ
    arc(x + 100 * scale, y, 200 * scale, 150 * scale, PI, TWO_PI); // Ενιαία πλάτη και σώμα

    // Διακοσμητική κορυφή
    fill(120, 60, 30);
    ellipse(x + 100 * scale, y - 50 * scale, 30 * scale, 20 * scale);

    // Κουμπώματα
    fill(110, 55, 15); // Σκούρο καφέ για κουμπώματα
    for (let i = 1; i <= 4; i++) {
        ellipse(x + i * 40 * scale, y - 30 * scale, 10 * scale, 10 * scale);
    }

    // Μπράτσα
    fill(139, 69, 19);
    rect(x - 20 * scale, y + 20 * scale, 40 * scale, 60 * scale, 10); // Αριστερό μπράτσο
    rect(x + 180 * scale, y + 20 * scale, 40 * scale, 60 * scale, 10); // Δεξί μπράτσο

    // Πόδια καναπέ
    fill(100, 50, 25);
    rect(x + 20 * scale, y + 90 * scale, 20 * scale, 20 * scale); // Αριστερό πόδι
    rect(x + 160 * scale, y + 90 * scale, 20 * scale, 20 * scale); // Δεξί πόδι
    rect(x + 90 * scale, y + 90 * scale, 20 * scale, 20 * scale); // Κεντρικό πόδι
}

function drawDesk(x, y) {
  const scale = 0.6; // Κλίμακα σχεδίασης

  // Επιφάνεια γραφείου
  fill(139, 69, 19); // Καφέ για την επιφάνεια
  rect(x, y - 10 * scale, 200 * scale, 20 * scale, 5); // Στρογγυλεμένη επιφάνεια

  // Συρτάρια αριστερά
  fill(200); // Γκρι για τα συρτάρια
  rect(x, y, 60 * scale, 100 * scale);
  for (let i = 0; i < 3; i++) {
      rect(x + 10 * scale, y + 10 * scale + i * 30 * scale, 40 * scale, 20 * scale);
  }

  // Συρτάρια δεξιά
  rect(x + 140 * scale, y, 60 * scale, 100 * scale);
  for (let i = 0; i < 3; i++) {
      rect(x + 150 * scale, y + 10 * scale + i * 30 * scale, 40 * scale, 20 * scale);
  }

  // Σκιάσεις
  fill(120);
  rect(x + 60 * scale, y, 80 * scale, 100 * scale); // Κεντρική περιοχή

  // Χερούλια
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
  let stepColor = [70, 40, 20]; // Σκούρο καφέ για τα σκαλιά
    let supportColor = [50, 30, 15]; // Πιο σκούρο καφέ για τα στηρίγματα
    let shadowColor = [30, 15, 5, 150]; // Σκιά για βάθος
    let highlightColor = [100, 60, 40]; // Φωτεινές γραμμές για υφή

    // Πλάγιο στήριγμα
    fill(supportColor);
    noStroke();
    beginShape();
    vertex(x, y);
    vertex(x + steps * stepWidth, y - steps * stepHeight);
    vertex(x + steps * stepWidth - 5, y - steps * stepHeight + 5);
    vertex(x - 5, y + 5);
    endShape(CLOSE);

    // Σκαλιά με λεπτομέρειες
    for (let i = 0; i < steps; i++) {
        let stepX = x + i * stepWidth;
        let stepY = y - i * stepHeight;

        // Σκαλί με υφή
        fill(stepColor);
        rect(stepX, stepY, stepWidth, stepHeight);

        // Προσθήκη γραμμών για υφή ξύλου
        stroke(highlightColor);
        strokeWeight(1);
        for (let j = 1; j <= 3; j++) {
            line(stepX + j * 10, stepY + 2, stepX + j * 10, stepY + stepHeight - 2);
        }

        // Σκιά στο σκαλί
        noStroke();
        fill(shadowColor);
        rect(stepX + 2, stepY + stepHeight - 3, stepWidth - 4, 3);
    }

    // Στρογγυλεμένα κάθετα στηρίγματα
    for (let i = 0; i <= steps; i++) {
        let columnX = x + i * stepWidth;
        fill(supportColor);
        rect(columnX - 2, y - i * stepHeight, 4, stepHeight);

        // Στρογγυλές άκρες
        ellipse(columnX, y - i * stepHeight + stepHeight, 6, 6);
    }
}


function drawPaintingimage(x, y, width, height) {
  image(paintingImg, x, y, 70, 100); // Σχεδίαση εικόνας
}

function drawGraveyardPaintingimage(x, y, width, height) {
  image(graveyardImg , x, y, 70, 100); // Σχεδίαση εικόνας
}
function drawHousePaintingimage(x, y, width, height) {
  image( houseImg , x, y, 70, 100); // Σχεδίαση εικόνας
}



function drawBloodyHandprint(x, y) {
  image(bloodyHandprintImg, x, y, 40, 40); // Σχεδίαση εικόνας (x, y, πλάτος, ύψος)
}


function drawOpenBook(x, y) {
  // Βάση βιβλίου
  fill(165, 42, 42); // Καστανό
  rect(x, y, 50, 10); // Βάση

  // Σελίδες
  fill(255); // Λευκό για τις σελίδες
  beginShape();
  for (let i = 0; i < 50; i += 10) {
      let offset = sin(frameCount * 0.1 + i * 0.3) * 2; // Κίνηση στις σελίδες
      vertex(x + i, y + offset);
  }
  vertex(x + 50, y + 10);
  vertex(x, y + 10);
  endShape(CLOSE);

  // Γραμμές σελίδων
  stroke(200);
  line(x + 10, y, x + 10, y + 10);
  line(x + 20, y, x + 20, y + 10);
}


function drawLantern(x, y) {
  // Σώμα του φαναριού
  fill(50); // Σκούρο γκρι
  rect(x, y, 20, 30); // Κυρίως σώμα

  // Φλόγα
  fill(255, 165, 0, random(100, 255)); // Πορτοκαλί με δυναμική αδιαφάνεια
  ellipse(x + 10, y + 10, 10, 15); // Φλόγα

  // Χερούλι
  stroke(50);
  line(x + 5, y - 5, x + 15, y - 5); // Χερούλι
}

function drawHangingRope(x, y) {
  stroke(139, 69, 19); // Καφέ χρώμα
  strokeWeight(4);
  let offset = sin(frameCount * 0.1) * 5; // Κίνηση του σχοινιού
  line(x, y, x + offset, y + 100); // Σχοινί
}


function drawBed(x, y) {
  // Βάση του κρεβατιού
  fill(139, 69, 19); // Καφέ
  rect(x, y, 150, 30); // Κρεβάτι

  // Στρώμα
  fill(200); // Γκρι
  rect(x + 5, y - 10, 130, 10); // Στρώμα

  // Όρθιο Μαξιλάρι
  fill(255); // Λευκό
  ellipse(x + 17, y - 15, 20, 10); // Μαξιλάρι
}




function drawCurtainRod(x, y, width) {
  const rodHeight = 8; // Ύψος του κονταριού
  const endDiameter = 12; // Διάμετρος των άκρων του κονταριού

  // Σώμα του κονταριού
  fill(40); // Σκούρο γκρι
  stroke(30); // Σκιά
  strokeWeight(2);
  rect(x, y, width, rodHeight); // Κύριο σώμα του κονταριού

  // Στρογγυλά άκρα με σκίαση
  fill(30); // Σκούρο γκρι για τα άκρα
  noStroke();
  ellipse(x, y + rodHeight / 2, endDiameter, endDiameter); // Αριστερό άκρο
  ellipse(x + width, y + rodHeight / 2, endDiameter, endDiameter); // Δεξί άκρο

  // Γραμμές υφής στο κοντάρι
  stroke(60); // Ανοιχτό γκρι
  strokeWeight(1);
  for (let i = x + 5; i < x + width; i += 15) {
      line(i, y, i, y + rodHeight); // Κάθετες γραμμές
  }
}



// function drawClocks(){
//   for (let clock of clocks) {
//        drawWallClock(clock.x,clock.y,clock.stoppedHour,clock.stoppedMinute,clock.reverse);
//   }

// }
function drawCurtain(x, y, playerX, playerY) {
  const curtainWidth = 180; // Πλάτος κουρτίνας
  const curtainHeight = 180; // Ύψος κουρτίνας

  // Βασικό σώμα της κουρτίνας με μεγαλύτερη διαφάνεια
  fill(120, 0, 0, 20); // Σκούρο κόκκινο με πολύ χαμηλή αδιαφάνεια
  noStroke();
  beginShape();

  for (let i = 0; i <= curtainWidth; i += 10) {
      let offset;
      if (dist(playerX, playerY, x + curtainWidth / 2, y + curtainHeight / 2) < 100) {
          // Κίνηση πιο έντονη αν ο παίκτης πλησιάσει
          offset = sin(frameCount * 0.1 + i * 0.3) * 20;
      } else {
          // Κανονική κίνηση
          offset = sin(frameCount * 0.05 + i * 0.2) * 10;
      }
      vertex(x + i, y + offset);
  }

  vertex(x + curtainWidth, y + curtainHeight);
  vertex(x, y + curtainHeight);

  endShape(CLOSE);

  // Σκίαση πτυχώσεων με ακόμα χαμηλότερη διαφάνεια
  stroke(150, 0, 0, 10); // Σκούρο κόκκινο με σχεδόν μηδενική αδιαφάνεια
  strokeWeight(1);
  for (let i = x; i <= x + curtainWidth; i += 20) {
      line(i, y, i, y + curtainHeight); // Κάθετες σκιές
  }

  // Φωτεινές πτυχώσεις με μεγαλύτερη διαφάνεια
  stroke(200, 50, 50, 5); // Ανοιχτό κόκκινο με σχεδόν αόρατη αδιαφάνεια
  for (let i = x + 10; i <= x + curtainWidth; i += 20) {
      line(i, y, i, y + curtainHeight); // Εναλλασσόμενες γραμμές φωτός
  }
}







function drawDoor3(x, y) {
  fill(80, 40, 20); // Καφέ ξύλινη πόρτα
  rect(x, y, 50, 100); // Σώμα πόρτας

  fill(0); // Μαύρη σκιά
  ellipse(x + 25, y + 60, 20, 40); // Σκιά
}

function drawCandle(x, y) {
  fill(255); // Κερί
  rect(x - 5, y-20, 10, 40);

  fill(255, 165, 0, 200); // Φλόγα
  let flameOffset = random(-2, 2);
  ellipse(x, y - 25 + flameOffset, 10, 15);
}

function drawBrokenImage(x, y) {
  fill(139, 69, 19); // Πλαίσιο
  rect(x, y, 60, 80);

  fill(255); // Εικόνα
  rect(x + 5, y + 5, 50, 70);

  stroke(0);
  strokeWeight(1);
  line(x + 10, y + 10, x + 50, y + 70); // Ρωγμές
  line(x + 50, y + 10, x + 10, y + 70);
}

function drawBloodyDoll(x, y) {
  fill(250, 220, 200); // Δέρμα
  ellipse(x, y - 30, 20, 20); // Κεφάλι

  fill(200, 0, 0); // Ματωμένο φόρεμα
  rect(x - 10, y - 20, 20, 30);

  fill(200, 0, 0, 150); // Αίμα
  ellipse(x, y + 10, 15, 10);
}

function drawWallClock(x, y, stoppedHour = 3, stoppedMinute = 15, reverse = false) {
  // Σώμα Ρολογιού
let scale = 0.5;
  fill(80, 40, 30); // Καφέ για το ξύλινο πλαίσιο
  stroke(0);
  strokeWeight(3);
  ellipse(x*scale, y*scale, 80*scale, 80*scale); // Πλαίσιο ρολογιού

  // Καντράν
  fill(255); // Λευκό καντράν
  noStroke();
  ellipse(x*scale, y*scale, 70*scale, 70*scale);
  

  // Ωροδείκτες και Λεπτοδείκτες
  let hourAngle = map(stoppedHour % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(stoppedMinute, 0, 60, 0, TWO_PI) - HALF_PI;

  if (reverse) {
    // Αντίστροφη κίνηση
    clockRotation -= 0.02; // Αργή αντίστροφη περιστροφή
    hourAngle += clockRotation;
    minuteAngle += clockRotation * 12;
  }

  // Ωροδείκτης
  stroke(0);
  strokeWeight(4);
  line(x*scale, y*scale, (x*scale) + 10 * cos(hourAngle), (y*scale) + 10 * sin(hourAngle));

  // Λεπτοδείκτης
  strokeWeight(2);
  line(x*scale, y*scale, (x*scale) + 17 * cos(minuteAngle),  (y*scale) + 17 * sin(minuteAngle));

  // Κέντρο Ρολογιού
  fill(0);
  noStroke();
  ellipse(x*scale, y*scale, 5*scale, 5*scale);
}




function horrorbackgroundMusic(){
  if ( backgroundHorrorMusic.isLoaded()) {
    backgroundHorrorMusic.setVolume(0.2);
    backgroundHorrorMusic.loop();
} else {
    console.log('Music is still loading...');
}
  }






function drawBookshelfs(){
  for (let Books of Bookshelfs){
    drawBookshelf2(Books.x,Books.y);
  }
}

function drawBookshelf2(x,y){
  let scale = 0.6; // Μείωση μεγέθους κατά 40%

  // Πλαίσιο της βιβλιοθήκης
  fill(120, 70, 50); // Καφέ χρώμα για το ξύλο
  rect(x, y, 120 * scale, 200 * scale);

  // Ράφια
  fill(100, 50, 30); // Σκούρο καφέ για τα ράφια
  rect(x, y + 50 * scale, 120 * scale, 5 * scale);
  rect(x, y + 100 * scale, 120 * scale, 5 * scale);
  rect(x, y + 150 * scale, 120 * scale, 5 * scale);
  

  // Βιβλία στο πρώτο ράφι
  fill(200, 50, 50); // Κόκκινο βιβλίο
  rect(x + 10 * scale, y + 10 * scale, 15 * scale, 40 * scale);
  fill(50, 100, 200); // Μπλε βιβλίο
  rect(x + 30 * scale, y + 10 * scale, 15 * scale, 40 * scale);
  fill(50, 200, 100); // Πράσινο βιβλίο
  rect(x + 50 * scale, y + 10 * scale, 15 * scale, 40 * scale);

  // Βιβλία στο δεύτερο ράφι
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
    } else if (door.type === 'lockedDoor') {
      drawLockedDoor(door.x, door.y);
    }
  }
}

function drawHorrorDoor(x, y, roomNumber) {
  const doorWidth = 80;       // Πλάτος πόρτας
  const doorHeight = 140;     // Αυξημένο ύψος πόρτας (π.χ., 160 αντί για 120)
  const doorHandleY = y + doorHeight / 2; // Νέα θέση του πομολού, στο μέσο του ύψους
  noStroke();

  // Σώμα πόρτας με σκούρο ξύλο
  fill(100, 50, 30); // Σκούρο καφέ για πιο παλιό ξύλο
  rect(x, y, doorWidth, doorHeight);

  // Σκιές για βάθος
  fill(60, 30, 15); // Σκούρες σκιές
  rect(x, y, 10, doorHeight); // Αριστερή σκιά
  rect(x + doorWidth - 10, y, 10, doorHeight); // Δεξιά σκιά

  // Γρατζουνιές και ραγίσματα
  stroke(80);
  strokeWeight(1);
  line(x + 10, y + 0.3 * doorHeight, x + 30, y + 0.5 * doorHeight); // Διαγώνια γρατζουνιά
  line(x + 50, y + 0.2 * doorHeight, x + 60, y + 0.4 * doorHeight); // Άλλη γρατζουνιά

  // Αιματηρά αποτυπώματα
  noStroke();
  fill(150, 0, 0, 200); // Σκούρο κόκκινο για αίμα
  ellipse(x + 20, y + doorHeight - 40, 10, 20); // Στίγμα 1
  ellipse(x + 25, y + doorHeight - 30, 8, 18); // Στίγμα 2

  // Χερούλι πόρτας (παλιό και σπασμένο)
  fill(150, 150, 100); // Φθαρμένο χρυσό
  ellipse(x + doorWidth - 15, doorHandleY, 8, 8); // Νέο ύψος πομολού στο κέντρο πόρτας

  // Χαραμάδα με μάτια ή σκιές
  fill(0); // Σκούρο για κενό
  rect(x + 30, y + doorHeight - 50, 20, 5); // Χαραμάδα
  fill(255, 0, 0); // Κόκκινα μάτια
  ellipse(x + 35, y + doorHeight - 48, 3, 3); // Μάτι 1
  ellipse(x + 45, y + doorHeight - 48, 3, 3); // Μάτι 2

  // Αριθμός δωματίου
  fill(200, 0, 0); // Σκούρο κόκκινο για τον αριθμό
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Room ${roomNumber}`, x + doorWidth / 2, y + 20);
}



function drawRoomDoor(x, y, roomNumber) {
  // Σώμα πόρτας
  fill(139, 69, 19); // Καφέ χρώμα για την πόρτα
  rect(x, y, 80, 120); // Πόρτα

  // // Πλαίσιο πόρτας
  // noFill();
  // stroke(100); // Σκούρο γκρι πλαίσιο
  // strokeWeight(4);
  // rect(x - 5, y - 5, 90, 130); // Πλαίσιο

  // Χερούλι
  fill(255, 223, 0); // Χρυσό χερούλι
  ellipse(x + 65, y + 60, 10, 10); // Χερούλι

  // Αριθμός δωματίου
  noStroke();
  fill(255); // Λευκός αριθμός
  textAlign(CENTER, CENTER);
  textSize(14);
  text(`Room ${roomNumber}`, x + 40, y + 20); // Τοποθεσία αριθμού
}

function drawLockedDoor(x, y) {
  // Σώμα πόρτας
  fill(139, 69, 19); // Καφέ χρώμα για την πόρτα
  rect(x, y, 80, 120); // Πόρτα

  // // Πλαίσιο πόρτας
  // noFill();
  // stroke(100); // Σκούρο γκρι πλαίσιο
  // strokeWeight(4);
  // rect(x - 5, y - 5, 90, 130); // Πλαίσιο

  // Χερούλι
  fill(255, 223, 0); // Χρυσό χερούλι
  ellipse(x + 65, y + 60, 10, 10); // Χερούλι

//   // Αλυσίδα
//   stroke(150); // Ασημί για την αλυσίδα
//   strokeWeight(3);
//   for (let i = 0; i < 5; i++) {
//     line(x + 20 + i * 10, y + 50 + i * 10, x + 30 + i * 10, y + 60 + i * 10);
//   }
// }
}
















function drawSofa2() {
  for (let pos of sofaPositions) {
  noStroke();
  fill(139, 69, 19); // Καφέ χρώμα για το σώμα
  rect(pos.x - 30, pos.y - 20, 60, 20); // Σώμα του καναπέ
  fill(165, 42, 42); // Κόκκινο για το επάνω μέρος
  rect(pos.x - 25, pos.y - 30, 50, 10); // Πλάτη του καναπέ
  }
}



function loadVisuals(level) {
  const visuals = levelVisuals[level];
  for (const visual of visuals) {
      if (visual.type === 'frame') {
          drawFrame(visual.x, visual.y); // Σχεδίαση κορνίζας
      } else if (visual.type === 'ghost') {
          createGhost(visual.x, visual.y); // Δημιουργία φαντάσματος
      }
  }
}



let isRainPlaying = false; // Σημαία για να παρακολουθεί αν ο ήχος βροχής παίζει

function drawWindow() {
  const windowWidth = 100; // Πλάτος παραθύρου
  const windowHeight = 150; // Ύψος παραθύρου
  let closestDistance = Infinity; // Αρχικά μεγάλη απόσταση

  for (let pos of windowPositions) {
    // Σχέδιο πλαισίου παραθύρου
    fill(139, 69, 19);
    rect(pos.x, pos.y, windowWidth, windowHeight);

    // Εσωτερική περιοχή παραθύρου (γυαλί)
    fill(173, 216, 230, 150);
    rect(pos.x + 5, pos.y + 5, windowWidth - 10, windowHeight - 10);

    // Πλαίσια μέσα στο παράθυρο
    stroke(139, 69, 19);
    line(pos.x + windowWidth / 2, pos.y + 5, pos.x + windowWidth / 2, pos.y + windowHeight - 5);
    line(pos.x + 5, pos.y + windowHeight / 2, pos.x + windowWidth - 5, pos.y + windowHeight / 2);
    noStroke();

    // Σχέδιο βροχής και κεραυνών
    drawRain(pos.x + 5, pos.y + 5, windowWidth - 10, windowHeight - 10);
    drawLightning(pos.x, pos.y, windowWidth, windowHeight);

    // Υπολογισμός απόστασης παίκτη από το παράθυρο
    let distance = dist(player.x, player.y, pos.x + windowWidth / 2, pos.y + windowHeight / 2);
    if (distance < closestDistance) {
      closestDistance = distance; // Ενημέρωση της πιο κοντινής απόστασης
    }
  }

  // Υπολογισμός έντασης
  let volume = map(closestDistance, 0, 500, 1, 0.1); // Απόσταση 0 -> ένταση 1, Απόσταση 500 -> ένταση 0.1
  volume = constrain(volume, 0.1, 1); // Περιορισμός έντασης μεταξύ 0.1 και 1

  // Ρύθμιση έντασης ήχου
  rainSound.setVolume(volume);

  // Έναρξη ήχου αν δεν παίζει
  if (!rainSound.isPlaying()) {
    rainSound.loop();
  }
}







function drawRain(x, y, width, height) {
  const drops = 50; // Πλήθος σταγόνων
  fill(135, 206, 235, 150); // Μπλε-διαφανές για σταγόνες
  noStroke();

  for (let i = 0; i < drops; i++) {
      const dropX = x + random(width);
      const dropY = y + random(height);
      rect(dropX, dropY/1.005, 2, 10); // Μικρές γραμμές για σταγόνες
  }
}
function drawLightning(x, y, width, height) {
  if (random() > 0.98) { // Κεραυνός εμφανίζεται τυχαία
      stroke(255, 255, 0); // Κίτρινο για κεραυνό
      strokeWeight(2);
      let startX = x + random(width);
      let startY = y;
      let endX = startX + random(-20, 20);
      let endY = y + random(height / 2, height);

      // Γραμμές κεραυνού
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





// 



function displayScore(score) {
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
  }
  function drawWall() {
    // Βασικό σκούρο φόντο για τον τοίχο
    fill(20, 20, 20); // Σχεδόν μαύρο χρώμα
    rect(0, 0, PLATFORM_WIDTH, height);

    // Κατακόρυφες ξύλινες σανίδες
    fill(50, 30, 20); // Σκούρο καφέ
    for (let x = 0; x < PLATFORM_WIDTH; x += 120) {
        rect(x, 0, 20, height); // Σανίδες κάθε 120 pixels
    }

    // Προεξοχή στον τοίχο (για περισσότερη υφή)
    fill(30, 30, 30); // Σκούρο γκρι
    rect(0, height / 2 - 10, width, 20);

    // Σκιάσεις για πιο τρομακτική ατμόσφαιρα
    fill(0, 0, 0, 80); // Μαύρη ημιδιαφανής σκιά
    rect(0, height / 2 + 20, PLATFORM_WIDTH, height / 2); // Κάτω μισό τοίχου

    // Λάμπες στον τοίχο
    //drawLamps();
}

// Συνάρτηση για τη σχεδίαση στατικών λαμπών
function drawLamps() {
    for (let x = 100; x < width; x += 300) { // Τοποθέτηση λαμπών κάθε 300 pixels
        noStroke();

        // Εφέ διάχυσης φωτός
        for (let r = 120; r > 0; r -= 20) {
            fill(255, 220, 150, 150 - r); // Διαφανές κίτρινο φως
            ellipse(x, 150, r, r / 2);
        }

        // Σώμα λάμπας
        fill(255, 230, 180); // Απαλό κίτρινο
        ellipse(x, 150, 30, 40); // Γυαλί της λάμπας

        // Βάση της λάμπας
        fill(80, 60, 40); // Σκούρο καφέ
        rect(x - 5, 170, 10, 30); // Στήριγμα λάμπας
    }
}



  function drawTopBorder() {


    // Σχεδίαση ταβανιού και δαπέδου
    fill(100);
    rect(0, height - PLATFORM_HEIGHT, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    rect(0, CEILING_HEIGHT-50, PLATFORM_WIDTH, PLATFORM_HEIGHT);

  }
  
  
  function drawWallLights() {
    // Lighting effect
    for (let x = 200; x < width; x += 200) {
        drawLight(x, 60);
    }
}


let isTransitioning = false; // Αρχικά η πόρτα δεν βρίσκεται σε μετάβαση
function checkDoorInteraction(player) {
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
  } else {
      showDoorMessage = false;
  }
}


function drawPoster(){
    // Αφίσα με εικόνα
    let posterWidth = 90, posterHeight = 90;
    fill(255);
    rect( 1550, height -150 ,posterWidth, posterHeight); // Πλαίσιο
    image(posterImage, 1550, height-150, posterWidth, posterHeight); // Εικόνα αφίσας

    fill(255);
    rect( 1050, height -150 ,posterWidth, posterHeight); // Πλαίσιο
    image(posterImage2, 1050, height-150, posterWidth, posterHeight); // Εικόνα αφίσας2


    fill(255);
    rect( 700, height -150 ,posterWidth, posterHeight); // Πλαίσιο
    image(posterImage3, 700, height-150, posterWidth, posterHeight); // Εικόνα αφίσας3
  }






  
function drawLight(x, y) {
    // Glow effect
    noStroke();
    for (let i = 100; i > 0; i -= 10) {
        fill(255, 220, 150, 255 - i * 2);
        ellipse(x, y, i, i / 2);
    }
    // Light fixture
    fill(255, 240, 200);
    rect(x - 20, y - 10, 40, 20);
}   
let doorCosmicX = 4000;
let doorCosmicY = 420;

let doorX = 1800; // Θέση της κύριας πόρτας στον άξονα X
let doorY = 420; // Θέση της πόρτας στον άξονα Y
let doorWidth = 70; // Πλάτος της πόρτας
let doorHeight = 150; // Ύψος της πόρτας
let doorOffset = 0; // Μετατόπιση της πόρτας
let doorOpening = false; // Κατάσταση ανοίγματος
function drawDoor() {
    // Σχεδίαση λευκής πόρτας (εξωτερικό πλαίσιο)
    fill(255, 255, 255);
    rect(doorX, doorY, doorWidth + 10, doorHeight + 10);

    // Σχεδίαση εσωτερικής καφέ πόρτας που κινείται
    fill(60, 30, 15);
    rect(doorX + doorOffset, doorY + 3, doorWidth + 10, doorHeight + 13);
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

  // Μεσαίος τοίχος με χαμηλότερο κενό
  fill(60, 60, 60);
  rect(MIDDLE_WALL_X, 0, 20, height / 2 + 165); // Πάνω μέρος
  rect(MIDDLE_WALL_X, height / 2 + 275, 20, height / 2 - 275); // Κάτω μέρος

 // Ρεαλιστική πόρτα με πόμολο αριστερά
 drawElegantDoor(MIDDLE_WALL_X-55 , height / 2 +160);

   // Νέος τοίχος
   fill(60, 60, 60);
   rect(NEW_WALL_X, 0,WALL_WIDTH, height);



   fill(60, 60, 60);
   rect(NEW_WALL_X2, 0,WALL_WIDTH, height);

 
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



// Συνάρτηση για τη σχεδίαση μιας elegant πόρτας
function drawElegantDoor(x, y) {
  const scale = 0.9; // Κλίμακα για το μέγεθος της πόρτας

  // Πλαίσιο της πόρτας
  fill(120, 60, 30); // Καφέ ξύλινο πλαίσιο
  rect(x, y, 60 * scale, 120 * scale, 10); // Κυρίως σώμα

    // Κενό μέσα στην πόρτα
fill(0); // Μαύρο για το εσωτερικό
rect(x + 55, y , 20, 115); // Εσωτερικό της πόρτας

  // Διακοσμητικά στοιχεία
  fill(100, 50, 25); // Σκούρο καφέ για διακοσμητικά
  rect(x + 10 * scale, y + 10 * scale, 40 * scale, 20 * scale, 5); // Πάνω διακοσμητικό
  rect(x + 10 * scale, y + 40 * scale, 40 * scale, 20 * scale, 5); // Κεντρικό διακοσμητικό
  rect(x + 10 * scale, y + 70 * scale, 40 * scale, 30 * scale, 5); // Κάτω διακοσμητικό

  // Πόμολο
  fill(255, 215, 0); // Χρυσό πόμολο
  ellipse(x + 15 * scale, y + 60 * scale, 8 * scale, 8 * scale); // Τοποθέτηση αριστερά

  // Διακοσμητική κορυφή
  fill(139, 69, 19); // Πιο σκούρο καφέ για την κορυφή
  arc(x + 30 * scale, y - 25 * scale, 50 * scale, 20 * scale, PI, TWO_PI);

  // Χρυσό κόσμημα στην κορυφή
  fill(255, 223, 0); // Χρυσό
  ellipse(x + 30 * scale, y - 25 * scale, 10 * scale, 10 * scale);
}



// Συνάρτηση για τη σχεδίαση μιας πόρτας με φωτεινό εφέ όπως στην εικόνα
function drawCosmicDoor(x, y) {
  const scale = 1.2; // Κλίμακα για την πόρτα

  // Σχεδίαση λαμπερής αύρας γύρω από την πόρτα
  noStroke();
  for (let i = 0; i < 12; i++) {
    fill(20, 70, 150, 100 - i * 8); // Ακόμα πιο σκούρο μπλε με σταδιακή διαφάνεια
      rect(
          x - 20 * scale - i * 6, 
          y - 30 * scale - i * 6, 
          130 * scale + i * 12, 
          210 * scale + i * 12, 
          20
      );
  }



  // Σώμα της πόρτας
  fill(10, 10, 40); // Σκούρο μπλε για την πόρτα
  rect(x + 15, y, 70 * scale, 150 * scale, 5); // Κυρίως σώμα

  // Φωτεινό περίγραμμα της πόρτας
  stroke(80, 200, 255);
  strokeWeight(6);
  noFill();
  rect(x + 15, y, 70 * scale, 150 * scale, 5);

  // Εσωτερική λάμψη
  noStroke();
  fill(255, 200, 50, 200); // Φωτεινό χρυσό
 // ellipse(x + 50 * scale, y + 75 * scale, 10 * scale, 10 * scale); // Κεντρική λάμψη

  // Σωματίδια φωτός
  for (let i = 0; i < 40; i++) {
      let particleX = x + 25 * scale + Math.random() * 40 * scale;
      let particleY = y + 20 * scale + Math.random() * 110 * scale;
      fill(255, 255, 200, 180);
      ellipse(particleX, particleY, 3, 3);
  }

  // Δεξιά και αριστερά φύλλα της πόρτας
  fill(10, 10, 40); // Σκούρο μπλε
  rect(x - 60, y, 60 * scale, 150 * scale, 5); // Αριστερό φύλλο
  rect(x + 101, y, 60 * scale, 150 * scale, 5); // Δεξιό φύλλο

  // Χερούλια
  fill(200, 200, 200);
  rect(x - 35, y + 70, 8, 4); // Αριστερό χερούλι
  rect(x + 110, y + 70, 8, 4); // Δεξιό χερούλι
}


//secretRoomStartX + secretRoomWidth - 215, height - 200


let isTransitioningCosmic = false;
let showDoorCosmicMessage = false;
function checkCosmicDoorInteraction(player) {
  if (
      player.x + player.width > secretRoomStartX &&
      player.x >= secretRoomStartX + secretRoomWidth - 185 &&
      player.y + player.height > doorY &&
      player.y < doorY + height - 200
  ) {
      showDoorCosmicMessage = true

      if (keyIsDown(70) && !isTransitioningCosmic) { // Πατά το "F"
        isTransitioningCosmic = true;
        gameState =="playing"; // Μετάβαση στο secret room
        // Μεταφορά του παίκτη στη νέα θέση
        player.x =100; // Τοποθετούμε τον παίκτη μέσα στο δωμάτιο
        player.y = height - PLATFORM_HEIGHT - player.height;
        currentLevel ++;
        updateLevelTracker();

        resetNPCs(); // Επαναφορά NPCs στην αρχική κατάσταση
        setupRoom();
        isChasing = false; // Επαναφορά του flag
        
        // Απελευθέρωση του flag μετά τη μετάβαση
        setTimeout(() => {
          isTransitioning = false; // Επαναφορά του flag
      }, 500); // Χρονική καθυστέρηση για να ολοκληρωθεί η μετάβαση
      }
  } else {
      showDoorCosmicMessage = false;
  }
}


function drawNoSmokingSign() {
  const x = width +550;
  const y = 480;
  const diameter = 25; // Πολύ μικρό μέγεθος

  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, diameter);

  stroke(255);
  strokeWeight(2); // Λεπτό πάχος γραμμής
  line(x - diameter / 2.5, y - diameter / 2.5, x + diameter / 2.5, y + diameter / 2.5);

  noStroke();
  fill(255);
  rect(x - 5, y + 2, 12, 2); // Μικρή οριζόντια γραμμή
  fill(255, 165, 0);
  rect(x + 5, y + 2, 2, 2); // Μικρότερο πορτοκαλί πλαίσιο

  noFill();
  stroke(255);
  strokeWeight(1);
  arc(x - 7, y - 2, 5, 5, PI / 4, (3 * PI) / 4); // Μικρό τόξο
  arc(x - 8, y - 4, 4, 4, PI / 4, (3 * PI) / 4);
}



// ************************* SIGN BOARDS ******************************* //

function drawSignBoard1(x, y) {
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


function drawSignBoard2(x, y) {
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