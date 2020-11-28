class AntiAir {

  constructor(ctx, x, y, maxY, direction) {
    this.ctx = ctx;
    this.x = x;
    this.vx = SHOT_SPEED;
    this.direction = direction;
    this.radians = this.direction / (180 * Math.PI);
    this.px = Math.cos(this.radians);
    this.py = Math.sin(this.radians);
    

//return {x: bulletX, y: bulletY, sin: sinAngle, cos: cosAngle};




    this.y = y;
    this.maxY = maxY;
    this.vy = SHOT_SPEED;

    this.sprite = new Image();
    this.sprite.src = './assets/img/shots.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 4;
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;

    this.bullets = [];




  }



  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
      this.sprite.verticalFrameIndex * this.sprite.frameHeight,
      this.sprite.frameWidth,
      this.sprite.frameHeight,
      this.x,
      this.y,
      //this.width,
      //this.height
      10,
      20,


    );

    this.drawCount++;
    this.animate();

  }



  move() {


    // this.x =  (this.x) + (47 * this.py);
    // this.y = (this.y + 47) - (47 * this.px);
let graus = 270;
    

    let sinAngle = Math.sin(graus);
    let cosAngle = Math.cos(graus);
    // let bulletX = (this.x ) + (47 * sinAngle);
    // let bulletY = (this.y + 47) - (47 * cosAngle);
     let bulletX = (this.x ) + sinAngle + SHOT_SPEED * sinAngle
     let bulletY = (this.y) + cosAngle + SHOT_SPEED * cosAngle
    
    
    //return {x: bulletX, y: bulletY, sin: sinAngle, cos: cosAngle};

this.x = bulletX;
this.y = bulletY;




  }



  animate() {
    if (this.drawCount % MOVEMENT_FRAMES === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      this.drawCount = 0;
    }
  }





}
