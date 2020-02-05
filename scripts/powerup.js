class PowerUp {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = 40 + Math.random() * (500 - 70); // canvas height 550px, scoreboard height 40px
  }

  drawPowerUp() {
    const ctx = this.game.context;
    // ctx.drawImage(powerupImage, this.positionX, this.positionY, this.width, this.height);

    // erase after adding the image
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.restore();
  }

  move() {
    this.positionX -= this.speed;
    this.game.robot.checkCollision(this);
  }
}
