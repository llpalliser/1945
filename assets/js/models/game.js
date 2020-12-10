

class Game {

    constructor(canvasId) {



        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth - 50;
        this.canvas.height = window.innerHeight - 50;

        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60;

        this.gameOver = false;

        this.drawIntervalId = undefined;
        this.introIntervalId = undefined;
        this.showIntro = true;

        this.intro = new IntroPage(this.ctx, this.canvas)
        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, this.canvas.width / 2 - 100, this.canvas.height / 3 * 2)

        this.healthPlane = new PlaneHealth(this.ctx, this.canvas.width - 320, 80)

        this.paused = true;
        this.frontPointer = 0;
        this.rearPointer = 2;

        this.siren = false;
        // MAP
        this.mapImg = new Image();
        this.mapImg.src = './assets/img/map.jpg'
        this.mapImg.isReady = false;
        this.mapImg.onload = () => {
            this.mapImg.isReady = true;
        }

        this.opbg = new Image();
        this.opbg.src = './assets/img/bg80.png'
        this.opbg.isReady = false;
        this.opbg.onload = () => {
            this.opbg.isReady = true;

        }

        this.positionMark = new Image();
        this.positionMark.src = './assets/img/b17_map.png'
        this.positionMark.isReady = false;
        this.positionMark.onload = () => {
            this.positionMark.isReady = true;

        }


        this.enemies = 0;
        this.mapped = false;
        this.fuel = FUEL;

        this.canFire = true;
        this.canBomb = true;

        this.plane_destroyed = false;
        this.nuclearBomb = true;

        this.locations = [
            new Location(this.ctx, 900, 400, "LA MOLA FORTRESS"),
            new Location(this.ctx, 500, 200, "SANT FELIP FORTRESS"),
            new Location(this.ctx, 1000, 100, "LAZARETO"),
            new Location(this.ctx, 1000, -600, "ES CASTELL"),
            new Location(this.ctx, 1500, -1700, "NAVAL BASE"),
            new Location(this.ctx, 1200, -1400, "MAÓ"),




        ]
        this.planeExplosions = [];
        this.enemyPlanes = []
        this.points = []
        this.shotX = 0;
        this.shotY = 0;
        this.burstX = 0;
        this.burstY = 0;

        // DISPAROS PLANE ------------------------------
        this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 0, 40);
        this.miradorTrasero = new Mirador(this.ctx, this.plane, +180, 0, 40);


    }

    restart() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        clearInterval(this.drawIntervalId);
        this.clearRandoms();
        this.drawIntervalId = false;
        this.start();



    }

    positioningElements() {
        this.mapped = false;
        this.intervalId = undefined;

        DAMAGES = 0;
        MISSILES = 100;
        BOMBS = 100,
            BOMBS_SHOOTED = 0;
        MISSILES_SHOOTED = 0;
        ENEMY_SHOTS = 0;
        this.plane_destroyed = false;
        this.nuclearBomb = true;
        this.score = 0;
        this.background.y = 0;
        this.background = "";
        this.background = new Background(this.ctx)


        this.plane = new Plane(this.ctx, this.canvas.width / 2 - 100, this.canvas.height / 3 * 2)

        this.healthPlane = new PlaneHealth(this.ctx, this.canvas.width - 320, 80)
        this.missiles = [];
        this.bombs = [];
        this.bullets = [];
        this.explosiones = [];
        this.fixedClouds = [];
        this.fixedFires = [];
        this.craters = [];
        this.collissions = [];
        this.layers = [

            new Layer(this.ctx, -1000, -4000, 5000, 3500, './assets/img/layers/layer1.jpg'),
            new Layer(this.ctx, -1000, -7500, 5000, 3500, './assets/img/layers/layer2.jpg'),
            new Layer(this.ctx, -1000, -11000, 5000, 3500, './assets/img/layers/layer3.jpg'),
            new Layer(this.ctx, -1000, -14500, 5000, 3500, './assets/img/layers/layer4.jpg'),
            new Layer(this.ctx, -1000, -18000, 5000, 3500, './assets/img/layers/layer5.jpg'),
            new Layer(this.ctx, -1000, -21500, 5000, 3500, './assets/img/layers/layer6.jpg'),
            new Layer(this.ctx, -1000, -25000, 5000, 3500, './assets/img/layers/layer7.jpg'),
            new Layer(this.ctx, -1000, -28500, 5000, 3500, './assets/img/layers/layer8.jpg')


        ]
        // NAVAL
        this.ships = [
            new Ship1(this.ctx, 1300, -1350, this.plane, this.canvas),
            new Ship1(this.ctx, 1600, 300, this.plane, this.canvas),


            // ANTI AIRCRAFTS
            new Ship3(this.ctx, 1250, -700, this.plane, this.canvas),
            new Ship3(this.ctx, 1350, -800, this.plane, this.canvas),
            new Ship3(this.ctx, 1350, -2000, this.plane, this.canvas),


           new Ship3(this.ctx, -900, -12200, this.plane, this.canvas),
           new Ship3(this.ctx, -950, -13800, this.plane, this.canvas),




            // FLOTA

            new Ship3(this.ctx, 175, -21700, this.plane, this.canvas),
            new Ship3(this.ctx, 100, -21700, this.plane, this.canvas),
            new Ship3(this.ctx, 25, -21700, this.plane, this.canvas),
            new Ship3(this.ctx, -50, -21700, this.plane, this.canvas),
            new Ship3(this.ctx, -125, -21700, this.plane, this.canvas),

            new AircraftCarrier(this.ctx, -300, -22300, this.plane),
            // new AntiaircraftShip(this.ctx, -200, -22000, this.plane),



            new AircraftCarrier(this.ctx, 220, 380, this.plane),
            new AntiaircraftShip(this.ctx, 800, 600, this.plane),
            //    new Ship4(this.ctx, 300, 400, this.plane),
        ]
        this.targets = [];
        this.stars = [];
        this.bonusBombs = [];
        this.bonusMissiles = [];
        this.canyons = [];
        this.tanks = [
            new Tank(this.ctx, 1000, 240, 40, this.plane, true),
            // new Tank(this.ctx, 1100, 340, 40, this.plane, true)
            new Tank(this.ctx, 1420, 0, 40, this.plane, true),
            new Tank(this.ctx, 1440, -40, 40, this.plane, true),
            new Tank(this.ctx, 1460, -80, 40, this.plane, true),
            new Tank(this.ctx, 1550, -2080, 40, this.plane, true),
            new Tank(this.ctx, 1550, -2140, 40, this.plane, true),
            new Tank(this.ctx, 1550, -2200, 40, this.plane, true),



        ];
        this.levantes = [];
        this.nortes = [

            // COLARSEGA

            new Tank(this.ctx, 1550, -2200, 40, this.plane, true),

            new Levante(this.ctx, 1200, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1250, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1300, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1350, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1400, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1450, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1500, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1550, -2450, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1600, -2450, 40, this.plane, this.canvas),



            // FELIP
            new Sur(this.ctx, 495, 280, 40, this.plane, this.canvas),
            new Levante(this.ctx, 535, 280, 40, this.plane, this.canvas),
            new Norte(this.ctx, 575, 280, 40, this.plane, this.canvas),
            new Sur(this.ctx, 795, -100, 40, this.plane, this.canvas),
            new Levante(this.ctx, 835, -100, 40, this.plane, this.canvas),
            new Norte(this.ctx, 875, -100, 40, this.plane, this.canvas),

            new Norte(this.ctx, 875, -100, 40, this.plane, this.canvas),

            new Norte(this.ctx, 300, 160, 40, this.plane, this.canvas),
            new Norte(this.ctx, 300, 200, 40, this.plane, this.canvas),
            new Norte(this.ctx, 300, 240, 40, this.plane, this.canvas),

            // LA MOLA
            new Sur(this.ctx, 1095, 540, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1135, 540, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1175, 540, 40, this.plane, this.canvas),
            new Sur(this.ctx, 1195, 640, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1235, 640, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1275, 640, 40, this.plane, this.canvas),
            new Sur(this.ctx, 1295, 740, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1335, 740, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1375, 740, 40, this.plane, this.canvas),
            new Sur(this.ctx, 1545, 40, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1585, 40, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1625, 40, 40, this.plane, this.canvas),
            // LAZARETO
            new Sur(this.ctx, 1195, -100, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1235, -100, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1275, -100, 40, this.plane, this.canvas),
            // MAO SUD
            new Sur(this.ctx, 1095, -1000, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1135, -1000, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1175, -1000, 40, this.plane, this.canvas),
            new Sur(this.ctx, 1120, -1250, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1160, -1250, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1200, -1250, 40, this.plane, this.canvas),


            new Sur(this.ctx, 1260, -1395, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1300, -1395, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1340, -1395, 40, this.plane, this.canvas),




            // CALA LLONGA

            new Sur(this.ctx, 1620, -1250, 40, this.plane, this.canvas),
            new Levante(this.ctx, 1660, -1250, 40, this.plane, this.canvas),
            new Norte(this.ctx, 1700, -1250, 40, this.plane, this.canvas),
        ]
        this.sures = [
        ];
        this.motorSmokes = [];
        this.noBombings = [
            new NoBombing(this.ctx, 1000, -700, 120, 1), // Es castell
            new NoBombing(this.ctx, 1000, -1700, 150, 1), // Maó llevant
            new NoBombing(this.ctx, 1100, -1900, 150, 1), // Maó central
            new NoBombing(this.ctx, 1100, -2100, 150, 1), // Maó Ponent
            new NoBombing(this.ctx, 1600, -7900, 300, 1), // lo
            new NoBombing(this.ctx, 1000, -11600, 170, 1), // Es Migjorn
            new NoBombing(this.ctx, 1000, -21000, 220, 1), // Ciutadella
            new NoBombing(this.ctx, 700, -21200, 220, 1), // Ciutadella
        ];


        // SONIDOS
        this.sounds = {
            gameMusic: new Audio('./assets/sound/intro_Enola_Gay.mp3'),
            fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
            click: new Audio('./assets/sound/click_click.wav'),
            bomb: new Audio('./assets/sound/bomber-sound.mp3'),
            motorPlane: new Audio('./assets/sound/bomber-sound2.mp3'),
            missileSound: new Audio('assets/sound/missile_Shot.mp3'),
            siren: new Audio('./assets/sound/wwiiSiren_opt.mp3'),
            squadron: new Audio('./assets/sound/squadron_sound.mp3'),
            plane_explosion: new Audio('./assets/sound/plane_explosion.mp3')
        }
this.sounds.siren.volume = 0.9;
        this.score = 0;
    }

    randomWind() {
        WIND = (Math.random() * 0.02) + 0.06 * (Math.round(Math.random()) ? 1 : -1)
    }
    randomStars() {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -20000) + -400);
            this.stars.push(new Star(this.ctx, posX, posY, 60))
        }
    }

    randomBonusBombs
        () {
        for (let i = 0; i <= BONUSBOMBS; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -18000) + -400);
            this.bonusBombs.push(new BonusBombs(this.ctx, posX, posY, 90))
        }
    }
    randomBonusMissiles
        () {
        for (let i = 0; i <= BONUSMISSILES; i++) {
            let posX = Math.floor((Math.random() * 3800) + 0);
            let posY = Math.floor((Math.random() * -18000) + -400);
            this.bonusMissiles.push(new BonusMissile(this.ctx, posX, posY, 90))

        }
    }


    randomTanks() {
        for (let i = 0; i <= TANKS / 2; i++) {
            let posX = Math.floor((Math.random() * 2500) + 700);
            let posY = Math.floor((Math.random() * -18000) - 3000);
            this.tanks.push(new Tank(this.ctx, posX, posY, 60, this.plane, false))
            this.targets.push(new Target(this.ctx, posX + 20, posY - 40, 2, 135))
        }

        for (let i = 0; i <= TANKS / 2; i++) {
            let posX = Math.floor((Math.random() * 3800) + 1000);
            let posY = Math.floor((Math.random() * -18000) - 3000);
            this.tanks.push(new Tank(this.ctx, posX, posY, 60, this.plane, true))
            this.targets.push(new Target(this.ctx, posX + 20, posY - 40, 2))
        }

    }


    randomBatteries() {
        for (let i = 0; i <= BATTERIES; i++) {
            let posX = Math.floor((Math.random() * 4000) + -700);
            let posY = Math.floor((Math.random() * -20000) - 900);

            if (posY < -2300 || posX > 1550 || posX < 1000) {
                this.nortes.push(new Sur(this.ctx, posX + 40, posY, 40, this.plane, this.canvas)),
                    this.nortes.push(new Levante(this.ctx, posX + 80, posY, 40, this.plane, this.canvas)),
                    this.nortes.push(new Norte(this.ctx, posX + 120, posY, 40, this.plane, this.canvas)),
                    this.targets.push(new Target(this.ctx, posX + 90, posY - 50, 0, this.canvas))
            }

        }


    }

    randomNortes() {
        for (let i = 0; i <= NORTES; i++) {
            let posX = Math.floor((Math.random() * 4000) + -700);
            let posY = Math.floor((Math.random() * -20000) - 900);



            if (posY < -2300 || posX > 1550 || posX < 1000) {
                this.nortes.push(new Norte(this.ctx, posX, posY, 40, this.plane, this.canvas))
                //    this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
                this.targets.push(new Target(this.ctx, posX, posY - 50, 1, this.canvas))
            }

        }


    }

    randomSures() {
        for (let i = 0; i <= SURES; i++) {
            let posX = Math.floor((Math.random() * 4000) + -700);
            let posY = Math.floor((Math.random() * -20000) - 400);

            if (posY < -2300 || posX > 1550 || posX < 1000) {
                this.sures.push(new Sur(this.ctx, posX, posY, 40, this.plane, this.canvas))
                this.targets.push(new Target(this.ctx, posX, posY - 50, 0, this.canvas))
            }
        }

    }

    randomLevantes() {
        for (let i = 0; i <= LEVANTES; i++) {
            let posX = Math.floor((Math.random() * 4000) - 800);
            let posY = Math.floor((Math.random() * -20000) - 400); // -8000) + -3400);

            if (posY < -2300 || posX > 1550 || posX < 1000) {
                this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane, this.canvas))
                this.targets.push(new Target(this.ctx, posX, posY - 50, 1, this.canvas))
            }
        }
    }

    randomeEnemySquadrons() {

    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 3000) + 0);
            let posY = Math.floor((Math.random() * -23000) + -400);
            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 140, Math.floor((Math.random() * 4) + 0), this.plane))
            //  this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 140, 1, this.plane))
        }


    }

    randomNoBombingAreas() {
        for (let i = 0; i <= NOBOMBINGAREAS; i++) {
            let posX = Math.floor((Math.random() * 3200) + 500);
            let posY = Math.floor((Math.random() * -18000) - 3000);
            this.noBombings.push(new NoBombing(this.ctx, posX, posY, 120, 1))
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
                    this.start();
                    this.showIntro = false;
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

                case RESTART:

                    //this.paused = true;
                    this.mapped = false;
                    this.restart();
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

                case SPEED2: GROUND_SPEED = 0.75;
                    break;

                case SPEED3: GROUND_SPEED = 10;
                    break;


                case KEY_BURST:

                    if (this.nuclearBomb) {
                        this.shotX = posx + 24;
                        this.shotY = posy + 150;


                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 100);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + -3, 440 + this.plane.height)), 200);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 300);
                        setTimeout(() => this.bombs.push(new Bomb(this.ctx, this.plane.x + (this.plane.width / 2), this.plane.y + 3, 440 + this.plane.height)), 400);

                        setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 70, posy + 150, 95, 95)), 2000);
                        setTimeout(() => this.collissions.pop(this.craters), 2010);

                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 80, posy + 150, 190)), 2000);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 65, posy + 160, 290)), 2200);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 95, posy + 180, 290)), 2400);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 90, posy + 190, 290)), 2600);

                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 80, posy + 150, 290)), 2000);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 65, posy + 160, 290)), 2200);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 95, posy + 180, 290)), 2400);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 90, posy + 190, 290)), 2600);

                    }
                    break;

                case KEY_FIRE:

                    if (this.canFire && MISSILES >= 4) {

                        this.missiles.push(new Missile(this.ctx, this.plane.x + 65, this.plane.y + 3, 340 + this.plane.height, 270));
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 85, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 2
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 130, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 3
                        this.missiles.push(new Missile(this.ctx, this.plane.x + 150, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 4


                        // Daños
                        setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 50, posy - 320, 130, 90)), 400);
                        setTimeout(() => this.collissions.pop(this.craters), 410);
                        this.shotX = posx + 24;
                        this.shotY = posy - 320;
                        this.burstX = this.plane.x + 24
                        this.burstY = posy - 400
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 50, posy + -350, 90)), 395);
                        setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 110, posy + -350, 90)), 430);

                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 40, posy + -340, 90)), 420);
                        setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 100, posy + -340, 90)), 420);

                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 65, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 85, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 112, this.plane.y, 28));
                        this.explosiones.push(new Explosion(this.ctx, this.plane.x + 132, this.plane.y, 28));
                        // this.sounds.fire.currentTime = 0;
                        this.sounds.missileSound.play();
                        this.canFire = false;
                        setTimeout(() => this.canFire = true, 1100);

                        MISSILES = MISSILES - 4;
                        MISSILES_SHOOTED += 4
                    }
                    break;

                case KEY_BOMB:

                    if (this.canBomb && BOMBS >= 4) {
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

                        this.canBomb = false;
                        setTimeout(() => this.canBomb = true, 1100);
                        BOMBS = BOMBS - 4;
                        BOMBS_SHOOTED += 4

                    }
                    break;

            }



        }
    }



    start() {



        if (!this.mapped) {
            this.positioningElements()
            this.randomStars()
            this.randomBonusBombs()
            this.randomBonusMissiles()
            this.randomTanks()
            this.randomNortes()
            this.randomSures()
            this.randomLevantes()
            this.randomBatteries()
            this.randomEnemyPlanes()
            this.randomeEnemySquadrons()
            this.randomWind();
            this.randomNoBombingAreas();
            this.mapped = true;

        }


        if (!this.introIntervalId && this.showIntro) {

            this.drawIntro();

            this.introIntervalId = setInterval(() => {
                this.drawIntro();
            }, this.fps);

        }

        else {


            if (!this.drawIntervalId && !this.paused && this.mapped) {
                this.drawIntervalId = setInterval(() => {
                    this.clear();
                    this.move();
                    this.draw();
                    this.checkCollisions();

                }, this.fps);
            }

            setInterval(() => {
                this.checkEngineStatus();
                this.checkFuelStatus();

                if (!this.gameOver) { this.checkSiren() }
            }, 1000)


        }
    }
    clearIntro() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    checkSiren() {
        if (!this.siren && this.background.y >= 200 || !this.siren && this.background.y >= 7800) {
            this.sounds.siren.play();
            this.siren = true
        }

        if (this.siren && this.background.y >= 2900 || this.siren && this.background.y >= 8800) {

            this.sounds.siren.pause();
            this.siren = false;
        }
    }

    clear() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.layers = this.layers.filter(layer => layer.y < this.canvas.height)
        this.ships = this.ships.filter(ship => ship.y <= this.canvas.height)


        this.nortes = this.nortes.filter(norte => norte.y <= this.canvas.height)
        this.levantes = this.levantes.filter(levante => levante.y <= this.canvas.height)
        this.sures = this.sures.filter(sur => sur.y <= this.canvas.height)
        this.tanks = this.tanks.filter(tank => tank.y <= this.canvas.height)
        this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= this.canvas.height)
        this.targets = this.targets.filter(target => target.y <= this.canvas.height)
        this.stars = this.stars.filter(star => star.y <= this.canvas.height)
        this.bonusBombs = this.bonusBombs.filter(bonusbomb => bonusbomb.y <= this.canvas.height)
        this.bonusMissiles = this.bonusMissiles.filter(bonusMissile => bonusMissile.y <= this.canvas.height)
        this.noBombings = this.noBombings.filter(noBombing => noBombing.y <= this.canvas.height)
        this.points = this.points.filter(point => point.y <= this.canvas.height)

        this.opbg;

        this.explosiones = this.explosiones.filter(explosion => explosion.y <= this.canvas.height)
        this.motorSmokes = this.motorSmokes.filter(motorSmoke => motorSmoke.y <= this.canvas.height)

        this.missiles = this.missiles.filter(missile => missile.y >= this.plane.y - 300);
        this.bombs = this.bombs.filter(bomb => bomb.y <= this.plane.y + 200);
        this.bullets = this.bullets.filter(bullet => bullet.y >= this.plane.y - 400);

        this.craters = this.craters.filter(crater => crater.y <= this.canvas.height);
        this.fixedClouds = this.fixedClouds.filter(fixedSmoke => fixedSmoke.y <= this.canvas.height)
        this.fixedFires = this.fixedFires.filter(fixedFires => fixedFires.y <= this.canvas.height)


        this.points = this.points.filter(point => point.y <= this.canvas.height)


        this.locations = this.locations.filter(location => location.y <= this.canvas.height)



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
        this.layers.filter(layer => layer.y + layer.height > -2900).forEach(layer => layer.draw())
        this.ships.forEach(ship => ship.draw());
        this.levantes.filter(levante => levante.y > -50).forEach(levante => levante.draw())
        this.nortes.filter(norte => norte.y > -50).forEach(norte => norte.draw())
        this.sures.filter(sur => sur.y > -50).forEach(sur => sur.draw())
        this.tanks.filter(tank => tank.y > -50).forEach(tank => tank.draw())
        this.targets.filter(target => target.y > -50).forEach(target => target.draw())
        this.stars.filter(star => star.y > -50).forEach(star => star.draw())
        this.bonusBombs.filter(bonusBomb => bonusBomb.y > -50).forEach(bonusBomb => bonusBomb.draw())
        this.bonusMissiles.filter(bonusMissile => bonusMissile.y > -50).forEach(bonusMissile => bonusMissile.draw())
        this.noBombings.filter(noBombing => noBombing.y > -150).forEach(noBombing => noBombing.draw())
        this.points.forEach(point => point.draw());
        this.locations.filter(location => location.y > -150).forEach(location => location.draw())
        this.enemyPlanes.filter(enemyPlane => enemyPlane.y > 0).forEach(enemyPlane => enemyPlane.draw())


        if (this.opbg.isReady) {
            this.ctx.drawImage(
                this.opbg,
                this.canvas.width - 330,
                20,
                320,
                520
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


        this.ctx.font = "26px Saira Stencil One";

        this.ctx.fillStyle = "White"
        if (DAMAGES > 700) { this.ctx.fillStyle = "Red" } else { this.ctx.fillStyle = "White" }
        this.ctx.fillText(`DAMAGES: ` + DAMAGES, this.canvas.width - 310, 200);
        this.ctx.fillStyle = "White"
        this.ctx.fillText(`DISTANCE Km: ` + (this.background.y * 47 / 28000).toFixed(2), this.canvas.width - 310, 240);
        this.ctx.fillText(`PLANE SPEED: ` + ((362571.428 * GROUND_SPEED) / 1000).toFixed(2), this.canvas.width - 310, 280);
        this.ctx.fillText(`SCORE: ` + this.score, this.canvas.width - 300, 50);

        this.ctx.fillText(`WIND SPEED: ${(WIND * 100).toFixed(2)} m/s`, this.canvas.width - 310, 320);

        this.ctx.fillText(`ENGINES: ${ENGINE1} %`, this.canvas.width - 310, 360);
        if (this.plane.engineDrift > 0.10) { this.ctx.fillStyle = "Red" } else { this.ctx.fillStyle = "White" }
        this.ctx.fillText(`ENGINE DRIFT: ${this.plane.engineDrift} %`, this.canvas.width - 310, 400);
        if (MISSILES < 20) { this.ctx.fillStyle = "Red" } else { this.ctx.fillStyle = "White" }
        this.ctx.fillText(`MISSILES: ${MISSILES}`, this.canvas.width - 310, 440);
        if (BOMBS < 20) { this.ctx.fillStyle = "Red" } else { this.ctx.fillStyle = "White" }

        this.ctx.fillText(`BOMBS: ${BOMBS}`, this.canvas.width - 310, 480);

        if (this.mapImg.isReady) {
            this.ctx.drawImage(
                this.mapImg,
                this.canvas.width - 330,
                520,

                320, 105
            )
        }

        if (this.positionMark.isReady) {
            this.ctx.drawImage(
                this.positionMark,
                this.canvas.width - 20 + (320 / 25000) * this.background.y * -1,
                518 + 115 + (100 / 3000) * (this.background.x * -1 + this.plane.x) * -1,
                20,
                20//
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
        this.tanks.forEach(panzer => panzer.move());
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


        // GAME
        this.locations.forEach(location => location.move());


        // this.canyons.forEach(canyon => canyon.shot());


          this.sounds.motorPlane.play();


        //   if (this.plane.y <= 200) { TURBO = 10 } else { TURBO = 0 }

        if (this.plane.x >= this.plane.maxX - 400 && this.background.x * -1 <= 1350) {
            this.background.moveRight();
        }

        else if (this.plane.x <= this.plane.minX + 100 && this.background.x * -1 >= 750) {

            this.background.moveLeft();
        }
        else {
            this.background.noLateralMove();
        }


    }


    clearRandoms() {
        this.stars = [];
        this.bonusBombs = [];
        this.bonusMissiles = [];
        this.tanks = [];
        this.targets = [];
        this.nortes = [];
        this.sures = [];
        this.levantes = [];
        this.enemyPlanes = [];
        this.noBombings = [];
    }
    checkEngineStatus() {
        let engines = "4"
        ENGINE1 = 100 - (100 - GROUND_SPEED * 100).toFixed(0)
        ENGINE2 = 100 - (100 - GROUND_SPEED * 100).toFixed(0)
        ENGINE3 = 100 - (100 - GROUND_SPEED * 100).toFixed(0)
        ENGINE4 = 100 - (100 - GROUND_SPEED * 100).toFixed(0)
        this.engines = 100 - DAMAGES / 10

        this.plane.planeStatus();


        if (DAMAGES >= 1000 || this.background.y >= 23000) {

            this.gameOver = true;
            this.gameOverPage = new GameOver(this.ctx, this.canvas, this.score, this.enemies);
            this.paused = true;
            this.stop();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            // this.sounds.motorPlane.pause();
            // this.sounds.siren.pause();
            // this.sounds.squadron.pause();
            // this.sounds.gameMusic.play();
            this.sounds = [];
            this.mapped = false;
            this.drawIntervalId = false;
            this.gameOverPage.draw();
        }





    }


    checkFuelStatus() {

        //  this.fuel -= ((1/ 1000000) * this.background.y).toFixed(0)


    }

    checkCollisions() {


        const noBombing = this.collissions.some(bullet => this.noBombings.some(norte => norte.collidesWith(bullet)));
        const nordColl = this.collissions.some(bullet => this.nortes.some(norte => norte.collidesWith(bullet)));
        const levColl = this.collissions.some(bullet => this.levantes.some(norte => norte.collidesWith(bullet)));
        const surColl = this.collissions.some(bullet => this.sures.some(norte => norte.collidesWith(bullet)));
        const tankColl = this.collissions.some(bullet => this.tanks.some(norte => norte.collidesWith(bullet)));
        const shipColl = this.collissions.some(bullet => this.ships.some(norte => norte.collidesWith(bullet)));
        const enemyPlaneMissile = this.collissions.some(collission => this.enemyPlanes.some(enemyPlane => enemyPlane.collidesWith(collission)));
        const enemyPlaneBurst = this.bullets.some(bullet => this.enemyPlanes.some(enemyPlane => enemyPlane.collidesWith(bullet)));


        const stars = this.stars.some(star => this.plane.collidesWith(star));
        const bonusBomb = this.bonusBombs.some(bonusBomb => this.plane.collidesWith(bonusBomb));
        const bonusMissile = this.bonusMissiles.some(bonusMissile => this.plane.collidesWith(bonusMissile));


        const frontPointer = this.nortes.some(norte => this.miradorFrontal.collidesWith(norte))
            || this.levantes.some(levante => this.miradorFrontal.collidesWith(levante))
            || this.sures.some(sur => this.miradorFrontal.collidesWith(sur))
            || this.tanks.some(panzer => this.miradorFrontal.collidesWith(panzer))
            || this.ships.some(ship => this.miradorFrontal.collidesWith(ship))



        const rearPointer = this.nortes.some(norte => this.miradorTrasero.collidesWith(norte))
            || this.levantes.some(levante => this.miradorTrasero.collidesWith(levante))
            || this.sures.some(sur => this.miradorTrasero.collidesWith(sur))
            || this.tanks.some(panzer => this.miradorTrasero.collidesWith(panzer))

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
            this.enemies++;
        }

        if (surColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
            this.sures = this.sures.filter(sur => !this.collissions.some(collission => collission.collidesWith(sur)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

            this.sounds.bomb.play();
            this.score += 100;
            this.enemies++;

        }


        if (levColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 1))
            this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))
            this.sounds.bomb.play();
            this.score += 200;
            this.enemies++;

        }
        if (tankColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 2))
            this.tanks = this.tanks.filter(panzer => !this.collissions.some(collission => collission.collidesWith(panzer)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

            //   this.sounds.bomb.play();
            this.score += 500;
            this.enemies++;

        }


        if (shipColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))

            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
            this.sounds.bomb.play();
            this.score += 100;
            this.enemies++;

        }





        if (enemyPlaneMissile) {

            this.points.push(new Point(this.ctx, this.shotX, this.shotY - 50, 100, 3))
            setTimeout(() => this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY + 20, 100)), 300);
            this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))

            this.sounds.plane_explosion.play();

            this.score += 1000;
            this.enemies++;

        }


        if (enemyPlaneBurst) {

            this.points.push(new Point(this.ctx, this.shotX, this.shotY - 50, 100, 3))
            setTimeout(() => this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY + 20, 100)), 300);
            this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))

            //   this.sounds.bomb.play();
            this.sounds.plane_explosion.play();

            this.score += 1000;

        }




        if (noBombing) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
            // this.noBombings = this.noBombings.filter(noBombing => !this.collissions.some(collission => collission.collidesWith(noBombing)))

            this.sounds.bomb.play();
            if (this.score <= 500) { this.score = 0 }
            else { this.score -= 500 };
            console.log("NO BOMBING")
        }


    }



}