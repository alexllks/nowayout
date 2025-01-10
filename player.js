class Player {
  constructor() {
    this.x = 730;
    this.y = height - PLATFORM_HEIGHT - 60;
    this.width = 40;
    this.height = 0;
    this.speed =10;
    this.velocityY = 0;
    this.gravity = 0.6;

    // Καταστάσεις του παίκτη
    this.isLeft = false;
    this.isRight = false;
    this.isFalling = false;
    this.isPlummeting = false;
    this.isJumping = false; // Προστέθηκε για να διαχειρίζεται το άλμα
    this.isDying = false; // Νέα ιδιότητα για το animation θανάτου
        this.rotation = 0; // Περιστροφή κατά την πτώση
        
    
  }

  update() {

    if (noclipMode) {
      // Ελεύθερη κίνηση χωρίς φυσική
      if (keyIsDown(LEFT_ARROW)) this.x -= this.speed*4;
      if (keyIsDown(RIGHT_ARROW)) this.x += this.speed*4;
      if (keyIsDown(UP_ARROW)) this.y -= this.speed;
      if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

      // Απενεργοποιούμε τη φυσική και επιστρέφουμε
      return;
  } else {

    if (this.isDying) {
      // Animation θανάτου (π.χ. περιστροφή και πτώση)
      this.rotation += 0.1; // Περιστροφή
      this.y += 5; // Γρήγορη πτώση
      return; // Σταματά η υπόλοιπη ενημέρωση
  }

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
      let minContact = player.width * 0.5; // Ελάχιστο ποσοστό επαφής 50%

      if (
        player.x + player.width > platform.x + minContact && // Αριστερή άκρη
        player.x < platform.x + platform.width - minContact && // Δεξιά άκρη
        player.y + player.height >= platform.y && // Κάτω άκρη του παίκτη
        player.y + player.height <= platform.y + 5 // Επαφή με την κορυφή της πλατφόρμας
      ) {
        onPlatform = true;
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.canJump = true;
        player.isFalling = false;
        break;
      }
    
    else{

      if (
          this.x + this.width  > platform.x+35 &&
          this.x - this.width  < platform.x + platform.width-35 &&
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + Math.abs(this.velocityY + 5)
      ) {
        
          onPlatform = true;
          this.y = platform.y - this.height;
          this.velocityY = 0;
          this.canJump = true;
          this.isFalling = false;

      }
    }

  }

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
        soundManager.play('jump',false,1.0);
  

    }
    }

        // Εμφάνιση συντεταγμένων στην κονσόλα
        //console.log(`Player coordinates: x=${this.x}, y=${this.y}`);
}

  show() {
    drawGameChar(this.x, this.y, this.isLeft, this.isRight, this.isFalling, this.isPlummeting);
     if (this.isDying) {
            // Σχεδίαση με περιστροφή
            push();
            translate(this.x + this.width / 2, this.y + this.height / 2);
            rotate(this.rotation);
            fill(255, 0, 0); // Χρώμα θανάτου
            rect(-this.width / 2, -this.height / 2, this.width, this.height);
            pop();
            return;
        }
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


