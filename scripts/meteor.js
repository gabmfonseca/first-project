class Meteor {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 40; // change size
    this.height = 40; // change size
    this.speed = 1.5;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 500; // canvas height 550px

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

  move() {
    this.positionX -= this.speed;
  }
}
