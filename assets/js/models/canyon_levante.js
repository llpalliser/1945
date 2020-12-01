class Levante {

  constructor(ctx, x, y, h, plane) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.plane = plane;
    this.explosion = 100;
    this.drawCount = 0;
    this.xy = 2;

    this.sprite = new Image();
    this.sprite.src = './assets/img/levante.png'
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
    this.explosions = [];
    this.sounds = {
      fire: new Audio('./assets/sound/anti_aircraft_short.mp3')

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
      )
      this.bullets.forEach(bullet => bullet.draw());
      this.explosions.forEach(explosion => explosion.draw())

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
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX) {

      this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 440 + this.height, 90));
      this.explosions.push(new Explosion(this.ctx, this.x, this.y + 40, 40));
      this.sounds.fire.currentTime = 0;
      this.sounds.fire.play();

      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 3000) + 1000));

      this.canFire = false;


    }


  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y <= Math.floor((Math.random() * 900) + 700));

  }


  move() { 

    this.bullets.forEach(bullet => bullet.move());
    //this.bullets.forEach(bullet => console.log(`Levante Y: `+ bullet.y));



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
     // console.log("LEVANTE")
      DAMAGES -= 1
    }
  }




}