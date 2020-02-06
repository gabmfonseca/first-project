// let collidedMeteorsArray = [];

class Robot {
  constructor(game) {
    this.game = game;
    this.positionX = 60;
    this.positionY = 200;
    this.width = 150;
    this.height = 140;
    this.shifts = 0;
    this.frameWidth = 250;
    this.frameHeight = 250;
    this.totalFrames = 3;
    this.currentFrame = 1;
    this.changeSpeed = 100;
    this.timer = 0;
    this.invincible = false;
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

      this.shifts += this.frameWidth;

      if (this.currentFrame === this.totalFrames) {
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
    const meteorsArray = this.game.meteorsArray;
    const bonesArray = this.game.bonesArray;
    const powerupsArray = this.game.powerupsArray;

    // First, check if there's a collision
    // Then, check the type of object that collided (meteor or bone) and access the lifeBar

    if (
      this.positionX + this.width - 40 > object.positionX &&
      this.positionX < object.positionX + object.width - 40 &&
      this.positionY + this.height - 40 > object.positionY &&
      this.positionY < object.positionY + object.height - 40
    ) {
      if (type === 'Meteor') {
        // collidedMeteorsArray.push(meteorsArray[meteorsArray.indexOf(object)]);
        meteorsArray.splice(meteorsArray.indexOf(object), 1);

        if (this.invincible) {
          console.log('protected from meteor');
        } else if (!this.invincible) {
          console.log('collided with meteor');
          this.game.scoreboard.lifeBar--;
        }
      } else if (type === 'Bone') {
        bonesArray.splice(bonesArray.indexOf(object), 1);
        if (this.game.scoreboard.lifeBar < 3) {
          this.game.scoreboard.lifeBar++;
        }
      } else if (type === 'PowerUp') {
        powerupsArray.splice(powerupsArray.indexOf(object), 1);
        robotImage.src = '../images/robot_power.png';
        this.invincible = true;

        let shieldDown = () => {
          robotImage.src = '../images/robot_sprite.png';
          this.invincible = false;
        };
        setTimeout(shieldDown, 10000);
      }
    }
  }
}
