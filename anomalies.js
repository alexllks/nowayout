
function drawFloodingWater(startX, startY, isAnomaly) {
  let waveHeight = 10; // Height of the wave peaks
  let waveSpeed = 2; // Speed of the waves' motion
  let waveFrequency = 0.02; // Frequency of the waves
  let floodWidth = isAnomaly ? frameCount * 2 : 0; // Flood progression
  
  // Draw the water surface with waves
  fill(0, 0, 255, 180); // Blue with transparency
  noStroke();
  beginShape();
  for (let x = startX; x >= startX - floodWidth; x--) {
      let y = startY + sin((x + frameCount * waveSpeed) * waveFrequency) * waveHeight;
      vertex(x, y);
  }
  vertex(startX - floodWidth, height); // Extend down to the bottom
  vertex(startX, height); // Bottom-right corner
  endShape(CLOSE);
  
  // Flood limit to prevent it from filling indefinitely
  if (startX - floodWidth <= 0) {
      floodWidth = startX; 
  }
}



function setupRoom() {
  // Λίστα ανωμαλιών με βάρη
  const anomalies = ["sofa", "fridge", "kitchen", "table","mirror", "doll", "TV", "Bookshelf","radio", "ghost","none","none" ];
  // Το "ghost" εμφανίζεται περισσότερες φορές για να έχει μεγαλύτερη πιθανότητα


  if (gameState != 'menu'){  

    const selectedAnomaly = random(anomalies); // Επιλογή ανωμαλίας με βάση τα βάρη
    console.log(`Selected anomaly: ${selectedAnomaly}`);


    hasAnomaly = true; // Υποδεικνύει ότι υπάρχει ανωμαλία
    objects = [
     
      { x: 4600, y: height - 100, type: 'radio', isAnomaly: false },
      { x: 4500, y: height - 412, type: 'radio', isAnomaly: false },



      { x: 3790, y: height - 100, type: 'mirror', isAnomaly: false },
      { x: 3470, y: height - 355, type: 'doll', isAnomaly: false, speed: 2, direction: 1},
      { x: 2650, y: height - 20, type: 'sofa', isAnomaly: false },
      { x: 5340, y: height - 320, type: 'fridge', isAnomaly: false },
      { x: 4980, y: height - 350, type: 'kitchen', isAnomaly: false },
      { x: 5610, y: height - 81, type: 'table', isAnomaly:false},
      { x: 5555, y: height - 410, type: 'TV', isAnomaly:false},
      { x: 3150, y: height -140, type: 'Bookshelf', isAnomaly:false},
      

     // { x: 800, y: height - 30, type: 'cart', isAnomaly: false },
     { x: 5545, y: height - 365, type: 'table', isAnomaly: false },
     // { x: 1220, y: height - 30, type: 'lamp', isAnomaly: false },
      { x: 5530, y: height - 330, type: 'chair', isAnomaly: false },
      { x: 5650, y: height - 330, type: 'chair', isAnomaly: false },
      { x: 2845, y: height - 200, type: 'Painting', isAnomaly: false },
      { x: 2650, y: height - 20, type: 'sofa2', isAnomaly: false },
      { x: 2910, y: height - 20, type: 'fridge2', isAnomaly: false },
      { x: 2650, y: height - 20, type: 'sofa2', isAnomaly: false },
        { x: 400, y: 300, type: 'ghost', isAnomaly: false }
    ];

 

    // Αν επιλεγεί "none", δεν υπάρχει ανωμαλία
    if (selectedAnomaly === "none") {
      console.log("No anomalies in this room.");
      hasAnomaly = false; // Υποδεικνύει ότι δεν υπάρχει ανωμαλία
      ghosts = []; // Καθαρισμός φαντασμάτων αν δεν υπάρχει ανωμαλία
      return; // Τερματίζει την εκτέλεση της setupRoom
    }

    if (selectedAnomaly === "radio") {
      for (let obj of objects) {
          if (obj.type === "radio") {
              obj.isAnomaly = true; // Set one radio as an anomaly
              console.log("Radio anomaly activated!");
          }
      }
  }

    if (selectedAnomaly === "character") {
      for (let obj of objects) {
          if (obj.type === "character") {
              obj.speed = 3; // Ενεργοποίηση ταχύτητας αν χρειάζεται
          }
      }
  }
    if (selectedAnomaly === "ghost") {
        createGhosts(1); // Δημιουργία φαντασμάτων μόνο αν η ανωμαλία είναι ghost
        console.log("Ghost anomaly activated!");
    } else {
        // Ορισμός άλλου αντικειμένου ως ανωμαλία
        for (let obj of objects) {
            if (obj.type === selectedAnomaly && gameState != 'menu') {
                obj.isAnomaly = true; // Ορισμός του αντικειμένου ως ανώμαλο
                console.log(`${selectedAnomaly} anomaly activated!`);
            }
        }
        ghosts = []; // Καθαρισμός φαντασμάτων
    }
  }
}










function createGhosts(count) {
  for (let i = 0; i < count; i++) {
      ghosts.push({
          x: 2000,
          y: random(100, height - 150),
          size: 50,
          speed: random(1, 3),
          direction: 1
      });
  }
}

function drawGhosts() {
if (ghosts.length === 0) return; // Επιστροφή αν δεν υπάρχουν φαντάσματα

for (let ghost of ghosts) {
    // Draw ghost body
    fill(255, 255, 255, 180); // Semi-transparent
    noStroke();
    beginShape(); // Create body
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

    // Draw eyes
    fill(0);
    ellipse(ghost.x - ghost.size / 4, ghost.y - ghost.size / 4, ghost.size / 8, ghost.size / 8);
    ellipse(ghost.x + ghost.size / 4, ghost.y - ghost.size / 4, ghost.size / 8, ghost.size / 8);

    // Draw mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(ghost.x, ghost.y, ghost.size / 3, ghost.size / 6, 0, PI);

    // Chase logic
    if (player.x > 2000  && player.x < 5000) { // Start chasing if player is past x=100
        let dx = player.x - ghost.x;
        let dy = player.y - ghost.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize to get direction vector
        ghost.x += (dx / distance) * ghost.speed;
        ghost.y += (dy / distance) * ghost.speed;

        // Check collision with the player
        if (
            Math.abs(player.x - ghost.x) < ghost.size / 2 &&
            Math.abs(player.y - ghost.y) < ghost.size / 2
        ) {
            playGameAfterLost();
        }
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
  function drawObjects() {
    for (let obj of objects) {
        if (obj.type === 'door') drawDoor2(obj.x, obj.y, obj.isMoving);
        if (obj.type === 'mirror') drawMirror(obj.x, obj.y, obj.isAnomaly);
     
        if (obj.type === 'sofa') drawSofa(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'fridge') drawFridge(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'kitchen') drawKitchen(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'cart') drawCart(obj.x, obj.y, obj.isAnomaly);
       // if (obj.type === 'table') drawTable(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'lamp') drawLamp(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'chair') drawChair(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'table') drawDiningTable(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'TV') drawTV(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'Bookshelf') drawBookshelf(obj.x, obj.y, obj.isAnomaly);
        if (obj.type === 'Painting') drawPainting(obj.x, obj.y, obj.isAnomaly);
        if(obj.type === 'ghost') drawGhosts();

        if (obj.type === 'radio') drawRadio(obj.x, obj.y, obj.isAnomaly ? 'anomaly' : 'normal');

           if (obj.type === 'doll') {
          drawDoll(obj.x, obj.y, obj.isAnomaly); 
          updateDoll(obj, player);
    }
    }
  }

  function drawRadio(x, y, type = "normal") {
    const scale = 0.3; // Κλίμακα μεγέθους για να προσαρμόσεις το μέγεθος
    if (type === "normal") {
     

      // Σώμα ραδιοφώνου
      fill(50, 25, 5);
      rect(x, y, 150 * scale, 100 * scale, 10); // Κυρίως σώμα με στρογγυλεμένες γωνίες
  
      // Χρυσές γραμμές
      stroke(255, 215, 0); // Χρυσό
      strokeWeight(2);
      line(x + 5 * scale, y + 10 * scale, x + 145 * scale, y + 10 * scale); // Πάνω χρυσή γραμμή
      line(x + 5 * scale, y + 90 * scale, x + 145 * scale, y + 90 * scale); // Κάτω χρυσή γραμμή
      noStroke();
  
      // Γρίλια ηχείου
      fill(50);
      rect(x + 20 * scale, y + 20 * scale, 110 * scale, 30 * scale); // Κεντρική γρίλια
  
      // Κουμπιά έντασης και συντονισμού
      fill(200, 200, 200); // Ασημί για τα κουμπιά
      ellipse(x + 30 * scale, y + 75 * scale, 20 * scale, 20 * scale); // Κουμπί αριστερά
      ellipse(x + 120 * scale, y + 75 * scale, 20 * scale, 20 * scale); // Κουμπί δεξιά
  
      // Οθόνη
      fill(255, 165, 0); // Πορτοκαλί για την οθόνη
      rect(x + 50 * scale, y + 60 * scale, 50 * scale, 15 * scale, 2); // Ορθογώνιο για την οθόνη
  
      // Στοιχεία οθόνης
      fill(0); // Μαύρο για κείμενο
      textSize(10 * scale);
      textAlign(CENTER, CENTER);
      text("88.5 FM", x + 75 * scale, y + 67.5 * scale);
  
      // Διακοσμητικά κουμπιά/πλήκτρα
      fill(150);
      for (let i = 0; i < 5; i++) {
          rect(x + 50 * scale + i * 10 * scale, y + 80 * scale, 8 * scale, 5 * scale);
      }
  
      // Κεραία
      stroke(200);
      strokeWeight(2);
      line(x + 10 * scale, y, x - 20 * scale, y - 30 * scale); // Κεραία που προεξέχει
      noStroke();
  
    } else if (type === "anomaly") {
        // Τρομακτικό Ραδιόφωνο
        fill(50, 20, 20); // Σκούρο κόκκινο για το ξύλο
        // Σώμα ραδιοφώνου
      //fill(139, 69, 19); // Καφέ χρώμα για το ξύλο
      rect(x, y, 150 * scale, 100 * scale, 10); // Κυρίως σώμα με στρογγυλεμένες γωνίες
  
      // Χρυσές γραμμές
      stroke(255, 215, 0); // Χρυσό
      strokeWeight(2);
      line(x + 5 * scale, y + 10 * scale, x + 145 * scale, y + 10 * scale); // Πάνω χρυσή γραμμή
      line(x + 5 * scale, y + 90 * scale, x + 145 * scale, y + 90 * scale); // Κάτω χρυσή γραμμή
      noStroke();
  
      // Γρίλια ηχείου
      fill(50);
      rect(x + 20 * scale, y + 20 * scale, 110 * scale, 30 * scale); // Κεντρική γρίλια
  
      // Κουμπιά έντασης και συντονισμού
      fill(200, 200, 200); // Ασημί για τα κουμπιά
      ellipse(x + 30 * scale, y + 75 * scale, 20 * scale, 20 * scale); // Κουμπί αριστερά
      ellipse(x + 120 * scale, y + 75 * scale, 20 * scale, 20 * scale); // Κουμπί δεξιά
  
      // Οθόνη
      fill(255, 165, 0); // Πορτοκαλί για την οθόνη
      rect(x + 50 * scale, y + 60 * scale, 50 * scale, 15 * scale, 2); // Ορθογώνιο για την οθόνη
  
      // Στοιχεία οθόνης
      fill(0); // Μαύρο για κείμενο
      textSize(10 * scale);
      textAlign(CENTER, CENTER);
      text("88.5 FM", x + 75 * scale, y + 67.5 * scale);
  
      // Διακοσμητικά κουμπιά/πλήκτρα
      fill(150);
      for (let i = 0; i < 5; i++) {
          rect(x + 50 * scale + i * 10 * scale, y + 80 * scale, 8 * scale, 5 * scale);
      }
  
      // Κεραία
      stroke(200);
      strokeWeight(2);
      line(x + 10 * scale, y, x - 20 * scale, y - 30 * scale); // Κεραία που προεξέχει
      noStroke();
}

  }

  function drawCharacter(x, y) {
    const scale = 0.8; // Κλίμακα μεγέθους

    // Σώμα του χαρακτήρα
    fill(100, 200, 100); // Πράσινο για διαφορετικότητα από τον παίκτη
    rect(x - 15 * scale, y - 50 * scale, 30 * scale, 50 * scale); // Σώμα

    // Κεφάλι
    fill(200, 150, 100); // Χρώμα δέρματος
    ellipse(x, y - 65 * scale, 30 * scale, 30 * scale); // Κεφάλι

    // Πόδια
    fill(100, 200, 100);
    rect(x - 10 * scale, y, 10 * scale, 20 * scale); // Αριστερό πόδι
    rect(x, y, 10 * scale, 20 * scale); // Δεξί πόδι

    // Μάτια
    fill(0);
    ellipse(x - 5 * scale, y - 70 * scale, 5 * scale, 5 * scale); // Αριστερό μάτι
    ellipse(x + 5 * scale, y - 70 * scale, 5 * scale, 5 * scale); // Δεξί μάτι
}


function updateCharacter(obj) {
  obj.x += obj.speed * obj.direction;

  // Επαναφορά στη δεξιά πλευρά όταν φτάνει στο τέλος
  if (obj.x < 0) {
    obj.x = PLATFORM_WIDTH/2 + 100;
  }
}


  function drawMirror(x, y, isAnomaly) {
    const width = 90;  // Πλάτος καθρέφτη
    const height = 140; // Ύψος καθρέφτη

    // Πλαίσιο καθρέφτη
    fill(100, 50, 20); // Σκούρο ξύλο
    rect(x - width / 2, y - height / 2, width, height);

    // Επιφάνεια καθρέφτη
    fill(50, 70, 100, 200); // Σκούρο μπλε-γκρι για το γυαλί
    rect(x - width / 2 + 5, y - height / 2 + 5, width - 10, height - 10);

    if (isAnomaly) {
        // Ραγισμένος καθρέφτης
       // drawMirrorCracks(x, y, width, height);

        // Τρομακτική αντανάκλαση
        drawScaryReflection(x, y, width, height);

        // Τρομακτικό μήνυμα
        fill(255, 0, 0, 200);
        textAlign(CENTER, CENTER);
        textSize(16);
       // text("GET OUT", x, y + height / 2 - 20);
    }
}

// Στοιχείο: Ρωγμές στον καθρέφτη
function drawMirrorCracks(x, y, width, height) {
    stroke(255, 255, 255, 150); // Λευκές ρωγμές
    strokeWeight(1.5);

    // Δημιουργία βασικών ρωγμών
    for (let i = 0; i < 10; i++) {
        const startX = random(x - width / 2 + 5, x + width / 2 - 5);
        const startY = random(y - height / 2 + 5, y + height / 2 - 5);
        const endX = startX + random(-30, 30);
        const endY = startY + random(-30, 30);
        line(startX, startY, endX, endY);
    }

    // Δημιουργία κεντρικής μεγάλης ρωγμής
    const centerX = x;
    const centerY = y;
    for (let i = 0; i < 5; i++) {
        const endX = centerX + random(-width / 2 + 10, width / 2 - 10);
        const endY = centerY + random(-height / 2 + 10, height / 2 - 10);
        line(centerX, centerY, endX, endY);
    }

    noStroke();
}

// Στοιχείο: Τρομακτική αντανάκλαση
function drawScaryReflection(x, y, width, height) {
    const offsetX = sin(frameCount * 0.1) * 5; // Κίνηση φιγούρας
    const offsetY = cos(frameCount * 0.1) * 2; // Κίνηση πάνω-κάτω

    fill(0); // Μαύρο για τη σκιά
    ellipse(x + offsetX, y - height / 4 + offsetY, 30, 40); // Σιλουέτα

    fill(255, 0, 0); // Κόκκινα μάτια
    ellipse(x + offsetX - 5, y - height / 4 - 5 + offsetY, 8, 8); // Αριστερό μάτι
    ellipse(x + offsetX + 5, y - height / 4 - 5 + offsetY, 8, 8); // Δεξί μάτι

    noFill();
    stroke(255, 0, 0, 150);
    arc(x + offsetX, y - height / 4 + 10 + offsetY, 20, 10, 0, PI); // Στόμα με καμπύλη
    noStroke();
}



function drawDoll(x, y, isAnomaly) {
  const scale = 0.6;

  // Σώμα της κούκλας
  fill(250, 220, 200); // Κεφάλι
  ellipse(x, y - 50 * scale, 40 * scale, 50 * scale);

  fill(150, 50, 50); // Φόρεμα
  rect(x - 20 * scale, y - 30 * scale, 40 * scale, 60 * scale);

  fill(250, 220, 200); // Χέρια
  ellipse(x - 25 * scale, y - 20 * scale, 15 * scale, 15 * scale);
  ellipse(x + 25 * scale, y - 20 * scale, 15 * scale, 15 * scale);

  fill(150, 50, 50); // Πόδια
  rect(x - 15 * scale, y + 30 * scale, 10 * scale, 20 * scale);
  rect(x + 5 * scale, y + 30 * scale, 10 * scale, 20 * scale);

  // Πρόσωπο
  drawDollFace(x, y - 50 * scale, scale, isAnomaly);
}

function drawDollFace(x, y, scale, isAnomaly) {
  if (!isAnomaly) {
      fill(0);
      ellipse(x - 10 * scale, y - 5 * scale, 5 * scale, 5 * scale); // Μάτια
      ellipse(x + 10 * scale, y - 5 * scale, 5 * scale, 5 * scale);
      noFill();
      stroke(0);
      arc(x, y + 10 * scale, 10 * scale, 5 * scale, 0, PI);
      noStroke();
  } else {
      fill(255, 0, 0); // Τρομακτικά μάτια
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
      // Υπολογισμός κατεύθυνσης προς τον παίκτη
      let dx = player.x - obj.x;
      let dy = player.y - obj.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // Κίνηση της κούκλας προς τον παίκτη
      if (distance > 1) { // Αν δεν είναι πολύ κοντά στον παίκτη
          obj.x += (dx / distance) * obj.speed;
          obj.y += (dy / distance) * obj.speed;
      }

      // Περιορισμός κίνησης στα όρια της οθόνης
      obj.x = constrain(obj.x, 50, width - 50);
      obj.y = constrain(obj.y, 50, height - 50);
  }
}
// function drawDolls() {
//   for (let doll of dolls) {
//       drawDoll(doll.x, doll.y, doll.isAnomaly);
//   }
// }

function activateDollAnomaly() {
  for (let doll of dolls) {
      doll.isAnomaly = true;
  }
}






  function drawDoor2(x, y, isMoving) {
    fill(139, 69, 19); // Καφέ
    if (isMoving) x += sin(frameCount * 0.05) * 5; // Κίνηση αριστερά-δεξιά
    rect(x, y - 100, 50, 100); // Πόρτα
    fill(255);
    ellipse(x + 40, y - 50, 10); // Χερούλι
}


function drawTV(x, y, isAnomaly) {
  let scale = 0.5;

  // Πλαίσιο τηλεόρασης
  fill(50);
  rect(x, y, 140 * scale, 80 * scale, 5 * scale);

  if (isAnomaly) {
    // Στατικός θόρυβος
    fill(200);
    for (let i = 0; i < 100; i++) {
      let px = random(x + 10 * scale, x + 130 * scale);
      let py = random(y + 10 * scale, y + 70 * scale);
      rect(px, py, 2, 2);
    }

    // Υπολογισμός απόστασης παίκτη από την τηλεόραση
    let distance = dist(player.x, player.y, x + 70 * scale, y + 40 * scale); // Κέντρο τηλεόρασης

    if (distance < 300) { // Εντός 300 pixels να ακούγεται
      // Υπολογισμός έντασης με βάση την απόσταση
      let volume = map(distance, 0, 300, 0.3, 0); // Μέγιστη ένταση 0.5
      volume = constrain(volume, 0, 0.3); // Περιορισμός στο εύρος [0, 0.5]

      // Ρύθμιση έντασης ήχου
      tvSound.setVolume(volume);

      // Ξεκινά ο ήχος αν δεν παίζει
      if (!tvSound.isPlaying()) {
        tvSound.loop();
      }
    } else {
      // Σταματά ο ήχος αν ο παίκτης είναι εκτός εύρους
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

    // Σταματά τον ήχο αν δεν υπάρχει ανωμαλία
    tvSound.stop();
  }

  // Στήριγμα τηλεόρασης
  fill(70);
  rect(x + 60 * scale, y + 80 * scale, 20 * scale, 10 * scale);
}
function drawPainting(x, y, isAnomaly) {
  let scale = 0.6;

  // Πλαίσιο πίνακα
  fill(139, 69, 19); // Καφέ ξύλο
  rect(x, y, 120 * scale, 80 * scale); // Πλαίσιο

  // Κανονική ζωγραφική
  if (!isAnomaly) {
    fill(200, 200, 150); // Απαλό μπεζ φόντο
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 70 * scale);

    // Κανονικό έργο τέχνης (τοπίο)
    fill(50, 150, 255); // Ουρανός
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 35 * scale);
    fill(0, 200, 100); // Γρασίδι
    rect(x + 5 * scale, y + 40 * scale, 110 * scale, 35 * scale);

    fill(255, 200, 0); // Ήλιος
    ellipse(x + 100 * scale, y + 15 * scale, 15 * scale, 15 * scale);
  } 
  // Ανωμαλία στη ζωγραφική
  else {
    fill(50, 50, 50); // Σκοτεινό γκρι φόντο
    rect(x + 5 * scale, y + 5 * scale, 110 * scale, 70 * scale);

    // Αλλοιωμένο έργο τέχνης (μάτια και τρομακτικά στοιχεία)
    fill(255, 0, 0); // Κόκκινα μάτια
    ellipse(x + 40 * scale, y + 30 * scale, 10 * scale, 10 * scale);
    ellipse(x + 80 * scale, y + 30 * scale, 10 * scale, 10 * scale);

    fill(0);
    arc(x + 60 * scale, y + 60 * scale, 30 * scale, 15 * scale, 0, PI); // Στόμα με καμπύλη
  }
}



function drawBookshelf(x, y, isAnomaly) {
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


    // Ανωμαλία: Προσθήκη επιπλέον σειράς βιβλίων στα ράφια
    if (isAnomaly) {
      fill(250, 100, 50); rect(x + 10 * scale, y + 110 * scale, 15 * scale, 40 * scale); // Πορτοκαλί
      fill(0, 150, 200); rect(x + 30 * scale, y + 110 * scale, 15 * scale, 40 * scale); // Τιρκουάζ
      fill(180, 80, 40); rect(x + 50 * scale, y + 110 * scale, 15 * scale, 40 * scale); // Καφέ
  
      // Νέα σειρά βιβλίων στο κάτω μέρος
      fill(255, 150, 50); rect(x + 10 * scale, y + 160 * scale, 15 * scale, 40 * scale); // Νέο Βιβλίο 1
      fill(100, 200, 100); rect(x + 30 * scale, y + 160 * scale, 15 * scale, 40 * scale); // Νέο Βιβλίο 2
      fill(50, 50, 200); rect(x + 50 * scale, y + 160 * scale, 15 * scale, 40 * scale); // Νέο Βιβλίο 3
    }


}




  function drawSofa(x, y, isAnomaly) {
    if (isAnomaly) {
     
        fill(255, 0, 0); // Κόκκινο χρώμα για ανωμαλία
        rect(x - 30, y - 25, 120, 80); // Μεγαλύτερο σώμα για ανωμαλία
        rect(x - 25, y - 30, 110, 70); // Πλάτη του καναπέ
    } else {
        fill(139, 69, 19); // Καφέ χρώμα για το σώμα
        rect(x - 30, y - 25, 120, 80); // Σώμα του καναπέ
        fill(165, 42, 42); // Κόκκινο για το επάνω μέρος
        rect(x - 25, y - 30, 110, 70); // Πλάτη του καναπέ
    }
  }
  
  function drawFridge(x, y, isAnomaly) {
    let fridgeWidth = 60;  // Νέο πλάτος ψυγείου
    let fridgeHeight = 120; // Νέο ύψος ψυγείου
    let freezerHeight = 40; // Νέο ύψος κατάψυξης
    let doorHeight = fridgeHeight - freezerHeight; // Ύψος κύριας πόρτας
    let handleWidth = 4; // Πλάτος λαβής
    let handleHeightFreezer = 20; // Ύψος λαβής κατάψυξης
    let handleHeightDoor = 40; // Ύψος λαβής κύριας πόρτας

    if (isAnomaly) {
        // Ψυγείο με ανωμαλία
        fill(0, 255, 255); // Γαλάζιο για ανωμαλία
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, fridgeHeight); // Μεγαλύτερο σώμα
        fill(255, 0, 0); // Κόκκινο για τη λαβή
        rect(x + fridgeWidth / 2 - handleWidth - 5, y - fridgeHeight + 10, handleWidth + 2, handleHeightDoor + 10); // Παχύτερη λαβή
    } else {
        // Σώμα ψυγείου
        fill(192, 192, 192); // Γκρι
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, fridgeHeight);

        // Πόρτα κατάψυξης
        fill(220, 220, 220); // Πιο ανοιχτό γκρι
        rect(x - fridgeWidth / 2, y - fridgeHeight, fridgeWidth, freezerHeight);

        // Πόρτα ψυγείου
        fill(200, 200, 200); // Πιο σκούρο γκρι
        rect(x - fridgeWidth / 2, y - fridgeHeight + freezerHeight, fridgeWidth, doorHeight);

        // Λαβή κατάψυξης
        fill(0); // Μαύρο
        rect(x + fridgeWidth / 2 - handleWidth - 2, y - fridgeHeight + 10, handleWidth, handleHeightFreezer);

        // Λαβή κύριας πόρτας
        rect(x + fridgeWidth / 2 - handleWidth - 2, y - fridgeHeight + freezerHeight + 10, handleWidth, handleHeightDoor);
    }

    // Γραμμή διαχωρισμού πόρτας κατάψυξης και ψυγείου
    stroke(50); // Μαύρο περίγραμμα
    line(x - fridgeWidth / 2, y - fridgeHeight + freezerHeight, x + fridgeWidth / 2, y - fridgeHeight + freezerHeight);
    noStroke();
}


  
function drawKitchen(x, y, isAnomaly) {
  let scale = 0.7; // Κλίμακα μείωσης μεγέθους

  if (isAnomaly) {
    // Ανωμαλία: Ο νεροχύτης γεμίζει νερό και ξεχειλίζει
    fill(0, 100, 255); // Γαλάζιο νερό που ξεχειλίζει
    rect(x + 90 * scale, y + 20 * scale, 80 * scale, 40 * scale);
  }

  // Πάγκος εργασίας
  fill(120, 100, 80); // Καφέ για τον πάγκο
  rect(x, y, 300 * scale, 40 * scale);

  // Ντουλάπια πάνω από τον πάγκο
  fill(160); // Ανοιχτό γκρι για τα ντουλάπια
  rect(x, y - 100 * scale, 70 * scale, 60 * scale);
  rect(x + 80 * scale, y - 100 * scale, 70 * scale, 60 * scale);
  rect(x + 160 * scale, y - 100 * scale, 70 * scale, 60 * scale);

  if (!isAnomaly) {
    fill(100, 100, 255);
    rect(x + 100 * scale, y, 60 * scale, 20 * scale); // Κανονικός νεροχύτης
  }
  

  // Βρύση
  stroke(80);
  strokeWeight(2);
  noFill();
  arc(x + 130 * scale, y - 10 * scale, 20 * scale, 20 * scale, PI, TWO_PI);
  noStroke();

  // // Φούρνος
  // fill(80); // Σκούρο γκρι
  // rect(x + 220 * scale, y - 40 * scale, 50 * scale, 80 * scale);
  // fill(40);
  // rect(x + 230 * scale, y - 30 * scale, 30 * scale, 40 * scale);

  // Χερούλια ντουλαπιών
  fill(50);
  ellipse(x + 60 * scale, y - 70 * scale, 5 * scale, 5 * scale);
  ellipse(x + 140 * scale, y - 70 * scale, 5 * scale, 5 * scale);
  ellipse(x + 220 * scale, y - 70 * scale, 5 * scale, 5 * scale);
}

function drawDiningTable(x, y) {
  let scale = 0.6; // Κλίμακα μείωσης μεγέθους

  // Τραπέζι
  fill(120, 70, 50); // Καφέ για το τραπέζι
  rect(x, y, 150 * scale, 80 * scale);

  // Πόδια τραπεζιού
  fill(90, 50, 30);
  rect(x + 10 * scale, y + 70 * scale, 10 * scale, 30 * scale);
  rect(x + 130 * scale, y + 70 * scale, 10 * scale, 30 * scale);

  // // Καρέκλες
  // fill(150, 80, 60); // Χρώμα για τις καρέκλες
  // rect(x - 30 * scale, y + 20 * scale, 20 * scale, 50 * scale); // Αριστερή καρέκλα
  // rect(x + 160 * scale, y + 20 * scale, 20 * scale, 50 * scale); // Δεξιά καρέκλα
}
  
  function drawCart(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(255, 0, 255); // Ροζ για ανωμαλία
        rect(x - 15, y - 15, 30, 25); // Υψηλότερο σώμα για ανωμαλία
        fill(0, 255, 0); // Πράσινοι τροχοί για ανωμαλία
        ellipse(x - 10, y + 10, 15, 15); // Αριστερός τροχός
        ellipse(x + 10, y + 10, 15, 15); // Δεξιός τροχός
    } else {
        fill(102, 51, 0); // Καφέ για το καρότσι
        rect(x - 15, y - 10, 30, 15); // Σώμα του καροτσιού
        fill(0); // Μαύρο για τους τροχούς
        ellipse(x - 10, y + 5, 10, 10); // Αριστερός τροχός
        ellipse(x + 10, y + 5, 10, 10); // Δεξιός τροχός
    }
  }
  
  function drawTable(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(255, 215, 0); // Χρυσό για ανωμαλία
        rect(x - 30, y - 15, 60, 15); // Μεγαλύτερη επιφάνεια
        fill(139, 69, 19); // Σκούρο καφέ για τα πόδια
        rect(x - 25, y, 10, 20); // Πλατύτερα πόδια
        rect(x + 15, y, 10, 20);
    } else {
        fill(160, 82, 45); // Καφέ για το τραπέζι
        rect(x - 30, y - 10, 60, 10); // Επιφάνεια του τραπεζιού
        fill(139, 69, 19); // Σκούρο καφέ για τα πόδια
        rect(x - 25, y, 5, 15);
        rect(x + 20, y, 5, 15);
    }
  }
  



  function drawLamp(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(255, 0, 0); // Κόκκινο αμπαζούρ για ανωμαλία
        ellipse(x, y - 30, 25, 25); // Μεγαλύτερο αμπαζούρ
        fill(50); // Σκούρο γκρι βάση
        rect(x - 7, y - 10, 14, 15); // Μεγαλύτερη βάση
    } else {
        fill(255, 223, 0); // Κίτρινο για το αμπαζούρ
        ellipse(x, y - 20, 20, 20); // Σώμα της λάμπας
        fill(105, 105, 105); // Γκρι για τη βάση
        rect(x - 5, y - 10, 10, 10); // Βάση
        rect(x - 2, y, 4, 10); // Στήριγμα
    }
  }
  
  function drawChair(x, y, isAnomaly) {
    if (isAnomaly) {
        fill(0, 128, 128); // Τιρκουάζ για ανωμαλία
        rect(x - 15, y - 15, 30, 15); // Μεγαλύτερο κάθισμα
        fill(139, 69, 19); // Σκούρο καφέ για τα πόδια
        rect(x - 14, y, 5, 20); // Πλατύτερα πόδια
        rect(x + 9, y, 5, 20);
        rect(x - 14, y - 30, 5, 10); // Επέκταση πίσω ποδιών
        rect(x + 9, y - 30, 5, 10);
        fill(139, 69, 19); // Σκούρο καφέ για την πλάτη
        rect(x - 15, y - 40, 30, 5); // Πλάτη της καρέκλας
    } else {
        fill(205, 133, 63); // Ξανθό καφέ για το κάθισμα
        rect(x - 10, y - 10, 20, 10); // Κάθισμα της καρέκλας
        fill(139, 69, 19); // Σκούρο καφέ για τα πόδια
        rect(x - 9, y, 4, 10); // Αριστερό πόδι μπροστά
        rect(x + 5, y, 4, 10); // Δεξιό πόδι μπροστά
        rect(x - 9, y - 20, 4, 10); // Αριστερό πόδι πίσω
        rect(x + 5, y - 20, 4, 10); // Δεξιό πόδι πίσω
        rect(x - 10, y - 30, 20, 5); // Πλάτη της καρέκλας
    }
  }