class Background {

    constructor(ctx) {
        // 99% contexto con posición
        this.ctx = ctx;
        this.x = -900; // posició d'es background x
        this.vx = +1,


        this.y = -14400; // que son 0
        this.vy = GROUND_SPEED; // => es moviment d'es background, X (velocitat negativa cap a la dreta)
        this.vx = PLANE_SPEED;
        this.move_left = false;
        this.move_right = false;

        // creamos un "objeto imagen", una clase en si de Javascript, como date() etc
        // es una etiqueta de html el image
        this.img = new Image();
        this.img.src = './assets/img/background.jpg' // 224 x 2144 px

        this.img.isReady = false;
        this.img.onload = () => { // => se carga en cache, para evitar problemas de ejecución
            this.img.isReady = true; // => luego ya se puede retocar, etc
            this.img.width = 2800,// 2850 //this.ctx.canvas.width;
                this.img.height = 14400 // this.ctx.canvas.height;
            this.width = 2850,// this.ctx.canvas.width; // => es defineix com a width s'amplada de tot es canvas
                this.height = 14400// this.ctx.canvas.height; // => es defineix com a height s'altura de tot es canvas
        }
        // matriz de movimiento
        this.movement = {
            right: false,
            left: false,
            down: false,
            up: false
        }

    }

    onKeyEvent(event) { // => hem de pensar posar-ho dins onKeyEvent de game.js
        const state = event.type === 'keydown' //=> cuando la tecla se pulsa 
        switch (event.keyCode) {
            // => hemos creado constantes.js para que queden guardados los códigos de movimiento 
            // cuando pulsamos las teclas, este diccionario será combinable
            // diccionario de movimientos con booleanos permite tener varios estados abiertos a la vez


            case KEY_UP: // => per colocar elements
                this.movement.up = state;

                break;
            case KEY_DOWN:
                this.movement.down = state;
                break;
            case KEY_LEFT: // => per colocar elements
                this.movement.left = state;
                break;
            case KEY_RIGHT:
                this.movement.right = state;
                break;
        }


    }



    draw() {
        // drawImage permet que es dibuixi segons posició i/o quadrant. D'aquesta manera amb un 
        // sprite es poden agafar dinstintes imatges
        // hem de dir posició, ample y alt
        if (this.img.isReady) { // => preguntamos si la imagen está lista para ejecutarse (descargada)
            this.ctx.drawImage(
                this.img, // la imagen que se quiere pintar
                this.x, // this.x, // la coordenada x donde se va a pintar
                this.y + 1800,
                this.width,
                this.height,
            )

            // this.ctx.drawImage(
            //     this.img, // la imagen que se quiere pintar
            //     this.x, //+ this.width, // => es col·loca una segona imatge per donar efecte de moviment
            //     this.y + this.height, // => es col·loca una segona imatge per donar efecte de moviment
            //     this.width,
            //     this.height,
            // )

            // if (this.x === -this.img.width) { this.x = 0 } // ell ho mou a move
        }

    }

    moveRight() {

        if (this.movement.right) {
            this.x -= this.vx
            lateral_move = -2 }
            else {
                this.x = this.x;
                lateral_move = 0;
            }

        

    }



    moveLeft() {

        if (this.movement.left) {
        this.x += this.vy;
        lateral_move = +2 }
        else {
            this.x = this.x;
            lateral_move = 0;
        }
    }

    noLateralMove() {
 
        lateral_move = 0;
        

    }

    move() { // => moure es background

        //      if (this.movement.down)
        //      this.y += -10 // => ho he posat dins draw() i em funcionava
        //     if (this.y + this.height <= 0) {
        //          this.y = 0
        //      }



        // this.y += this.vy // => !!!! DESACTIVAT PER COLOCAR ELEMENTS !!!!!!!!!!!!!!!!!!!!

        //      if (this.movement.up)
        //      this.y += 10 // => ho he posat dins draw() i em funcionava
        //     if (this.y + this.height <= 0) {
        //          this.y = 0
        //      }

        //      if (this.movement.down)
        //      this.y += -10 // => ho he posat dins draw() i em funcionava
        //     if (this.y + this.height <= 0) {
        //          this.y = 0
        //      }

        this.y += this.vy + TURBO;
       






        // this.y += this.vy // => !!!! DESACTIVAT PER COLOCAR ELEMENTS !!!!!!!!!!!!!!!!!!!!

        // if (this.movement.down)
        // this.y += this.vy // => ho he posat dins draw() i em funcionava
        // if (this.y + this.height <= 0) {
        //     this.y = 0
        // }


        //this.x += this.vx

        // if (this.y >= -14400) {
        //     { // => moure es background
        //         if (this.movement.right)
        //             this.x -= this.vx // => ho he posat dins draw() i em funcionava
        //         // if (this.x + this.width <= 0) {
        //         //     this.x = 0
        //         // 

        //        console.log("Dreta")
        //     }

        // }

        //  console.log(`Posició background: ${this.y}`)



    }
}