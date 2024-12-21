


  
function drawGameChar(gameChar_x, gameChar_y, isLeft, isRight, isFalling, isPlummeting) {
  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    // Κεφάλι
  fill(217, 215, 176); // Χρώμα δέρματος
  ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι

  // Μαλλιά
  fill(50, 25, 10); // Σκούρο καφέ
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI); // Μαλλιά στο πάνω μέρος του κεφαλιού

  // Μάτια με κατεύθυνση πάνω αριστερά
  fill(255); // Λευκά των ματιών
  ellipse(gameChar_x - 5, gameChar_y - 54, 5, 3); // Αριστερό μάτι
  ellipse(gameChar_x + 3, gameChar_y - 54, 5, 3); // Δεξί μάτι

  fill(0); // Κόρες
  ellipse(gameChar_x - 6, gameChar_y - 55, 2, 2); // Αριστερή κόρη
  ellipse(gameChar_x + 2, gameChar_y - 55, 2, 2); // Δεξιά κόρη

  // Φρύδια με κατεύθυνση πάνω αριστερά
  stroke(50, 25, 10); // Σκούρο καφέ για τα φρύδια
  strokeWeight(1);
  line(gameChar_x - 8, gameChar_y - 56, gameChar_x - 4, gameChar_y - 57); // Αριστερό φρύδι
  line(gameChar_x + 1, gameChar_y - 57, gameChar_x + 5, gameChar_y - 56); // Δεξί φρύδι
  noStroke();

  // Στόμα (ουδέτερο)
  fill(255, 150, 150); // Ανοιχτό κόκκινο
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI); // Ήρεμο στόμα

  // Μύτη
  stroke(217, 215, 176); // Ίδιο χρώμα με το δέρμα
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48); // Μικρή κάθετη γραμμή για μύτη
  noStroke();

    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    quad(
      gameChar_x - 3,
      gameChar_y - 10,
      gameChar_x - 8,
      gameChar_y - 10,
      gameChar_x - 14,
      gameChar_y,
      gameChar_x - 9,
      gameChar_y
    );

    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

    //arm left
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x - 6,
      gameChar_y - 60,
      gameChar_x - 11,
      gameChar_y - 60
    );
  } else if (isRight && isFalling) {
    // add your jumping-right code
     // Κεφάλι
  fill(217, 215, 176); // Χρώμα δέρματος
  ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι

  // Μαλλιά
  fill(50, 25, 10); // Σκούρο καφέ
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI); // Μαλλιά στο πάνω μέρος του κεφαλιού

  // Μάτια με κατεύθυνση πάνω δεξιά
  fill(255); // Λευκά των ματιών
  ellipse(gameChar_x - 3, gameChar_y - 54, 5, 3); // Αριστερό μάτι
  ellipse(gameChar_x + 5, gameChar_y - 54, 5, 3); // Δεξί μάτι

  fill(0); // Κόρες
  ellipse(gameChar_x - 2, gameChar_y - 55, 2, 2); // Αριστερή κόρη
  ellipse(gameChar_x + 6, gameChar_y - 55, 2, 2); // Δεξιά κόρη

  // Φρύδια με κατεύθυνση πάνω δεξιά
  stroke(50, 25, 10); // Σκούρο καφέ για τα φρύδια
  strokeWeight(1);
  line(gameChar_x - 5, gameChar_y - 57, gameChar_x - 1, gameChar_y - 56); // Αριστερό φρύδι
  line(gameChar_x + 4, gameChar_y - 56, gameChar_x + 8, gameChar_y - 57); // Δεξί φρύδι
  noStroke();

  // Στόμα (ουδέτερο)
  fill(255, 150, 150); // Ανοιχτό κόκκινο
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI); // Ήρεμο στόμα

  // Μύτη
  stroke(217, 215, 176); // Ίδιο χρώμα με το δέρμα
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48); // Μικρή κάθετη γραμμή για μύτη
  noStroke();

    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    quad(
      gameChar_x - 3 + 12,
      gameChar_y - 10,
      gameChar_x - 8 + 12,
      gameChar_y - 10,
      gameChar_x - 14 + 22,
      gameChar_y,
      gameChar_x - 9 + 22,
      gameChar_y
    );

    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);

    //arm right
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x + 11,
      gameChar_y - 60,
      gameChar_x + 6,
      gameChar_y - 60
    );
  } else if (isLeft) {
    // add your walking left code
    // Κεφάλι
  fill(217, 215, 176); // Χρώμα δέρματος
  ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι

  // Μαλλιά
  fill(50, 25, 10); // Σκούρο καφέ
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI); // Μαλλιά στο πάνω μέρος του κεφαλιού

  // Μάτια με κατεύθυνση αριστερά
  fill(255); // Λευκά των ματιών
  ellipse(gameChar_x - 6, gameChar_y - 52, 5, 3); // Αριστερό μάτι
  ellipse(gameChar_x + 4, gameChar_y - 52, 5, 3); // Δεξί μάτι

  fill(0); // Κόρες
  ellipse(gameChar_x - 7, gameChar_y - 52, 2, 2); // Αριστερή κόρη
  ellipse(gameChar_x + 3, gameChar_y - 52, 2, 2); // Δεξιά κόρη

  // Φρύδια με κατεύθυνση αριστερά
  stroke(50, 25, 10); // Σκούρο καφέ για τα φρύδια
  strokeWeight(1);
  line(gameChar_x - 8, gameChar_y - 54, gameChar_x - 4, gameChar_y - 55); // Αριστερό φρύδι
  line(gameChar_x + 2, gameChar_y - 55, gameChar_x + 6, gameChar_y - 54); // Δεξί φρύδι
  noStroke();

  // Στόμα
  fill(255, 150, 150); // Ανοιχτό κόκκινο
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI); // Ήρεμο στόμα

  // Μύτη
  stroke(217, 215, 176); // Ίδιο χρώμα με το δέρμα
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48); // Μικρή κάθετη γραμμή για μύτη
  noStroke();

    //arm right
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x + 11,
      gameChar_y - 20
    );

    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    quad(
      gameChar_x - 3,
      gameChar_y - 10,
      gameChar_x - 8,
      gameChar_y - 10,
      gameChar_x - 14,
      gameChar_y,
      gameChar_x - 9,
      gameChar_y
    );

    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

    //arm left
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x - 6,
      gameChar_y - 20,
      gameChar_x - 11,
      gameChar_y - 20
    );
  } else if (isRight) {
    // add your walking right code
    // Κεφάλι
  fill(217, 215, 176); // Χρώμα δέρματος
  ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι

  // Μαλλιά
  fill(50, 25, 10); // Σκούρο καφέ
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI); // Μαλλιά στο πάνω μέρος του κεφαλιού

  // Μάτια με κατεύθυνση δεξιά
  fill(255); // Λευκά των ματιών
  ellipse(gameChar_x - 4, gameChar_y - 52, 5, 3); // Αριστερό μάτι
  ellipse(gameChar_x + 6, gameChar_y - 52, 5, 3); // Δεξί μάτι

  fill(0); // Κόρες
  ellipse(gameChar_x - 3, gameChar_y - 52, 2, 2); // Αριστερή κόρη
  ellipse(gameChar_x + 7, gameChar_y - 52, 2, 2); // Δεξιά κόρη

  // Φρύδια με κατεύθυνση δεξιά
  stroke(50, 25, 10); // Σκούρο καφέ για τα φρύδια
  strokeWeight(1);
  line(gameChar_x - 6, gameChar_y - 55, gameChar_x - 2, gameChar_y - 54); // Αριστερό φρύδι
  line(gameChar_x + 4, gameChar_y - 54, gameChar_x + 8, gameChar_y - 55); // Δεξί φρύδι
  noStroke();

  // Στόμα
  fill(255, 150, 150); // Ανοιχτό κόκκινο
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI); // Ήρεμο στόμα

  // Μύτη
  stroke(217, 215, 176); // Ίδιο χρώμα με το δέρμα
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48); // Μικρή κάθετη γραμμή για μύτη
  noStroke();

    //arm left
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x - 6,
      gameChar_y - 20,
      gameChar_x - 11,
      gameChar_y - 20
    );

    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    quad(
      gameChar_x - 3 + 12,
      gameChar_y - 10,
      gameChar_x - 8 + 12,
      gameChar_y - 10,
      gameChar_x - 14 + 22,
      gameChar_y,
      gameChar_x - 9 + 22,
      gameChar_y
    );

    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);

    //arm right
    fill(50, 51, 59);
    quad(
      gameChar_x - 2,
      gameChar_y - 40,
      gameChar_x + 3,
      gameChar_y - 40,
      gameChar_x + 11,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 20
    );
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    // Κεφάλι με σκίαση
    noStroke();
    fill(217, 215, 176); // Βασικό χρώμα δέρματος
    ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι
  
    fill(200, 190, 150); // Ελαφρώς πιο σκούρα σκιά
    ellipse(gameChar_x, gameChar_y - 52, 18, 18); // Εσωτερική σκιά στο κεφάλι
  
    // Μαλλιά με υφή
    fill(50, 25, 10); // Σκούρο καφέ
    beginShape(); // Μαλλιά με εφέ
    vertex(gameChar_x - 10, gameChar_y - 60);
    bezierVertex(gameChar_x - 12, gameChar_y - 70, gameChar_x + 12, gameChar_y - 70, gameChar_x + 10, gameChar_y - 60);
    vertex(gameChar_x + 10, gameChar_y - 60);
    bezierVertex(gameChar_x + 5, gameChar_y - 55, gameChar_x - 5, gameChar_y - 55, gameChar_x - 10, gameChar_y - 60);
    endShape(CLOSE);
  
    // Μάτια με λεπτομέρεια
    fill(255); // Λευκά των ματιών
    ellipse(gameChar_x - 5, gameChar_y - 52, 5, 3); // Αριστερό μάτι
    ellipse(gameChar_x + 5, gameChar_y - 52, 5, 3); // Δεξί μάτι
  
    fill(0); // Κόρες ματιών
    ellipse(gameChar_x - 5, gameChar_y - 52, 2, 2); // Αριστερή κόρη
    ellipse(gameChar_x + 5, gameChar_y - 52, 2, 2); // Δεξιά κόρη
  
    // Μύτη με όγκο
    fill(217, 215, 176); // Ίδιο χρώμα με το δέρμα
    triangle(gameChar_x, gameChar_y - 50, gameChar_x - 1, gameChar_y - 48, gameChar_x + 1, gameChar_y - 48); // Τριγωνική μύτη
  
    // Στόμα ανοιχτό για άλμα
    fill(255, 100, 100); // Χρώμα χειλιών
    ellipse(gameChar_x, gameChar_y - 46, 6, 8); // Ανοιχτό στόμα
    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);
    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

    //arms
    fill(50, 51, 59);
    rect(gameChar_x - 12, gameChar_y - 58, 5, 20);
    rect(gameChar_x + 8, gameChar_y - 58, 5, 20);
  } else {
    // add your standing front facing code
    // Κεφάλι
// Κεφάλι με σκίαση
noStroke();
fill(217, 215, 176); // Βασικό χρώμα δέρματος
ellipse(gameChar_x, gameChar_y - 50, 20, 20); // Κεφάλι

fill(200, 190, 150); // Ελαφρώς πιο σκούρα σκιά
ellipse(gameChar_x, gameChar_y - 52, 18, 18); // Εσωτερική σκιά στο κεφάλι

// Μαλλιά με υφή
fill(50, 25, 10); // Σκούρο καφέ
beginShape(); // Μαλλιά με εφέ
vertex(gameChar_x - 10, gameChar_y - 60);
bezierVertex(gameChar_x - 12, gameChar_y - 70, gameChar_x + 12, gameChar_y - 70, gameChar_x + 10, gameChar_y - 60);
vertex(gameChar_x + 10, gameChar_y - 60);
bezierVertex(gameChar_x + 5, gameChar_y - 55, gameChar_x - 5, gameChar_y - 55, gameChar_x - 10, gameChar_y - 60);
endShape(CLOSE);

// Μάτια με λεπτομέρεια
fill(255); // Λευκά των ματιών
ellipse(gameChar_x - 5, gameChar_y - 52, 5, 3); // Αριστερό μάτι
ellipse(gameChar_x + 5, gameChar_y - 52, 5, 3); // Δεξί μάτι

fill(0); // Κόρες ματιών
ellipse(gameChar_x - 5, gameChar_y - 52, 2, 2); // Αριστερή κόρη
ellipse(gameChar_x + 5, gameChar_y - 52, 2, 2); // Δεξιά κόρη

stroke(0); // Μαύρο περίγραμμα για τις βλεφαρίδες
strokeWeight(0.5);
line(gameChar_x - 7, gameChar_y - 54, gameChar_x - 3, gameChar_y - 54); // Αριστερή βλεφαρίδα
line(gameChar_x + 3, gameChar_y - 54, gameChar_x + 7, gameChar_y - 54); // Δεξιά βλεφαρίδα
noStroke();

// Μύτη με όγκο
fill(217, 215, 176); // Ίδιο χρώμα με το δέρμα
triangle(gameChar_x, gameChar_y - 50, gameChar_x - 1, gameChar_y - 48, gameChar_x + 1, gameChar_y - 48); // Τριγωνική μύτη

// Στόμα με χείλη
fill(255, 100, 100); // Χρώμα χειλιών
beginShape();
vertex(gameChar_x - 4, gameChar_y - 46);
bezierVertex(gameChar_x - 2, gameChar_y - 44, gameChar_x + 2, gameChar_y - 44, gameChar_x + 4, gameChar_y - 46);
bezierVertex(gameChar_x + 2, gameChar_y - 48, gameChar_x - 2, gameChar_y - 48, gameChar_x - 4, gameChar_y - 46);
endShape(CLOSE);

    //body
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

    //legs
    fill(50, 51, 59);
    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);
    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

    //arms
    fill(50, 51, 59);
    rect(gameChar_x - 12, gameChar_y - 42, 5, 20);
    rect(gameChar_x + 8, gameChar_y - 42, 5, 20);
  }
}

  