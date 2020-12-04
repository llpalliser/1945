class PlaneHealth {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        

        this.sprite = new Image();
        this.sprite.src = './assets/img/plane_health.png'
        this.sprite.horizontalFrameIndex = Math.floor(DAMAGES/100);
        this.sprite.verticalFrameIndex = 0;


        this.sprite.horizontalFrames = 5
        this.sprite.verticalFrames = 1;
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;

        }
    }


 

    draw() {
        if (this.sprite.isReady) { // => abans de dibuixar-la ens hem d'assegurar que està pintada
            this.ctx.drawImage(
                // => la colocamos dentro de la imagen y luego la posicionamos dentro del canvas
                this.sprite,
                Math.floor(DAMAGES/100) * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                240, // 124,
                70, // 40
                
            )
        }
    }


    move() {
        this.y -= - GROUND_SPEED - TURBO + 0.04;
        this.x += lateral_move;
    }



}