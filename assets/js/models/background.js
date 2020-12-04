class Background {

    constructor(ctx) {
        this.ctx = ctx;
        this.x = -1000; // posició d'es background x


        this.y = 0// 28000; // que son 0
        this.move_left = false;
        this.move_right = false;


        this.img = new Image();
        this.img.src = './assets/img/background.jpg' // 224 x 2144 px

        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true; 
            this.img.width = 5000,
            this.img.height = 28000,
            this.width = 5000, 
            this.height = 28000
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




        const state = event.type === 'keydown' 
        switch (event.keyCode) {


            case KEY_UP: 
                this.movement.up = state;

                break;
            case KEY_DOWN:
                this.movement.down = state;
                break;
            case KEY_LEFT: 
                this.movement.left = state;
                break;
            case KEY_RIGHT:
                this.movement.right = state;
                break;
        }


    }



    draw() {
   
        // if (this.img.isReady) { 
        //     this.ctx.drawImage(
        //         this.img, 
        //         this.x, 
        //         this.y + 1800,
        //         this.width,
        //         this.height,
        //     )

          
        // }

    }

    moveRight() {

        if (this.movement.right) {
            this.x -= GROUND_SPEED
         //   lateral_move = -1 }

         lateral_move = GROUND_SPEED * -4}

            else {
                this.x = this.x;
                lateral_move = 0;
            }

        

    }



    moveLeft() {

        if (this.movement.left) {
        this.x += GROUND_SPEED;
    //    lateral_move = +1 }
    lateral_move = GROUND_SPEED * 4}
        else {
            this.x = this.x;
            lateral_move = 0;
        }
    }

    noLateralMove() {
 
        lateral_move = 0;
        

    }

    move() { 

        this.y += GROUND_SPEED + TURBO;
 

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