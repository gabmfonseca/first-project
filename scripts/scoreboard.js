class Scoreboard {
  constructor(game) {
    this.game = game;
    this.height = 40; // change size
    this.lifeBar = 3;
    this.startingTimestamp = null;
    this.maximumTime = 60 * 1000;
    this.timeLeft = this.maximumTime;
  }

  drawScore() {
    let ctx = this.game.context;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 375, this.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 90, this.height);
    ctx.fillRect(100, 0, 275, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px sans-serif';
    ctx.fillText('Lives: ' + this.lifeBar, 10, 25);
    ctx.fillText(`Distance from Earth: ${((this.timeLeft * 27.65) / 1000).toFixed(0)}km`, 110, 25);
    ctx.restore();

    // to add the image
    // const lifebarImage = new Image();
    // lifebarImage.src = '';
    // ctx.drawImage(lifebarImage, 0, 0, this.width, this.height);
  }

  reset() {
    this.lifeBar = 3;
    this.startingTimestamp = null;
    this.timeLeft = this.maximumTime;
  }

  countdown(timestamp) {
    if (!this.startingTimestamp) {
      this.startingTimestamp = timestamp;
    }

    this.timeLeft = Math.max(this.maximumTime - (timestamp - this.startingTimestamp), 0);

    if (this.lifeBar === 0) {
      this.game.isRunning = false;
      this.game.gameOver();
      console.log('fail');
    } else if (this.timeLeft <= 0) {
      this.game.isRunning = false;
      this.game.gameWon();
      console.log('game won');
    }

    /*
    const countdown = () => {
      if (this.game.isRunning) {
        console.log(this.timeLeft);
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else if (this.timeLeft === 0) {
          console.log('game won');
          this.game.isRunning = false;
          clearInterval(intervalID);
        }
      }

      if (this.lifeBar === 0) {
        this.game.isRunning = false;
        console.log('fail');
        clearInterval(intervalID);
      }
    };

    let intervalID = setInterval(countdown, 1000);
    */
  }
}
