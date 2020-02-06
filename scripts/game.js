const $canvas = document.querySelector('canvas');

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.controller = new Controller(this);
    this.controller.setKeyBindings();
    this.setControlBindings();
    this.startScreen();
  }

  startScreen() {
    window.addEventListener('load', () => {
      this.context.drawImage(startImage, 0, 0, this.$canvas.width, this.$canvas.height);
      const $buttonPause = document.getElementById('btn-pause');
      $buttonPause.style.display = 'none';
    });
  }

  intro() {
    this.clearScreen();

    const ctx = this.context;
    const positionX = this.$canvas.width / 2;

    ctx.drawImage(introImage, 0, 0, this.$canvas.width, this.$canvas.height);

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '21px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Hello pilot!`, positionX, 100);
    ctx.textAlign = 'center';
    ctx.fillText(`On November 1957, Russia launched Sputnik 2.`, positionX, 150);
    ctx.textAlign = 'center';
    ctx.fillText(
      `Onboard was the first passenger to orbit the Earth, a small dog named Laika.`,
      positionX,
      200
    );
    ctx.textAlign = 'center';
    ctx.fillText(`Your mission today is to bring Laika safely back home.`, positionX, 250);
    ctx.textAlign = 'center';
    ctx.fillText(`Use the arrow keys to control the rescue robot.`, positionX, 300);
    ctx.textAlign = 'center';
    ctx.fillText(
      `On your way, collect the bones and batteries, but beware of rolling meteors!`,
      positionX,
      350
    );
    ctx.restore();
  }

  setControlBindings() {
    const $buttonStart = document.getElementById('btn-start');
    const $buttonIntro = document.getElementById('btn-intro');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonStart.addEventListener('click', () => {
      this.start();
      $buttonStart.innerText = 'Restart';
      $buttonIntro.style.display = 'none';
      $buttonPause.style.display = 'block';
    });

    $buttonIntro.addEventListener('click', () => {
      this.intro();
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
      powerup.drawPowerUp(timestamp);
    }

    this.robot.drawRobot(timestamp);

    this.scoreboard.drawScore();
  }

  gameOver() {
    this.clearScreen();
    this.context.drawImage(gameoverImage, 0, 0, this.$canvas.width, this.$canvas.height);

    const $buttonIntro = document.getElementById('btn-intro');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonIntro.style.display = 'block';
    $buttonPause.style.display = 'none';
  }

  gameWon() {
    this.clearScreen();
    this.context.drawImage(gamewonImage, 0, 0, this.$canvas.width, this.$canvas.height);

    const $buttonIntro = document.getElementById('btn-intro');
    const $buttonPause = document.getElementById('btn-pause');

    $buttonIntro.style.display = 'block';
    $buttonPause.style.display = 'none';
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

    if (this.isRunning) {
      this.drawEverything(timestamp);
      requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}

const game = new Game($canvas);
// game.start();
