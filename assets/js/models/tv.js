class Tv {

    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0; // no hace falta pasarlo dentro del objeto, ya que sabemos
        this.y = -5; // que son 0


        this.img = new Image();
        this.img.src = './assets/img/oldTv2.png' // 224 x 2144 px

        this.img.isReady = false;
        this.img.onload = () => { // => se carga en cache, para evitar problemas de ejecución
            this.img.isReady = true; // => luego ya se puede retocar, etc
            this.img.width = this.ctx.canvas.width;
            this.img.height = this.ctx.canvas.height;
            this.width = this.ctx.canvas.width; // => es defineix com a width s'amplada de tot es canvas
            this.height =  this.ctx.canvas.height; // => es defineix com a height s'altura de tot es canvas
        }
        // matriz de movimiento
        this.movement = {
            right: false,
            down: false
        }

    }

    onKeyEvent(event) { // => hem de pensar posar-ho dins onKeyEvent de game.js
        const state = event.type === 'keydown' //=> cuando la tecla se pulsa 
        switch (event.keyCode) {
            // => hemos creado constantes.js para que queden guardados los códigos de movimiento 
            // cuando pulsamos las teclas, este diccionario será combinable
            // diccionario de movimientos con booleanos permite tener varios estados abiertos a la vez


            case KEY_RIGHT: // => es background només es mou cap a la dreta
                this.movement.right = state;
                break;
            case KEY_DOWN: // => es background només es mou cap a la dreta
                this.movement.down = state;
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
                -10, // this.x, // la coordenada x donde se va a pintar
                -10,
                this.width+30,
                this.height+100,
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

    move() { // => moure es background
        // if (this.movement.right)
        // this.x += this.vx // => ho he posat dins draw() i em funcionava
        // if (this.x + this.width <= 0) {
        //     this.x = 0
        // }

        // this.y += this.vy

        // this.y += this.vy

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