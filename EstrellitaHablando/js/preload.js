var preloadState = {

  preload:function(){
  var   loadingLabel=game.add.text(80,150,'Cargando...',{font:'30px Courier',fill:'#ffffff'})
    game.load.image('estrellita', 'assets/estrellita2.png');
//  game.load.image('triste', 'assets/tristeIzquierda.png');
  game.load.spritesheet('cantandoAnimacion', 'assets/ellaCanta.png', 160, 160, 7);
  game.load.spritesheet('chico', 'assets/chico2.png', 128, 128, 8);
  game.load.audio('vals', 'assets/vals.mp3');
},
create:function(){
 game.state.start('play');
}

};
