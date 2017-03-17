var bootState = {
  create:function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800, 400);

    game.state.start('preload');
  }
}
