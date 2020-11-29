class enemyPlaneJapo {

  constructor(ctx, x, y, h, planex, planey) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h;
    this.planex=planex;
    this.planey=planey
    //this.explosion = 100;

    //this.plane = plane;

    this.xy = 2;

    this.sprite = new Image();
    this.sprite.src = './assets/img/enemy_japo.png'
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
      fire: new Audio('./assets/sound/squadron_sound.mp3')
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
      this.sounds.fire.play();
  }
}


  clear() {
   
    this.bullets = this.bullets.filter(bullet => bullet.y >= 900);

  }

  shot() {
    if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX) { 

     this.bullets.push(new Shot(this.ctx, this.x+25 , this.y +100, 440 + this.height, 90));
     this.bullets.push(new Shot(this.ctx, this.x+82 , this.y +100, 440 + this.height, 90));

    this.explosions.push(new Explosion(this.ctx, this.x+15, this.y+104, 30));
    this.explosions.push(new Explosion(this.ctx, this.x+70, this.y+104, 30));


     this.sounds.fire.currentTime = 0;

     setTimeout(() => this.canFire = true, Math.floor((Math.random() * 100) + 50));

      this.canFire = false;


    }


  }


  clear() {

    this.bullets = this.bullets.filter(bullet => bullet.y <= Math.floor((Math.random() * 900) + 700));

  }


  move() {

    this.bullets.forEach(bullet => bullet.move());

    

    this.y += 4
    
    //- GROUND_SPEED - TURBO+0.1;
     this.x += lateral_move;
  }


  animate() {

    this.shot()
  }
  checkCollisions() {


    // const bullet = this.bullets.some(bullet => this.plane.collidesWith(bullet));

    }

  
}