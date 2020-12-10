class Layer {

  constructor(ctx, x, y, w, h, image) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = image;
    this.img = new Image();
    this.img.src = this.image
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
      this.width = 5000,
        this.height = 3500
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