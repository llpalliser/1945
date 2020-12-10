class Norte {

  constructor(ctx, x, y, h, plane, canvas) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.drawCount = 0;
    this.plane = plane;
    this.canvas = canvas;
    this.sprite = new Image();
    this.sprite.src = './assets/img/norte.png'
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
      this.shot()
      this.clear()
      this.checkCollisions()
    }
  }

  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.x <= this.x + 450);
    this.explosions_smoke = this.explosions_smoke.filter(explosion => explosion.y <= this.canvas.height);
  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= this.canvas.width - 500 && this.plane.x > this.x) {
      this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 440 + this.height, 0));
      this.explosions.push(new Explosion(this.ctx, this.x + 40, this.y, 40));
      setTimeout(() => this.explosions.pop(), 90);
      this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x + 20, this.y, 20, 90));

      // aerial explosion
      setTimeout(() => this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x + 450, this.y - 90, 90, 90)), 580);
      setTimeout(() => this.explosions.push(new Explosion(this.ctx, this.x + 450, this.y - 50, 90)), 580)
      setTimeout(() => this.explosions.pop(), 600);

      this.sounds.fire.play();
      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 4000) + 1000));
      this.canFire = false;
      ENEMY_SHOTS +=1;
    }
  }

  move() {
    this.bullets.forEach(bullet => bullet.move());
    this.explosions.forEach(explosion => explosion.move());
    this.explosions_smoke.forEach(explosion_smoke => explosion_smoke.move());
    this.y -= - GROUND_SPEED - TURBO;
    this.x += lateral_move;
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }

  checkCollisions() {
    const aerialExplosion = this.explosions.some(aerialExplosion => this.plane.antiaerealCollidesWith(aerialExplosion));
    if (aerialExplosion) {
      this.sounds.ferit.play();
      DAMAGES += 2;
    }
  }

}   