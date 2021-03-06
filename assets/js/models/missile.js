class Missile {

    constructor(ctx, x, y, maxY, direction) {
      this.ctx = ctx;
      this.x = x;
      this.vx = MISSILE_SPEED;
           this.direction = direction;
      this.y = y;
      this.maxY = maxY;
           this.sprite = new Image();
      this.sprite.src = './assets/img/missile.png';
      this.sprite.isReady = false;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 2;
      this.sprite.verticalFrames = 4;
      this.sprite.onload = () => {
        this.isReady = true;
        this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
        this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        this.width = this.sprite.frameWidth;
        this.height = this.sprite.frameHeight;
      }
        this.drawCount = 0;
      this.bullets = [];

    }
  
    draw() {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        10,20    
        );

      this.drawCount++;
      this.animate();
    }

    move() {

      // NORTE
        if (this.direction === 0) {
            this.x += MISSILE_SPEED;
            this.y +=0;
        }
        // LEVANTE
        else if (this.direction === 90) {
            this.x += 0;
            this.y += MISSILE_SPEED;
        }
// PONIENTE
        else if (this.direction === 270) {
            this.x += 0;
            this.y -= 15;
        }
// SUR
        else if (this.direction === 180) {
          this.x -= MISSILE_SPEED;
          this.y =10;
      }
      }

    animate() {
      if (this.drawCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
        this.drawCount = 0;
      }
    }

     collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }

  }
  