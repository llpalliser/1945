

// serà el pegamento de todas las clases, du tot es control d'es joc

class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1600;
        this.canvas.height = 900;
        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60; // => 60 fps


        this.drawIntervalId = undefined;
        this.introIntervalId = undefined;

        this.tv = new Tv(this.ctx)
        this.intro = new Tv(this.ctx)

        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, 600, 600)

        this.healthPlane = new PlaneHealth(this.ctx, 120, 735)

        this.paused = true;
        this.frontPointer = 0;
        this.rearPointer = 2;


        // MAP
        this.mapImg = new Image();
        this.mapImg.src = './assets/img/backgroundMap.jpg' // 224 x 2144 px
        this.mapImg.isReady = false;
        this.mapImg.onload = () => {
            this.mapImg.isReady = true;
            this.mapImg.width = 54,
                this.mapImg.height = 255,
                this.width = 54,
                this.height = 255
        }



        this.mapped = false;


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
            new Ship1(this.ctx, 700, + 300, this.plane),
            new Ship2(this.ctx, 300, -800, this.plane),
        ]

        this.targets = [];

        this.stars = [];
        this.canyons = [];
        this.panzers = [];
        this.levantes = []
        this.nortes = []
        this.sures = []
        this.missiles = []
        this.motorSmokes = []

        //  motorAudio.volume = 0.9;

        // SONIDOS
        this.sounds = {
            fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
            click: new Audio('./assets/sound/click_click.wav'),
            bomb: new Audio('./assets/sound/bomber-sound.mp3'),
            motorPlane: new Audio('./assets/sound/bomber-sound2.mp3'),
            missileSound: new Audio('assets/sound/missile_Shot.mp3'),
            squadron: new Audio('./assets/sound/squadron_sound.mp3')

        }

        this.score = 0;


    }


    randomStars
        () {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + -400); // 8000 -400
            this.stars.push(new Star(this.ctx, posX, posY, 60))

        }
    }
    randomPanzer() {
        for (let i = 0; i <= TANKS; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + -2000);//+ -3400);

            this.panzers.push(new Panzer(this.ctx, posX, posY, 60, this.plane))
            //        this.panzers.push(new Panzer(this.ctx, posX + 40, posY + 20, 60, this.plane))
            this.targets.push(new Target(this.ctx, posX + 20, posY - 40, 2))
        }
    }

    randomNortes() {
        for (let i = 0; i <= NORTES; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + 200); // -3400
            this.nortes.push(new Norte(this.ctx, posX, posY, 40, this.plane))
            //    this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
            this.targets.push(new Target(this.ctx, posX, posY - 50, 0))

        }
    }


    randomLevantes() {
        for (let i = 0; i <= LEVANTES; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + 200); // -8000) + -3400);
            //       this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 100, posY, 40, this.plane))

            this.targets.push(new Target(this.ctx, posX, posY - 50, 1))
            this.targets.push(new Target(this.ctx, posX + 103, posY - 50, 1))



        }
    }

    randomeEnemySquadrons() {

        for (let i = 0; i <= ENEMYSQUADRONS; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -14000) + -400);

            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 100, this.plane))
            //      this.enemyPlanes.push(new enemyPlane(this.ctx, posX + 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))

            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 150, posY + 200, 100, this.plane))
            //   this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX, posY + 300, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX + 150, posY + 200, 100, this.plane))
        }

    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -24000) + -400);

            this.enemyPlanes.push(new enemyPlane3(this.ctx, posX - 300, posY, 100, this.plane))
        }

    }

    onKeyEvent(event) {

        this.plane.onKeyEvent(event);

        this.background.onKeyEvent(event);

        const state = event.type === 'keydown'

        let posx = this.plane.x
        let posy = this.plane.y

        switch (event.keyCode) {

            case PAUSE:
                this.stop();
                break;

            case RESTART: this.clear();
                break;

            case START: this.start();
                break;

            case SPEED1: GROUND_SPEED = 0.5;
                console.log(GROUND_SPEED);
                break;

            case SPEED2: GROUND_SPEED = 1;
                console.log(GROUND_SPEED); 1
                break;

            case SPEED3: GROUND_SPEED = 10;
                console.log(GROUND_SPEED);
                break;


            case KEY_BURST:

                this.burstX = posx + 24;
                this.burstX = posy - 500;

                this.bullets.push(new Shot(this.ctx, this.plane.x + 34, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 1
                this.bullets.push(new Shot(this.ctx, this.plane.x + 94, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 4

                this.sounds.fire.currentTime = 0;
                this.sounds.fire.play();


                setTimeout(() => this.canFire = true, 100);

                break;

            case KEY_FIRE:

                if (this.canFire) {

                    this.missiles.push(new Missile(this.ctx, this.plane.x + 65, this.plane.y + 3, 340 + this.plane.height, 270));
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 85, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 2
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 130, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 3
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 150, this.plane.y + 3, 340 + this.plane.height, 270)); // cañon 4
                    this.motorSmokes.push(new MotorSmoke(this.ctx, this.plane.x + 70, this.plane.y, 60, this.plane));


                    // Daños
                    setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 70, posy - 320, 80, 80)), 400);
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
                    this.canFire = false;
                    setTimeout(() => this.canFire = true, 2000);
                }
                break;

        }

    }


    startIntro() {

        this.introIntervalId = setInterval(() => {
                this.intro.draw();


        }, this.fps);
    }

    start() {

        //
        if (!this.mapped) {
            this.randomStars()
            this.randomPanzer()
            this.randomNortes()
            this.randomLevantes()
            this.randomEnemyPlanes()
            this.randomeEnemySquadrons()

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


    }

    clear() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.layers = this.layers.filter(layer => layer.y < -800)
        this.panzers = this.panzers.filter(panzer => panzer.y <= 1000)
        this.nortes = this.nortes.filter(norte => norte.y <= 1000)
        this.levantes = this.levantes.filter(levante => levante.y <= 1000)
        this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= 1000)
        this.stars = this.stars.filter(star => star.y <= 1000)
        this.points = this.points.filter(point => point.y <= 1000)
        this.targets = this.targets.filter(target => target.y <= 1000)

        //this.frontPointer;

        // PLANE -------
        //  this.bullets = this.bullets.filter(bullet => bullet.y >= this.y - 300);

        this.missiles = this.missiles.filter(missile => missile.y >= this.plane.y - 300);
        this.motorSmokes = this.motorSmokes.filter(motorSmoke => motorSmoke.y <= 1000)



        this.bombs = this.bombs.filter(bomb => bomb.y <= this.plane.y + 200);




        this.bullets = this.bullets.filter(bullet => bullet.y >= this.plane.y - 400);

        this.fixedClouds = this.fixedClouds.filter(fixedSmoke => fixedSmoke.y <= 1200)
        this.fixedFires = this.fixedFires.filter(fixedFires => fixedFires.y <= 1200)
        this.craters = this.craters.filter(crater => crater.y <= 1200)

        this.healthPlane




        // this.ships = this.ship.filter(ship => ship.y <= 1000)
        // this.bombs = this.bomb.filter(bomb => bomb.y <= 1000)
        // this.canyons = this.canyon.filter(canyon => canyon.y <= 1000)







    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
        // amb pause lo mismo; stop start (si no lo has limpiado)
    }

    drawIntro() {
        this.intro.draw();
    }

    draw() {



        //   console.log(GROUND_SPEED)

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
        this.points.forEach(point => point.draw());

        //  this.bombs.forEach(bomb => bomb.draw()); // OJO


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
        this.ctx.fillStyle = "rgba(51, 0, 25)"

        this.ctx.fillText(`DAMAGES: ` + DAMAGES, 360, 800);
        this.ctx.fillText(`DISTANCE hm: ` + (this.background.y * 47 / 28000).toFixed(2), 135, 100);
        this.ctx.fillText(`kmh: ` + ((362571.428 * GROUND_SPEED) / 1000).toFixed(2), 400, 100);
        this.ctx.fillText(`SCORE: ` + this.score, 1020, 100);





        //     console.log ( (this.background.y * 47 / 28000).toFixed(2))

        // MAPA
        // if (this.mapImg.isReady) { 
        //     this.ctx.drawImage(
        //         this.mapImg,
        //         100, 
        //         700,
        //         55,//this.width,
        //         255//this.height,
        //     )
        //     }





        this.intro.draw();

        //   this.status();





    }

    move() {


        this.plane.move();
        this.background.move();

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

        if (this.plane.x >= this.plane.maxX - 200 && this.background.x * -1 <= this.background.img.width - 1200) {
            this.background.moveRight();
        }

        else if (this.plane.x <= this.plane.minX + 100 && this.background.x * -1 >= 50) {

            this.background.moveLeft();
        }
        else {
            this.background.noLateralMove();
        }


    }

    planeStatus() {

        if (DAMAGES >= 100) {
        }


    }

    checkCollisions(x, y) {

        this.planeStatus()

        const nordColl = this.collissions.some(bullet => this.nortes.some(norte => norte.collidesWith(bullet)));
        const levColl = this.collissions.some(bullet => this.levantes.some(norte => norte.collidesWith(bullet)));
        const surColl = this.collissions.some(bullet => this.sures.some(norte => norte.collidesWith(bullet)));
        const tankColl = this.collissions.some(bullet => this.panzers.some(norte => norte.collidesWith(bullet)));
        const shipColl = this.collissions.some(bullet => this.ships.some(norte => norte.collidesWith(bullet)));

        const enemy1Coll = this.bullets.some(bullet => this.enemyPlanes.some(enemyPlane => enemyPlane.collidesWith(bullet)));

        const stars = this.stars.some(star => this.plane.collidesWith(star));

        //  const prova = this.nortes.some(norte => this.collissions.collidesWith(norte));

        const frontPointer = this.nortes.some(norte => this.miradorFrontal.collidesWith(norte))
            || this.levantes.some(levante => this.miradorFrontal.collidesWith(levante))
            || this.sures.some(sur => this.miradorFrontal.collidesWith(sur))
            || this.panzers.some(panzer => this.miradorFrontal.collidesWith(panzer))

        const rearPointer = this.nortes.some(norte => this.miradorTrasero.collidesWith(norte))
            || this.levantes.some(levante => this.miradorTrasero.collidesWith(levante))
            || this.sures.some(sur => this.miradorTrasero.collidesWith(sur))
            || this.panzers.some(panzer => this.miradorTrasero.collidesWith(panzer))

        if (frontPointer) {
            this.miradorFrontal.pop
            this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 1, 55);
        } else if (!frontPointer) {
            this.miradorFrontal.pop
            this.miradorFrontal = new Mirador(this.ctx, this.plane, -320, 0, 40);
        }

        if (rearPointer) {
            this.miradorTrasero.pop
            this.miradorTrasero = new Mirador(this.ctx, this.plane, +200, 3, 55);
        } else if (!rearPointer) {
            this.miradorTrasero.pop
            this.miradorTrasero = new Mirador(this.ctx, this.plane, +200, 2, 40);
        }



        if (stars) {
            this.stars = this.stars.filter(star => !this.plane.collidesWith(star));
            if (DAMAGES <= 100) { DAMAGES = 0 } else { DAMAGES -= 100 }
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
        if (levColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX + 40, this.shotY - 20, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 1))
            this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

            this.sounds.bomb.play();
            this.score += 200;
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
            this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY - 50, 100, 3))
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            setTimeout(() => this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY + 50, 100)), 300);
            this.fixedSmoke.push(new FixedSmoke(this.ctx, this.shotX - 20, this.shotY - 20, 100))
            this.sounds.bomb.play();
            this.score += 100;
        }





    }



}