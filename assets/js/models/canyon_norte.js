class Norte {

  constructor(ctx, x, y, h, plane_pos, plane) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.drawCount = 0;
    this.plane_pos = plane_pos * -1;
    this.xy = 2;
    this.plane = plane;

    this.sprite = new Image();
   this.sprite.src = './assets/img/norte.png'
  //  this.sprite.src = './assets/img/antiaereo.png'
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;

    this.sprite.horizontalFrames = 1;
    this.sprite.verticalFrames = 1;
    this.sprite.isReady = false;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;

    }
    this.canFire = true;
    this.bullets = [];
    this.smokes = [];
    this.sounds = {
      fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
      ferit: new Audio('./assets/sound/prova.wav')
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
        this.h,
        this.h
        //   this.width,
        //  this.height,
      )
      this.bullets.forEach(bullet => bullet.draw());
      this.smokes.forEach(smoke => smoke.draw())


      this.drawCount++;
      this.animate();
      this.clear()
      this.checkCollisions()

    }
  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y >= 900);





  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX && this.plane_pos > this.x) {
      this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 440 + this.height, 0));
      this.smokes.push(new Explosion(this.ctx, this.x + 30, this.y, 40));
     // this.sounds.fire.currentTime = 0;
      this.sounds.fire.play();
      this.sounds.volume = 0.2;

      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 3000) + 1000));

      this.canFire = false;

     // console.log(this.plane_pos)



    }

  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.x <= 2800);

  }

  move() {

    this.bullets.forEach(bullet => bullet.move());
    this.smokes.forEach(smoke => smoke.move());
    //this.bullets.forEach(bullet => console.log(`Norte X: ` + bullet.x));

    this.y -= - GROUND_SPEED - TURBO;
    this.x += lateral_move;
  }


  animate() {
    // if (this.drawCount % MOVEMENT_FRAMES === 0) {
    //   this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
    //   this.sprite.verticalFrameIndex = (this.sprite.verticalFrameIndex + 1) % this.sprite.verticalFrames;

    //   this.drawCount = 0;
    // }
    this.shot()
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }



  checkCollisions() {
    const dispars = this.bullets.some(bullet => this.plane.collidesWith(bullet));
    if (dispars) {
      // console.log("NORTE")
      DAMAGES += 1
 //     this.sounds.ferit.play();
    }
  }

}   