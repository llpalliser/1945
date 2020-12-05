class Levante {

  constructor(ctx, x, y, h, plane) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.drawCount = 0;
    this.xy = 2;
    this.plane = plane;

    this.sprite = new Image();
    this.sprite.src = './assets/img/levante.png'
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
    this.explosions = [];
    this.explosions_smoke = [];

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
      )
      this.bullets.forEach(bullet => bullet.draw());
      this.explosions.forEach(explosion => explosion.draw())
      this.explosions_smoke.forEach(explosion => explosion.draw())

      this.drawCount++;
      this.animate();
      this.clear()
      this.checkCollisions()

    }
  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y <= 900);
    this.explosions_smoke = this.explosions_smoke.filter(explosion => explosion.y <= 900);
    //    this.explosions = this.explosions.filter(explosion => explosion.y >= 900);
  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX && this.y < this.plane.y) {
      this.bullets.push(new Shot(this.ctx, this.x + 20, this.y + 3, 440 + this.height, 90));
      this.explosions.push(new Explosion(this.ctx, this.x, this.y + 40, 40));
      this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x + 10, this.y + 30, 40, 90));

      this.sounds.fire.currentTime = 0;
      this.sounds.fire.play();
      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 4000) + 1000));
      this.canFire = false;

    }
  }




  move() {

    this.bullets.forEach(bullet => bullet.move());
    //this.bullets.forEach(bullet => console.log(`Levante Y: `+ bullet.y));
    this.explosions_smoke.forEach(explosion_smoke => explosion_smoke.move());



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
      DAMAGES += 10
      this.bullets.pop(this.plane);
      
      //     this.sounds.ferit.play();

    }
  }




}