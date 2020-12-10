class Ship1 {

    constructor(ctx, x, y, plane, canvas) {
        this.ctx = ctx; 
        this.x = x; 
        this.y = y;
        this.plane = plane;
        this.canvas = canvas;
        this.sprite = new Image();
        this.sprite.src = './assets/img/ships1.png'
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
               this.width,
              this.height,
            )
            this.bullets.forEach(bullet => bullet.draw());
            this.explosions.forEach(explosion => explosion.draw())
            this.explosions_smoke.forEach(explosion => explosion.draw())
            this.drawCount++;
            this.shot();
            this.clear()
            this.checkCollisions()

        }
    }


    clear() {

        this.bullets = this.bullets.filter(bullet => bullet.x <= this.x - 300);
        this.explosions_smoke = this.explosions_smoke.filter(explosion => explosion.y <= this.canvas.height);
    }

    shot() {
        if (this.canFire && this.y >= CAMPO_TIRO_MIN && this.y <= CAMPO_TIRO_MAX && this.y < this.plane.y && this.x > this.plane.x) {
            this.bullets.push(new Shot(this.ctx, this.x + 28, this.y + 160, 440 + this.height, 135));
            this.explosions.push(new Explosion(this.ctx, this.x+28, this.y + 160, 40));
            setTimeout(() => this.explosions.pop(), 200);
            this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x + 38, this.y + 160, 20, 135));
            // aerial explosion
            setTimeout(() => this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x -400, this.y + 300, 190, 90)), 450);
            setTimeout(() => this.explosions.push(new Explosion(this.ctx, this.x - 400, this.y + 300, 90)), 450)
            setTimeout(() => this.explosions.pop(), 600);
            
            this.bullets.push(new Shot(this.ctx, this.x + 28, this.y + 260, 440 + this.height, 135));
            this.explosions.push(new Explosion(this.ctx, this.x+28, this.y + 220, 40));
            setTimeout(() => this.explosions.pop(), 200);
            this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x + 38, this.y + 220, 20, 135));
            // aerial explosion
            setTimeout(() => this.explosions_smoke.push(new ExplosionSmoke(this.ctx, this.x -400, this.y + 360, 190, 90)), 450);
            setTimeout(() => this.explosions.push(new Explosion(this.ctx, this.x - 400, this.y + 360, 90)), 450)
            setTimeout(() => this.explosions.pop(), 600);
          
            this.sounds.fire.play();
            setTimeout(() => this.canFire = true, Math.floor((Math.random() * 2000) + 1500));
            this.canFire = false;
            ENEMY_SHOTS +=2;
        }
    }


    move() {
        this.bullets.forEach(bullet => bullet.move());
        this.explosions_smoke.forEach(explosion_smoke => explosion_smoke.move());
        this.y -= - GROUND_SPEED - TURBO 
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
          DAMAGES += 1
        }
      }


}
