class Averia1 {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.vx = SHOT_SPEED;


    this.y = y;
    //this.h = h;




    this.sprite = new Image();
    this.sprite.src = './assets/img/averia1.png';
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
      this.height
// 40,
// 40

    );
    this.drawCount++;
    //setTimeout(() => this.animate(), 1000);
    this.animate()


  }

  move() {
    this.y -= - GROUND_SPEED + GROUND_SPEED/2 - 0.1   - TURBO;
    this.x += lateral_move / 2;
  }

  animate() {
    this.animateSprite(0, 0, 0, 10)
  }



  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {

    // lo primero que se debe hacer es comprobar si el frame está en la posición inicial
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) { // => si no lo está
      this.sprite.verticalFrameIndex = initialVerticalIndex; // => colócalo en el frame vertical inicial
      this.sprite.horizontalFrameIndex = initialHorizontalIndex; // => colócalo en el frame horizontal inicial

    } else if (this.drawCount % frequency === 0) {

      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
      this.drawCount = 0;

    }


  }




  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
  }

}
