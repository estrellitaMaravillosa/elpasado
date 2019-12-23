class SceneMain extends Phaser.Scene {
  
  constructor() {
    super({ key: "SceneMain" });
    this.puntaje=0;
    this.yaGano=false;
  }
  
  preload() {
    this.load.spritesheet("sprExplosion", "content/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", "content/sprEnemy0.png", {
      frameWidth: 107,
      frameHeight: 101
    });
    this.load.image("sprEnemy1", "content/sprEnemy1.png");
    this.load.image("lifeIndicator", "content/life.png");
    this.load.image("puntosIndicator", "content/puntos.png");
    this.load.image("lifeItem", "content/itemlife.png");
    this.load.image("puntajeItem", "content/puntosItem.png");

    this.load.spritesheet("sprEnemy2", "content/sprEnemy2.png", {
      frameWidth: 162,
      frameHeight: 174
    });
    this.load.image("sprLaserEnemy0", "content/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "content/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "content/sprPlayer.png", {
      frameWidth: 89,
      frameHeight: 66
    });

    // this.load.audio("sndExplode0", "content/sndExplode0.wav");
    // this.load.audio("sndExplode1", "content/sndExplode1.wav");
    // this.load.audio("sndLaser", "content/sndLaser.wav");
  }

  create() {
    this.yaGano=false;
    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    // this.sfx = {
    //   explosions: [
    //     this.sound.add("sndExplode0"),
    //     this.sound.add("sndExplode1")
    //   ],
    //   laser: this.sound.add("sndLaser")
    // };

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

    this.add.image(this.game.config.width * 0.05, 560 , 'lifeIndicator');
    this.title = this.add.text(this.game.config.width * 0.1, 560 , this.player.getVida(), {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'left'
    });

    this.title.setOrigin(0.5);

    this.add.image(this.game.config.width * 0.05, 500 , 'puntosIndicator');
    this.title2 = this.add.text(this.game.config.width * 0.1, 500 , this.puntaje, {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'left'
    });

    this.title2.setOrigin(0.5);
    
    this.ganasteEstrellita = this.add.text(this.game.config.width * 0.5, 100 , "¡Ganaste Estrellita!", {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'left'
    });

    this.ganasteEstrellita.setOrigin(0.5);
    this.ganasteEstrellita.visible=false;

    this.ganasteEstrellita2 = this.add.text(this.game.config.width * 0.5, 150 , "¡Te quiero dulce Angelica!", {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'left'
    });

    this.ganasteEstrellita2.setOrigin(0.5);
    this.ganasteEstrellita2.visible=false;

    this.ganasteEstrellita3 = this.add.text(this.game.config.width * 0.5, 200 , "de Cielito", {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'left'
    });

    this.ganasteEstrellita3.setOrigin(0.5);
    this.ganasteEstrellita3.visible=false;


    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.puntajeItems=this.add.group();
this.lifes=this.add.group();
   this.timerEnemyEvents= this.time.addEvent({
      delay: 500,
      callback: function() {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 5) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {
    
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
    
        if (enemy !== null) {
          // enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });


    this.timerLifeEvents=  this.time.addEvent({
      delay: 6000,
      callback: function() {
       var lifeItem=null;
       lifeItem=new LifeItem(this,Phaser.Math.Between(0, this.game.config.width),0);
      //  lifeItem.setScale(Phaser.Math.Between(10, 20) * 0.1);
       this.lifes.add(lifeItem);
      },
      callbackScope: this,
      loop: true
    });

    this.timerPuntosEvents=   this.time.addEvent({
      delay: 3000,
      callback: function() {
       var puntajeItem=null;
       puntajeItem=new PuntajeItem(this,Phaser.Math.Between(0, this.game.config.width),0);
      //  lifeItem.setScale(Phaser.Math.Between(10, 20) * 0.1);
       this.puntajeItems.add(puntajeItem);
      },
      callbackScope: this,
      loop: true
    });


    this.physics.add.collider(this.player, this.lifes, function(player, life) {
      if (life) {
        if (life.onDestroy !== undefined) {
          life.onDestroy();
     
        }
        var vidaSumada = 3;
        
       player.sumarVida(vidaSumada);
        life.destroy();
      }
    });

    this.physics.add.collider(this.player, this.puntajeItems, function(player, puntajeItem) {
      if (puntajeItem) {
        if (puntajeItem.onDestroy !== undefined) {
          puntajeItem.onDestroy();
     
        }
        var puntajeSumada = 1;
        
       player.sumarPuntos(puntajeSumada);
       puntajeItem.destroy();
      }
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
    
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
          var estado = player.restaVida(5);
    
          if (estado){
            player.explode(false);
            player.onDestroy(); 
          }
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
            var estado = player.restaVida(1);
            if (estado){
              player.explode(false);
              player.onDestroy(); 
             }
        laser.destroy();
      }
    });
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
  
      this.title.text=this.player.getVida();
 
      if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }


      this.title2.text=this.player.getPuntos();
    }
if (!this.yaGano){
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);
          enemy.destroy();
          
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }



    if (this.player.getPuntos()==10 && !this.yaGano){
    this.timerEnemyEvents.remove();
    this.timerPuntosEvents.delay=1000;
    this.ganasteEstrellita.visible=true;
    this.ganasteEstrellita2.visible=true;
    this.ganasteEstrellita3.visible=true;
    this.timerLifeEvents.delay=1000;
    this.yaGano=true;

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover"); 

    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
  
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start("SceneMain");
    }, this);


    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
     
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);
        }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];

        if (laser) {
          laser.destroy();
        }
      
    }
  }

}
}
