class Background {

    constructor(ctx) {
        this.ctx = ctx;
        this.x = -900; // posició d'es background x


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

        setInterval




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
            this.x -= GROUND_SPEED
         //   lateral_move = -1 }

         lateral_move = GROUND_SPEED * -1}

            else {
                this.x = this.x;
                lateral_move = 0;
            }

        

    }



    moveLeft() {

        if (this.movement.left) {
        this.x += GROUND_SPEED;
    //    lateral_move = +1 }
    lateral_move = GROUND_SPEED}
        else {
            this.x = this.x;
            lateral_move = 0;
        }
    }

    noLateralMove() {
 
        lateral_move = 0;
        

    }

    move() { 

        this.y += this.vy + TURBO;
 

    }

    collidesWith(element) {
        // => si todo esto se cumple, hay una colisión
        // => es importante que se cumplan todas las condiciones
        return this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
      }




}