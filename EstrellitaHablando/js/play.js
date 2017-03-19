var playState = {

    create: function () {
        colisionLuz=false;
        tocoDerecho = false;
        yaApreto = false;

        luz = game.add.sprite(0, 0, 'luz');
        game.physics.arcade.enable(luz, true);
        luz.anchor.setTo(0.5, 0.5);

        luz.kill();

        luz2 = game.add.sprite(0, 0, 'luz2');
        game.physics.arcade.enable(luz2, true);
        luz2.anchor.setTo(0.5, 0.5);

        luz2.kill();
        globo = game.add.sprite(0, 0, 'globo');
        game.physics.arcade.enable(globo, true);
        globo.anchor.setTo(0.5, 0.5);
        globo.scale.setTo(0.5, 0.5);
        globo.kill();

        globo2 = game.add.sprite(0, 0, 'globo3');
        game.physics.arcade.enable(globo2, true);
        globo2.anchor.setTo(0.5, 0.43);
        globo2.scale.setTo(1.2, 1.2);
        globo2.kill();

        //Creamos al chico
        chico = game.add.sprite(200, 200, 'chico');
        chico.anchor.setTo(0.5, 0.5);
        chico.scale.setTo(0.5, 0.5);
        chico.animations.add('triste', [0, 1]);
        chico.animations.add('chicoFelizPerfil', [6, 7]);
        chico.animations.add('chicoFelizDeFrente', [2, 3, 4, 5]);
        game.physics.arcade.enable(chico, true);
        chico.body.collideWorldBounds = true;


        //Creamos a la Estrellita
        estrellita = game.add.sprite(0, 0, 'estrellita');
        estrellita.anchor.setTo(0.5, 0.5);
        estrellita.scale.setTo(0.8, 0.8);
        game.physics.arcade.enable(estrellita, true);
        estrellita.body.allowGravity = 0;
        estrellita.body.immovable = true;
        estrellita.body.collideWorldBounds = true;


        cantandoAnimacionIzquierda = game.add.sprite(0, 0, 'cantandoAnimacion');
        cantandoAnimacionIzquierda.anchor.setTo(0.5, 0.5);

        cantandoAnimacionIzquierda.scale.setTo(0.4, 0.4);
        cantandoAnimacionIzquierda.animations.add('cantar');

        game.physics.arcade.enable(cantandoAnimacionIzquierda, true);


        cantandoAnimacionDerecha = game.add.sprite(300, 200, 'cantandoAnimacion');
        cantandoAnimacionDerecha.anchor.setTo(0.5, 0.5);

        cantandoAnimacionDerecha.scale.setTo(0.4, 0.4);
        cantandoAnimacionDerecha.animations.add('cantar');

        game.physics.arcade.enable(cantandoAnimacionDerecha, true);

        hablando = game.add.sprite(0, 0, 'hablandoAnimacion');
        hablando.anchor.setTo(0.5, 0.5);

        hablando.scale.setTo(0.5, 0.5);
        hablando.animations.add('hablar');

        hablando.kill();
        cantandoAnimacionIzquierda.kill();
        cantandoAnimacionDerecha.kill();
        globo.addChild(hablando);

        pensamiento = game.add.sprite(0, 0, 'pensamiento');
        pensamiento.anchor.setTo(0.5, 0.5);

        pensamiento.scale.setTo(0.3, 0.3);


        globo2.addChild(pensamiento);
        chico.addChild(globo2);
        vals = game.add.audio('vals');
        vals.allowMultiple = true;
        game.time.events.loop(2000, function () {
            game.add.tween(chico).to({
                x: game.world.randomX,
                y: game.world.randomY
            }, 1750, Phaser.Easing.Quadratic.InOut, true);
        }, this);

        //Teclas
        cursors = game.input.keyboard.createCursorKeys();
        letraT = game.input.keyboard.addKey(Phaser.KeyCode.T);
        letraR = game.input.keyboard.addKey(Phaser.KeyCode.R);
        letraB = game.input.keyboard.addKey(Phaser.KeyCode.B);
    },

    update: function update() {
        estrellita.angle = 0;
        this.controlKeys(estrellita, 10);
        game.physics.arcade.collide(cantandoAnimacionIzquierda, chico,
            function () {
                if (!tocoDerecho) {
                    chico.animations.play('chicoFelizPerfil', 2, true);
                    tocoDerecho = true;


                }
            });

       colisionLuz= game.physics.arcade.collide(luz, chico,
            function () {

                luz2.reset(chico.x, chico.y);


            });

       if (!colisionLuz){
           luz2.kill();
       }
        game.physics.arcade.collide(cantandoAnimacionDerecha, chico, function () {

            if (!tocoDerecho) {
                chico.animations.play('chicoFelizPerfil', 2, true);
                tocoDerecho = true;


            }
        });

        //luz.tint=0xffffff
        if (letraB.downDuration(50)) {


        }

        if (letraT.downDuration(50)) {
            if (!yaApreto) {
                cantandoAnimacionIzquierda.reset(estrellita.position.x + 90, estrellita.position.y);
                cantandoAnimacionDerecha.reset(estrellita.position.x - 90, estrellita.position.y);

                cantandoAnimacionIzquierda.animations.play('cantar', 7, true);

                cantandoAnimacionDerecha.animations.play('cantar', 7, true);
                yaApreto = true;
                vals.play();
                globo.reset(estrellita.x + 50, estrellita.y - 60);
                hablando.reset(3, -20);
                hablando.animations.play('hablar', 1, true);
                luz.reset(estrellita.x, estrellita.y);
                luz.body.angularVelocity = 40;
                chico.animations.play('chicoFelizDeFrente', 2, true);

                globo2.reset(120, -160);
            }


        } else {
            if (letraR.downDuration(50))
                if (yaApreto) {
                    yaApreto = false;
                    cantandoAnimacionIzquierda.animations.stop();
                    tocoDerecho = false;

                    cantandoAnimacionDerecha.animations.stop();
                    globo.kill();
                    luz.kill();
                    globo2.kill();
                    luz2.kill();
                    colisionLuz=false;
                    vals.stop();
                    chico.animations.play("triste", 2, true);
                    cantandoAnimacionIzquierda.kill();
                    cantandoAnimacionDerecha.kill();
                }
        }

        if (yaApreto) {
            luz.body.angularVelocity = 40;
            luz.position.x = estrellita.position.x;
            luz.position.y = estrellita.position.y;
            globo.position.x = estrellita.position.x + 50;
            globo.position.y = estrellita.position.y - 60;
            cantandoAnimacionIzquierda.position.x = estrellita.position.x - 90;
            cantandoAnimacionIzquierda.position.y = estrellita.position.y;

            cantandoAnimacionDerecha.position.x = estrellita.position.x + 90;
            cantandoAnimacionDerecha.position.y = estrellita.position.y;
        }
    },

    controlKeys: function (sprite, velocidad) {
        sprite.angle = 0;


        if (cursors.up.isDown) {
            sprite.y -= velocidad;

        }
        else if (cursors.down.isDown) {
            sprite.y += velocidad;

        }


        if (cursors.left.isDown) {
            sprite.x -= velocidad;
            sprite.angle = -10;

        } else if (cursors.right.isDown) {
            sprite.x += velocidad;
            sprite.angle = 10;

        }
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

