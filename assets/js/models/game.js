

// serà el pegamento de todas las clases, du tot es control d'es joc

class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1425; // AMPLE
        this.canvas.height = 1000; // LLRG
        this.ctx = this.canvas.getContext('2d'); // volem un contexte de 2 dimencions

        this.fps = 1000 / 60; // => 60 fps
        this.drawIntervalId = undefined;

        this.tv = new Tv(this.ctx)
        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, 600, 600)


        this.mapped = false;

        this.paused = false;

        this.damages = DAMAGES;
        this.plane_destroyed = false;
        this.planeExplosions = [];
        this.enemyPlanes = [
        ]



        this.ships = [
            new Ship1(this.ctx, 1088, + 300, this.plane),
            new Ship1(this.ctx, 100, + -800, this.plane),
            new Ship2(this.ctx, 200, + -1200, this.plane),
        ]



        this.bombs = [
            // new Bomb(this.ctx, 700, -700, 20),
    
        ]

        this.canyons = [

        ];


        this.panzers = [

        ];





        this.levantes = [
            //    new Levante(this.ctx, 120, 130, 40, 90, this.plane), // Prova
 ]


        this.nortes = [
            //new Norte(this.ctx, 500, -200, 40, this.plane.x * -1, this.plane), // Prova


        ]

        this.sures = [
            // new Sur(this.ctx, 700, -200, 40, 0), // Prova
               ]

        this.missiles = []


        const motorAudio = new Audio('./assets/sound/bomber-sound.mp3');
        motorAudio.volume = 0.2;
        this.sounds = {
            theme: motorAudio,
            motor_plane: new Audio('./assets/sound/bomber-sound.mp3')
        }


    }


    randomStars
        () {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 1900) + -600);
            let posY = Math.floor((Math.random() * -8000) + -400);
            this.bombs.push(new Bomb(this.ctx, posX, posY, 60))

        }
    }
    randomPanzer() {
        for (let i = 0; i <= TANKS; i++) {
            let posX = Math.floor((Math.random() * 1900) + -600);
            let posY = Math.floor((Math.random() * -8000) + -3400);
            this.panzers.push(new Panzer(this.ctx, posX, posY, 40, this.plane))
            this.panzers.push(new Panzer(this.ctx, posX + 40, posY + 20, 40, this.plane))

        }
    }

    randomNortes() {
        for (let i = 0; i <= NORTES; i++) {
            let posX = Math.floor((Math.random() * 1800) + -600);
            let posY = Math.floor((Math.random() * -8000) + 0); // -3400
            this.nortes.push(new Norte(this.ctx, posX, posY, 40, this.plane.x * -1, this.plane))
            this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
            this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))

        }
    }


    randomLevantes() {
        for (let i = 0; i <= LEVANTES; i++) {
            let posX = Math.floor((Math.random() * 2000) + -640);
            let posY = Math.floor((Math.random() * -8000) + -3400);
            this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 50, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 100, posY, 40, this.plane))

        }
    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 2000) + -640);
            let posY = Math.floor((Math.random() * -14000) + -400);

            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 120, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlane(this.ctx, posX + 300, posY, 120, this.plane.x * -1, this.plane.Y * -1))

            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 150, posY + 200, 120, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX, posY + 300, 120, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX + 150, posY + 200, 120, this.plane.x * -1, this.plane.Y * -1))


        }



    }



    onKeyEvent(event) { // => propagarà a tot els models

        this.plane.onKeyEvent(event); // => s'ha posat dins Mario un onKeyEvent
        this.background.onKeyEvent(event); // => definit dins background

        const state = event.type === 'keydown'
        // console.log(this.background.x)
        //   console.log(this.background.x-this.plane.x)
        switch (event.keyCode) {

            case PAUSE:

                this.paused = true;
                console.log(this.paused)
                break;

            case SPEED1: GROUND_SPEED = 1;
            console.log(GROUND_SPEED);

                break;

            case SPEED2: GROUND_SPEED = 2;
            console.log(GROUND_SPEED);
                break;

        }
    }



    start() {
        if (!this.mapped) {
            this.randomStars()
            this.randomPanzer()
            this.randomNortes()
            this.randomLevantes()
            this.randomEnemyPlanes()

            this.mapped = true;
        }

        if (!this.drawIntervalId) {

            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();

            }, this.fps);


        }
        this.sounds.motor_plane.play();









    }

    clear() { // RANDOM

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.panzers = this.panzers.filter(panzer => panzer.y <= 1000)
        this.nortes = this.nortes.filter(norte => norte.y <= 1000)
        this.levantes = this.levantes.filter(levante => levante.y <= 1000)
        this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= 1000)
        this.bombs = this.bombs.filter(bomb => bomb.y <= 1000)

        // this.ships = this.ship.filter(ship => ship.y <= 1000)
        // this.bombs = this.bomb.filter(bomb => bomb.y <= 1000)
        // this.canyons = this.canyon.filter(canyon => canyon.y <= 1000)







    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
        // amb pause lo mismo; stop start (si no lo has limpiado)
    }

    draw() {
        if (!this.paused) {

            this.background.draw(); // => quiero llamar al draw del background
            this.ships.forEach(ship => ship.draw());
            this.canyons.forEach(canyon => canyon.draw());


            this.nortes.filter(norte => norte.y > 0).forEach(norte => norte.draw())
            this.levantes.filter(levante => levante.y > 0).forEach(levante => levante.draw())
            this.sures.filter(sur => sur.y > 0).forEach(sur => sur.draw())
            this.panzers.filter(panzer => panzer.y > 0).forEach(panzer => panzer.draw())
            this.enemyPlanes.filter(enemyPlane => enemyPlane.y > 0).forEach(enemyPlane => enemyPlane.draw())

            this.bombs.filter(bomb => bomb.y > 0).forEach(bomb => bomb.draw())

            //this.bombs.forEach(bomb => bomb.draw());
            this.plane.draw();
            this.planeExplosions.filter(planeExplosion => planeExplosion.y > 0).forEach(planeExplosion => planeExplosion.draw())





            this.ctx.font = "80px Advent Pro";
            this.ctx.fillText(DAMAGES, 30, 100);
            this.checkCollisions();











        }


    }

    move() {


        this.plane.move();
        this.background.move();
        this.ships.forEach(ship => ship.move());
        this.canyons.forEach(canyon => canyon.move());
        this.levantes.forEach(levante => levante.move());
        this.nortes.forEach(norte => norte.move());
        this.sures.forEach(sur => sur.move());
        this.panzers.forEach(panzer => panzer.move());
        this.enemyPlanes.forEach(enemyPlane => enemyPlane.move());

        this.plane.move();
        this.bombs.forEach(bomb => bomb.move());


        // this.canyons.forEach(canyon => canyon.shot());


        //   this.sounds.motor_plane.play(); // => desactivat


        if (this.plane.y <= 200) { TURBO = 10 } else { TURBO = 0 }

        if (this.plane.x >= this.plane.maxX - 200 && this.background.x * -1 <= this.background.img.width - 1200) {
            this.background.moveRight();
        }

        else if (this.plane.x <= this.plane.minX && this.background.x * -1 >= 50) {

            this.background.moveLeft();
        }
        else {
            this.background.noLateralMove();
        }


    }


    checkCollisions() {


        const ship = this.ships.some(ship => this.plane.collidesWith(ship));
        const planes = this.enemyPlanes.some(enemy => this.plane.collidesWith(enemy));
        const llevants = this.levantes.some(levante => this.plane.collidesWith(levante));
        const tanks = this.panzers.some(panzer => this.plane.collidesWith(panzer));
        const nords = this.nortes.some(norte => this.plane.collidesWith(norte));
        const bomb = this.bombs.some(bomb => this.plane.collidesWith(bomb));


        if (bomb) {
            DAMAGES = 10000;
        }




        // if (!this.plane_destroyed){
        //         if (planes || tanks || nords ||llevants) {
        //             console.log("TE L'HAS PIGADA AMB UN LEVANTE");
        //             this.planeExplosions.push(new PlaneExplosion(this.ctx, this.plane.x, this.plane.y, 100))
        //             this.plane_destroyed = true;
        //         }

        //     }

    }



}