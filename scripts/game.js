const $canvas = document.querySelector('canvas');

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    // this.controller = new Controller(this);
    // this.controller.setKeyBindings();
    // this.scoreboard = new Scoreboard(this);
    // this.setControlBindings();
  }

  setControlBindings() {
    // const $buttonStart = document.getElementById('btn-start');
    // const $buttonReset = document.getElementById('btn-reset);
    // const $buttonPause = document.getElementById('btn-pause);
    // $buttonStart.addEventListener('click', () => {
    //   this.start();
    // });
    // $buttonReset.addEventListener('click', () => {
    //   this.reset();
    // });
    // $buttonPause.addEventListener('click', () => {
    //   this.pause();
    // });
  }

  control(value) {
    // switch (value) {
    //   case 'up':
    //   case 'down':
    //   case 'left':
    //   case 'right':
    //     this.robot.direction(value);
    //     break;
    // }
  }

  runLogic() {
    this.robot.runLogic();

    for (let meteor of meteorsArray)

  }

  clearScreen() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  paint() {
    this.clearScreen();
    // this.robot.paint();
    this.meteor.paint();
    // this.bone.paint();
    // this.scoreboard.paint();
  }

  fail() {
    // this.isRunning = false;
    this.reset();
  }

  pause() {
    this.isRunning = !this.isRunning;
  }

  start() {
    this.reset();
    this.loop();
  }

  reset() {
    // this.speed = 2;

    let meteorsArray = [];
    for (let i = 0; i < 50; i++) {
      let meteor = new Meteor(i * -200);
      meteorsArray.push(meteor);
    }

    // this.robot = new Robot(this);
    // this.isRunning = true;
  }

  loop() {
    this.runLogic();
    this.paint();
    if (this.isRunning) {
      // windowframe
    }
  }
}

// const game = new Game($canvas);