class Bone {
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
    this.positionY = Math.random() * 500; // canvas height 550px

    // check if it's not in the same place as a meteor
  }

  drawBone(timestamp) {
    const ctx = this.game.context;
    ctx.drawImage(boneImage, this.positionX, this.positionY, this.width, this.height);
  }

  move() {
    this.positionX -= this.speed;

    this.game.robot.checkCollision(this);
  }
}
