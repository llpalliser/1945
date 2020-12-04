

// serà el pegamento de todas las clases, du tot es control d'es joc

class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1425;
        this.canvas.height = 900;
        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60; // => 60 fps

        this.checkColl = 1000;

        this.drawIntervalId = undefined;

        this.tv = new Tv(this.ctx)

        this.background = new Background(this.ctx)

        this.plane = new Plane(this.ctx, 600, 600)

        this.healthPlane = new PlaneHealth(this.ctx, 1200, 20)

        this.paused = false;

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
        this.plane_destroyed = false;
        this.planeExplosions = [];
        this.enemyPlanes = []
        this.points = []


        this.shotX = 0;
        this.shotY = 0;


        this.layers = [

            new Layer(this.ctx, -2000, -14500, 5000, 14000, './assets/img/bg1.jpg'),
            new Layer(this.ctx, 0, -28500, 5000, 14000, './assets/img/bg2.jpg')


        ]
        // DISPAROS PLANE ------------------------------

        this.missiles = [];
        this.bullets = [];

        this.explosiones = [];
        this.fixedClouds = [];
        this.fixedFires = [];
        this.craters = [];
        this.collissions = [];


        this.mirador = [new Mirador(this.ctx, this.plane.x + 44, this.plane.y - 420, 50, this.plane)]

        this.ships = [
            new Ship1(this.ctx, 1088, + 300, this.plane),
            new Ship2(this.ctx, 300, -800, this.plane),
        ]

        this.targets = [];

        this.bombs = [];
        this.canyons = [];
        this.panzers = [];
        this.levantes = []
        this.nortes = []
        this.sures = []
        this.missiles = []

        //  motorAudio.volume = 0.9;

        // SONIDOS
        this.sounds = {
            fire: new Audio('./assets/sound/anti_aircraft_short.mp3'),
            click: new Audio('./assets/sound/click_click.wav'),
            bomb: new Audio('./assets/sound/bomber-sound.mp3'),
            motorPlane: new Audio('./assets/sound/bomber-sound2.mp3'),
            missileSound: new Audio ('assets/sound/missile_Shot.mp3'),
            squadron: new Audio('./assets/sound/squadron_sound.mp3')

        }



        this.score = 0;



    }


    randomStars
        () {
        for (let i = 0; i <= STARS; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + -400); // 8000 -400
            this.bombs.push(new Bomb(this.ctx, posX, posY, 60))

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
            this.nortes.push(new Norte(this.ctx, posX, posY, 40, this.plane.x * -1, this.plane))
            //    this.nortes.push(new Norte(this.ctx, posX, posY + 50, 40, this.plane.x * -1, this.plane))
            this.targets.push(new Target(this.ctx, posX, posY - 50, 0))

        }
    }


    randomLevantes() {
        for (let i = 0; i <= LEVANTES; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -26000) + 200); // -8000) + -3400);
            //       this.levantes.push(new Levante(this.ctx, posX, posY, 40, this.plane))
            this.levantes.push(new Levante(this.ctx, posX + 100, posY, 40, this.plane))
            this.targets.push(new Target(this.ctx, posX + 103, posY - 50, 1))



        }
    }

    randomEnemyPlanes() {

        for (let i = 0; i <= ENEMYPLANES; i++) {
            let posX = Math.floor((Math.random() * 5000) + 0);
            let posY = Math.floor((Math.random() * -14000) + -400);

            this.enemyPlanes.push(new enemyPlane(this.ctx, posX - 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))
      //      this.enemyPlanes.push(new enemyPlane(this.ctx, posX + 300, posY, 100, this.plane.x * -1, this.plane.Y * -1))

            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX - 150, posY + 200, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX, posY + 300, 100, this.plane.x * -1, this.plane.Y * -1))
            this.enemyPlanes.push(new enemyPlaneJapo(this.ctx, posX + 150, posY + 200, 100, this.plane.x * -1, this.plane.Y * -1))



        }



    }



    onKeyEvent(event) {

        this.plane.onKeyEvent(event);
        this.background.onKeyEvent(event);

        const state = event.type === 'keydown'

        switch (event.keyCode) {

            case PAUSE:
                this.stop();
                break;

            case RESTART: this.clear();


                break;

            case SPEED1: GROUND_SPEED = 0.5;
                console.log(GROUND_SPEED);

                break;

            case SPEED2: GROUND_SPEED = 1;
                console.log(GROUND_SPEED); 1
                break;

            case SPEED3: GROUND_SPEED = 1.5;
                console.log(GROUND_SPEED);
                break;


            case KEY_BURST:

                this.bullets.push(new Shot(this.ctx, this.plane.x + 34, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 1
                this.bullets.push(new Shot(this.ctx, this.plane.x + 94, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 4

                this.sounds.fire.currentTime = 0;
                this.sounds.fire.play();


                setTimeout(() => this.canFire = true, 100);

                console.log("Burst")
                break;

            case KEY_FIRE:
                if (this.canFire) {

                    let posx = this.plane.x
                    let posy = this.plane.y

                    this.missiles.push(new Missile(this.ctx, this.plane.x + 34, this.plane.y + 3, 440 + this.plane.height, 270));
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 49, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 2
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 80, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 3
                    this.missiles.push(new Missile(this.ctx, this.plane.x + 94, this.plane.y + 3, 440 + this.plane.height, 270)); // cañon 4
                    // Daños

                    setTimeout(() => this.collissions.push(new Collission(this.ctx, posx + 24, posy - 420, 70, 70)), 400);
                    setTimeout(() => this.collissions.pop(this.craters), 410);
                    this.shotX = posx + 24;
                    this.shotY = posy - 420;
                    this.burstX = posx + 24
                    this.burstY = posy - 500


                    setTimeout(() => this.fixedClouds.push(new FixedSmoke(this.ctx, posx + 34, posy + -450, 90)), 400);
                    setTimeout(() => this.craters.push(new Crater(this.ctx, posx + 30, posy + -440, 90)), 400);







                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 24, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 47, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 78, this.plane.y, 28));
                    this.explosiones.push(new Explosion(this.ctx, this.plane.x + 92, this.plane.y, 28));

                    // this.sounds.fire.currentTime = 0;
                    this.sounds.missileSound.play();
                    this.canFire = false;

                    setTimeout(() => this.canFire = true, 1100);



                    //    this.checkMissileCollission();


                }

                break;


        }

    }



    start() {

        //
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
        //  }

    }

    clear() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.panzers = this.panzers.filter(panzer => panzer.y <= 1000)
        this.nortes = this.nortes.filter(norte => norte.y <= 1000)
        this.levantes = this.levantes.filter(levante => levante.y <= 1000)
        this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => enemyPlane.y <= 1000)
        this.bombs = this.bombs.filter(bomb => bomb.y <= 1000)
        this.points = this.points.filter(point => point.y <= 1000)
        this.targets = this.targets.filter(target => target.y <= 1000)


        // PLANE -------
        //  this.bullets = this.bullets.filter(bullet => bullet.y >= this.y - 300);

        this.missiles = this.missiles.filter(missile => missile.y >= this.plane.y - 300);
        this.bullets = this.bullets.filter(bullet => bullet.y >= this.plane.y - 500);

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



    draw() {



        //   console.log(GROUND_SPEED)

        this.background.draw(); // => quiero llamar al draw del background


        this.layers.forEach(layer => layer.draw());

        this.ships.forEach(ship => ship.draw());
        this.canyons.forEach(canyon => canyon.draw());


        this.nortes.filter(norte => norte.y > -50).forEach(norte => norte.draw())
        this.levantes.filter(levante => levante.y > -50).forEach(levante => levante.draw())
        this.sures.filter(sur => sur.y > 0).forEach(sur => sur.draw())
        this.panzers.filter(panzer => panzer.y > -50).forEach(panzer => panzer.draw())
        this.enemyPlanes.filter(enemyPlane => enemyPlane.y > 0).forEach(enemyPlane => enemyPlane.draw())
        this.targets.filter(target => target.y > -50).forEach(target => target.draw())

        this.bombs.filter(bomb => bomb.y > -50).forEach(bomb => bomb.draw())
        this.points.forEach(point => point.draw());

        //  this.bombs.forEach(bomb => bomb.draw()); // OJO


        // PLANE ---------xx


        this.explosiones.forEach(explosion => explosion.draw());

        this.missiles.forEach(missile => missile.draw());
        this.bullets.forEach(bullet => bullet.draw());

        this.craters.forEach(crater => crater.draw());
        this.fixedClouds.forEach(fixedSmoke => fixedSmoke.draw());

        this.fixedFires.forEach(fixedFire => fixedFire.draw());

        this.points.forEach(point => point.draw());



        this.healthPlane.draw();
        this.plane.draw();

        this.mirador.forEach(mira => mira.draw());

        //   this.planeExplosions.filter(planeExplosion => planeExplosion.y > 0).forEach(missile => planeExplosion.draw())

        this.ctx.font = "30px Saira Stencil One";


        this.ctx.fillText(`SCORE: ` + this.score, 30, 60);
        this.ctx.fillText(`DAMAGES: ` + DAMAGES, 230, 60);
        this.ctx.fillText(`DISTANCE hm: ` + (this.background.y * 47 / 28000).toFixed(2), 500, 60);
        this.ctx.fillText(`SPEED kmh: ` + ((362571.428 * GROUND_SPEED) / 1000).toFixed(2), 900, 60);
        // console.log (this.background.y)





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





        //   this.tv.draw();

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
        this.bombs.forEach(bomb => bomb.move()); // ??????

        this.points.forEach(point => point.move()); // ??????
        this.targets.forEach(target => target.move()); // ??????


        // Plane ---------------------------
        this.missiles.forEach(missile => missile.move());
        this.bullets.forEach(bullet => bullet.move());

        this.fixedClouds.forEach(fixedSmoke => fixedSmoke.move());
        this.fixedFires.forEach(fixedFire => fixedFire.move());
        this.craters.forEach(crater => crater.move());
        this.mirador.forEach(mira => mira.move());




        // this.canyons.forEach(canyon => canyon.shot());


        //  this.sounds.motorPlane.play();


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


        const enemy1Coll = this.collissions.some(bullet => this.enemyPlanes.some(enemyPlane => enemyPlane.collidesWith(bullet)));



        const stars = this.bombs.some(star => this.plane.collidesWith(star));

        //  const prova = this.nortes.some(norte => this.collissions.collidesWith(norte));




        if (stars) {
            this.bombs = this.bombs.filter(star => !this.plane.collidesWith(star));
            DAMAGES += 100;
            this.sounds.click.play();

        }
        if (nordColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 0))
            this.nortes = this.nortes.filter(norte => !this.collissions.some(collission => collission.collidesWith(norte)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

            this.sounds.bomb.play();
            this.score += 100;
        }
        if (levColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 1))
            this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
            this.targets = this.targets.filter(target => !this.collissions.some(collission => collission.collidesWith(target)))

            this.sounds.bomb.play();
            this.score += 100;
        }
        if (tankColl) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 2))
            this.panzers = this.panzers.filter(panzer => !this.collissions.some(collission => collission.collidesWith(panzer)))
            this.sounds.bomb.play();
            this.score += 100;
        }
        // if (levColl) {
        //     this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
        //     this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 2))
        //      this.levantes = this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))
        //     this.sounds.bomb.play();
        //     this.score += 100;
        // }





        if (enemy1Coll) {
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY, 100))
            this.fixedFires.push(new FixedFireSmoke(this.ctx, this.shotX, this.shotY+50, 100))

            this.points.push(new Point(this.ctx, this.shotX, this.shotY, 100, 3 ))
            this.enemyPlanes = this.enemyPlanes.filter(enemyPlane => !this.collissions.some(collission => collission.collidesWith(enemyPlane)))
            this.sounds.bomb.play();
            this.score += 1000;
        }


        //    this.levantes.filter(levante => !this.collissions.some(collission => collission.collidesWith(levante)))





    }



}