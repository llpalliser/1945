class FixedFire {

  constructor(ctx, x, y, h) {
    this.ctx = ctx;
    this.x = x;
    this.vx = SHOT_SPEED;


    this.y = y;
    this.h = h;
    this.vy = SHOT_SPEED;



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
    //setTimeout(() => this.animate(), 1000);
    this.animate()


  }

  move() {
    // this.y -= - GROUND_SPEED + 1 - TURBO;
    // this.x += lateral_move / 2;

    // this.y -= - GROUND_SPEED + GROUND_SPEED/2 - TURBO;
    // this.x += lateral_move / 2;

    this.y -= - GROUND_SPEED    - TURBO;
    this.x += lateral_move 
 

  }


  animate() {
    this.animateSprite(0,0, 0, 20)
  }



  // animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {

  //   // lo primero que se debe hacer es comprobar si el frame está en la posición inicial
  //   if (this.sprite.verticalFrameIndex != initialVerticalIndex) { // => si no lo está
  //     this.sprite.verticalFrameIndex = initialVerticalIndex; // => colócalo en el frame vertical inicial
  //     this.sprite.horizontalFrameIndex = initialHorizontalIndex; // => colócalo en el frame horizontal inicial

  //   } else if (this.drawCount % frequency === 0) {// => si ya estaba en el frame inicial (en reposo, por ejemplo)
  //     // => cada ciclo completo, muevo el frame
  //     // => cuando hayas contado 5, cambia uno de los segmentos del Sprite
  //     this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
  //     this.drawCount = 0;

  //   }
  //   // animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalSegments, frequency) {
  //   //   if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
  //   //     this.sprite.verticalFrameIndex = initialVerticalIndex;
  //   //     this.sprite.horizontalFrameIndex = initialHorizontalIndex;
  //   //   } else if (this.sprite.drawCount % frequency === 0) {
  //   //     this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
  //   //     this.sprite.drawCount = 0;
  //   //   }
  //   // }


  // }

  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {

    let subiendo = true

    if (this.sprite.verticalFrameIndex != initialVerticalIndex) { 
      this.sprite.verticalFrameIndex = initialVerticalIndex;
      this.sprite.horizontalFrameIndex = initialHorizontalIndex;

    } else if (this.drawCount % frequency === 0) {






      if (subiendo && this.sprite.horizontalFrameIndex <= 20 ) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
      }

      if (this.sprite.horizontalFrameIndex === 20) { subiendo = false 
      }

      if (!subiendo ) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex - 10) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
      }

       this.drawCount = 0;


    }


  }









  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
  }


  collidesWith(element) {
    return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y;
}
}