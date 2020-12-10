class GameOver {

    constructor(ctx, canvas, score, enemies) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.img = new Image();
        this.img.src = './assets/img/intro_bg.jpg'
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
        this.ctx.font = "100px Saira Stencil One";
        this.ctx.fillStyle = "red"
        this.fontRatio = this.canvas.width / 3840


        this.score = score;
        this.enemies = enemies;

        this.sounds = {
            music: new Audio('./assets/sound/intro_Enola_Gay.mp3'),

        }

        this.playMusic = false;



    }




    draw() {

        if (this.img.isReady) {
            this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,     // source rectangle
                0, 0, this.canvas.width, this.canvas.height); // destination rectangle
        }

        // TITLE
        this.ctx.font = `${140 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"

        this.ctx.fillText(`1945`, 50, 200 * this.fontRatio)
        this.ctx.fillText(`BATTLE OF THE MEDITERRANEAN`, 50, 340 * this.fontRatio)







        // SUBTITLE
        this.ctx.font = `${50 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.fillText(`40km - 5.000 enemies - one objective`, 50, 400 * this.fontRatio)



        // SCORE
        this.ctx.font = `${100 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.fillText(`DESTROYED ENEMIES: ${this.enemies}`, 300, 700 * this.fontRatio)
        this.ctx.fillText(`BOMBS: ${BOMBS_SHOOTED}`, 300, 800 * this.fontRatio)
        this.ctx.fillText(`MISSILES: ${MISSILES_SHOOTED}`, 300, 900 * this.fontRatio)
        this.ctx.fillText(`ENEMY SHOTS: ${ENEMY_SHOTS}`, 300, 1000 * this.fontRatio)
        this.ctx.fillText(`SCORE: ${this.score}`, 300, 1100 * this.fontRatio)



        // CREDITS
        this.ctx.font = `${48 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
         this.ctx.fillText(`American flight cartography over Menorca 1956`, this.canvas.width - 1100 * this.fontRatio, this.canvas.height - 100 * this.fontRatio)
         this.ctx.fillText(`Original sounds from the bombings of London and Paris during WWII`, this.canvas.width - 1570 * this.fontRatio, this.canvas.height - 30 * this.fontRatio)

        // PALLISER LABS
        this.ctx.font = `${48 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "white"

        this.ctx.fillStyle = "rgb(25, 51, 0)"

        this.ctx.fillText(`PALLISER LABS 2020`, 50, this.canvas.height - 30 * this.fontRatio)

    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }



}