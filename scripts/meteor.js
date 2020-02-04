class Meteor {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 60;
    this.height = 60;
    this.speed = 4;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 500; // canvas height 550px

    // check if it's not in the same place as a bone
  }

  drawMeteor() {
    // see how to rotate the image
    const ctx = this.game.context;
    ctx.drawImage(meteorImage, this.positionX, this.positionY, this.width, this.height);
  }

  move() {
    this.positionX -= this.speed;

    this.game.robot.checkCollision(this);
  }
}
