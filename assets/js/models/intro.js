class IntroPage {

    constructor(ctx, canvas) {
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



        this.sounds = {
      //      music: new Audio('./assets/sound/intro_Enola_Gay.mp3'),

        }

        this.playMusic = false;

    }

    draw() {
          //     this.sounds.music.play();

        if (this.img.isReady) {
            this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,    
                0, 0, this.canvas.width, this.canvas.height); 
        

        // TITLE
        this.ctx.font = `${140 * this.fontRatio}px Saira Stencil One`;
        this.ctx.shadowColor = "Black"
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.strokeText(`1945`, 50, 200 * this.fontRatio)
        this.ctx.strokeText(`BATTLE OF THE MEDITERRANEAN`, 50, 340 * this.fontRatio)
        this.ctx.fillText(`1945`, 50, 200 * this.fontRatio)
        this.ctx.fillText(`BATTLE OF THE MEDITERRANEAN`, 50, 340 * this.fontRatio)



        // SUBTITLE
        this.ctx.font = `${50 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.strokeText(`40km - 5.000 enemies - one objective`, 50, 400 * this.fontRatio)
        this.ctx.fillText(`40km - 5.000 enemies - one objective`, 50, 400 * this.fontRatio)



        // START
        this.ctx.font = `${80 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.strokeText(`PRESS S TO START`, this.canvas.width/2-150, this.canvas.height/2)
        this.ctx.fillText(`PRESS S TO START`, this.canvas.width/2-150, this.canvas.height/2)




        // CREDITS
        this.ctx.font = `${48 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "rgb(153, 0, 0)"
        this.ctx.strokeText(`American flight cartography over Menorca 1956`, this.canvas.width - 1100 * this.fontRatio, this.canvas.height - 100 * this.fontRatio)
        this.ctx.strokeText(`Original sounds from the bombings of London and Paris during WWII`, this.canvas.width - 1570 * this.fontRatio, this.canvas.height - 30 * this.fontRatio)
        this.ctx.fillText(`American flight cartography over Menorca 1956`, this.canvas.width - 1100 * this.fontRatio, this.canvas.height - 100 * this.fontRatio)
        this.ctx.fillText(`Original sounds from the bombings of London and Paris during WWII`, this.canvas.width - 1570 * this.fontRatio, this.canvas.height - 30 * this.fontRatio)

        // PALLISER LABS
        this.ctx.font = `${48 * this.fontRatio}px Saira Stencil One`;
        this.ctx.fillStyle = "white"

        // this.ctx.fillStyle = "rgb(25, 51, 0)"


        //this.ctx.strokeText(`PLANE NOVEMENTS: ARROW KEYS`, 50, this.canvas.height - 200 * this.fontRatio)

        this.ctx.strokeText(`USE THE BROWSER IN FULL SCREEN MODE AND RELOAD`, 50, this.canvas.height - 350 * this.fontRatio)
        this.ctx.strokeText(`PLANE MOVEMENTS: ARROW KEYS`, 50, this.canvas.height - 300 * this.fontRatio)
        this.ctx.strokeText(`MISSILES: SPACE BAR   BOMBS: ENTER BAR`, 50, this.canvas.height - 250 * this.fontRatio)
        this.ctx.strokeText(`ENGINES: NUMBERS 1-2-3`, 50, this.canvas.height - 200 * this.fontRatio)

        this.ctx.fillText(`USE THE BROWSER IN FULL SCREEN MODE AND RELOAD`, 50, this.canvas.height - 350 * this.fontRatio)
        this.ctx.fillText(`PLANE MOVEMENTS: ARROW KEYS`, 50, this.canvas.height - 300 * this.fontRatio)
        this.ctx.fillText(`MISSILES: SPACE BAR   BOMBS: ENTER BAR`, 50, this.canvas.height - 250 * this.fontRatio)
        this.ctx.fillText(`ENGINES: NUMBERS 1-2-3`, 50, this.canvas.height - 200 * this.fontRatio)


        
        this.ctx.strokeText(`PALLISER LABS 2020`, 50, this.canvas.height - 30 * this.fontRatio)
        this.ctx.fillText(`PALLISER LABS 2020`, 50, this.canvas.height - 30 * this.fontRatio)



            }
    }
 clear() {
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
 }



}