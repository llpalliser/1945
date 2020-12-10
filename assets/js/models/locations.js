class Location {

    constructor(ctx, x, y, text) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.text = text
    }



    draw() {
        this.ctx.font = "40px Saira Stencil One";
        this.ctx.fillStyle = "Red"
        this.ctx.fillText(this.text, this.x, this.y); 
    }

    move() {
        this.y -= - GROUND_SPEED - TURBO +0.03;
        this.x += lateral_move;
      }
    
}