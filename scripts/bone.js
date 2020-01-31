class Bone {
  constuctor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 20; // change size
    this.height = 20; // change size
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = 50 + Math.random() * 500; // for a canvas with 600px height

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

  runLogic() {
    this.positionX += 1;
  }
}
