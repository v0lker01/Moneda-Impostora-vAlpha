class Escena2 extends Phaser.Scene {
    constructor()
    {
        super("Nivel1");
    }

     preload ()
    {
        this.load.image("Fondo", "./assets/Fondo.png");
        this.load.image("Piso", "./assets/Piso.png");
        this.load.image("Plataforma", "./assets/Plataforma.png");
        this.load.image("Moneda", "./assets/Moneda.png")
        this.load.image("Moneda1", "./assets/Moneda1.png")
        this.load.image("Moneda2", "./assets/Moneda2.png")
        this.load.image("Moneda3", "./assets/Moneda3.png")
        this.load.image("Moneda4", "./assets/Moneda1.png")
        this.load.image("Moneda5", "./assets/Moneda1.png")
        this.load.spritesheet("Jugador", "assets/Personaje.png", { frameWidth: 32, frameHeight: 48 });

        this.load.audio("CoinSong", "./sound/MonedaSonido.mp3")
        this.load.audio("Jump", "./sound/Salto.mp3")

    } 

    create ()
    {
        this.add.image(400, 300, 'Fondo');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'Piso').setScale(2).refreshBody();

        platforms.create(600, 400, 'Plataforma');
        platforms.create(50, 250, 'Plataforma');
        platforms.create(750, 220, 'Plataforma');

        //Monedas que Rebotan
        var MonedaA = this.physics.add.image(200, 240, "Moneda1");
        var MonedaB = this.physics.add.image(100, 240, "Moneda2");
        var MonedaC = this.physics.add.image(500, 200, "Moneda4")
        var MonedaD = this.physics.add.image(65, 85, "Moneda5");

        player = this.physics.add.sprite(100, 450, 'Jugador');
        player.saltos = 0
    
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //Moneda Giratoria
        var coin = this.physics.add.group({ allowGravity: false });

        coin.add(new FlyingStar(this, 150, 100, 100, 100, 0.005), true);
        //coin.add(new FlyingStar(this, 600, 200, 40, 100, -0.005), true);

        CoinMove = this.physics.add.image(600, 100, "Moneda3");

        CoinMove.setImmovable(true);
        CoinMove.body.allowGravity = false;
        CoinMove.setVelocityX(50);

        MonedaA.setCollideWorldBounds(true);
        MonedaB.setCollideWorldBounds(true);
        MonedaC.setCollideWorldBounds(true);
        MonedaD.setCollideWorldBounds(true);

        MonedaA.setBounce(1);
        MonedaB.setBounce(1);
        MonedaC.setBounce(1);
        MonedaD.setBounce(1);
        CoinMove.setBounce(1);

        MonedaA.setVelocity(150);
        MonedaB.setVelocity(-200, 60);
        MonedaC.setVelocity(100, 70);
        MonedaD.setVelocity(50, 50);

        this.physics.add.collider(MonedaA, MonedaB);
        this.physics.add.collider(MonedaA, MonedaC);
        this.physics.add.collider(MonedaA, MonedaD);

        this.physics.add.collider(MonedaB, MonedaC);
        this.physics.add.collider(MonedaB, MonedaD);
        

        Score = this.add.text(55, 545, "Puntos: 0", {fontFamily:"Impact, fantasy"});
        Puntos = 0;

        SonidoMoneda = this.sound.add("CoinSong");
        Salto = this.sound.add("Jump");


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Jugador', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'Jugador', frame: 4 } ],
            frameRate: 20
         });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Jugador', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        
       //cursors = this.input.keyboard.createCursorKeys();

       if (cursors =! undefined)
       {
           cursors = this.input.keyboard.createCursorKeys();
       }

       this.physics.add.collider(player, platforms);
       this.physics.add.collider(MonedaA, platforms);
       this.physics.add.collider(MonedaB, platforms);
       this.physics.add.collider(MonedaC, platforms);
       this.physics.add.collider(MonedaD, platforms);
       
       
       this.physics.add.overlap(player, coin, this.CollectCoin, null, this);
       this.physics.add.overlap(player, MonedaA, this.JuntarMonedaA, null, this);
       this.physics.add.overlap(player, MonedaC, this.JuntarMonedaA, null, this);
       this.physics.add.overlap(player, MonedaD, this.JuntarMonedaA, null, this);
       this.physics.add.overlap(player, MonedaB, this.JuntarMonedaB, null, this);
       this.physics.add.overlap(player, CoinMove, this.MonedaL, null, this);
       
}

    update ()
    {
        if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && (player.body.touching.down ||  (player.saltos < 1) ))
    {
        Salto.play();
        player.setVelocityY(-330);
        player.saltos += 1
    }


    if (player.body.touching.down)
    {
        player.saltos = 0
    }

    if (CoinMove.x >= 700)
    {
        CoinMove.setVelocityX(-50);
    }

    else if (CoinMove.x <= 400)
    {
        CoinMove.setVelocityX(50);
    }    

}

CollectCoin (player, coin)
{
    SonidoMoneda.play();
    coin.disableBody(true, true);
    Puntos += 3;
    Score.setText("Puntos: " + Puntos);

    if(Puntos >= 15)
    {
        Salto.stop();
        this.scene.start("Nivel2");
    }

}
MonedaL (player, CoinMove)
{
    SonidoMoneda.play();
    CoinMove.disableBody(true, true);
    Puntos += 3;
    Score.setText("Puntos: " + Puntos);

    if(Puntos >=15)
    {
        Salto.stop();
        this.scene.start("Nivel2");
    }
    
}

JuntarMonedaA(player, MonedaA)
{
    SonidoMoneda.play();
    MonedaA.disableBody(true, true);
    Puntos += 3;
    Score.setText("Puntos: " + Puntos);

    if(Puntos >= 15)
    {
        Salto.stop();
        this.scene.start("Nivel2");
    }
}

JuntarMonedaB(player, MonedaB)
{
    Salto.stop();
    game.registry.destroy();
    game.events.off();
    this.scene.start("Loser");
}
}
