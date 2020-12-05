class Intro {

  constructor(ctx) {
      this.ctx = ctx;
      this.x = 0; 
      this.y = -5; 


      this.img = new Image();
      this.img.src = './assets/img/oldTv2.png' 
      this.img.isReady = false;
      this.img.onload = () => { 
          this.img.isReady = true; 
          this.img.width = this.ctx.canvas.width;
          this.img.height = this.ctx.canvas.height;
          this.width = this.ctx.canvas.width; 
          this.height =  this.ctx.canvas.height; 
      }
      this.movement = {
          right: false,
          down: false
      }

  }

  onKeyEvent(event) { 
      const state = event.type === 'keydown' 
      switch (event.keyCode) {
          // => hemos creado constantes.js para que queden guardados los códigos de movimiento 
          // cuando pulsamos las teclas, este diccionario será combinable
          // diccionario de movimientos con booleanos permite tener varios estados abiertos a la vez


          case KEY_RIGHT: // => es background només es mou cap a la dreta
              this.movement.right = state;
              break;
          case KEY_DOWN: // => es background només es mou cap a la dreta
              this.movement.down = state;
              break;
      }
  }



  draw() {

      if (this.img.isReady) { // => preguntamos si la imagen está lista para ejecutarse (descargada)
          this.ctx.drawImage(
              this.img, // la imagen que se quiere pintar
              0, // this.x, // la coordenada x donde se va a pintar
              0,
              this.canvas.width,
              whis.canvas.height,
          )
      }

  }

 
}