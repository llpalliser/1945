class Mirador {

    // constructor(ctx, x, y, h, plane) {

    constructor(ctx, plane, position, pointer) {
        this.ctx = ctx;
        this.plane = plane;

       this.position = position


        this.sprite = new Image();
        this.sprite.src = './assets/img/punteros.png'
        this.sprite.horizontalFrameIndex = pointer;
        this.sprite.verticalFrameIndex = 0;

        this.sprite.horizontalFrames = 4;
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
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.plane.x + this.plane.width/2 - 20,
                this.plane.y + this.position,
                40, 40


            )
        }
    }

    move() {
        this.y = this.plane.y;
        this.x = this.plane.x + 45;
    }


    collidesWith(element) {
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y + this.position < element.y + element.height &&
            this.y + this. position + this.height > element.y;
    }


}