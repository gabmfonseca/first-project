class Robot {
  constructor(game) {
    this.game = game;
    this.positionX = 60;
    this.positionY = 200;
    this.width = 100; // change size
    this.height = 100; // change size
  }

  drawRobot() {
    const ctx = this.game.context;
    const robotImage = new Image();
    robotImage.src = '../images/robot@2x.png';
    ctx.drawImage(robotImage, this.positionX, this.positionY, this.width, this.height);
  }

  moveUp() {
    if (this.positionY > this.game.scoreboard.height) {
      this.positionY -= 20;
    }
  }

  moveDown() {
    const ctx = this.game.context;

    if (this.positionY + this.height < ctx.canvas.height) {
      this.positionY += 20;
    }
  }

  moveLeft() {
    if (this.positionX > 10) {
      this.positionX -= 20;
    }
  }

  moveRight() {
    const ctx = this.game.context;
    if (this.positionX + this.width < ctx.canvas.width) {
      this.positionX += 20;
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
      } else if (type === 'Bone' && this.game.scoreboard.lifeBar < 3) {
        this.game.scoreboard.lifeBar++;
      }
    }
  }
}
