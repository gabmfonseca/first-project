class Scoreboard {
  constructor(game) {
    this.game = game;
    this.height = 40; // change size
    this.lifeBar = 3;
    this.timeLeft = 60;
  }

  drawScore() {
    // replace with life bar image
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
    ctx.fillText(`Distance from Earth: ${(this.timeLeft * 27.65).toFixed(0)}km`, 110, 25);
    ctx.restore();

    // to add the image
    // const lifebarImage = new Image();
    // lifebarImage.src = '';
    // ctx.drawImage(lifebarImage, 0, 0, this.width, this.height);
  }

  reset() {
    this.lifeBar = 3;
    this.timeLeft = 60;
  }

  countdown() {
    const countdown = () => {
      if (this.game.isRunning) {
        console.log(this.timeLeft);
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else if (this.timeLeft === 0 || this.lifeBar === 0) {
          console.log('game won');
          this.game.isRunning = false;
        }
      }

      if (this.lifeBar === 0) {
        this.game.isRunning = false;
        console.log('fail');
        clearInterval(intervalID);
      }
    };

    let intervalID = setInterval(countdown, 1000);
  }
}
