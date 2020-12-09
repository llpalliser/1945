class Location {

    constructor(ctx, x, y, text) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.text = text
    }



    draw() {
        this.ctx.font = "46px Saira Stencil One";

        this.ctx.fillStyle = "White"

        this.ctx.fillText(this.text, this.x, this.y);

                   
        
    }

    move() {
        this.y -= - GROUND_SPEED - TURBO +0.1;
        this.x += lateral_move;
      }
    


}