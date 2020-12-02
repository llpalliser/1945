

// serà el pegamento de todas las clases, du tot es control d'es joc

class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1425; // AMPLE
        this.canvas.height = 1000; // LLRG
        this.ctx = this.canvas.getContext('2d'); // volem un contexte de 2 dimencions

        this.fps = 1000 / 60; // => 60 fps

        this.checkColl = 1000;

        this.drawIntervalId = undefined;

        this.tv = new Tv(this.ctx)
        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, 600, 600)


        this.mapped = false;

        this.paused = false;

        this.canFire = true;
        this.damages = DAMAGES;
        this.plane_destroyed = false;
        this.planeExplosions = [];
        this.enemyPlanes = []




        // DISPAROS PLANE ------------------------------

        this.missiles = [];
        this.explosiones = [];
        this.fixedClouds = [];
        this.fixedFires = [];
        this.craters = [];
        this.collissions = [];

        this.mirador = [new Mirador(this.ctx, this.plane.x + 44, this.plane.y - 420, 50, this.plane)]

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
            new Norte(this.ctx, 500, -200, 40, this.plane.x * -1, this.plane), // Prova


        ]

        this.sures = [
            // new Sur(this.ctx, 700, -200, 40, 0), // Prova
        ]

        this.missiles = []



        //  motorAudio.volume = 0.9;

        this.sounds = {
            fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
            click: new Audio('./assets/sound/click_click.wav'),
            bomb: new Audio('./assets/sound/bomber-sound.mp3')
        }




    }


    randomStars
        () {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 1900) + -600);
            let posY = Math.floor((Math.random() * -8000) + -400); // 8000 -400
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
            let posY = Math.floor((Math.random() * -8000) + 200); // -8000) + -3400);
            this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 50, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 100, posY, 40, this.plane))

        }
    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 2000) + -640);
            let posY = Math.floor((Math.random() * -14000) + -400);

            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlane(this.ctx, posX + 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))

            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 150, posY + 200, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX, posY + 300, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX + 150, posY + 200, 100, this.plane.x * -1, this.plane.Y * -1))


        }



    }



    onKeyEvent(event) { // => propagarà a tot els models

        this.plane.onKeyEvent(event); // => s'ha posat dins Mario un onKeyEvent
        this.background.onKeyEvent(event); // => definit dins background

        const state = event.type === 'keydown'

        switch (event.keyCode) {

            case PAUSE:

                if (!this.paused) {
                    this.paused = true;
                }

                else
                    if (this.paused) {
                        this.paused = false;
                    }
                console.log(this.paused)


                break;

            case SPEED1: GROUND_SPEED = 1;
                console.log(GROUND_SPEED);

                break;

            case SPEED2: GROUND_SPEED = 2;
                console.log(GROUND_SPEED);
                break;


            case KEY_FIRE:
                if (this.canFire) {

                    let posx = this.plane.x
                    let posy = this.plane.y

                    this.missiles.push(new Missile(this.ctx, this.plane.x + 34, this.plane.y + 3, 440 + this.height, 270));
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 49, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 2
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 80, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 3
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 94, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 4
                    // Daños

                    setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 24, posy - 420, 100, 100)), 400);
                    setTimeout(() => this.collissions.pop(this.craters), 410);




                    setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 34, posy + -450, 90)), 400);
                    setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 30, posy + -440, 90)), 400);







                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 24, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 47, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 78, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 92, this.plane.y, 28));

                    // this.sounds.fire.currentTime = 0;
                    this.sounds.fire.play();
                    this.canFire = false;

                    setTimeout(() => this.canFire = true, 800);



                    //    this.checkMissileCollission();


                }

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
                this.checkCollisions();

            }, this.fps);


        }
        //  this.sounds.motor_plane.play();









    }

    clearExploded(element) {


    }

    clear() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.panzers = this.panzers.filter(panzer => panzer.y <= 1000)
        this.nortes = this.nortes.filter(norte => norte.y <= 1000)
        this.levantes = this.levantes.filter(levante => levante.y <= 1000)
        this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= 1000)
        this.bombs = this.bombs.filter(bomb => bomb.y <= 1000)


        // PLANE -------
        //  this.bullets = this.bullets.filter(bullet => bullet.y >= this.y - 300);

        this.missiles = this.missiles.filter(missile => missile.y >= this.plane.y - 300);
        this.fixedClouds = this.fixedClouds.filter(fixedSmoke => fixedSmoke.y <= 1200)
        this.fixedFires = this.fixedFires.filter(fixedFires => fixedFires.y <= 1200)
        this.craters = this.craters.filter(crater => crater.y <= 1200)








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

            this.bombs.forEach(bomb => bomb.draw());


            // PLANE ---------


            this.explosiones.forEach(explosion => explosion.draw());

            this.missiles.forEach(missile => missile.draw());
            this.craters.forEach(crater => crater.draw());
            this.fixedClouds.forEach(fixedSmoke => fixedSmoke.draw());

            this.fixedFires.forEach(fixedFire => fixedFire.draw());


            this.plane.draw();

            this.mirador.forEach(mira => mira.draw());

            //   this.planeExplosions.filter(planeExplosion => planeExplosion.y > 0).forEach(missile => planeExplosion.draw())

            this.ctx.font = "80px Advent Pro";
            this.ctx.fillText(DAMAGES, 30, 100);

            // this.tv.draw();


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

        // this.missiles.move();
        this.bombs.forEach(bomb => bomb.move()); // ??????



        // Plane ---------------------------
        this.missiles.forEach(missile => missile.move());
        this.fixedClouds.forEach(fixedSmoke => fixedSmoke.move());
        this.fixedFires.forEach(fixedFire => fixedFire.move());
        this.craters.forEach(crater => crater.move());
        this.mirador.forEach(mira => mira.move());




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

        const nordColl = this.collissions.some(bullet => this.nortes.some(norte => norte.collidesWith(bullet)));
        const levColl = this.collissions.some(bullet => this.levantes.some(norte => norte.collidesWith(bullet)));
        const surColl = this.collissions.some(bullet => this.sures.some(norte => norte.collidesWith(bullet)));
        const tankColl = this.collissions.some(bullet => this.panzers.some(norte => norte.collidesWith(bullet)));
        const shipColl = this.collissions.some(bullet => this.ships.some(norte => norte.collidesWith(bullet)));

        const stars = this.bombs.some(star => this.plane.collidesWith(star));

        //  const prova = this.nortes.some(norte => this.collissions.collidesWith(norte));




        if (stars) {
            this.bombs = this.bombs.filter(star => !this.plane.collidesWith(star));
            DAMAGES += 1000;
            this.sounds.click.play();

        }

        if (levColl) {

            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.plane.x + 28, this.plane.y + -420, 100))
             
             this.levantes = this.levantes.filter(levante => !this.collissions.some(collission =>  collission.collidesWith(levante)))
           // setTimeout(()  => this.levantes = this.levantes.filter(levante => !this.collissions.some(collission =>  collission.collidesWith(levante))), 300)

         //   this.levantes = restants
             console.log("Restants: " + restants.length)
            this.sounds.bomb.play();
            DAMAGES += 1000;
        }














    }



}