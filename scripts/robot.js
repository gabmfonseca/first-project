class Robot {
  constructor(game) {
    this.game = game;
    this.positionX = 60;
    this.positionY = 200;
    this.width = 150;
    this.height = 130;
    this.shifts = 0;
    this.frameWidth = 250;
    this.frameHeight = 250;
    this.totalFrames = 3;
    this.currentFrame = 0;
    this.changeSpeed = 100;
    this.timer = 0;
    this.invincible = false;
    this.startShieldTime = null;
    this.shieldTime = 10 * 1000;
  }

  drawRobot(timestamp) {
    // const ctx = this.game.context;
    // ctx.drawImage(robotImage, this.positionX, this.positionY, this.width, this.height);

    this.game.context.drawImage(
      robotImage,
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
      this.positionX + this.width - 40 > object.positionX &&
      this.positionX < object.positionX + object.width - 40 &&
      this.positionY + this.height - 40 > object.positionY &&
      this.positionY < object.positionY + object.height - 40
    ) {
      if (type === 'Meteor') {
        this.game.meteorsArray.splice(this.game.meteorsArray.indexOf(object), 1);

        if (this.invincible) {
          console.log('protected from meteor');
        } else if (!this.invincible) {
          console.log('collided with meteor');
          this.game.scoreboard.lifeBar--;
        }
      } else if (type === 'Bone') {
        this.game.bonesArray.splice(this.game.bonesArray.indexOf(object), 1);
        console.log('collected bone');
        if (this.game.scoreboard.lifeBar < 3) {
          this.game.scoreboard.lifeBar++;
        }
      } else if (type === 'PowerUp') {
        this.game.powerupsArray.splice(this.game.powerupsArray.indexOf(object), 1);
        console.log('shield up');
        this.invincible = true;

        let shieldDown = () => {
          this.invincible = false;
          console.log('shield down');
        };
        setTimeout(shieldDown, 5000);
      }
    }
  }
}
