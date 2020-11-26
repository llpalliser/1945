class Canyon {

  constructor(ctx, x, y, h, drawCount) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.drawCount = drawCount;

    this.xy = 2;

    this.sprite = new Image();
    this.sprite.src = './assets/img/canyons4.png'
    this.sprite.horizontalFrameIndex = 2; // => posición de reposo de la moneda linea 0
    this.sprite.verticalFrameIndex = 2; // => posición de reposo de la moneda columna 0
    // aunque no tenga posiciones verticales, ponerlo para así recordarlo siempre

    // ahora hemos de decir cuantos frames tiene nuestro sprite: 
    this.sprite.horizontalFrames = 4; // no son palabras reservadas
    this.sprite.verticalFrames = 4;
    this.sprite.isReady = false; // casegurarse que las imágenes están en cache
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth; // => li dic es width de sa moneda
      this.height = this.sprite.frameHeight; // => li dic es height de sa moneda

    }
    //  this.drawCount = 0;

  }

  draw() {
    if (this.sprite.isReady) { // => abans de dibuixar-la ens hem d'assegurar que està pintada
      this.ctx.drawImage(
        // => la colocamos dentro de la imagen y luego la posicionamos dentro del canvas
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth, // posició horitzontal dins s'sprite
        // vgr si amplada de cada frame és 20, i es vol sa segona, 1*20 = 20
        this.sprite.verticalFrameIndex * this.sprite.frameHeight, // posició vertical dins s'sprite
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        // después la posicionamos dentro del canvas
        this.x,
        this.y,
        this.h,
        this.h
        //   this.width,
        //  this.height,
      )
      this.drawCount++;
      this.animate();

    }
  }

  move() {

    this.y -= - GROUND_SPEED;
    
    // if (this.bacg) {this.x = this.x + 2;
    //    console.log (`mou esquerra`)};



    // if (move_right) {this.x = this.x - SPEED;
    // console.log (`mou dreta`)};

     this.x += lateral_move;
     
     console.log (lateral_move)


}


  animate() {
    if (this.drawCount % MOVEMENT_FRAMES === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      this.sprite.verticalFrameIndex = (this.sprite.verticalFrameIndex + 1) % this.sprite.verticalFrames;

      this.drawCount = 0;
    }
  }


}