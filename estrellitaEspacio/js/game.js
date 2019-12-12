var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: "black",
    parent: 'canvas-container',

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);