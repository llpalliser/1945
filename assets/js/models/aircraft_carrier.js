class AircraftCarrier {

    constructor(ctx, x, y) {
        this.ctx = ctx; 
        this.x = x; 
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = './assets/img/aircraftCarrier.png'
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 1;
        this.sprite.isReady = false; 
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }
    }

    draw() {
        if (this.sprite.isReady) { 
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
            )
        }
    }

    move() {
        this.y -= - GROUND_SPEED - TURBO - 0.1;
        this.x += lateral_move -0.1
      }


      collidesWith(element) {
        return this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
      }

}