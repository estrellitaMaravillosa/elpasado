var game = new Phaser.Game(800, 400, Phaser.CANVAS);
game.transparent=true;
game.state.add('boot',bootState);
game.state.add('preload',preloadState);
game.state.add('menu',menuState);
game.state.add('play',playState);

game.state.start('boot');
