class Background {

    constructor(ctx) {
        this.ctx = ctx;
        this.x = -1000;
        this.y = 0
        this.img = new Image();
        this.img.src = './assets/img/background_small.jpg'
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.img.width = 5000,
                this.img.height = 28000,
                this.width = 5000,
                this.height = 28000
        }
        this.movement = {
            right: false,
            left: false
        }

    }

    onKeyEvent(event) {

        setInterval
        const state = event.type === 'keydown'
        switch (event.keyCode) {
            // case KEY_UP:
            //     this.movement.up = state;
            //     break;
            // case KEY_DOWN:
            //     this.movement.down = state;
            //     break;
            case KEY_LEFT:
                this.movement.left = state;
                break;
            case KEY_RIGHT:
                this.movement.right = state;
                break;
        }
    }

    moveRight() {

        if (this.movement.right) {
            this.x -= GROUND_SPEED
            lateral_move = GROUND_SPEED * -4
        }
        else {
            this.x = this.x;
            lateral_move = 0;
        }
    }
    moveLeft() {
        if (this.movement.left) {
            this.x += GROUND_SPEED;
            lateral_move = GROUND_SPEED * 4
        }
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
        return this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y;
    }
}