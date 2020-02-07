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
    this.currentFrame = 1;
    this.changeSpeed = 100;
    this.timer = 0;
    this.exploded = false;
  }

  setRandomPosition() {
    this.positionY = Math.random() * 500; // canvas height 550px
  }

  updateSpeed(level) {
    switch (level) {
      case 1:
        this.speed = 4;
        break;
      case 2:
        this.speed = 7;
        break;
      // case 3:
      //   this.speed = 8;
      //   break;
    }
  }

  drawSprite(timestamp, image, totalFrames) {
    this.game.context.drawImage(
      image,
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

      this.shifts += this.frameWidth;

      if (this.currentFrame == totalFrames) {
        this.shifts = 0;
        this.currentFrame = 0;
      }

      this.currentFrame++;
    }
  }

  drawMeteorRolling(timestamp) {
    this.drawSprite(timestamp, meteorImage, 3);
  }

  drawMeteorExploding(timestamp) {
    this.drawSprite(timestamp, meteorexplodingImage, 3);
  }

  move() {
    this.positionX -= this.speed;

    this.game.robot.checkCollision(this);
  }
}
