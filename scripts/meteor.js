class Meteor {
  constructor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 100;
    this.height = 100;
    this.speed = 0;
    this.setRandomPosition();
    this.shifts = 0;
    this.frameWidth = 250;
    this.frameHeight = 250;
    this.totalFrames = 3;
    this.currentFrame = 0;
    this.changeSpeed = 100;
    this.timer = 0;
  }

  setRandomPosition() {
    this.positionY = Math.random() * 500; // canvas height 550px

    // check if it's not in the same place as a bone
  }

  updateSpeed(level) {
    switch (level) {
      case 1:
        this.speed = 4;
        break;
      case 2:
        this.speed = 6;
        break;
      case 3:
        this.speed = 7;
        break;
    }
  }

  drawMeteor(timestamp) {
    // const ctx = this.game.context;
    // ctx.drawImage(meteorImage, this.positionX, this.positionY, this.width, this.height);

    this.game.context.drawImage(
      meteorImage,
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
