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
    this.canFire = true;
    this.bullets = [];
    this.sounds = {
      fire: new Audio('./assets/sound/shot.wav')
    }




  }



  clear() {
    this.bullets = this.bullets.filter(bullet => bullet.y < 0)
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
        this.h
        //   this.width,
        //  this.height,
      )
                  this.bullets.forEach(bullet => bullet.draw());

      this.drawCount++;
      this.animate();


    }
  }


  shot() {
    if (this.canFire && this.y < 900) {

      this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 500 + this.height));
      this.canFire = false;

      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 3000) + 500));    }
  }


  move() {

    this.bullets.forEach(bullet => bullet.move());
    this.y -= - GROUND_SPEED - TURBO;
    this.x += lateral_move;
  }


  animate() {
    if (this.drawCount % MOVEMENT_FRAMES === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      this.sprite.verticalFrameIndex = (this.sprite.verticalFrameIndex + 1) % this.sprite.verticalFrames;

      this.drawCount = 0;
    }
    this.shot()
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y;
}


}