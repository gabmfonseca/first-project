class Meteor {
  constuctor(game, positionX) {
    this.game = game;
    this.positionX = positionX;
    this.positionY = 0;
    this.width = 20; // alterar p/ tamanho imagem
    this.height = 20; // alterar p/ tamanho imagem
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = 50 + Math.random() * 500; // considera altura canvas 600
  }

  paint() {
    // para testar funcionamento (será imagem)
    // const ctx = this.game.context;
    // ctx.save();
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    // ctx.restore();
  }

  checkCollision() {
    // write code
  }

  runLogic() {
    this.positionX += 2;
    this.checkCollision();
  }
}
