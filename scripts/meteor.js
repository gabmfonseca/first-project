class Meteor {
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

    // check if it's not in the same place as a bone
  }

  drawMeteor() {
    const ctx = this.game.context;

    // to test the code > will be erased after adding the image
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.restore();

    // to add the image
    // const meteorImage = new Image();
    // meteorImage.src = '';
    // ctx.drawImage(meteorImage, this.positionX, this.positionY, this.width, this.height);
  }

  runLogic() {
    this.positionX += 2;
  }
}
