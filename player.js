class Player {
  constructor() {
      this.x = 730;
      this.y = height - PLATFORM_HEIGHT - 60;
      this.width = 40;
      this.height = 0;
      this.speed = 10;
      this.velocityY = 0;
      this.gravity = 0.6;

       
      this.isLeft = false;
      this.isRight = false;
      this.isFalling = false;
      this.isPlummeting = false;
      this.isJumping = false;  
      this.isDying = false;  
      this.rotation = 0;  
      this.canJump = true;  
      this.onStair = false;  
      this.lastDirection = null;  
  }

  update() {
    if (noclipMode) {
        this.handleNoclipMode();
        return;
    }

    if (this.isDying) {
        this.rotation += 0.1;  
        this.y += 5;  
        return;  
    }

    
    checkInclinedEscalatorCollision(this);
    
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    this.checkCollisions();


    const movingLeft = keyIsDown(LEFT_ARROW);
    const movingRight = keyIsDown(RIGHT_ARROW);

     
    if (movingLeft) {
        this.x -= this.speed;
        this.isLeft = true;
        this.isRight = false; // Αν πατηθεί αριστερά, σταματά το δεξιά
       
        
        
    }

     
    if (movingRight) {
        this.x += this.speed;
        this.isRight = true;
        this.isLeft = false; // Αν πατηθεί δεξιά, σταματά το αριστερά

        
        if (this.x + this.width / 2 >= NEW_WALL_X2 && this.x < NEW_WALL_X2) {
            this.x = NEW_WALL_X2 - this.width / 2;
        }


    }

    // Αν κανένα πλήκτρο δεν είναι πατημένο, σταματάει η κίνηση
    if (!movingLeft && !movingRight) {
        this.isLeft = false;
        this.isRight = false;
        
    }

   // this.checkCollisions();

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
      this.currentStair = null;  


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
          
         
        if (
          this.y + this.height > platform.y &&  
          this.y < platform.y + platform.height &&
          this.x + this.width > platform.x+15 &&  
          this.x < platform.x+15
      ) {
          this.x = platform.x+15 - this.width;  
      }

       
      if (
          this.y + this.height > platform.y &&
          this.y < platform.y + platform.height &&
          this.x <= platform.x +8+ platform.width &&  
          this.x + this.width > platform.x+8 + platform.width
      ) {
          this.x = platform.x + platform.width;  
      }

      
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

       
      //console.log(`Player coordinates: x=${this.x}, y=${this.y}`);
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
