class Ship1 {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

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
            new Sur(this.ctx, this.x-4, this.y + 120, 30, 3), // Prova
            new Sur(this.ctx, this.x-4, this.y + 160, 30, 3), // Prova
            new Sur(this.ctx, this.x-4, this.y + 200, 30, 3), // Prova

        ]

        this.nortes = [
            new Norte(this.ctx, this.x+35, this.y + 120, 30, 3), // Prova
            new Norte(this.ctx, this.x+35, this.y + 160, 30, 3), // Prova
            new Norte(this.ctx, this.x+35, this.y + 200, 30, 3), // Prova

        ]


    }

    draw() {
        if (this.sprite.isReady) { // => abans de dibuixar-la ens hem d'assegurar que està pintada
            this.ctx.drawImage(
                // => la colocamos dentro de la imagen y luego la posicionamos dentro del canvas
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth, // posició horitzontal dins s'sprite
                // vgr si amplada de cada frame és 20, i es vol sa segona, 1*20 = 20
                this.sprite.verticalFrameIndex * this.sprite.frameHeight, // posició vertical dins s'sprite
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                // después la posicionamos dentro del canvas
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

        this.y -= - GROUND_SPEED - TURBO;
        this.x += lateral_move;
        this.nortes.forEach(norte => norte.move());
        this.sures.forEach(sur => sur.move());


      }
    


}