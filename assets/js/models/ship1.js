class Ship1 {

    constructor(ctx, x, y, plane) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
this.plane = plane;
        this.sprite = new Image();
        this.sprite.src = './assets/img/ship_hd1.png'
        this.sprite.horizontalFrameIndex = 0; // => posición de reposo de la moneda linea 0
        this.sprite.verticalFrameIndex = 0; // => posición de reposo de la moneda columna 0
        // aunque no tenga posiciones verticales, ponerlo para así recordarlo siempre

        // ahora hemos de decir cuantos frames tiene nuestro sprite: 
        this.sprite.horizontalFrames = 1; // no son palabras reservadas
        this.sprite.verticalFrames = 1;
        this.sprite.isReady = false; // casegurarse que las imágenes están en cache
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth; // => li dic es width de sa moneda
            this.height = this.sprite.frameHeight; // => li dic es height de sa moneda
        }

        this.sures = [
            new Sur(this.ctx, this.x-4, this.y + 120, 30, 180), // Prova
            new Sur(this.ctx, this.x-4, this.y + 160, 30, 180), // Prova
            new Sur(this.ctx, this.x-4, this.y + 200, 30, 180), // Prova

        ]

        this.nortes = [
            new Norte(this.ctx, this.x+35, this.y + 120, 30, this.plane.x * -1, this.plane), // Prova
            new Norte(this.ctx, this.x+35, this.y + 160, 30, this.plane.x * -1, this.plane), // Prova
            new Norte(this.ctx, this.x+35, this.y + 200, 30, this.plane.x * -1, this.plane), // Prova

        ]


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
        }
        this.nortes.forEach(norte => norte.draw());
        this.sures.forEach(sur => sur.draw());


    }

    move() {

        // this.y -= - GROUND_SPEED - TURBO;
        // this.x += lateral_move;
        // this.nortes.forEach(norte => norte.move());
        // this.sures.forEach(sur => sur.move());


      }
    


      collidesWith(element) {
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y;
    }


}