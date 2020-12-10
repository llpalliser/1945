const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_FIRE = 32;
const KEY_BOMB = 13;
const KEY_BURST = 88;
const TEST = 70;
const PAUSE = 80;
const RESTART = 82;
const START = 83;
const SPEED1 = 49;
const SPEED2 = 50;
const SPEED3 = 51;

const MOVEMENT_FRAMES = 5;




// SCENARY
let GROUND_SPEED = 0.5;
let GROUND_LATERAL_SPEED = 5; 
let WIND = 0.0;

const SPEED = 2; 
const PLANE_SPEED = 2; 
let TURBO = 0;
const SHOT_SPEED = 10;
const MISSILE_SPEED = 9;
const BOMB_SPEED = 2;

let lateral_move = 1


// PLANE

let ENGINE1 = 100;
let ENGINE2 = 100;
let ENGINE3 = 100;
let ENGINE4 = 100;


// ENEMIES 
const NORTES = 50;
const SURES = 50;
const LEVANTES = 50;
const ENEMYPLANES = 50;
const ENEMYSQUADRONS = 50;
const TANKS = 70;
const BATTERIES = 50;

const STARS = 20;
const BONUSBOMBS= 40;
const BONUSMISSILES= 40;
const NOBOMBINGAREAS = 70;

const CAMPO_TIRO_MIN = 200; // A PARTIR DE DONDE LOS ENEMIGOS PUEDEN DISPARAR
const CAMPO_TIRO_MAX = 1000; // HASTA DONDE LOS ENEMIGOS PUEDEN DISPARAR

let LIFES = 10;
let DAMAGES = 0; 
let MISSILES = 100;
let BOMBS = 100;
let FUEL = 100;

let BOMBS_SHOOTED = 0;
let MISSILES_SHOOTED = 0;
let ENEMY_SHOTS = 0;