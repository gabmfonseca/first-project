const $canvas = document.querySelector('canvas');

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.controller = new Controller(this);
    this.controller.setKeyBindings();
    this.scoreboard = new Scoreboard(this);
    this.setControlBindings();
    this.star = new Star(this);
  }

  setControlBindings() {
    const $buttonStart = document.getElementById('btn-start');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonStart.addEventListener('click', () => {
      this.start();
      this.scoreboard.countdown();
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

  drawEverything() {
    this.clearScreen();

    for (let star of starsArray) {
      star.drawStar();
    }

    for (let rock of rocksArray) {
      rock.drawRock();
    }

    for (let meteor of meteorsArray) {
      meteor.drawMeteor();
    }

    for (let bone of bonesArray) {
      bone.drawBone();
    }

    this.robot.drawRobot();

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
    this.isRunning = true;

    for (let i = 0; i < 1000; i++) {
      let star = new Star(this, i * 20);
      starsArray.push(star);
    }

    for (let i = 0; i < 80; i++) {
      let rock = new Rock(this, i * 400);
      rocksArray.push(rock);
    }

    this.robot = new Robot(this);

    for (let i = 0; i < 100; i++) {
      let meteor = new Meteor(this, 400 + i * 250);
      meteorsArray.push(meteor);
    }

    for (let i = 0; i < 50; i++) {
      let bone = new Bone(this, 500 + i * 700);
      bonesArray.push(bone);
    }

    this.loop();
  }

  move() {
    for (let bone of bonesArray) {
      bone.move();
    }

    for (let meteor of meteorsArray) {
      meteor.move();
    }

    for (let star of starsArray) {
      star.move();
    }

    for (let rock of rocksArray) {
      rock.move();
    }
  }

  loop() {
    this.drawEverything();
    this.move();

    if (this.isRunning) {
      requestAnimationFrame(this.loop.bind(this));
    }
  }
}

const game = new Game($canvas);
// game.start();
