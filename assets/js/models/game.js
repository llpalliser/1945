

class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 50;

        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60; // => 60 fps


        this.drawIntervalId = undefined;
        this.introIntervalId = undefined;
        this.showIntro = true;

        this.intro = new IntroPage(this.ctx, this.canvas)

        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, this.canvas.width / 2 - 100, this.canvas.height / 3 * 2)

        this.healthPlane = new PlaneHealth(this.ctx, this.canvas.width - 280, 80)

        this.paused = true;
        this.frontPointer = 0;
        this.rearPointer = 2;

        this.siren = false;
        // MAP
        this.mapImg = new Image();
        this.mapImg.src = './assets/img/map.jpg' // 224 x 2144 px
        this.mapImg.isReady = false;
        this.mapImg.onload = () => {
            this.mapImg.isReady = true;
        }

        this.opbg = new Image();
        this.opbg.src = './assets/img/bg80.png' // 224 x 2144 px
        this.opbg.isReady = false;
        this.opbg.onload = () => {
            this.opbg.isReady = true;

        }

        this.positionMark = new Image();
        this.positionMark.src = './assets/img/redLine.png' // 224 x 2144 px
        this.positionMark.isReady = false;
        this.positionMark.onload = () => {
            this.positionMark.isReady = true;

        }



        this.mapped = false;
        this.fuel = FUEL;

        this.canFire = true;
        this.canBomb = true;

        this.plane_destroyed = false;
        this.planeExplosions = [];
        this.enemyPlanes = []
        this.points = []


        this.shotX = 0;
        this.shotY = 0;
        this.burstX = 0;
        this.burstY = 0;


        this.layers = [

            new Layer(this.ctx, -1000, -14500, 5000, 14000, './assets/img/bg1.jpg'),
            new Layer(this.ctx, -1000, -28500, 5000, 14000, './assets/img/bg2.jpg')

        ]
        // DISPAROS PLANE ------------------------------

        this.missiles = [];
        this.bombs = [];
        this.bullets = [];

        this.explosiones = [];
        this.fixedClouds = [];
        this.fixedFires = [];
        this.craters = [];
        this.collissions = [];

        this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 0, 40);
        this.miradorTrasero = new Mirador(this.ctx, this.plane, +180, 0, 40);

        this.ships = [
            //    new Ship1(this.ctx, 700, + 300, this.plane),
            //  new Ship2(this.ctx, 1300, -200, this.plane),
            new Ship3(this.ctx, 1350, -800, this.plane),
            new AircraftCarrier(this.ctx, 180, 400, this.plane),
            new AntiaircraftShip(this.ctx, 800, 600, this.plane),
            //    new Ship4(this.ctx, 300, 400, this.plane),


        ]

        this.targets = [];

        this.stars = [];
        this.bonusBombs = [];
        this.bonusMissiles = [];

        this.canyons = [];
        this.panzers = [];
        this.levantes = [];
        this.nortes = [];
        this.sures = [];
        this.motorSmokes = [];

        this.noBombings = [
            new NoBombing(this.ctx, 1000, 300, 120, 1), // Santa Ana

            new NoBombing(this.ctx, 1000, -700, 120, 1), // Es castell
            new NoBombing(this.ctx, 1000, -1700, 150, 1), // Maó llevant
            new NoBombing(this.ctx, 1100, -1900, 150, 1), // Maó central
            new NoBombing(this.ctx, 1100, -2100, 150, 1), // Maó Ponent

            new NoBombing(this.ctx, 1600, -7900, 300, 1), // lo
            new NoBombing(this.ctx, 1000, -11600, 170, 1), // Es Migjorn

            new NoBombing(this.ctx, 1000, -21000, 220, 1), // Ciutadella
            new NoBombing(this.ctx, 700, -21200, 220, 1), // Ciutadella




        ];

        //  motorAudio.volume = 0.9;

        // SONIDOS
        this.sounds = {
            fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
            click: new Audio('./assets/sound/click_click.wav'),
            bomb: new Audio('./assets/sound/bomber-sound.mp3'),
            motorPlane: new Audio('./assets/sound/bomber-sound2.mp3'),
            missileSound: new Audio('assets/sound/missile_Shot.mp3'),
            squadron: new Audio('./assets/sound/squadron_sound.mp3'),
            siren: new Audio('./assets/sound/wwiiSiren.mp3'),
        }

        this.score = 0;


    }

    randomWind() {
        WIND = (Math.random() * 0.02) + 0.06 * (Math.round(Math.random()) ? 1 : -1)
    }
    randomStars
        () {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400); // 8000 -400
            this.stars.push(new Star(this.ctx, posX, posY, 60))

        }
    }

    randomBonusBombs
        () {
        for (let i = 0; i <= BONUSBOMBS; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400); // 8000 -400
            this.bonusBombs.push(new BonusBombs(this.ctx, posX, posY, 90))

        }
    }

    randomBonusMissiles
        () {
        for (let i = 0; i <= BONUSMISSILES; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400); // 8000 -400
            this.bonusMissiles.push(new BonusMissile(this.ctx, posX, posY, 90))

        }
    }


    randomPanzer() {
        for (let i = 0; i <= TANKS; i++) {
            let posX = Math.floor((Math.random() * 3800) + -700);
            let posY = Math.floor((Math.random() * -23000) + -2000);//+ -3400);

            this.panzers.push(new Panzer(this.ctx, posX, posY, 60, this.plane))
            //        this.panzers.push(new Panzer(this.ctx, posX + 40, posY + 20, 60, this.plane))
            this.targets.push(new Target(this.ctx, posX + 20, posY - 40, 2))
        }
    }

    randomNortes() {
        for (let i = 0; i <= NORTES; i++) {
            let posX = Math.floor((Math.random() * 2000) + -700);
            let posY = Math.floor((Math.random() * -21000) + 200); // -3400
            this.nortes.push(new Norte(this.ctx, posX, posY, 40, this.plane, this.canvas))
            //    this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
            this.targets.push(new Target(this.ctx, posX, posY - 50, 0, this.canvas))
        }
    }

    randomSures() {
        for (let i = 0; i <= SURES; i++) {
            let posX = Math.floor((Math.random() * 2000) + -700);
            let posY = Math.floor((Math.random() * -21000) + 200); // -3400
            this.sures.push(new Sur(this.ctx, posX, posY, 40, this.plane, this.canvas))
            //    this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
            this.targets.push(new Target(this.ctx, posX, posY - 50, 0, this.canvas))
        }
    }

    randomLevantes() {
        for (let i = 0; i <= LEVANTES; i++) {
            let posX = Math.floor((Math.random() * 3800) - 700);
            let posY = Math.floor((Math.random() * -21000) + 100); // -8000) + -3400);
            //       this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane, this.canvas))
            //   this.levantes.push(new Levante(this.ctx, posX + 100, posY, 40, this.plane, this.canvas))
            this.targets.push(new Target(this.ctx, posX, posY - 50, 1, this.canvas))
            //    this.targets.push(new Target(this.ctx, posX + 103, posY - 50, 1, this.canvas))
        }
    }

    randomeEnemySquadrons() {

        for (let i = 0; i <= ENEMYSQUADRONS; i++) {
            let posX = Math.floor((Math.random() * 3000) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400);

            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 100, this.plane))
            //      this.enemyPlanes.push(new enemyPlane(this.ctx, posX + 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))

            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 150, posY + 200, 100, this.plane))
            //   this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX, posY + 300, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX + 150, posY + 200, 100, this.plane))
        }

    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 3000) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400);
            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 100, this.plane))
        }
        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 3000) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400);
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 300, posY, 100, this.plane))
        }
        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 3000) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400);
            this.enemyPlanes.push(new enemyPlane3(this.ctx, posX - 300, posY, 100, this.plane))
        }


    }

    // PULSACIONS TECLES
    onKeyEvent(event) {

        const state = event.type === 'keydown'

        let posx = this.plane.x
        let posy = this.plane.y

        if (this.showIntro) {

            //   this.intro.onKeyEvent(event);

            switch (event.keyCode) {


                case START:
                    this.paused = false;
                    this.stopIntro();
                    this.clearIntro();
                    this.start();
                    this.showIntro = false;
                    // this.intro.pop()

                    break;



            }
        }
        else if (!this.showIntro) {

            this.plane.onKeyEvent(event);

            this.background.onKeyEvent(event);

            switch (event.keyCode) {

                case PAUSE:
                    this.paused = true;
                    this.stop();
                    break;

                case RESTART: this.clear();
                    this.paused = false;
                    break;

                case START:
                    this.paused = false;
                    this.showIntro = false;
                    this.stopIntro();
                    this.clearIntro();

                    this.start();

                    break;


                case SPEED1: GROUND_SPEED = 0.5;
                    break;

                case SPEED2: GROUND_SPEED = 1;
                    break;

                case SPEED3: GROUND_SPEED = 10;
                    break;


                case KEY_BURST:

                    this.burstX = posx + 24;
                    this.burstX = posy - 500;

                    this.bullets.push(new Shot(this.ctx, this.plane.x + 34, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 1
                    this.bullets.push(new Shot(this.ctx, this.plane.x + 94, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 4

                    this.sounds.fire.currentTime = 0;
                    this.sounds.fire.play();


                    setTimeout(() => this.canFire = true, 100);


                    console.log(this.background.y)

                    break;

                case KEY_FIRE:

                    if (this.canFire) {

                        this.missiles.push(new Missile(this.ctx, this.plane.x + 65, this.plane.y + 3, 340 + this.plane.height, 270));
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 85, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 2
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 130, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 3
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 150, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 4


                        // Daños
                        setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 70, posy - 320, 90, 90)), 400);
                        setTimeout(() => this.collissions.pop(this.craters), 410);
                        this.shotX = posx + 24;
                        this.shotY = posy - 320;
                        this.burstX = this.plane.x + 24
                        this.burstY = posy - 400
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 80, posy + -350, 90)), 400);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 70, posy + -340, 90)), 400);
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 65, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 85, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 112, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 132, this.plane.y, 28));
                        // this.sounds.fire.currentTime = 0;
                        this.sounds.missileSound.play();
                        this.canFire = false;
                        setTimeout(() => this.canFire = true, 1100);

                        MISSILES = MISSILES - 4;
                    }
                    break;

                case KEY_BOMB:

                    if (this.canBomb) {
                        let posx = this.plane.x
                        let posy = this.plane.y

                        this.shotX = posx + 24;
                        this.shotY = posy + 150;


                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 100);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + -3, 440 + this.plane.height)), 200);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 300);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 400);

                        setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 70, posy + 150, 95, 95)), 2000);
                        setTimeout(() => this.collissions.pop(this.craters), 2010);


                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 80, posy + 150, 90)), 2000);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 65, posy + 160, 90)), 2200);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 95, posy + 180, 90)), 2400);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 90, posy + 190, 90)), 2600);

                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 80, posy + 150, 90)), 2000);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 65, posy + 160, 90)), 2200);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 95, posy + 180, 90)), 2400);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 90, posy + 190, 90)), 2600);

                        // this.sounds.fire.currentTime = 0;
                        this.sounds.missileSound.play();
                        this.canBomb = false;
                        setTimeout(() => this.canBomb = true, 1100);
                        BOMBS = BOMBS - 4;

                    }
                    break;

            }



        }
    }



    start() {

        if (!this.introIntervalId && this.showIntro) {

            this.drawIntro();

            this.introIntervalId = setInterval(() => {
                this.drawIntro();

            }, this.fps);

        }

        else {


            if (!this.mapped) {
                this.randomStars()
                this.randomBonusBombs()
                this.randomBonusMissiles()

                this.randomPanzer()
                this.randomNortes()
                this.randomSures()

                this.randomLevantes()
                this.randomEnemyPlanes()
                this.randomeEnemySquadrons()
                this.randomWind();

                this.mapped = true;

            }

            if (!this.drawIntervalId && !this.paused) {

                this.drawIntervalId = setInterval(() => {
                    this.clear();
                    this.move();
                    this.draw();
                    this.checkCollisions();
                    this.checkFuelStatus();
                    this.checkSiren()
                }, this.fps);
            }

            setInterval(() => {
                this.checkEngineStatus();

            }, 1000)


        }
    }
        clearIntro() {
            //  this.intro.pop();

        }

        checkSiren() {
            if (!this.siren && this.background.y >= 0) {

                this.sounds.siren.play();
                this.siren = true
            }

            if (this.siren && this.background.y >= 3500)

                this.sounds.siren.pause();

            this.siren = false;
        }

        clear() {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.layers = this.layers.filter(layer => layer.y < this.canvas.height - 200)
            this.panzers = this.panzers.filter(panzer => panzer.y <= this.canvas.height)
            this.nortes = this.nortes.filter(norte => norte.y <= this.canvas.height)
            this.levantes = this.levantes.filter(levante => levante.y <= this.canvas.height)
            this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= this.canvas.height)
            this.stars = this.stars.filter(star => star.y <= this.canvas.height)
            this.points = this.points.filter(point => point.y <= this.canvas.height)
            this.targets = this.targets.filter(target => target.y <= this.canvas.height)
            this.noBombings = this.noBombings.filter(noBombing => noBombing.y <= this.canvas.height)

            //this.frontPointer;

            // PLANE -------
            //  this.bullets = this.bullets.filter(bullet => bullet.y >= this.y - 300);

            this.missiles = this.missiles.filter(missile => missile.y >= this.plane.y - 300);
            this.motorSmokes = this.motorSmokes.filter(motorSmoke => motorSmoke.y <= 1000)



            this.bombs = this.bombs.filter(bomb => bomb.y <= this.plane.y + 200);




            this.bullets = this.bullets.filter(bullet => bullet.y >= this.plane.y - 400);

            this.fixedClouds = this.fixedClouds.filter(fixedSmoke => fixedSmoke.y <= this.canvas.height)


            this.fixedFires = this.fixedFires.filter(fixedFires => fixedFires.y <= this.canvas.height)

            // this.craters = this.craters.filter(crater => crater.y <= 1200)
            this.craters = this.craters.filter(crater => crater.y <= this.canvas.height);
            this.healthPlane;

            this.intro;



            // this.ships = this.ship.filter(ship => ship.y <= 1000)
            // this.bombs = this.bomb.filter(bomb => bomb.y <= 1000)
            // this.canyons = this.canyon.filter(canyon => canyon.y <= 1000)







        }

        stop() {
            clearInterval(this.drawIntervalId);
            this.drawIntervalId = undefined;
        }

        pause() {

        }




        stopIntro() {
            clearInterval(this.introIntervalId);
            this.introIntervalId = undefined;
        }


        drawIntro() {
            this.intro.draw();

        }

        draw() {



            this.background.draw(); // => quiero llamar al draw del background
            this.layers.filter(layer => layer.y + layer.height > -2900).forEach(layer => layer.draw())
            this.ships.forEach(ship => ship.draw());
            this.canyons.forEach(canyon => canyon.draw());
            this.nortes.filter(norte => norte.y > -50).forEach(norte => norte.draw())

            this.levantes.filter(levante => levante.y > -50).forEach(levante => levante.draw())


            this.sures.filter(sur => sur.y > 0).forEach(sur => sur.draw())
            this.panzers.filter(panzer => panzer.y > -50).forEach(panzer => panzer.draw())
            this.enemyPlanes.filter(enemyPlane => enemyPlane.y > 0).forEach(enemyPlane => enemyPlane.draw())
            this.targets.filter(target => target.y > -50).forEach(target => target.draw())

            this.stars.filter(star => star.y > -50).forEach(star => star.draw())
            this.bonusBombs.filter(bonusBomb => bonusBomb.y > -50).forEach(bonusBomb => bonusBomb.draw())
            this.bonusMissiles.filter(bonusMissile => bonusMissile.y > -50).forEach(bonusMissile => bonusMissile.draw())
            this.noBombings.filter(noBombing => noBombing.y > -50).forEach(noBombing => noBombing.draw())

            this.points.forEach(point => point.draw());

            //  this.bombs.forEach(bomb => bomb.draw()); // OJO

            if (this.opbg.isReady) {
                this.ctx.drawImage(
                    this.opbg,
                    this.canvas.width - 330,
                    20,
                    320,
                    700
                )
            }






            // PLANE ---------xx


            this.explosiones.forEach(explosion => explosion.draw());
            this.motorSmokes.forEach(motorSmoke => motorSmoke.draw());

            this.missiles.forEach(missile => missile.draw());
            this.bombs.forEach(bomb => bomb.draw());

            this.bullets.forEach(bullet => bullet.draw());

            this.craters.forEach(crater => crater.draw());
            this.fixedClouds.forEach(fixedSmoke => fixedSmoke.draw());

            this.fixedFires.forEach(fixedFire => fixedFire.draw());

            this.points.forEach(point => point.draw());



            this.healthPlane.draw();
            this.plane.draw();

            this.miradorFrontal.draw();
            this.miradorTrasero.draw();

            //   this.planeExplosions.filter(planeExplosion => planeExplosion.y > 0).forEach(missile => planeExplosion.draw())

            this.ctx.font = "26px Saira Stencil One";

            this.ctx.fillStyle = "White"

            this.ctx.fillText(`DAMAGES: ` + DAMAGES, this.canvas.width - 310, 200);
            this.ctx.fillText(`DISTANCE Km: ` + (this.background.y * 47 / 28000).toFixed(2), this.canvas.width - 310, 240);
            this.ctx.fillText(`PLANE SPEED: ` + ((362571.428 * GROUND_SPEED) / 1000).toFixed(2), this.canvas.width - 310, 280);
            this.ctx.fillText(`SCORE: ` + this.score, this.canvas.width - 300, 50);
            this.ctx.fillText(`WIND SPEED: ${(WIND * 100).toFixed(2)} m/s`, this.canvas.width - 310, 320);
            this.ctx.fillText(`ENGINE 1: ${ENGINE1} %`, this.canvas.width - 310, 360);
            this.ctx.fillText(`ENGINE 2: ${ENGINE2} %`, this.canvas.width - 310, 400);
            this.ctx.fillText(`ENGINE 3: ${ENGINE3} %`, this.canvas.width - 310, 440);
            this.ctx.fillText(`ENGINE 4: ${ENGINE4} %`, this.canvas.width - 310, 480);
            //       this.ctx.fillText(`FUEL: ${this.fuel} %`, this.canvas.width - 310, 520);


            this.ctx.fillText(`MISSILES: ${MISSILES}`, this.canvas.width - 310, 560);
            this.ctx.fillText(`BOMBS: ${BOMBS}`, this.canvas.width - 310, 600);




            if (this.mapImg.isReady) {
                this.ctx.drawImage(
                    this.mapImg,
                    this.canvas.width - 330,
                    720,

                    320, 80
                )
            }


            if (this.positionMark.isReady) {
                this.ctx.drawImage(
                    this.positionMark,
                    this.canvas.width - 20 + (320 / 23500) * this.background.y * -1,
                    718,
                    6,
                    80
                )
            }



        }

        move() {


            this.plane.move();
            if (this.background.x < -700) { this.background.move() };

            this.layers.forEach(layer => layer.move());



            this.ships.forEach(ship => ship.move());
            this.canyons.forEach(canyon => canyon.move());
            this.levantes.forEach(levante => levante.move());
            this.nortes.forEach(norte => norte.move());
            this.sures.forEach(sur => sur.move());
            this.panzers.forEach(panzer => panzer.move());
            this.enemyPlanes.forEach(enemyPlane => enemyPlane.move());

            // this.missiles.move();
            this.stars.forEach(star => star.move()); // ??????
            this.bonusBombs.forEach(bonusBomb => bonusBomb.move()); // ??????
            this.bonusMissiles.forEach(bonusMissile => bonusMissile.move()); // ??????
            this.noBombings.forEach(noBombing => noBombing.move()); // ??????


            this.points.forEach(point => point.move()); // ??????
            this.targets.forEach(target => target.move()); // ??????


            // Plane ---------------------------
            this.missiles.forEach(missile => missile.move());
            this.bombs.forEach(bomb => bomb.move());
            this.motorSmokes.forEach(motorSmoke => motorSmoke.move());

            this.bullets.forEach(bullet => bullet.move());

            this.fixedClouds.forEach(fixedSmoke => fixedSmoke.move());
            this.fixedFires.forEach(fixedFire => fixedFire.move());
            this.craters.forEach(crater => crater.move());

            this.miradorFrontal.move();
            this.miradorTrasero.move();




            // this.canyons.forEach(canyon => canyon.shot());


            //  this.sounds.motorPlane.play();


            //   if (this.plane.y <= 200) { TURBO = 10 } else { TURBO = 0 }

            if (this.plane.x >= this.plane.maxX - 200 && this.background.x * -1 <= 1600) {
                this.background.moveRight();
            }

            else if (this.plane.x <= this.plane.minX + 100 && this.background.x * -1 >= 750) {

                this.background.moveLeft();
            }
            else {
                this.background.noLateralMove();
            }


        }


        checkEngineStatus() {
            let engines = "4"
            ENGINE1 = 100 - (DAMAGES / 4).toFixed(0)
            ENGINE2 = 100 - (DAMAGES / 4).toFixed(0)
            ENGINE3 = 100 - (DAMAGES / 4).toFixed(0)
            ENGINE4 = 100 - (DAMAGES / 4).toFixed(0)
            this.engines = 100 - DAMAGES / 10

            this.plane.planeStatus();
            if (DAMAGES >= 1000) {

            }
            let motor1 = true;





            this.motorSmokes.push(new MotorSmoke(this.ctx, this.plane.x + 65, this.plane.y, 80, this.plane))




            //     if (DAMAGES > 0 && DAMAGES < 200 && motor1)



            //         if (motor1) {
            //             this.motorSmokes.push(new MotorSmoke(this.ctx, this.plane.x + 65, this.plane.y, 80, this.plane))
            //    //         console.log("motor cascat")

            //             motor1 = false


            //         }
            //     if (DAMAGES > 200 && DAMAGES < 300) { console.log("entre  200 y 300") }

        }


        checkFuelStatus() {

            //  this.fuel -= ((1/ 1000000) * this.background.y).toFixed(0)


        }

        checkCollisions() {


            const noBombing = this.collissions.some(collission => this.noBombings.some(noBombing => noBombing.collidesWith(collission)));
            const nordColl = this.collissions.some(bullet => this.nortes.some(norte => norte.collidesWith(bullet)));
            const levColl = this.collissions.some(bullet => this.levantes.some(norte => norte.collidesWith(bullet)));
            const surColl = this.collissions.some(bullet => this.sures.some(norte => norte.collidesWith(bullet)));
            const tankColl = this.collissions.some(bullet => this.panzers.some(norte => norte.collidesWith(bullet)));
            const shipColl = this.collissions.some(bullet => this.ships.some(norte => norte.collidesWith(bullet)));
            const enemy1Coll = this.collissions.some(collission => this.enemyPlanes.some(enemyPlane => enemyPlane.collidesWith(collission)));

            const stars = this.stars.some(star => this.plane.collidesWith(star));
            const bonusBomb = this.bonusBombs.some(bonusBomb => this.plane.collidesWith(bonusBomb));
            const bonusMissile = this.bonusMissiles.some(bonusMissile => this.plane.collidesWith(bonusMissile));


            const frontPointer = this.nortes.some(norte => this.miradorFrontal.collidesWith(norte))
                || this.levantes.some(levante => this.miradorFrontal.collidesWith(levante))
                || this.sures.some(sur => this.miradorFrontal.collidesWith(sur))
                || this.panzers.some(panzer => this.miradorFrontal.collidesWith(panzer))
                || this.enemyPlanes.some(enemyPlane => this.miradorFrontal.collidesWith(enemyPlane))
                || this.ships.some(ship => this.miradorFrontal.collidesWith(ship))



            const rearPointer = this.nortes.some(norte => this.miradorTrasero.collidesWith(norte))
                || this.levantes.some(levante => this.miradorTrasero.collidesWith(levante))
                || this.sures.some(sur => this.miradorTrasero.collidesWith(sur))
                || this.panzers.some(panzer => this.miradorTrasero.collidesWith(panzer))

            if (frontPointer) {
                this.miradorFrontal.pop
                this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 1, 50);
            } else if (!frontPointer) {
                this.miradorFrontal.pop
                this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 0, 40);
            }

            if (rearPointer) {
                this.miradorTrasero.pop
                this.miradorTrasero = new Mirador(this.ctx, this.plane, +123, 3, 40);
            } else if (!rearPointer) {
                this.miradorTrasero.pop
                this.miradorTrasero = new Mirador(this.ctx, this.plane, +123, 2, 40);
            }



            if (stars) {
                this.stars = this.stars.filter(star => !this.plane.collidesWith(star));
                if (DAMAGES <= 100) { DAMAGES = 0 } else { DAMAGES -= 100 }
                this.sounds.click.play();
            }

            if (bonusBomb) {
                this.bonusBombs = this.bonusBombs.filter(bonusBombs => !this.plane.collidesWith(bonusBombs));
                BOMBS = BOMBS + 100;
                this.sounds.click.play();
            }

            if (bonusMissile) {
                this.bonusMissiles = this.bonusMissiles.filter(bonusMissile => !this.plane.collidesWith(bonusMissile));
                MISSILES = MISSILES + 100;
                this.sounds.click.play();
            }


            if (nordColl) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
                this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
                this.nortes = this.nortes.filter(norte => !this.collissions.some(collission => collission.collidesWith(norte)))
                this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

                this.sounds.bomb.play();
                this.score += 100;
            }

            if (surColl) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
                this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
                this.sures = this.sures.filter(sur => !this.collissions.some(collission => collission.collidesWith(sur)))
                this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

                this.sounds.bomb.play();
                this.score += 100;
            }


            if (levColl) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
                this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 1))
                this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
                this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))
                this.sounds.bomb.play();
                this.score += 200;
            }


            if (shipColl) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))

                this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
                //   this.ships = this.ships.filter(ship => !this.collissions.some(collission => collission.collidesWith(ship)))
                //    this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

                this.sounds.bomb.play();
                this.score += 100;
            }



            if (tankColl) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
                this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 2))
                this.panzers = this.panzers.filter(panzer => !this.collissions.some(collission => collission.collidesWith(panzer)))
                this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

                this.sounds.bomb.play();
                this.score += 500;
            }
            // if (levColl) {
            //     this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            //     this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 2))
            //      this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
            //     this.sounds.bomb.play();
            //     this.score += 100;
            // }






            if (enemy1Coll) {

                this.points.push(new Point(this.ctx, this.shotX, this.shotY - 50, 100, 3))
                //        this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
                setTimeout(() => this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY + 50, 100)), 300);
                //     this.fixedSmoke.push(new FixedSmoke(this.ctx, this.shotX - 20, this.shotY - 20, 100))
                this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))
                console.log("borrat")
                //      this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))


                this.sounds.bomb.play();
                this.score += 100;
            }


            if (noBombing) {
                this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
                this.noBombings = this.noBombings.filter(noBombing => !this.collissions.some(collission => collission.collidesWith(noBombing)))

                this.sounds.bomb.play();
                this.score += 500;
            }


        }



    }