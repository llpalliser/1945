class PlaneExplosion {

  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.sprite = new Image();
    this.sprite.src = './assets/img/fixedFireH.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 20 // 38 smoke_h
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }
    this.explosion_draw = 0;
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
      this.h,
      this.h
    );
    this.drawCount++;
    this.animate()
  }

  move() {
    this.y -= - GROUND_SPEED + 1 - TURBO;
    this.x += lateral_move / 2;
  }

  animate() {
    this.animateSprite(0,0, 0, 20)
  }

  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) { 
      this.sprite.verticalFrameIndex = initialVerticalIndex; 
      this.sprite.horizontalFrameIndex = initialHorizontalIndex; 

    } else if (this.drawCount % frequency === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
      this.drawCount = 0;
    }

  }

}
