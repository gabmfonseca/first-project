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

    this.robot.drawRobot(timestamp);

    this.scoreboard.drawScore();
  }

  fail() {
    this.isRunning = false;
    console.log('fail');
  }

  pause() {
    this.isRunning = !this.isRunning;
    this.loop();
  }

  start() {
    this.reset();

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }

    if (!this.animation) {
      this.loop();
    }
  }

  reset() {
    this.starsArray = [];
    for (let i = 0; i < 1000; i++) {
      let star = new Star(this, i * 20);
      this.starsArray.push(star);
    }

    this.rocksArray = [];
    for (let i = 0; i < 80; i++) {
      let rock = new Rock(this, i * 400);
      this.rocksArray.push(rock);
    }

    this.robot = new Robot(this);

    this.meteorsArray = [];
    for (let i = 0; i < 100; i++) {
      let meteor = new Meteor(this, 400 + i * 250);
      this.meteorsArray.push(meteor);
    }

    this.bonesArray = [];
    for (let i = 0; i < 50; i++) {
      let bone = new Bone(this, 500 + i * 700);
      this.bonesArray.push(bone);
    }

    if (!this.isRunning) {
      this.scoreboard = new Scoreboard(this);
      this.scoreboard.countdown();
    } else {
      this.scoreboard.reset();
    }
  }

  move() {
    for (let bone of this.bonesArray) {
      bone.move();
    }

    for (let meteor of this.meteorsArray) {
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
    this.drawEverything(timestamp);
    this.move();

    if (this.isRunning) {
      this.animation = requestAnimationFrame(timestamp => this.loop(timestamp));
    } else if (!this.isRunning) {
      cancelAnimationFrame(this.animation);
    }
  }
}

const game = new Game($canvas);
// game.start();
