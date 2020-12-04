class Layer {

  constructor(ctx, x, y, w, h, image) {
    this.ctx = ctx;
    this.x = x;


    this.y = y;
    this.width = w;
    this.height = h;
    this.image = image;
    this.vy = GROUND_SPEED;
    this.vx = PLANE_SPEED;
    this.move_left = false;
    this.move_right = false;


    this.img = new Image();
    this.img.src = this.image


    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
      this.img.width = this.width;
      this.img.height = this.height;
      this.width = 5000,
        this.height = 14000
    }
    this.movement = {
      right: false,
      left: false,
      down: false,
      up: false
    }

  }

  draw() {
    if (this.img.isReady) {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y + 1800,
        this.width,
        this.height,
      )
    }
  }

  move() {

    this.y += GROUND_SPEED + TURBO
    this.x += lateral_move;


  }














}