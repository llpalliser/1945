class Explosion {

    constructor(ctx, x, y, maxY, delay) {
      this.ctx = ctx;
      this.x = x;
      this.vx = SHOT_SPEED;
     

      this.y = y;
      this.maxY = maxY;
      this.vy = SHOT_SPEED;
      
      this.sprite = new Image();
      this.sprite.src = './assets/img/explosions.png';
      this.sprite.isReady = false;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 6;
      this.sprite.verticalFrames = 1;
      this.sprite.onload = () => {
        this.isReady = true;
        this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
        this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        this.width = this.sprite.frameWidth;
        this.height = this.sprite.frameHeight;
      }
  
      this.drawCount = 0;
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
        this.width,
        this.height,

      
        );
      this.drawCount++;
      this.animate();
    }
  
    move() {
    
      
      this.y -= - GROUND_SPEED  +1  - TURBO;
      this.x += lateral_move;
       }
  
    animate() {
      
      if (this.drawCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
          this.drawCount = 0;

      } 
this.resetAnimation()      }
    

    resetAnimation() {
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrameIndex = 0;
    }

  }
  