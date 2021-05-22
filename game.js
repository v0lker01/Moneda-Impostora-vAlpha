var configuracion = 
        {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        
        scene: [Escena1, Escena2, Escena3, Escena4, Escena5, Escena6, Escena7]

        };

        var game = new Phaser.Game(configuracion);

        var player;
        var platforms;
        var cursors;
        var Score;
        var Puntos;
        var MovingPlatform;
        var CoinMove;
        var SonidoMoneda;
        var Salto;


        var FlyingStar = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,
    
            initialize:
    
            function FlyingStar (scene, x, y, width, height, speed)
            {
                Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, "Moneda");
    
                this.path = new Phaser.Curves.Ellipse(x, y, width, height);
                this.pathIndex = 0;
                this.pathSpeed = speed;
                this.pathVector = new Phaser.Math.Vector2();
    
                this.path.getPoint(0, this.pathVector);
    
                this.setPosition(this.pathVector.x, this.pathVector.y);
            },
    
            preUpdate: function (time, delta)
            {
                this.anims.update(time, delta);
    
                this.path.getPoint(this.pathIndex, this.pathVector);
    
                this.setPosition(this.pathVector.x, this.pathVector.y);
    
                this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
            }
    
        });