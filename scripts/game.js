const $canvas = document.querySelector('canvas');

let meteorsArray = [];
let bonesArray = [];

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.controller = new Controller(this);
    this.controller.setKeyBindings();
    this.scoreboard = new Scoreboard(this);
    this.setControlBindings();
  }

  setControlBindings() {
    const $buttonStart = document.getElementById('btn-start');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonStart.addEventListener('click', () => {
      this.start();
      this.countdown();
    });

    $buttonPause.addEventListener('click', () => {
      this.pause();
    });

    // const $buttonReset = document.getElementById('btn-reset);
    // $buttonReset.addEventListener('click', () => {
    //   this.reset();
    // });
  }

  control(value) {
    switch (value) {
      case 'up':
        this.robot.moveUp();
        break;
      case 'down':
        this.robot.moveDown();
        break;
    }
  }

  clearScreen() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  drawEverything() {
    this.clearScreen();

    this.robot.drawRobot();

    for (let bone of bonesArray) {
      bone.drawBone();
    }

    for (let meteor of meteorsArray) {
      meteor.drawMeteor();
    }

    this.scoreboard.drawScore();
  }

  fail() {
    this.isRunning = false;
    console.log('fail');
    // this.start();
  }

  pause() {
    this.isRunning = !this.isRunning;
  }

  start() {
    this.isRunning = true;

    this.robot = new Robot(this);

    for (let i = 0; i < 50; i++) {
      let meteor = new Meteor(this, 400 + i * 200);
      meteorsArray.push(meteor);
    }

    for (let i = 0; i < 50; i++) {
      let bone = new Bone(this, 500 + i * 200);
      bonesArray.push(bone);
    }

    this.loop();
  }

  countdown() {
    // setInterval(function() {
    //   if (this.isRunning) {
    //     timeLeft--;
    //   }
    // }, 1000);

    setInterval(function() {
      this.scoreboard.timeLeft--;
    }, 1000);
  }

  move() {
    for (let bone of bonesArray) {
      bone.move();
    }

    for (let meteor of meteorsArray) {
      meteor.move();
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
