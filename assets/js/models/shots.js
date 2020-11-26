class Shot {

    constructor(ctx, x, y, maxY, direction) {
      this.ctx = ctx;
      this.x = x;
      this.vx = SHOT_SPEED;
     
      this.direction = direction;
      this.y = y;
      this.maxY = maxY;
      this.vy = SHOT_SPEED;
      
      this.sprite = new Image();
      this.sprite.src = './assets/img/shots.png';
      this.sprite.isReady = false;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 4;
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
        //this.width,
        //this.height
      10,
      20
      
        );
      this.drawCount++;
      this.animate();
    }
  
    move() {

        if (this.direction === 90) {
            this.x += SHOT_SPEED;
            this.y +=0;
        }
        else if (this.direction === 0) {
            this.x += 0;
            this.y -= SHOT_SPEED;
        }

        else if (this.direction === 180) {
            this.x += 0;
            this.y += SHOT_SPEED;
        }


    //     this.x += this.vx;
    //    this.x = this.x; 
    //     this.y -= SHOT_SPEED;
    //     this.vy ;
    
        // if (this.y >= (this.maxY - this.height)) {
        //   this.vy *= -1;
        // }

      }
  
    animate() {
      if (this.drawCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
        this.drawCount = 0;
      }
    }
  }
  