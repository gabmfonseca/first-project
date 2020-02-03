class Bone {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 30; // change size
    this.height = 30; // change size
    this.speed = 1;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 500; // canvas height 550px

    // check if it's not in the same place as a meteor
  }

  drawBone() {
    const ctx = this.game.context;

    // to test the code > will be erased after adding the image
    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.restore();

    // to add the image
    // const boneImage = new Image();
    // boneImage.src = '';
    // ctx.drawImage(boneImage, this.positionX, this.positionY, this.width, this.height);
  }

  move() {
    this.positionX -= this.speed;

    this.game.robot.checkCollision(this);
  }
}
