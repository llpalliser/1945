class Crater {
  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;





    this.sprite = new Image();



    this.sprite.src = './assets/img/craters_r.png'

    this.r = Math.floor((Math.random() * this.horizontalFrameIndex-1) + 0 )
   // this.h = Math.floor((Math.random() * 80) + 80)

    this.sprite.horizontalFrameIndex = Math.floor((Math.random() * 6) + 0); 
    this.sprite.verticalFrameIndex = 0;

    this.sounds = {
      missileExp: new Audio('./assets/sound/explosion.mp3')

    }
    
    this.sprite.horizontalFrames = 6; 
    this.sprite.verticalFrames = 1;
    this.sprite.isReady = false; 
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth; 
      this.height = this.sprite.frameHeight; 
    }
    this.soundEffect = true;
  }

  draw() {
    if (this.sprite.isReady) { // => abans de dibuixar-la ens hem d'assegurar que està pintada
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.h,
        this.h,


      )

     if(this.soundEffect) {this.sounds.missileExp.play(); this.soundEffect=false}

    }

  }

  move() {
    // this.y -= - GROUND_SPEED + GROUND_SPEED/2 - TURBO;
    // this.x += lateral_move / 2;

    this.y -= - GROUND_SPEED - TURBO;
    this.x += lateral_move



    
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }



}