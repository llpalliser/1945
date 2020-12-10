class NoBombing {

    constructor(ctx, x, y, h, kind) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = h;
        this.kind = kind;
        this.sprite = new Image();
        this.sprite.src = './assets/img/no_bombing_area.png'
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
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
                this.h,
                this.h
            )
        }
    }

    move() {
        this.y -= - GROUND_SPEED - TURBO;
        this.x += lateral_move;
    }

    collidesWith(element) {
        return this.x < element.x + element.width &&
            this.x + this.h > element.x &&
            this.y < element.y + element.height &&
            this.y + this.h > element.y;
    }

}