/**
 * Created by Pablo on 10/12/2016.
 */

var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.tilemap('level', 'assets/mapa7.json', null, Phaser.Tilemap.TILED_JSON);


    game.load.image('fondo1', 'assets/fondo1.png');
    game.load.image('fondo2', 'assets/fondo2.png');

    game.load.image('nube', 'assets/nube.png');
    game.load.image('castillo', 'assets/castillo.png');
    game.load.image('star', 'assets/starSmile.png');
    game.load.spritesheet('koala', 'assets/koala.png');
    game.load.spritesheet('pulpo', 'assets/pulpo.png');
    game.load.spritesheet('carita', 'assets/carita.png');
    game.load.audio('musica', 'assets/musica.ogg');
    game.load.audio('perder', 'assets/confusion.ogg');
    game.load.audio('iuju', 'assets/iuju.wav');
    game.load.audio('yeah', 'assets/yeah.wav');
}

var atari;
var balls;
var pulpos,caritas;
var cursors,spacebar;
var pulposPuntaje=0;
var koalasPuntaje=0;
var perder,iuju,yeah;
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2656, 928);
    map = game.add.tilemap('level');

    map.addTilesetImage('fondo1', 'fondo1');
    map.addTilesetImage('fondo2', 'fondo2');
    map.addTilesetImage('castillo', 'castillo');
    map.addTilesetImage('nube', 'nube');

    layer1 = map.createLayer(0);
    layer2 = map.createLayer(1);

    balls = game.add.group();
    balls.createMultiple(100, 'koala', 0, false);

    caritas = game.add.group();
    caritas.createMultiple(5, 'carita', 0, false);

    pulpos = game.add.group();
    pulpos.createMultiple(100, 'pulpo', 0, false);

    atari = game.add.sprite(300, 850, 'star');
    atari.anchor.setTo(0.5, 0.5);

    atari.scale.setTo(0.1,0.1);
    game.physics.arcade.gravity.y = 200;

    //  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)
    game.physics.arcade.enable(game.world, true);

    atari.body.allowGravity = 0;
    atari.body.immovable = true;
    atari.body.collideWorldBounds = true;
    atari.setScaleMinMax(0.1, 2);
    game.camera.follow(atari, Phaser.Camera.FOLLOW_TOPDOWN);

    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    game.time.events.loop(150, fire, this);
    game.time.events.loop(150, fire2, this);
    game.time.events.loop(100, fire3, this);

    layer2 = map.createLayer(2);
    layer2 = map.createLayer(3);

    koalasPuntaje = game.add.text(25, 16, 'Recibiste 0 abracitos de koala', { font: '24px Arial', fill: '#000' });
    pulposPuntaje = game.add.text(25, 40, 'Recibiste 0 abracitos de pulpo', { font: '24px Arial', fill: '#000' });
    fx = game.add.audio('musica');
    fx.allowMultiple = true;
    fx.loopFull(0.8);
    yeah = game.add.audio('yeah');
    yeah.allowMultiple = true;

    iuju = game.add.audio('iuju');
    iuju.allowMultiple = true;

    perder = game.add.audio('perder');
    perder.allowMultiple = true;
perder.volume=5;
}

function fire() {

    var ball = balls.getFirstExists(false);

    if (ball)
    {
        ball.frame = game.rnd.integerInRange(0,6);
        ball.exists = true;
        ball.reset(game.world.randomX, 0);
        ball.scale.setTo(0.5,0.5);
        ball.body.bounce.y = 0.8;
    }

}

function fire2() {

    var ball = pulpos.getFirstExists(false);

    if (ball)
    {
        ball.frame = game.rnd.integerInRange(0,6);
        ball.exists = true;
        ball.reset(game.world.randomX, 0);
        ball.scale.setTo(0.5,0.5);
        ball.body.bounce.y = 0.8;
    }

}

function fire3() {

    var ball = caritas.getFirstExists(false);

    if (ball)
    {
        ball.frame = game.rnd.integerInRange(0,6);
        ball.exists = true;
        ball.reset(game.world.randomX, 0);
        ball.scale.setTo(0.3,0.3);
        ball.body.bounce.y = 0.8;
    }

}
var abrazosPulpo=0;
var abrazosKoala=0;

function reflectKoala(a, ball) {
    tamañoX=tamañoX+0.005;
    tamañoY= tamañoY+0.005;
    atari.scale.setTo(tamañoX,tamañoY)
    ball.kill();
    abrazosKoala += 1;
    koalasPuntaje.setText('Recibiste: '+abrazosKoala + " abracitos de Koala!!");

    iuju.play();
        return false;

}
tamañoX=0;
tamañoY=0;

function reflectCarita(a, ball) {
    tamañoX=0.1;
    tamañoY= 0.1;
    atari.scale.setTo(tamañoX,tamañoY)

    ball.kill();
    abrazosKoala = 0;
    abrazosPulpo=0;

    koalasPuntaje.setText('Recibiste: '+abrazosKoala + " abracitos de Koala!!");
    pulposPuntaje.setText('Recibiste: '+abrazosPulpo + " abracitos de Pulpo!!");

    perder.play();
    return false;

}

function reflectPulpo(a, ball) {
    tamañoX=tamañoX+0.005;
    tamañoY= tamañoY+0.005;
    atari.scale.setTo(tamañoX,tamañoY)
    ball.kill();
    abrazosPulpo += 1;
    pulposPuntaje.setText('Recibiste: '+abrazosPulpo + " abracitos de Pulpo!!");
    yeah.play();
    return false;

}

function update() {
    pulposPuntaje.x=game.camera.x+450;
    pulposPuntaje.y=game.camera.y+20;
    koalasPuntaje.x=game.camera.x+450;
    koalasPuntaje.y=game.camera.y+40;
    atari.angle=0;
    game.physics.arcade.collide(atari, balls, null, reflectKoala, this);
    game.physics.arcade.collide(atari, pulpos, null, reflectPulpo, this);
    game.physics.arcade.collide(atari, caritas, null, reflectCarita, this);
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
    balls.forEachAlive(checkBounds, this);
    pulpos.forEachAlive(checkBounds, this);
    caritas.forEachAlive(checkBounds, this);

}

function checkBounds(ball) {

    if (ball.y > 928)
    {
        ball.kill();
    }

}

function render() {

}
