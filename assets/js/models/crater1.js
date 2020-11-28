class Crater1 {
  constructor(ctx, x, y, rand) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;






    this.sprite = new Image();



    this.sprite.src = './assets/img/crater1.png'



    this.h = Math.floor((Math.random() * 70) + 50)

    this.sprite.horizontalFrameIndex = 0; // => posición de reposo de la moneda linea 0
    this.sprite.verticalFrameIndex = 0; // => posición de reposo de la moneda columna 0
    // aunque no tenga posiciones verticales, ponerlo para así recordarlo siempre

    // ahora hemos de decir cuantos frames tiene nuestro sprite: 
    this.sprite.horizontalFrames = 1; // no son palabras reservadas
    this.sprite.verticalFrames = 1;
    this.sprite.isReady = false; // casegurarse que las imágenes están en cache
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth; // => li dic es width de sa moneda
      this.height = this.sprite.frameHeight; // => li dic es height de sa moneda

    }
  }

  draw() {
    if (this.sprite.isReady) { // => abans de dibuixar-la ens hem d'assegurar que està pintada
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        // después la posicionamos dentro del canvas
        this.x,
        this.y,
        this.h,
        this.h,
        //this.width,
        //this.height,

      )

    }
  }

  move() {
    this.y -= - GROUND_SPEED + 1 - TURBO;
    this.x += lateral_move / 2;
  }


 



}