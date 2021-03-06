class enemyPlane {

  constructor(ctx, x, y, h, kind, plane) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.plane = plane;
    this.sprite = new Image();
    this.sprite.src = './assets/img/enemy_planes.png'
    this.sprite.horizontalFrameIndex = kind;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 4;
    this.sprite.verticalFrames = 1;
    this.sprite.isReady = false;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }
this.play = false;
    this.canFire = true;
    this.bullets = [];
    this.explosions = [];
    this.sounds = {
     squadron: new Audio('./assets/sound/squadron_sound.mp3'),
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
      this.drawCount++;
      this.animate();
      this.clear();
      this.checkCollisions()
      this.shot()
    }
    if (!this.play) {this.sounds.squadron.play(); this.play=true}
  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y >= 900);

  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX && this.y < this.plane.y) {

      this.bullets.push(new Shot(this.ctx, this.x + 30, this.y + 120, 440 + this.height, 90));
      this.bullets.push(new Shot(this.ctx, this.x + 100, this.y + 110, 440 + this.height, 90));

      this.explosions.push(new Explosion(this.ctx, this.x + 20, this.y + 110, 30));
      this.explosions.push(new Explosion(this.ctx, this.x + 90, this.y + 110, 30));


      // this.sounds.fire.currentTime = 0;

      setTimeout(() => this.canFire = true, Math.floor((Math.random() * 100) + 50));

      this.canFire = false;


    }


  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y <= Math.floor((Math.random() * 900) + 700));

  }


  move() {

    this.bullets.forEach(bullet => bullet.move());
    this.y += 1.5
    this.x += lateral_move;
  }


  animate() {

  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
    this.x + this.h > element.x &&
    this.y < element.y + element.height &&
    this.y + this.h > element.y;
  }



  checkCollisions() {
    const dispars = this.bullets.some(bullet => this.plane.collidesWith(bullet));
    if (dispars) {
      DAMAGES += 1
      this.sounds.ferit.play();
      this.bullets.pop(this.plane.y+100);
    }
  }


}