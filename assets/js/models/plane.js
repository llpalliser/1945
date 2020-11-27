class Plane {

    constructor(ctx, x, y) { // => pasamos las coordenadas iniciales de Mario

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

        this.canFire = true;
        this.bullets = [];
        this.explosiones = [];
        this.smokes = [];

        this.sounds = {
            fire: new Audio('./assets/sound/shot.wav')
        }


        // => una IMAGEN se pinta entera
        // => un SPRITE se pinta en distintos FRAMES 

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
        const state = event.type === 'keydown' //=> cuando la tecla se pulsa 
        switch (event.keyCode) {
            // => hemos creado constantes.js para que queden guardados los códigos de movimiento 
            // cuando pulsamos las teclas, este diccionario será combinable
            // diccionario de movimientos con booleanos permite tener varios estados abiertos a la vez
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

            case KEY_FIRE:
                if (this.canFire) {

                    //     this.bullets.push(new Shot(this.ctx, this.x + this.width, this.y + 3, this.maxY + this.height));

                    this.bullets.push(new Shot(this.ctx, this.x + 34, this.y + 3, 500 + this.height, 270));
                    //  setTimeout(() => this.explosiones.push (new Explosion(this.ctx, this.x + 32,this.y + -350, 100)), 400);
                    this.bullets.push(new Shot(this.ctx, this.x + 49, this.y + 3, 500 + this.height, 270));
                    this.bullets.push(new Shot(this.ctx, this.x + 80, this.y + 3, 500 + this.height, 270));
                    //   setTimeout(() => this.explosiones.push (new Explosion(this.ctx, this.x + 80,this.y + -350, 100)), 400);
                    this.bullets.push(new Shot(this.ctx, this.x + 94, this.y + 3, 500 + this.height, 270));
                    this.smokes.push(new Smoke(this.ctx, this.x + 24, this.y + -00, 100));

                    // this.explosiones.push (new Explosion(this.ctx, this.x + 24,this.y + -350, 100));
                    // this.explosiones.push (new Explosion(this.ctx, this.x + 39,this.y + -350, 100));
                    // this.explosiones.push (new Explosion(this.ctx, this.x + 70,this.y + -350, 100));
                    // this.explosiones.push (new Explosion(this.ctx, this.x + 84,this.y + -350, 100));
                  
                  
    

                    this.sounds.fire.currentTime = 0;
                    this.sounds.fire.play();
                    this.canFire = false;

                    setTimeout(() => this.canFire = true, 200);

                }

                break;



        }
    }






    draw() {


        if (this.sprite.isReady) {
            this.ctx.drawImage(
                // primero la posicionamos dentro del png
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex, // posició horitzontal dins s'sprite
                // vgr si amplada de cada frame és 20, i es vol sa segona, 1*20 = 20
                this.sprite.frameHeight * this.sprite.verticalFrameIndex, // posició vertical dins s'sprite
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                // después la posicionamos dentro del canvas
                this.x,
                this.y,
                // this.w,// this.width,
                // this.h, //this.height,
                140,
                120,
                // this.width,
                // this.height
            )
            this.bullets.forEach(bullet => bullet.draw());
            // this.bullets.forEach(bullet => console.log(bullet.y));

            this.explosiones.forEach(explosion => explosion.draw());
            //  this.explosiones.forEach(explosion => console.log(explosion.y));

            this.smokes.forEach(smoke => smoke.draw());
             this.smokes.forEach(smoke => console.log(smoke.y));

            this.drawCount++;
            this.animate(); // sería lo mismo hacerlo con un SetimeOut, però millor així

 
            this.clear()

        }



    }



    clear() {

        this.bullets = this.bullets.filter(bullet => bullet.y >= 300);
        this.explosiones = this.explosiones.filter(explosion => explosion.y <= 1200) // es pot baixar a 1000
        this.smokes = this.smokes.filter(smoke => smoke.y <= 1200) // es pot baixar a 1000
    }
    move() {






        this.explosiones.forEach(explosion => explosion.move());
        this.smokes.forEach(smoke => smoke.move());


        this.bullets.forEach(bullet => bullet.move());

        if (this.movement.right) {
            this.vx = + PLANE_SPEED; // => posat a constants.js
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
 


   




    collidesWith(element) {
        // => si todo esto se cumple, hay una colisión
        // => es importante que se cumplan todas las condiciones
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y;
    }



}