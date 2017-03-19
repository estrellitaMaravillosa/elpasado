var bootState = {
  create:function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0,1000, 400);

    game.state.start('preload');
  }
}
