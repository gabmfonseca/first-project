class Star {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.dimension = 0;
    this.speed = 1;
    this.setRandomPosition();
    this.setRandomDimensions();
  }

  setRandomPosition() {
    let ctx = this.game.context;
    this.positionY = Math.random() * ctx.canvas.height;
  }

  setRandomDimensions() {
    this.dimension = Math.random() * 3.5;
  }

  drawStar() {
    const ctx = this.game.context;

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(this.positionX, this.positionY, this.dimension, this.dimension);
    ctx.restore();
  }

  move() {
    this.positionX -= this.speed;
  }
}

class Rock {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.dimension = 0;
    this.speed = 1;
    this.setRandomPosition();
    this.setRandomDimensions();
  }

  setRandomPosition() {
    let ctx = this.game.context;
    this.positionY = 20 + Math.random() * (ctx.canvas.height - 40);
  }

  setRandomDimensions() {
    this.dimension = Math.random() * 35;
  }

  drawRock() {
    const ctx = this.game.context;
    ctx.drawImage(rockImage, this.positionX, this.positionY, this.dimension, this.dimension);
  }

  move() {
    this.positionX -= this.speed;
  }
}
