class Point {

    constructor(ctx, x, y, h, points) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = h,
            this.points = points,
            this.sprite = new Image();
        this.sprite.src = './assets/img/points.png'
        this.sprite.horizontalFrameIndex = points; //
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
                this.x,
                this.y,
                99,
                32
            )
        }
    }

    move() {
        this.y -= - GROUND_SPEED - TURBO + 0.04;
        this.x += lateral_move;
    }



}