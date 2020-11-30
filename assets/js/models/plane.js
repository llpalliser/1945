class Plane {

    constructor(ctx, x, y, nortes=[]) { // => pasamos las coordenadas iniciales de Mario

        this.ctx = ctx;
        this.x = x;
        //this.maxX = Math.floor(this.ctx.canvas.width / 2)
        //this.minX = 10;
        this.minX = 100;
        this.maxX = Math.floor(this.ctx.canvas.width - 600); // 600
        this.minY = 100;
        this.maxY = Math.floor(this.ctx.canvas.height - 200)

        this.vx = 0;
        this.y = y;
        this.vy = 0;
        this.damages = DAMAGES;


        this.nortes= nortes; // PRUEBA


        this.canFire = true;
        this.bullets = [];
        this.explosiones = [];
        this.smokes = []; //?
        this.fixedSmokes = [];
        this.fixedFires = [];
        this.craters = [];
        this.averies1 = [];



        this.sounds = {
            fire: new Audio('./assets/sound/shot.wav'),
        }

        this.sprite = new Image();
        this.sprite.src = './assets/img/bombers.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2; // => es diu quants frames horitzontals i verticals te s'sprite
        this.sprite.verticalFrames = 2;
        this.sprite.verticalFrameIndex = 0; // diu quina posició inicial té en Mario dins es frame
        this.sprite.horizontalFrameIndex = 0; // "" "" ""
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        // matriz de movimiento
        this.movement = {
            up: false,
            right: false,
            left: false,
            down: false,
        }

        this.drawCount = 0; // => comptador que es té en compte cada vegada que es pinta (draw)
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown'

        switch (event.keyCode) {
            case KEY_UP:
                this.movement.up = state;
                break;
            case KEY_RIGHT:
                this.movement.right = state;
                break;
            case KEY_LEFT:
                this.movement.left = state;


                break;
            case KEY_DOWN:
                this.movement.down = state;
                break;


            case KEY_BURST:

                this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 440 + this.height, 270)); // cañon 1
                 this.bullets.push(new Shot(this.ctx, this.x + 94, this.y + 3, 440 + this.height, 270)); // cañon 4
  
                this.sounds.fire.currentTime = 0;
                this.sounds.fire.play();

                setTimeout(() => this.canFire = true, 100);


                break;


            case KEY_FIRE:
                if (this.canFire) {

                    this.bullets.push(new Missile(this.ctx, this.x + 34, this.y + 3, 440 + this.height, 270)); // cañon 1
                    this.bullets.push(new Missile(this.ctx, this.x + 49, this.y + 3, 440 + this.height, 270)); // cañon 2
                    this.bullets.push(new Missile(this.ctx, this.x + 80, this.y + 3, 440 + this.height, 270)); // cañon 3
                    this.bullets.push(new Missile(this.ctx, this.x + 94, this.y + 3, 440 + this.height, 270)); // cañon 4
                    // Daños
                    setTimeout(() => this.craters.push(new Crater(this.ctx, this.x + 24, this.y - 420, 1)), 400);
                    setTimeout(() => this.fixedSmokes.push(new FixedSmoke(this.ctx, this.x + 24, this.y + -450, 140)), 400);
                    setTimeout(() => this.fixedFires.push(new FixedFire(this.ctx, this.x + 28, this.y + -420, 80)), 400);

                    this.explosiones.push(new Explosion(this.ctx, this.x + 32, this.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.x + 47, this.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.x + 78, this.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.x + 92, this.y, 28));

                    this.sounds.fire.currentTime = 0;
                    this.sounds.fire.play();
                    this.canFire = false;

                    setTimeout(() => this.canFire = true, 800);

                //    this.checkMissileCollission();


                }
                break;
        }
    }






    draw() {


        this.fixedFires.forEach(fixedFire => fixedFire.draw());

        if (this.sprite.isReady) {
            this.craters.forEach(crater => crater.draw());

            this.ctx.drawImage(
                // primero la posicionamos dentro del png
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex, // posició horitzontal dins s'sprite
                // vgr si amplada de cada frame és 20, i es vol sa segona, 1*20 = 20
                this.sprite.frameHeight * this.sprite.verticalFrameIndex, // posició vertical dins s'sprite
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                140,
                120,

            )
            this.bullets.forEach(bullet => bullet.draw());
            this.explosiones.forEach(explosion => explosion.draw());
            this.smokes.forEach(smoke => smoke.draw());
            this.fixedSmokes.forEach(fixedSmoke => fixedSmoke.draw());
            this.averies1.forEach(averia1 => averia1.draw());



            this.drawCount++;
            this.animate(); // sería lo mismo hacerlo con un SetimeOut, però millor així
            this.clear()

            this.checkCollisions()

         

        }



    }



    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.y >= this.y - 300);
        // this.explosiones = this.explosiones.filter(explosion => explosion.y <= 1200) // es pot baixar a 1000
        this.smokes = this.smokes.filter(smoke => smoke.y <= 1200)
        this.fixedSmokes = this.fixedSmokes.filter(fixedSmokes => fixedSmokes.y <= 1200)
        this.fixedFires = this.fixedFires.filter(fixedFires => fixedFires.y <= 1200)
        this.craters = this.craters.filter(crater => crater.y <= 1200)


    }



    move() {
        //    this.explosiones.forEach(explosion => explosion.move());



        this.smokes.forEach(smoke => smoke.move());
        this.fixedSmokes.forEach(fixedSmoke => fixedSmoke.move());
        this.fixedFires.forEach(fixedFire => fixedFire.move());

        this.craters.forEach(crater => crater.move());
        this.bullets.forEach(bullet => bullet.move());

        if (this.movement.right) {
            this.vx = + PLANE_SPEED;
        }
        else if (this.movement.left) {
            this.vx = - PLANE_SPEED;
        }

        else if (this.movement.up) {
            this.vy = - PLANE_SPEED;
        }
        else if (this.movement.down) {
            this.vy = + PLANE_SPEED;
        }
        else {
            this.vx = 0,
                this.vy = 0;

        } // =>  si no ho igualo a 0, no s'atura

        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= this.maxX) { // => s'ha fet que es pugui arribar com a màxim a sa meitat d'es canvas
            this.x = this.maxX;
            //  this.background.move();

        }
        else if (this.x <= this.minX) { // => no pot sortir de sa pantalla per l'esquerra
            this.x = this.minX;
        }
        else if (this.y >= this.maxY) { // => s'ha fet que es pugui arribar com a màxim a sa meitat d'es canvas
            this.y = this.maxY;
        }
        else if (this.y <= this.minY) { // => no pot sortir de sa pantalla per l'esquerra
            this.y = this.minY + 1;
        }



    }

    animate() { // => aquí hi van tots els moviments

        // if (this.movement.right) {
        //     this.animateSprite(1, 0, 1, MOVEMENT_FRAMES);
        //     // Frecuencia =>  hasta que no haga xx ciclos, no pintes el cambio de frames
        //     // =>  initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency
        // }

        // if (this.movement.left) {
        //     this.animateSprite(1, 0, 1, MOVEMENT_FRAMES);
        //     // Frecuencia =>  hasta que no haga xx ciclos, no pintes el cambio de frames
        //     // =>  initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency
        // }


        // else {
        //     this.resetAnimation() // => si no pulso las teclas, reséate
        // }

    }

    resetAnimation() {  // => es fa per que en mario quedi en posició 0 quan no es pitja cap tecla
        this.sprite.verticalFrameIndex = 1; // => colócalo en el frame vertical inicial
        this.sprite.horizontalFrameIndex = 0; // => colócalo en el frame horizontal inicial
    }



    // Aquest codi ja no es toca, si es vol fer un altre moviment, es posa dins animate()



    damaged(element) {
        LIFES -= 1;

        this.sounds.damaged.currentTime = 0;
        this.damaged.fire.play();
        console.log("rebut a plane")
    }




    collidesWith(element) {
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y;
    }





    // checkCollisions() {

        checkMissileCollission() {


        const dispars = this.bullets.some(bullet => this.norte.collidesWith(bullet));
        const dispars2 = this.norte.some(nord=> this.bullets.collidesWith(nord));
        if (dispars || dispars2) {
         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          DAMAGES += 1
       //   this.sounds.ferit.play();
        }
      }

        





    checkCollisions() {

      //  const crateres = this.craters.some(crater => this.norte.collidesWith(crater));

   //     const disparos = this.bullets.some(bullet => this.craters.forEach(crater =>  crater.collidesWith(bullet))); // NO DONA EROR
    
    // const disparos = this.bullets.some(bullet => this.craters.some(crater =>  crater.collidesWith(bullet))); // FUNCIONAA
     const disparos = this.bullets.some(bullet => this.nortes.some(norte =>  norte.collidesWith(bullet))); // FUNCIONAA


        if (disparos) {
         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          DAMAGES += 1
       //   this.sounds.ferit.play();
        }
      }





}