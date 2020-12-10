class AirSmoke {

  constructor(ctx, x, y, maxY) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.maxY = maxY;
    this.sprite = new Image();
    this.sprite.src = './assets/img/fixedSmoke.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 41.5
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
      80,
      80
    );
    this.drawCount++;
    this.animate()
  }

  move() {
    this.y -= - GROUND_SPEED - TURBO;
    this.x += lateral_move / 2;
  }

  animate() {
    this.animateSprite(0, 0, 0, 10)
  }

  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
      this.sprite.verticalFrameIndex = initialVerticalIndex;
      this.sprite.horizontalFrameIndex = initialHorizontalIndex;
    } else if (this.drawCount % frequency === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      this.drawCount = 0;
    }
  }

  // resetAnimation() {
  //   this.sprite.horizontalFrameIndex = 0;
  //   this.sprite.verticalFrameIndex = 0;
  // }

}
