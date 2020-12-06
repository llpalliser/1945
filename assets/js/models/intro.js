class IntroPage {

    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.b17 = new Image();
        this.b17.src = './assets/img/intro.jpg'
        this.b17.isReady = false;
        this.b17.onload = () => {
            this.b17.isReady = true;

        }
        this.ctx.font = "100px Saira Stencil One";
        this.ctx.fillStyle = "red"



        this.sounds = {
            music: new Audio('./assets/sound/intro_Enola_Gay.mp3'),

        }



    }

    onKeyEvent(event) {
        const state = event.type === 'keydown'
        switch (event.keyCode) {



            case KEY_RIGHT: // => es background només es mou cap a la dreta
                this.movement.right = state;
                break;
            case KEY_DOWN: // => es background només es mou cap a la dreta
                this.movement.down = state;
                break;
        }
    }




    draw() {
 //       this.sounds.music.play();


        if (this.b17.isReady) {
            this.ctx.drawImage(
                this.b17,
                0,
                0,
                1000, 500
            )

            this.ctx.fillText(`SCORE: `, 300, 50);


        }

    }


}