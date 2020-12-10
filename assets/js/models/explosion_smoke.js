class ExplosionSmoke {

  constructor(ctx, x, y, h, direction) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = h
    this.direction = direction;
    this.sprite = new Image();
    this.sprite.src = './assets/img/fixedSmoke.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 41.5 // 38 smoke_h
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }
    this.explosion_draw = 0;
    this.drawCount = 0;
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
      this.h,
      this.h,
    );
    this.drawCount++;
    this.animate();
  }

  move() {
    if (this.direction === 90) {
      this.y -= - GROUND_SPEED - TURBO - 0.2;
      this.x += lateral_move + WIND;
    }
    else if (this.direction === 45) {
      this.y -= - GROUND_SPEED - TURBO - 0.2;
      this.x += lateral_move + 0.2 + WIND;
    }
    else if (this.direction === 135) {
      this.y -= - GROUND_SPEED - TURBO - 0.2;
      this.x += lateral_move - 0.2 + WIND;
    }
    else if (this.direction === 180) {
      this.y -= - GROUND_SPEED - TURBO;
      this.x += lateral_move - 0.2 + WIND;
    }
    else {
      this.y -= - GROUND_SPEED - TURBO;
      this.x += lateral_move + 0.2 + WIND;
    }
  }

  animate() {
    this.animateSprite(0, 0, 0, 20);
  }

  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
    let subiendo = true
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
      this.sprite.verticalFrameIndex = initialVerticalIndex;
      this.sprite.horizontalFrameIndex = initialHorizontalIndex;

    } else if (this.drawCount % frequency === 0) {
      if (subiendo && this.sprite.horizontalFrameIndex <= 38) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
      }
      if (this.sprite.horizontalFrameIndex === 38) {
        subiendo = false
      }
      if (!subiendo) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex - 10) % this.sprite.horizontalFrames;
      }
      this.drawCount = 0;
    }
  }

}
