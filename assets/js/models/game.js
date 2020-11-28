

// serà el pegamento de todas las clases, du tot es control d'es joc

class Game {

    constructor(canvasId) { 
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1425; // AMPLE
        this.canvas.height = 1000; // LLRG
        this.ctx = this.canvas.getContext('2d'); // volem un contexte de 2 dimencions

        this.fps = 1358 / 60; // => 60 fps
        this.drawIntervalId = undefined;

        this.tv = new Tv(this.ctx) 
        this.background = new Background(this.ctx) 
        this.plane = new Plane(this.ctx, 600, 600)

        this.ships = [
            new Ship1(this.ctx, 1088, + 300),
            new Ship1(this.ctx, 100, + -800),
            new Ship2(this.ctx, 200, + -1200),
        ]

        this.bombs = [
            new Bomb(this.ctx, 700, -700),
            new Bomb(this.ctx, 700, -400),
            new Bomb(this.ctx, 700, -200),
        ]

        this.canyons = [
            // new Canyon(this.ctx, 958, -1100, 40), //OK
            // new Canyon(this.ctx, 968, -1000),
            // new Canyon(this.ctx, 632, -343, 50, 0), //OK
            // new Canyon(this.ctx, 400, -562, 40, 10), //ok
            // new Canyon(this.ctx, 20, -398, 40, 20), //ok //390
            // new Canyon(this.ctx, 120, 30, 40, 3), // Prova
            // new Canyon(this.ctx, 170, 30, 40, 0), // Prova
        ];


        this.panzers = [
            // new Panzer(this.ctx, 120, 30, 40 , 40), // Prova
            // new Panzer(this.ctx, 370, - 130, 40, 40), // Prova
            // new Panzer(this.ctx, 400, - 230, 40, 40), // Prova
            // new Panzer(this.ctx, 500, -330, 40, 40), // Prova
            // new Panzer(this.ctx, 630, 1790, 40, 40), // Prova
            // new Panzer(this.ctx, 730, -1800, 40, 40), // Prova
        ];





        this.levantes = [
        //    new Levante(this.ctx, 120, 130, 40, 90), // Prova
        //     new Levante(this.ctx, 170, 130, 40, 90), // Prova
        //     new Levante(this.ctx, 200, 130, 40, 90), // Prova
        //     new Levante(this.ctx, 300, 130, 40, 90), // Prova
        //     new Levante(this.ctx, 130, 1790, 40, 90), // Prova
        //     new Levante(this.ctx, 130, -1800, 40, 90), // Prova

            // new Levante(this.ctx, 120, 130, 40, 90), // Prova
             
            // new Levante(this.ctx, 170, -530, 40, 90), // Prova
            // new Levante(this.ctx, 200, -630, 40, 90), // Prova
            // new Levante(this.ctx, 300, -930, 40, 90), // Prova
            // new Levante(this.ctx, 130, -2790, 40, 90), // Prova
            // new Levante(this.ctx, 130, -1800, 40, 90), // Prova



        ]


        this.nortes = [
            // new Norte(this.ctx, 500, -200, 40, 0), // Prova
            // new Norte(this.ctx, 500, -100, 40, 0), // Prova
            // new Norte(this.ctx, 500, 0, 40, 0), // Prova
            // new Norte(this.ctx, 500, 100, 40, 0), // Prova
            // new Norte(this.ctx, 500, 200, 40, 0), // Prova
            // new Norte(this.ctx, 190, -1800, 40, 0), // Prova

        ]

        this.sures = [
            // new Sur(this.ctx, 700, -200, 40, 0), // Prova
            // new Sur(this.ctx, 700, -100, 40, 0), // Prova
            // new Sur(this.ctx, 700, 0, 40, 0), // Prova
            // new Sur(this.ctx, 700, 100, 40, 0), // Prova
            // new Sur(this.ctx, 700, 200, 40, 0), // Prova
            // new Sur(this.ctx, 790, -1800, 40, 0), // Prova

        ]




        const motorAudio = new Audio('./assets/sound/bomber-sound.mp3');
        motorAudio.volume = 0.2;
        this.sounds = {
            theme: motorAudio,
            motor_plane: new Audio('./assets/sound/bomber-sound.mp3')
        }


    }


    // Un lístener per tot es joc, que els propaga a ses classes
    onKeyEvent(event) { // => propagarà a tot els models
        this.plane.onKeyEvent(event); // => s'ha posat dins Mario un onKeyEvent
        this.background.onKeyEvent(event); // => definit dins background

        const state = event.type === 'keydown'



        
 
    }







     


    // es crea un mètode de start 
    // exemple de com es mou una llibreta
    // 50-50 fps és lo correcte, i pinta tot es canvas a la vegada

    // nunca dejar un intervalo no cerrado
    // un intervalo que no hemos recogido su identificador, está perdido

    start() {
        // hem de controlar que es joc no es torni a arrancar, 
        // una vegada està arrancat, no es pot tornar a arrancar
        // per això es fa amb un true/false
        // funciona borrant dibuixant // borrant els fps que faixin falta
        if (!this.drawIntervalId) {
            //   this.sounds.theme.play();

            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();

            }, this.fps);
        }
     //   this.sounds.motor_plane.play();

    }

    clear() {
        // borra tot es canvas de 0,0 a tot weight i tot height 
        // fillRect() rellena una figura automáticamente; por defecto en negro
        // clearRect() rellenar en blanco
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
        // amb pause lo mismo; stop start (si no lo has limpiado)
    }

    draw() {
     
        this.background.draw(); // => quiero llamar al draw del background
       // this.tv.draw();
        this.ships.forEach(ship => ship.draw());
        this.canyons.forEach(canyon => canyon.draw());
        this.levantes.forEach(levante => levante.draw());
        this.nortes.forEach(norte => norte.draw());
        this.sures.forEach(sur => sur.draw());
        this.panzers.forEach(panzer => panzer.draw());

        this.bombs.forEach(bomb => bomb.draw());
        this.plane.draw(); // => dibuixa es plane
        this.checkCollisions();



     

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


        const norte = this.nortes.some(norte => this.plane.collidesWith(norte));
        const ship = this.ships.some(ship => this.plane.collidesWith(ship));
        
        if (ship) {
            console.log(`Barco`)
        }
        if (norte) {
            console.log("CRASSHHHH");
        }
    }



}