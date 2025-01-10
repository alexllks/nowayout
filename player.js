class Player {
  constructor() {
      this.x = 730;
      this.y = height - PLATFORM_HEIGHT - 60;
      this.width = 40;
      this.height = 0;
      this.speed = 10;
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
      this.canJump = true; // Ελέγχει αν μπορεί να πηδήξει
      this.onStair = false; // Ελέγχει αν βρίσκεται σε σκάλα
      this.lastDirection = null; // Αποθηκεύει την τελευταία κατεύθυνση
  }

  update() {
    if (noclipMode) {
        this.handleNoclipMode();
        return;
    }

    if (this.isDying) {
        this.rotation += 0.1; // Περιστροφή
        this.y += 5; // Γρήγορη πτώση
        return; // Σταματά η υπόλοιπη ενημέρωση
    }

    this.velocityY += this.gravity;
    this.y += this.velocityY;

    const movingLeft = keyIsDown(LEFT_ARROW);
    const movingRight = keyIsDown(RIGHT_ARROW);

    // Κίνηση αριστερά
    if (movingLeft) {
        this.x -= this.speed;
        this.isLeft = true;
        this.isRight = false; // Αν πατηθεί αριστερά, σταματά το δεξιά
        footstepSound.setVolume(0.3);
    }

    // Κίνηση δεξιά
    if (movingRight) {
        this.x += this.speed;
        this.isRight = true;
        this.isLeft = false; // Αν πατηθεί δεξιά, σταματά το αριστερά

        if (this.x + this.width / 2 >= NEW_WALL_X2 && this.x < NEW_WALL_X2) {
            this.x = NEW_WALL_X2 - this.width / 2;
        }

        footstepSound.setVolume(0.3);
    }

    // Αν κανένα πλήκτρο δεν είναι πατημένο, σταματάει η κίνηση
    if (!movingLeft && !movingRight) {
        this.isLeft = false;
        this.isRight = false;
        footstepSound.setVolume(0);
    }

    this.checkCollisions();

    if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && this.canJump) {
        this.velocityY = -15;
        this.canJump = false;
        soundManager.play('jump', false, 1.0);
    }
}

  handleNoclipMode() {
      if (keyIsDown(LEFT_ARROW)) this.x -= this.speed*3;
      if (keyIsDown(RIGHT_ARROW)) this.x += this.speed*3;
      if (keyIsDown(UP_ARROW)) this.y -= this.speed;
      if (keyIsDown(DOWN_ARROW)) this.y += this.speed;
  }

  checkCollisions() {
      let onPlatform = false;
      this.onStair = false;

      for (let platform of platforms) {
          let minContact = this.width * 0.5;

          if (
              this.x + this.width > platform.x + minContact &&
              this.x < platform.x + platform.width - minContact &&
              this.y + this.height >= platform.y &&
              this.y + this.height <= platform.y + 5
          ) {
              onPlatform = true;
              this.y = platform.y - this.height;
              this.velocityY = 0;
              this.canJump = true;
              this.isFalling = false;
              break;
          } else if (
              this.x + this.width > platform.x + 35 &&
              this.x - this.width < platform.x + platform.width - 35 &&
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
                  this.y = stepY - this.height;
                  this.velocityY = 0;
                  this.canJump = true;
                  this.isFalling = false;
                  break;
              }
          }
          if (this.onStair) break;
      }

      if (this.y + this.height >= height - PLATFORM_HEIGHT) {
          this.y = height - PLATFORM_HEIGHT - this.height;
          this.velocityY = 0;
          this.canJump = true;
          this.isFalling = false;
      } else if (!onPlatform && !this.onStair) {
          this.isFalling = true;
          this.canJump = false;
      }
  }

  show() {
      drawGameChar(this.x, this.y, this.isLeft, this.isRight, this.isFalling, this.isPlummeting);

      if (this.isDying) {
          push();
          translate(this.x + this.width / 2, this.y + this.height / 2);
          rotate(this.rotation);
          fill(255, 0, 0);
          rect(-this.width / 2, -this.height / 2, this.width, this.height);
          pop();
      }
  }
}

function keyReleased() {
  if (keyCode == 39 || keyCode == 68) {
      isRight = false;
  }

  if (keyCode == 37 || keyCode == 65) {
      isLeft = false;
  }
}
