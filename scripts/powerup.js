class PowerUp {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 90;
    this.height = 90;
    this.speed = 1;
    this.setRandomPosition();
    this.shifts = 0;
    this.frameWidth = 200;
    this.frameHeight = 200;
    this.totalFrames = 2;
    this.currentFrame = 0;
    this.changeSpeed = 100;
    this.timer = 0;
  }

  setRandomPosition() {
    this.positionY = 40 + Math.random() * (500 - 70); // canvas height 550px, scoreboard height 40px
  }

  drawPowerUp(timestamp) {
    this.game.context.drawImage(
      powerupImage,
      this.shifts,
      0,
      this.frameWidth,
      this.frameHeight,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    if (this.timer < timestamp - this.changeSpeed) {
      this.timer = timestamp;

      this.shifts += this.frameWidth + 1;

      if (this.currentFrame == this.totalFrames) {
        this.shifts = 0;
        this.currentFrame = 0;
      }

      this.currentFrame++;
    }
  }

  move() {
    this.positionX -= this.speed;
    this.game.robot.checkCollision(this);
  }
}
