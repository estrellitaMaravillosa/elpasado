var playState={

  create:function(){


    //Creamos al chico
    this.chico = game.add.sprite(200, 200, 'chico');
    this.chico.anchor.setTo(0.5, 0.5);
    this.chico.scale.setTo(0.5, 0.5);
    this.chico.animations.add('triste', [0, 1]);
    this.chico.animations.add('chicoFelizPerfil', [6, 7]);
    this.chico.animations.add('chicoFelizDeP', [2, 3, 4, 5]);
    game.physics.arcade.enable(this.chico, true);
    this.chico.body.collideWorldBounds = true;

    //Creamos a la Estrellita
    this.estrellita = game.add.sprite(20,20 , 'estrellita');
    this.estrellita.anchor.setTo(0.5, 0.5);
  //  this.estrellita.scale.setTo(0.8, 0.8);
    game.physics.arcade.enable(this.estrellita, true);
    this.estrellita.body.allowGravity = 0;
    this.estrellita.body.immovable = true;
    this.estrellita.body.collideWorldBounds = true;




  }
};

// var vals, chico,yaApreto=false;
// function create() {
//
//
//
//
//     atari = game.add.sprite(1, 1, 'personaje');
//     atari.anchor.setTo(0.5, 0.5);
//
//     atari.scale.setTo(0.8, 0.8);
//
//
//     game.physics.arcade.enable(game.world, true);
//
//     atari.body.allowGravity = 0;
//     atari.body.immovable = true;
//     atari.body.collideWorldBounds = true;
//     // atari.setScaleMinMax(0.5, 0.5);
//
//
//     cursors = game.input.keyboard.createCursorKeys();
//
//     letraT = game.input.keyboard.addKey(Phaser.KeyCode.T);
//     letraR = game.input.keyboard.addKey(Phaser.KeyCode.R);
//
//     mummy = game.add.sprite(300, 200, 'mummy');
//     mummy.anchor.setTo(0.5, 0.5);
//
//     mummy.scale.setTo(0.3, 0.3);
//     walk = mummy.animations.add('walk');
//     game.physics.arcade.enable(chico, true);
//     game.physics.arcade.enable(mummy, true);
// //    mummy.visible = false;
//
//     mummy2 = game.add.sprite(300, 200, 'mummy');
//     mummy2.anchor.setTo(0.5, 0.5);
//
//     mummy2.scale.setTo(0.3, 0.3);
//     mummy2.animations.add('walk');
//
//     game.physics.arcade.enable(mummy2, true);
//   //  mummy2.visible = false;
//     mummy.kill();
//       mummy2.kill();
//
//
//
//     vals = game.add.audio('vals');
//     vals.allowMultiple = true;
//     this.game.time.events.loop(2000, function () {
//         this.game.add.tween(chico).to({
//             x: this.game.world.randomX,
//             y: this.game.world.randomY
//         }, 1750, Phaser.Easing.Quadratic.InOut, true);
//     }, this);
// }
// tocoIzquierdo=false;
// tocoDerecho=false;
// function update() {
//     atari.angle = 0;
//     atari.body.velocity.x = 0;
//     atari.body.velocity.y = 0;
//     game.physics.arcade.collide(mummy, chico,
//       function () {   if(!tocoDerecho){ chico.animations.play('felicidadEnCamino', 2, true); tocoDerecho=true; tocoIzquierdo=false;}});
//     game.physics.arcade.collide(mummy2, chico,function () {
//
//                if(!tocoIzquierdo){ chico.animations.play('caminarFeliz', 2, true); tocoDerecho=false; tocoIzquierdo=true;}
//
//
//         });
//
//
//     if (cursors.up.isDown) {
//         atari.body.velocity.y -= 300 ;
//
//     }
//     else if (cursors.down.isDown) {
//         atari.body.velocity.y += 300 ;
//
//     } //else {
//
//
//     if (cursors.left.isDown) {
//         atari.body.velocity.x -= 300 ;
//         atari.angle = -10;
//
//     } else if (cursors.right.isDown) {
//         atari.body.velocity.x += 300 ;
//         atari.angle = 10;
//
//     }
//     if (letraT.downDuration(50)) {
//         if (!yaApreto) {
//                mummy.reset( atari.position.x + 55, atari.position.y);
//                mummy2.reset(atari.position.x - 55, atari.position.y);
//           //  mummy.visible = true;
//             mummy.animations.play('walk', 7, true);
//           //  mummy2.visible = true;
//             mummy2.animations.play('walk', 7, true);
//             yaApreto = true;
//             vals.play();
//         }
//
//
//     }else {
//         if (letraR.downDuration(50))
//       if(yaApreto){
//         yaApreto = false;
//         mummy.animations.stop();
//
//     //    mummy.visible = false;
//         mummy2.animations.stop();
//
//       //  mummy2.visible = false;
//         vals.stop();
//         chico.animations.play("triste", 2, true);
//         mummy.kill();
//           mummy2.kill();
//         }
//     }
//     if(yaApreto){
//       mummy.position.x = atari.position.x + 55;
//       mummy.position.y = atari.position.y;
//       mummy2.position.x = atari.position.x - 55;
//       mummy2.position.y = atari.position.y;
//     }
//
// }
