const $canvas = document.querySelector('canvas');

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.controller = new Controller(this);
    this.controller.setKeyBindings();
    this.setControlBindings();
  }

  setControlBindings() {
    const $buttonStart = document.getElementById('btn-start');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonStart.addEventListener('click', () => {
      this.start();
    });

    $buttonPause.addEventListener('click', () => {
      this.pause();
    });
  }

  control(value) {
    switch (value) {
      case 'up':
        this.robot.moveUp();
        break;
      case 'down':
        this.robot.moveDown();
        break;
      case 'left':
        this.robot.moveLeft();
        break;
      case 'right':
        this.robot.moveRight();
        break;
    }
  }

  clearScreen() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  drawEverything(timestamp) {
    this.clearScreen();

    for (let star of this.starsArray) {
      star.drawStar();
    }

    for (let rock of this.rocksArray) {
      rock.drawRock();
    }

    for (let meteor of this.meteorsArray) {
      meteor.drawMeteor(timestamp);
    }

    for (let bone of this.bonesArray) {
      bone.drawBone();
    }

    for (let powerup of this.powerupsArray) {
      powerup.drawPowerUp();
    }

    this.robot.drawRobot(timestamp);

    this.scoreboard.drawScore();
  }

  fail() {
    this.isRunning = false;
    console.log('fail');
  }

  pause() {
    const $buttonPause = document.getElementById('btn-pause');

    if (this.scoreboard.lifeBar > 0 || this.scoreboard.timeLeft > 0) {
      this.isRunning = !this.isRunning;
      if (this.isRunning) {
        $buttonPause.innerText = 'Pause';
      } else if (!this.isRunning) {
        $buttonPause.innerText = 'Continue';
      }
      this.loop();
    }
  }

  start() {
    this.reset();

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  reset() {
    this.starsArray = [];
    for (let i = 0; i < 300; i++) {
      let star = new Star(this, i * 15);
      this.starsArray.push(star);
    }

    this.rocksArray = [];
    for (let i = 0; i < 20; i++) {
      let rock = new Rock(this, i * 350);
      this.rocksArray.push(rock);
    }

    this.robot = new Robot(this);

    this.meteorsArray = [];
    for (let i = 0; i < 80; i++) {
      let meteor = new Meteor(this, 400 + i * 250);
      this.meteorsArray.push(meteor);
    }

    this.bonesArray = [];
    for (let i = 0; i < 5; i++) {
      let bone = new Bone(this, 500 + i * 800);
      this.bonesArray.push(bone);
    }

    this.powerupsArray = [];
    for (let i = 0; i < 2; i++) {
      let powerup = new PowerUp(this, 1700 + i * 1000);
      this.powerupsArray.push(powerup);
    }

    if (!this.isRunning) {
      this.scoreboard = new Scoreboard(this);
      // this.scoreboard.countdown();
    } else {
      this.scoreboard.reset();
    }
  }

  move() {
    for (let bone of this.bonesArray) {
      bone.move();
    }

    for (let powerup of this.powerupsArray) {
      powerup.move();
    }

    for (let meteor of this.meteorsArray) {
      let timeLeft = this.scoreboard.timeLeft;

      if (timeLeft > 20 * 1000) {
        meteor.updateSpeed(1);
      } else if (timeLeft <= 30 * 1000 && timeLeft > 10 * 1000) {
        meteor.updateSpeed(2);
        console.log('speed 2');
      } else if (timeLeft <= 10 * 1000) {
        meteor.updateSpeed(3);
        console.log('speed 3');
      }

      meteor.move();
    }

    for (let star of this.starsArray) {
      star.move();
    }

    for (let rock of this.rocksArray) {
      rock.move();
    }
  }

  loop(timestamp) {
    this.move();
    this.scoreboard.countdown(timestamp);
    this.drawEverything(timestamp);

    if (this.isRunning) {
      requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}

const game = new Game($canvas);
// game.start();
