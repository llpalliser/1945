class Plane {

    constructor(ctx, x, y) { // => pasamos las coordenadas iniciales de Mario

        this.ctx = ctx;
        this.x = x;
        this.minX = 100;
        this.maxX = Math.floor(this.ctx.canvas.width - 500); // 600
        this.minY = 100;
        this.maxY = Math.floor(this.ctx.canvas.height - 200)

        this.vx = 0;
        this.y = y;
        this.vy = 0;

        this.engineStatus = 0;
        this.engineFire = []
        this.engine1 = false;

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
        this.sprite.src = './assets/img/b17_sprite.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 8;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = 220,  // this.sprite.frameWidth;
                this.height = 140 //this.sprite.frameHeight;
        }

        this.movement = {
            up: false,
            right: false,
            left: false,
            down: false,
        }

        this.drawCount = 0;
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



        }
    }






    draw() {


        // this.fixedFires.forEach(fixedFire => fixedFire.draw());

        if (this.sprite.isReady) {
            this.craters.forEach(crater => crater.draw());

            this.ctx.drawImage(
                // primero la posicionamos dentro del png
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
                this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height

            )
            this.bullets.forEach(bullet => bullet.draw());
            this.explosiones.forEach(explosion => explosion.draw());

            this.smokes.forEach(smoke => smoke.draw());
            //   this.fixedSmokes.forEach(fixedSmoke => fixedSmoke.draw());
            // this.averies1.forEach(averia1 => averia1.draw());



            this.drawCount++;
            this.animate();
            this.clear()



        }

    }



    clear() {
        //     this.smokes = this.smokes.filter(enemyPlane => enemyPlane.y <= this.canvas.height)

    }



    move() {
        //    this.explosiones.forEach(explosion => explosion.move());
        this.x = this.x + WIND + this.engineStatus
        this.smokes.forEach(smoke => smoke.move());


        this.smokes.forEach(smoke => smoke.move());


        // this.fixedSmokes.forEach(fixedSmoke => fixedSmoke.move());
        //   this.fixedFires.forEach(fixedFire => fixedFire.move());

        this.craters.forEach(crater => crater.move());
        this.bullets.forEach(bullet => bullet.move());

        if (this.movement.right) {
            this.vx = + PLANE_SPEED + 1;
        }
        else if (this.movement.left) {
            this.vx = - PLANE_SPEED - 1;
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

        if (this.x >= this.maxX) {
            this.x = this.maxX;


        }
        else if (this.x <= this.minX) {
            this.x = this.minX;
        }
        else if (this.y >= this.maxY) {
            this.y = this.maxY;
        }
        else if (this.y <= this.minY) {
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

    planeStatus() {


        this.sprite.horizontalFrameIndex = Math.floor(DAMAGES * (this.sprite.horizontalFrames) / 1000)
        this.engineStatus = DAMAGES / 1000 * (Math.round(Math.random()) ? 1 : -1) * 1.5


       // this.smokes.push(new FixedSmoke(this.ctx, this.x + 50, this.y - 20, 40))


        if (this.engine1 === false) {
            this.engine = undefined;
            this.smokes.push(new FixedSmoke(this.ctx, this.x + 50, this.y +30, 40))
        }



    }


    resetAnimation() {
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;

    }







    collidesWith(element) {
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y + 30 < element.y + element.height &&
            this.y + this.height > element.y;
    }











    checkCollisions() {
    }





}