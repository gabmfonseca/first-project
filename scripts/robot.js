class Robot {
  constructor(game) {
    this.game = game;
    this.positionX = 60;
    this.positionY = 200;
    this.width = 70; // change size
    this.height = 70; // change size
  }

  drawRobot() {
    const ctx = this.game.context;

    // to test the code > will be erased after adding the image
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.restore();

    // to add the image
    //const robotImage = new Image();
    //robotImage.src = '';
    //ctx.drawImage(robotImage, this.positionX, this.positionY, this.width, this.height);
  }

  moveUp() {
    this.positionY -= 20;
    // if (this.positionY > this.width) {
    //   this.positionY -= 20;
    // }
  }

  moveDown() {
    this.positionY += 20;
    // const ctx = this.game.context;

    // if (this.positionY + this.width < ctx.canvas.width) {
    //   this.positionY += 20;
    // }
  }
}
