class Tank {

  constructor(ctx, x, y, h, plane, stopped) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.drawCount = 0;
    this.plane = plane;
    this.stopped = stopped;
    this.sprite = new Image();
    this.sprite.src = './assets/img/tank.png'
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
      fire: new Audio('./assets/sound/panzer_sound.mp3'),
      ferit: new Audio('./assets/sound/plane_crash.mp3')
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
      this.clear();
      this.checkCollisions();
      this.shot()
    }
  }

  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y >= 900);
    this.explosions_smoke = this.explosions_smoke.filter(explosion => explosion.y <= 900);
  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX && this.plane.x < this.x) {
      this.bullets.push(new Shot(this.ctx, this.x + 20, this.y + 3, 440 + this.height, 135));
      this.explosions.push(new Explosion(this.ctx, this.x, this.y + 40, 40));
      this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x - 5, this.y + 15, 40, 135));
      this.sounds.fire.currentTime = 0;
      this.sounds.fire.play();
      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 3000) + 2000));
      this.canFire = false;
    }
  }

  clear() {
    this.bullets = this.bullets.filter(bullet => bullet.y <= Math.floor((Math.random() * 900) + 700));
  }


  move() {
    if (this.stopped) {
      this.bullets.forEach(bullet => bullet.move());
      this.y -= - GROUND_SPEED - TURBO;
      this.x += lateral_move;
      this.explosions_smoke.forEach(explosion_smoke => explosion_smoke.move());
    }
    else {
      this.bullets.forEach(bullet => bullet.move());
      this.y -= - GROUND_SPEED - TURBO + 0.05;
      this.x += lateral_move + 0.05;
      this.explosions_smoke.forEach(explosion_smoke => explosion_smoke.move());
    }
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }

  checkCollisions() {
    const dispars = this.bullets.some(bullet => this.plane.antiaerealCollidesWith(bullet));
    if (dispars) {
      DAMAGES += 10
      this.bullets.pop(this.plane);
      this.sounds.ferit.play();
    }
  }

}