class Controller {
  constructor(game) {
    this.game = game;
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      // robotImage.src = '../images/robotmoving.svg';
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.game.control('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.game.control('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.game.control('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.game.control('right');
          break;
      }
    });
  }
}
