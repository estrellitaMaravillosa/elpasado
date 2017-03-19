var preloadState = {

    preload: function () {
        var loadingLabel = game.add.text(310, 200, 'Cargando...', {font: '30px Courier', fill: '#ffffff'})
        game.load.image('estrellita', 'assets/estrellitaLuminosa.png');
        game.load.image('luz', 'assets/luz.png');
        game.load.image('luz2', 'assets/luz2.png');
        game.load.image('globo', 'assets/globo.png');
        game.load.image('globo2', 'assets/globo2.png');
        game.load.image('globo3', 'assets/globo3.png');
        game.load.image('pensamiento', 'assets/hablaPensamiento.png');
        game.load.spritesheet('cantandoAnimacion', 'assets/ellaCanta.png', 160, 160, 7);
        game.load.spritesheet('hablandoAnimacion', 'assets/temasHablar.png', 160, 160, 17);
        game.load.spritesheet('chico', 'assets/chico2.png', 128, 128, 8);
        game.load.audio('vals', 'assets/vals.mp3');
    },

    create: function () {
        game.state.start('play');
    }

};
