class Player {
  constructor() {
    this.x = 100;
    this.y = height - PLATFORM_HEIGHT - 60;
    this.width = 40;
    this.height = 0;
    this.speed = 5;
    this.velocityY = 0;
    this.gravity = 0.6;

    // Καταστάσεις του παίκτη
    this.isLeft = false;
    this.isRight = false;
    this.isFalling = false;
    this.isPlummeting = false;
    this.isJumping = false; // Προστέθηκε για να διαχειρίζεται το άλμα
    
  }

  update() {
    let stepTimer = 0; // Μετρητής για τα καρέ μεταξύ των βημάτων
  // Έλεγχος αν βρίσκεται σε πλατφόρμα ή σκάλα
  let onPlatform = false;
  this.onStair = false;

    // Εφαρμογή βαρύτητας
    this.velocityY += this.gravity;
    this.y += this.velocityY;

      // Αύξηση του μετρητή
      this.stepTimer++;


    // Κίνηση δεξιά/αριστερά
    if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.speed;
        

//    // Έλεγχος σύγκρουσης με τον νέο τοίχο (από δεξιά)
//    if (this.x <= NEW_WALL_X + 50 && this.x + this.width / 2 > NEW_WALL_X) {
//     this.x = NEW_WALL_X + 50; // Σταματάει δεξιά από τον τοίχο
// }

        footstepSound.setVolume(0.3); // Ένταση βημάτων

        // Έλεγχος αν βρίσκεται σε σκάλα και μετακίνηση στο επόμενο σκαλί
        if (this.onStair) {
            let stair = this.currentStair;
            let stepIndex = Math.floor((this.x - stair.x) / stair.stepWidth);
            if (stepIndex >= 0 && stepIndex < stair.steps) {
                let stepY = stair.y - stepIndex * stair.stepHeight;
                this.y = stepY - this.height;
            }
        }

        this.isLeft = true;
        this.isRight = false;
    } else if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.speed;


        // Έλεγχος σύγκρουσης με τον νέο τοίχο (από αριστερά) (X2 γιατι μιλαμε για τον δεξια τοιχο του secret )
        if (this.x + this.width / 2 >= NEW_WALL_X2  && this.x < NEW_WALL_X2) {
            this.x = NEW_WALL_X2  - this.width / 2; // Σταματάει αριστερά από τον τοίχο

        }
        
        
        footstepSound.setVolume(0.3); // Ένταση βημάτων
        if (player.isInHelicopter) {
            player.x = helicopter.x + helicopter.width / 2; // Ο παίκτης ακολουθεί το ελικόπτερο
            player.y = helicopter.y - player.height;
        }
        

        // Έλεγχος αν βρίσκεται σε σκάλα και μετακίνηση στο επόμενο σκαλί
        if (this.onStair) {
            let stair = this.currentStair;
            let stepIndex = Math.floor((this.x - stair.x) / stair.stepWidth);
            if (stepIndex >= 0 && stepIndex < stair.steps) {
                let stepY = stair.y - stepIndex * stair.stepHeight;
                this.y = stepY - this.height;
            }
        }

        this.isRight = true;
        this.isLeft = false;
    } else {
        this.isLeft = false;
        this.isRight = false;
        footstepSound.setVolume(0); // Σίγαση όταν σταματά
    }

  

    // Έλεγχος για σύγκρουση με πλατφόρμες
    
    for (let platform of platforms) {
      if (
          this.x + this.width  > platform.x &&
          this.x - this.width-10  < platform.x + platform.width &&
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + Math.abs(this.velocityY + 5)
      ) {
          onPlatform = true;
          this.y = platform.y - this.height;
          this.velocityY = 0;
          this.canJump = true;
          this.isFalling = false;
          
      }
  // Έλεγχος από τα αριστερά
    if (
        this.x + this.width > platform.x &&
        this.x <= platform.x &&
        this.y + this.height > platform.y &&
        this.y < platform.y + platform.height
      ){
    this.x = platform.x - this.width+25;//Σταθεροποίηση αριστερά της πλατφόρμας
  }

  // Έλεγχος από τα δεξιά
  if (
    this.x < platform.x + platform.width &&
    this.x >= platform.x + platform.width - this.speed && // Σταθερός έλεγχος επαφής
    this.y + this.height > platform.y &&
    this.y < platform.y + platform.height
  ) {
    this.x = platform.x + platform.width+10; // Σταθεροποίηση δεξιά της πλατφόρμας
  }

 
      //  if (
      //   this.x + this.width > platform.x &&
      //   this.x <= platform.x &&
      //   this.y + this.height > platform.y &&
      //   this.y < platform.y + platform.height
      // ) {
        
      //   this.x = platform.x - this.width+25; // Σταθεροποίηση αριστερά της πλατφόρμας
      // }

      // // Έλεγχος από τα δεξιά
      // if (
      //   this.x < platform.x + platform.width &&
      //   this.x + this.width >= platform.x + platform.width &&
      //   this.y + this.height > platform.y &&
      //   this.y < platform.y + platform.height
      // ) {
      //   this.x = platform.x + platform.width+10; // Σταθεροποίηση δεξιά της πλατφόρμας
      // }

    //   // Έλεγχος από κάτω
    //   if (
    //     this.x + this.width > platform.x &&
    //     this.x < platform.x + platform.width &&
    //     this.y >= platform.y + platform.height &&
    //     this.y <= platform.y + platform.height + Math.abs(this.velocityY)
    //   ) {
    //     this.y = platform.y + platform.height; // Σταθεροποίηση κάτω από την πλατφόρμα
    //     this.velocityY = 0;
    //   }
      }

 // Έλεγχος σύγκρουσης με floating platforms
  // for (let floatingPlatform of floatingPlatforms) {
  //   if (
  //     this.x + this.width > floatingPlatform.x &&
  //     this.x < floatingPlatform.x + floatingPlatform.width &&
  //     this.y + this.height >= floatingPlatform.y &&
  //     this.y + this.height <= floatingPlatform.y + Math.abs(this.velocityY)
  //   ) {
  //     onPlatform = true;
  //     this.y = floatingPlatform.y - this.height;
  //     this.velocityY = 0;
  //     this.isFalling = false;
  //     this.canJump = true;
  //     break;
  //   }
  // }

  

  
    



    for (let stair of stairs) {
        for (let i = 0; i < stair.steps; i++) {
            let stepX = stair.x + i * stair.stepWidth;
            let stepY = stair.y - i * stair.stepHeight;

            if (
                this.x + this.width / 2 > stepX &&
                this.x - this.width / 2 < stepX + stair.stepWidth &&
                this.y + this.height >= stepY &&
                this.y + this.height <= stepY + Math.abs(this.velocityY + 5)
            ) {
                this.onStair = true;
                this.currentStair = stair; // Αποθηκεύουμε την τρέχουσα σκάλα
                this.y = stepY - this.height;
                this.velocityY = 0;
                this.canJump = true;
                this.isFalling = false;
                break;
            }
        }
        if (this.onStair) break;
    }

    // Έλεγχος για το έδαφος
    if (this.y + this.height >= height - PLATFORM_HEIGHT) {
        this.y = height - PLATFORM_HEIGHT - this.height;
        this.velocityY = 0;
        this.canJump = true;
        this.isFalling = false;
    } else if (!onPlatform && !this.onStair) {
        // Ενεργοποίηση "falling" κατάστασης
        this.isFalling = true;
        this.canJump = false;
    }

    // Άλμα
    if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && this.canJump) {
        this.velocityY = -15; // Ταχύτητα προς τα πάνω
        this.canJump = false;

        
    }

        // Εμφάνιση συντεταγμένων στην κονσόλα
        console.log(`Player coordinates: x=${this.x}, y=${this.y}`);
}

  show() {
    drawGameChar(this.x, this.y, this.isLeft, this.isRight, this.isFalling, this.isPlummeting);
  }
}

function keyReleased() {
  //right arrow
  if (keyCode == 39 || keyCode == 68) {
    isRight = false;
  }

  //left arrow
  if (keyCode == 37 || keyCode == 65) {
    isLeft = false;
  }
}