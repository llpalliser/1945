class PlaneHealth {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        

        this.sprite = new Image();
        this.sprite.src = './assets/img/plane_health.png'



    //    this.sprite.horizontalFrameIndex = Math.floor(DAMAGES/100);


        this.sprite.horizontalFrames = 4.854
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = 320, //this.sprite.frameWidth;
            this.height = 85// this.sprite.frameHeight;

        }
    }


 

    draw() {
        if (this.sprite.isReady) { 
          
            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameWidth * Math.floor(DAMAGES * (this.sprite.horizontalFrames) / 1000),
                this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height

            )
    }

}




}

//                 Math.floor(DAMAGES * (this.sprite.horizontalFrames) / 1000),
