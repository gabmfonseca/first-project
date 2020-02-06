class Bone {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 45;
    this.height = 35;
    this.speed = 1;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = 40 + Math.random() * (500 - 70); // canvas height 550px
  }

  drawBone() {
    const ctx = this.game.context;
    ctx.drawImage(boneImage, this.positionX, this.positionY, this.width, this.height);
  }

  move() {
    this.positionX -= this.speed;

    this.game.robot.checkCollision(this);
  }
}
