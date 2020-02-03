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
    // const robotImage = new Image();
    // robotImage.src = '../images/robot_up.png';
    // ctx.drawImage(robotImage, this.positionX, this.positionY, this.width, this.height);
  }

  moveUp() {
    if (this.positionY > 10) {
      this.positionY -= 20;
    }
  }

  moveDown() {
    const ctx = this.game.context;

    if (this.positionY + this.height < ctx.canvas.height) {
      this.positionY += 20;
    }
  }

  checkCollision(object) {
    const type = object.constructor.name;

    // First, check if there's a collision
    // Then, check the type of object that collided (meteor or bone) and access the lifeBar

    if (
      object.positionX + 1 > this.positionX + this.width &&
      object.positionX - 1 < this.positionX + this.width &&
      this.positionY + this.height > object.positionY &&
      this.positionY < object.positionY + object.height
    ) {
      if (type === 'Meteor') {
        this.game.scoreboard.lifeBar--;
        if (this.game.scoreboard.lifeBar === 0) {
          this.game.fail();
        }
      } else if (type === 'Bone') {
        this.game.scoreboard.lifeBar++;
      }
    }
  }
}
