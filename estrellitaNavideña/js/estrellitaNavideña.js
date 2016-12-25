

var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update});

function preload() {
    game.load.tilemap('level', 'assets/escenarioNavidad2.json', null, Phaser.Tilemap.TILED_JSON);


    game.load.image('arbolNavidad2', 'assets/arbolNavidad2.png');
    game.load.image('fondoEstrellas2', 'assets/fondoEstrellas2.jpg');

    game.load.image('luzAmarilla', 'assets/luzAmarilla.png');
    game.load.image('luzCeleste', 'assets/luzCeleste.png');
    game.load.image('luzIntensa1', 'assets/luzIntensa1.png');
    game.load.image('luzIntensa3', 'assets/luzIntensa3.png');
    game.load.image('muniecoNieve', 'assets/muniecoNieve.png');
    game.load.image('laTierra2', 'assets/laTierra2.png');
    game.load.image('nube', 'assets/nube.png');
    game.load.image('castillo', 'assets/castillo.png');
    game.load.image('star', 'assets/estrellitaNavidad.png');
    game.load.image('collitionTile', 'assets/collitionTile.png');
    game.load.image('luzNoIntesa', 'assets/luzNoIntesa.png');
    game.load.image('luzNoIntesa2', 'assets/luzNoIntesa2.png');
    game.load.image('pesebre', 'assets/pesebre.png');
    game.load.image('burrito', 'assets/burrito.png');
    game.load.image('rudolph2', 'assets/rudolph2.png');
    game.load.spritesheet('regalo', 'assets/regalo.png');

    game.load.spritesheet('regalo2', 'assets/regalo2.png');

    game.load.spritesheet('regalo4', 'assets/regalo4.png');


     game.load.audio('rodolfo', 'assets/rodolfo.ogg');
    game.load.audio('prender', 'assets/sonido1.ogg');
    game.load.audio('burrito', 'assets/burrito.ogg');
    game.load.audio('alMundoPaz', 'assets/alMundoPaz.ogg');
    game.load.audio('frosty', 'assets/frosty.ogg');
}

var atari;
var map;

var cursors,spacebar,letraE;

var rodolfo,iuju,yeah,frosty;
var distance = 300;
var speed = 3;
var stars;
var layer8,layer1,layer2,layer3,layer4,layer5,layer6,layer7,layer9,layer10;
var max = 100;
var xx = [];
var yy = [];
var zz = [];
function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2656, 928);

    map = game.add.tilemap('level');

    map.addTilesetImage('arbolNavidad2', 'arbolNavidad2');
    map.addTilesetImage('fondoEstrellas2', 'fondoEstrellas2');
    map.addTilesetImage('castillo', 'castillo');
    map.addTilesetImage('nube', 'nube');
    map.addTilesetImage('laTierra2', 'laTierra2');
    map.addTilesetImage('luzAmarilla', 'luzAmarilla');
    map.addTilesetImage('luzCeleste', 'luzCeleste');
    map.addTilesetImage('luzIntensa1', 'luzIntensa1');
    map.addTilesetImage('luzIntensa3', 'luzIntensa3');
    map.addTilesetImage('collitionTile', 'collitionTile');
    map.addTilesetImage('muniecoNieve', 'muniecoNieve');
    map.addTilesetImage('luzNoIntesa', 'luzNoIntesa');
    map.addTilesetImage('luzNoIntesa2', 'luzNoIntesa2');
    map.addTilesetImage('pesebre', 'pesebre');
    map.addTilesetImage('burrito', 'burrito');
    map.addTilesetImage('rudolph2', 'rudolph2');
    layer1 = map.createLayer(0);
    layer2 = map.createLayer(1);

    layer5 = map.createLayer(4);
    layer6= map.createLayer(5);
    layer7 = map.createLayer(6);
    layer8= map.createLayer(7);
    layer9=map.createLayer(8);
    layer10=map.createLayer(9);
    layer11=map.createLayer(10);
    layer12=map.createLayer(11);



    if (game.renderType === Phaser.WEBGL)
    {
        max = 200;
    }

    var sprites = game.add.spriteBatch();

    stars = [];

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 1200) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 170) - 100;

        var star = game.make.sprite(0, 0, 'regalo');
        var star1 = game.make.sprite(0, 0, 'regalo2');

        var star3 = game.make.sprite(0, 0, 'regalo4');


        var star2 = game.make.sprite(0, 0, 'luzAmarilla');
        var star4 = game.make.sprite(0, 0, 'luzCeleste');


        star.anchor.set(0.5);
        star1.anchor.set(0.5);
        star2.anchor.set(0.5);
        star3.anchor.set(0.5);

        star4.anchor.set(0.5);


        sprites.addChild(star);
        sprites.addChild(star1);
           sprites.addChild(star3);

        sprites.addChild(star2);
        sprites.addChild(star4);
        stars.push(star);
        stars.push(star1);
        stars.push(star2);
        stars.push(star3);
        stars.push(star4);

    }

    layer3 = map.createLayer(2);

     atari = game.add.sprite(2000, 850, 'star');
     atari.anchor.setTo(0.5, 0.5);

    atari.scale.setTo(0.9,0.9);
    game.physics.arcade.gravity.y = 200;

    game.physics.arcade.enable(game.world, true);

    atari.body.allowGravity = 0;
    atari.body.immovable = true;
    atari.body.collideWorldBounds = true;
    atari.setScaleMinMax(0.1, 2);
    game.camera.follow(atari, Phaser.Camera.FOLLOW_TOPDOWN);

    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    letraE=game.input.keyboard.addKey(Phaser.KeyCode.E);


    layer4 = map.createLayer(3);


  //  layer4.visible=false;
layer5.visible=false;
    layer6.visible=false;
    layer7.visible=false;
    layer8.visible=false;
    layer9.visible=false;
   layer10.visible=false;

     fx = game.add.audio('burrito');
     fx.allowMultiple = true;

     yeah = game.add.audio('alMundoPaz');
     yeah.allowMultiple = true;

     iuju = game.add.audio('prender');
     iuju.allowMultiple = true;

     rodolfo = game.add.audio('rodolfo');
     rodolfo.allowMultiple = true;

    frosty = game.add.audio('frosty');
    frosty.allowMultiple = true;






}



function encenderLuzIntesa1()
{
    if (letraE.downDuration(50)){
        layer5.visible=!layer5.visible;
        layer7.visible=!layer7.visible;
        layer11.visible=!layer11.visible;
        iuju.play();
    }
}

function encenderLuzIntesa2()
{
    if (letraE.downDuration(50)){
        layer6.visible=!layer6.visible;
        layer8.visible=!layer8.visible;
layer12.visible=!layer12.visible;
        iuju.play();
    }
}
var burritoAndando=false;
function elBurrito(){
    if (letraE.downDuration(50)) {
        if (burritoAndando == false) {
            yeah.stop();
            rodolfo.stop();
            frosty.stop();
            frostyAndando=false;
            rodolfoAndando = false;
            fx.play();
            alMundoPazAndando=false;
            burritoAndando = true;
        }else{

            fx.stop();
            burritoAndando = false;
        }
    }

}

var alMundoPazAndando=false;
function alMundoPaz(){
    if (letraE.downDuration(50)) {
        if (alMundoPazAndando == false) {
            fx.stop();
            frosty.stop();
            frostyAndando=false;
            rodolfo.stop();
            rodolfoAndando = false;
            yeah.play();

            alMundoPazAndando = true;
            burritoAndando = false;
        }else{

            yeah.stop();
            alMundoPazAndando = false;
        }
    }

}

var rodolfoAndando=false;
function rodolfoMusica(){
    if (letraE.downDuration(50)) {
        if (rodolfoAndando == false) {
            fx.stop();
            yeah.stop();
            frosty.stop();
            frostyAndando=false;
rodolfo.play();
            rodolfoAndando = true;
            burritoAndando = false;
            alMundoPazAndando = false;
        }else{

            rodolfo.stop();
            rodolfoAndando = false;
        }
    }

}

var frostyAndando=false;
function frostyMusica(){
    if (letraE.downDuration(50)) {
        if (frostyAndando == false) {
            fx.stop();
            yeah.stop();
            rodolfo.stop();
            frosty.play();
            frostyAndando=true;
            rodolfoAndando = false;
            burritoAndando = false;
            alMundoPazAndando = false;
        }else{

            frosty.stop();
            frostyAndando=false;
        }
    }

}

function update() {

    atari.angle=0;

//    console.log("(" + atari.position.x + "," + atari.position.y + ")");

    if ((atari.position.x>=595 && atari.position.x<=625) && (atari.position.y>=140 && atari.position.y<=175)){
        encenderLuzIntesa1()
    }

    if ((atari.position.x>=2260 && atari.position.x<=2280) && (atari.position.y>=150 && atari.position.y<=170)){
        encenderLuzIntesa2()
    }

    if(layer5.visible==true && layer6.visible==true){
        if ((atari.position.x>=535 && atari.position.x<=655) && (atari.position.y>=645 && atari.position.y<=770)){
            elBurrito()
        };
        if ((atari.position.x>=85 && atari.position.x<=380) && (atari.position.y>=515 && atari.position.y<=810)){
           alMundoPaz()
        };
        if ((atari.position.x>=1189 && atari.position.x<=1274) && (atari.position.y>=780 && atari.position.y<=885)){
            rodolfoMusica()
        };
       if ((atari.position.x>=1571 && atari.position.x<=1696) && (atari.position.y>=671 && atari.position.y<=846)){
           frostyMusica()
        };
    }else{
        fx.stop();
        frosty.stop();
        rodolfo.stop();
        yeah.stop();
        frostyAndando=false;
        rodolfoAndando = false;
        burritoAndando = false;
        alMundoPazAndando = false;
    }



    atari.body.velocity.x = 0;
    atari.body.velocity.y = 0;

    if (cursors.up.isDown) {
        atari.body.velocity.y -= 300 + acelerador;

    }
    else if (cursors.down.isDown) {
        atari.body.velocity.y += 300 + acelerador;

    } //else {


    if (cursors.left.isDown) {
        atari.body.velocity.x -= 300 + acelerador;
        atari.angle=-10;

    } else if (cursors.right.isDown) {
        atari.body.velocity.x += 300 + acelerador;
        atari.angle=10;

    }
    if (spacebar.isDown){
        acelerador=250;
    }else{
        acelerador=0;
    }


    if(layer5.visible==true && layer6.visible==true){
    for (var i = 0; i < max; i++)
    {
        stars[i].perspective = distance / (distance - zz[i]);
        stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
        stars[i].y = game.world.centerY-30 + yy[i] * stars[i].perspective;

        zz[i] += speed;

        if (zz[i] > 290)
        {
            zz[i] -= 600;
        }

        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
        stars[i].scale.set(stars[i].perspective / 2);
        stars[i].rotation += 0.1;

    }
    }
}


