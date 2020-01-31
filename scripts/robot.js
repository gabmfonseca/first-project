class Robot {
  constuctor(game) {
    this.game = game;
    this.positionX = 0;
    this.positionY = 0;
    this.width = 20; // change size
    this.height = 20; // change size
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
    if (this.positionY > this.width) {
      this.positionY -= 20;
    }
  }

  moveDown() {
    const ctx = this.game.context;

    if (this.positionY + this.width < ctx.canvas.width) {
      this.positionY -= 20;
    }
  }
}
