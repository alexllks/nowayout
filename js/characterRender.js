


  
function drawGameChar(gameChar_x, gameChar_y, isLeft, isRight, isFalling, isPlummeting) {
   
  if (isLeft && isFalling) {
    // add your jumping-left code
     
  fill(217, 215, 176);  
  ellipse(gameChar_x, gameChar_y - 50, 20, 20);  

   
  fill(50, 25, 10);  
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI);  

   
  fill(255);  
  ellipse(gameChar_x - 5, gameChar_y - 54, 5, 3);  
  ellipse(gameChar_x + 3, gameChar_y - 54, 5, 3);  

  fill(0);  
  ellipse(gameChar_x - 6, gameChar_y - 55, 2, 2);  
  ellipse(gameChar_x + 2, gameChar_y - 55, 2, 2);  

   
  stroke(50, 25, 10);  
  strokeWeight(1);
  line(gameChar_x - 8, gameChar_y - 56, gameChar_x - 4, gameChar_y - 57);  
  line(gameChar_x + 1, gameChar_y - 57, gameChar_x + 5, gameChar_y - 56);  
  noStroke();

  // Στόμα (ουδέτερο)
  fill(255, 150, 150);  
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI);  

   
  stroke(217, 215, 176);  
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48);  
  noStroke();

     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
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
      
  fill(217, 215, 176);  
  ellipse(gameChar_x, gameChar_y - 50, 20, 20);  

   
  fill(50, 25, 10);  
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI);  

   
  fill(255);  
  ellipse(gameChar_x - 3, gameChar_y - 54, 5, 3);  
  ellipse(gameChar_x + 5, gameChar_y - 54, 5, 3);  

  fill(0);  
  ellipse(gameChar_x - 2, gameChar_y - 55, 2, 2);  
  ellipse(gameChar_x + 6, gameChar_y - 55, 2, 2);  

   
  stroke(50, 25, 10);  
  strokeWeight(1);
  line(gameChar_x - 5, gameChar_y - 57, gameChar_x - 1, gameChar_y - 56);  
  line(gameChar_x + 4, gameChar_y - 56, gameChar_x + 8, gameChar_y - 57);  
  noStroke();

  // Στόμα (ουδέτερο)
  fill(255, 150, 150);  
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI);  

   
  stroke(217, 215, 176);  
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48);  
  noStroke();

     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
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
     
     
  fill(217, 215, 176);  
  ellipse(gameChar_x, gameChar_y - 50, 20, 20);  

   
  fill(50, 25, 10);  
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI);  

   
  fill(255);  
  ellipse(gameChar_x - 6, gameChar_y - 52, 5, 3);  
  ellipse(gameChar_x + 4, gameChar_y - 52, 5, 3);  

  fill(0);  
  ellipse(gameChar_x - 7, gameChar_y - 52, 2, 2);  
  ellipse(gameChar_x + 3, gameChar_y - 52, 2, 2);  

   
  stroke(50, 25, 10);  
  strokeWeight(1);
  line(gameChar_x - 8, gameChar_y - 54, gameChar_x - 4, gameChar_y - 55);  
  line(gameChar_x + 2, gameChar_y - 55, gameChar_x + 6, gameChar_y - 54);  
  noStroke();

   
  fill(255, 150, 150);  
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI);  

   
  stroke(217, 215, 176);  
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48);  
  noStroke();

     
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

     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
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
     
     
  fill(217, 215, 176);  
  ellipse(gameChar_x, gameChar_y - 50, 20, 20);  

   
  fill(50, 25, 10);  
  arc(gameChar_x, gameChar_y - 55, 22, 18, PI, TWO_PI);  

   
  fill(255);  
  ellipse(gameChar_x - 4, gameChar_y - 52, 5, 3);  
  ellipse(gameChar_x + 6, gameChar_y - 52, 5, 3);  

  fill(0);  
  ellipse(gameChar_x - 3, gameChar_y - 52, 2, 2);  
  ellipse(gameChar_x + 7, gameChar_y - 52, 2, 2);  

   
  stroke(50, 25, 10);  
  strokeWeight(1);
  line(gameChar_x - 6, gameChar_y - 55, gameChar_x - 2, gameChar_y - 54);  
  line(gameChar_x + 4, gameChar_y - 54, gameChar_x + 8, gameChar_y - 55);  
  noStroke();

   
  fill(255, 150, 150);  
  arc(gameChar_x, gameChar_y - 46, 8, 4, 0, PI);  

   
  stroke(217, 215, 176);  
  strokeWeight(1);
  line(gameChar_x, gameChar_y - 50, gameChar_x, gameChar_y - 48);  
  noStroke();

     
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

     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
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
     
     
    noStroke();
    fill(217, 215, 176);  
    ellipse(gameChar_x, gameChar_y - 50, 20, 20);  
  
    fill(200, 190, 150);  
    ellipse(gameChar_x, gameChar_y - 52, 18, 18);  
  
     
    fill(50, 25, 10);  
    beginShape();  
    vertex(gameChar_x - 10, gameChar_y - 60);
    bezierVertex(gameChar_x - 12, gameChar_y - 70, gameChar_x + 12, gameChar_y - 70, gameChar_x + 10, gameChar_y - 60);
    vertex(gameChar_x + 10, gameChar_y - 60);
    bezierVertex(gameChar_x + 5, gameChar_y - 55, gameChar_x - 5, gameChar_y - 55, gameChar_x - 10, gameChar_y - 60);
    endShape(CLOSE);
  
     
    fill(255);  
    ellipse(gameChar_x - 5, gameChar_y - 52, 5, 3);  
    ellipse(gameChar_x + 5, gameChar_y - 52, 5, 3);  
  
    fill(0);  
    ellipse(gameChar_x - 5, gameChar_y - 52, 2, 2);  
    ellipse(gameChar_x + 5, gameChar_y - 52, 2, 2);  
  
     
    fill(217, 215, 176);  
    triangle(gameChar_x, gameChar_y - 50, gameChar_x - 1, gameChar_y - 48, gameChar_x + 1, gameChar_y - 48);  
  
     
    fill(255, 100, 100);  
    ellipse(gameChar_x, gameChar_y - 46, 6, 8);  
     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
    fill(50, 51, 59);
    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);
    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

     
    fill(50, 51, 59);
    rect(gameChar_x - 12, gameChar_y - 58, 5, 20);
    rect(gameChar_x + 8, gameChar_y - 58, 5, 20);
  } else {
     
     
 
noStroke();
fill(217, 215, 176);  
ellipse(gameChar_x, gameChar_y - 50, 20, 20);  

fill(200, 190, 150);  
ellipse(gameChar_x, gameChar_y - 52, 18, 18);  

 
fill(50, 25, 10);  
beginShape();  
vertex(gameChar_x - 10, gameChar_y - 60);
bezierVertex(gameChar_x - 12, gameChar_y - 70, gameChar_x + 12, gameChar_y - 70, gameChar_x + 10, gameChar_y - 60);
vertex(gameChar_x + 10, gameChar_y - 60);
bezierVertex(gameChar_x + 5, gameChar_y - 55, gameChar_x - 5, gameChar_y - 55, gameChar_x - 10, gameChar_y - 60);
endShape(CLOSE);

 
fill(255);  
ellipse(gameChar_x - 5, gameChar_y - 52, 5, 3);  
ellipse(gameChar_x + 5, gameChar_y - 52, 5, 3);  

fill(0);  
ellipse(gameChar_x - 5, gameChar_y - 52, 2, 2);  
ellipse(gameChar_x + 5, gameChar_y - 52, 2, 2);  

stroke(0);  
strokeWeight(0.5);
line(gameChar_x - 7, gameChar_y - 54, gameChar_x - 3, gameChar_y - 54);  
line(gameChar_x + 3, gameChar_y - 54, gameChar_x + 7, gameChar_y - 54);  
noStroke();

 
fill(217, 215, 176);  
triangle(gameChar_x, gameChar_y - 50, gameChar_x - 1, gameChar_y - 48, gameChar_x + 1, gameChar_y - 48);  

 
fill(255, 100, 100);  
beginShape();
vertex(gameChar_x - 4, gameChar_y - 46);
bezierVertex(gameChar_x - 2, gameChar_y - 44, gameChar_x + 2, gameChar_y - 44, gameChar_x + 4, gameChar_y - 46);
bezierVertex(gameChar_x + 2, gameChar_y - 48, gameChar_x - 2, gameChar_y - 48, gameChar_x - 4, gameChar_y - 46);
endShape(CLOSE);

     
    fill(53, 69, 150);
    rect(gameChar_x - 7, gameChar_y - 42, 15, 35);

     
    fill(50, 51, 59);
    rect(gameChar_x - 8, gameChar_y - 10, 5, 10);
    rect(gameChar_x + 4, gameChar_y - 10, 5, 10);

     
    fill(50, 51, 59);
    rect(gameChar_x - 12, gameChar_y - 42, 5, 20);
    rect(gameChar_x + 8, gameChar_y - 42, 5, 20);
  }
}

  