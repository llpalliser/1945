class Target {

  constructor(ctx, x, y, fr, dir) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.sprite = new Image();
    this.sprite.src = './assets/img/targets.png'
    this.sprite.horizontalFrameIndex = fr; //
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
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
        this.height

      )
    }
  }

  move() {
    if (this.dir === 135) {

      this.y -= - GROUND_SPEED - TURBO + 0.05;
      this.x += lateral_move + 0.05;
    } else if (this.dir === 45) {
      this.y -= - GROUND_SPEED - TURBO + 0.05;
      this.x += lateral_move - 0.05;
    }
    else {
      this.y -= - GROUND_SPEED - TURBO + 0;
      this.x += lateral_move;
    }
  }

}