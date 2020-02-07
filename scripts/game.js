const $canvas = document.querySelector('canvas');

const $buttonStart = document.getElementById('btn-start');
const $buttonIntro = document.getElementById('btn-intro');
const $buttonPause = document.getElementById('btn-pause');
const $buttonBack = document.getElementById('btn-back');

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.controller = new Controller(this);
    this.controller.setKeyBindings();
    this.setControlBindings();
    this.loadScreen();
  }

  loadScreen() {
    window.addEventListener('load', () => {
      this.startScreen();
    });
  }

  startScreen() {
    this.context.drawImage(startImage, 0, 0, this.$canvas.width, this.$canvas.height);
    $buttonStart.innerText = 'Start';
    $buttonIntro.style.display = 'block';
    $buttonPause.style.display = 'none';
    $buttonBack.style.display = 'none';
  }

  intro() {
    this.stopAllAudio();
    this.clearScreen();
    const ctx = this.context;
    ctx.drawImage(introImage, 0, 0, this.$canvas.width, this.$canvas.height);
    $buttonStart.innerText = 'Start';
    $buttonIntro.style.display = 'none';
    $buttonPause.style.display = 'none';
    $buttonBack.style.display = 'block';
  }

  stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  stopAllAudio() {
    this.stopAudio(soundtrack);
    // this.stopAudio(gameoverSound);
    // this.stopAudio(gamewonSound);
  }

  setControlBindings() {
    $buttonStart.addEventListener('click', () => {
      this.start();
      $buttonStart.innerText = 'Restart';
      $buttonIntro.style.display = 'none';
      $buttonPause.style.display = 'block';
      $buttonBack.style.display = 'none';
    });

    $buttonIntro.addEventListener('click', () => {
      this.intro();
    });

    $buttonPause.addEventListener('click', () => {
      this.pause();
    });

    $buttonBack.addEventListener('click', () => {
      this.stopAllAudio();
      this.clearScreen();
      this.startScreen();
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
      meteor.drawMeteorRolling(timestamp);
    }

    for (let meteor of collidedMeteorsArray) {
      meteor.drawMeteorExploding(timestamp);

      let explosion = () => {
        collidedMeteorsArray.splice(collidedMeteorsArray.indexOf(meteor), 1);
      };
      setTimeout(explosion, 250);
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
    this.stopAllAudio();
    // gameoverSound.play();
    this.clearScreen();
    collidedMeteorsArray = [];
    this.context.drawImage(gameoverImage, 0, 0, this.$canvas.width, this.$canvas.height);
    $buttonStart.innerText = 'Restart';
    $buttonIntro.style.display = 'none';
    $buttonPause.style.display = 'none';
    $buttonBack.style.display = 'block';
  }

  gameWon() {
    // this.stopAllAudio();
    // gamewonSound.play();
    this.clearScreen();
    this.context.drawImage(gamewonImage, 0, 0, this.$canvas.width, this.$canvas.height);
    $buttonStart.innerText = 'Restart';
    $buttonIntro.style.display = 'none';
    $buttonPause.style.display = 'none';
    $buttonBack.style.display = 'block';
  }

  pause() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      $buttonPause.innerText = 'Pause';
      soundtrack.play();
    } else if (!this.isRunning) {
      $buttonPause.innerText = 'Continue';
      soundtrack.pause();
    }
    this.loop();
  }

  start() {
    this.stopAllAudio();
    soundtrack.play();
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
      let powerup = new PowerUp(this, 1700 + i * 1300);
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

      if (timeLeft > 30 * 1000) {
        meteor.updateSpeed(1);
      } else if (timeLeft <= 30 * 1000) {
        meteor.updateSpeed(2);
      }
      meteor.move();

      // if (meteor.positionX < -meteor.width) {
      //   this.meteorsArray.splice(this.meteorsArray.indexOf(meteor), 1);
      // }
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
