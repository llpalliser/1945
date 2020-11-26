class Plane {

    constructor(ctx, x, y) { // => pasamos las coordenadas iniciales de Mario

        this.ctx = ctx;
        this.x = x;
        //this.maxX = Math.floor(this.ctx.canvas.width / 2)
        //this.minX = 10;

        this.minX = 100; 
        this.maxX = Math.floor(this.ctx.canvas.width  - 600); // 600
        this.minY = 100;
        this.maxY = Math.floor(this.ctx.canvas.height - 200)

        this.vx = 0;
        this.y = y;
        this.vy = 0;




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
            this.drawCount++;
            this.animate(); // sería lo mismo hacerlo con un SetimeOut, però millor així
        }

 

    }

    move() {

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
    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {

        // lo primero que se debe hacer es comprobar si el frame está en la posición inicial
        if (this.sprite.verticalFrameIndex != initialVerticalIndex) { // => si no lo está
            this.sprite.verticalFrameIndex = initialVerticalIndex; // => colócalo en el frame vertical inicial
            this.sprite.horizontalFrameIndex = initialHorizontalIndex; // => colócalo en el frame horizontal inicial
        } else if (this.drawCount % frequency === 0) {// => si ya estaba en el frame inicial (en reposo, por ejemplo)
            // => cada ciclo completo, muevo el frame
            // => cuando hayas contado 5, cambia uno de los segmentos del Sprite
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames; // => 0 me paso al 1 y vuelvo al 0 (moviment Mario); que ho determina es Max frames horizontals
            this.drawCount = 0;
        }
    }


}