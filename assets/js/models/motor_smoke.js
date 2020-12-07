class MotorSmoke {

  constructor(ctx, x, y, h, plane) {
    this.ctx = ctx;
    this.x = x;

    this.y = y;
    this.h = h
    this.plane = plane;
     


    this.vy = SHOT_SPEED;

    this.sprite = new Image();
    this.sprite.src = './assets/img/motor_smoke.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 8;
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
      this.y + 50,
      this.h,
      this.h,


    );
    this.drawCount++;
    this.animate();
    // console.log (`DrawCount:`+ this.drawCount)

  }

  move() {
 
    this.y = this.plane.y;
    this.x  = this.plane.x;



  }

    animate() {

  //   if (this.drawCount < 10) {
  //   this.animateSprite(0, 0, 0, 10);
  // }
  // else
  // { this.resetAnimation()}
  this.animateSprite(0, 0, 0, 10);


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

  resetAnimation() {
    this.sprite.horizontalFrameIndex = 1;
    this.sprite.verticalFrameIndex = 1;
  }

}
