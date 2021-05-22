class Escena1 extends Phaser.Scene {
    constructor()
    {
        super("Inicio");
    }

    preload()
    {
        this.load.image("Logo", "./assets/logo.png");
        this.load.image("Portada", "./assets/Portada.png")
        this.load.image("Boton1", "./assets/BotonInicio.png")
        this.load.image("Boton2", "./assets/ComoJugar.png")
        this.load.image("Creditos", "./assets/Creditos.png")
        this.load.image("Creador", "./assets/Credits.png")
        this.load.image("Close", "./assets/Cerrar.png")
    
    }

    create()
    {
        var logo = this.add.image(400, 300, 'Logo')
      
        var Portada = this.add.image(400, 300, "Portada")

        var BotonA = this.add.image(400, 400, "Boton1")
        BotonA.setInteractive()
        BotonA.on('pointerdown', () => this.scene.start("Nivel1") );

        var BotonB = this.add.image(400, 465, "Boton2")
        BotonB.setInteractive()
        BotonB.on('pointerdown', () => this.scene.start("Gameplay") )

        var Credits = this.add.image(80, 585, "Creditos")
        Credits.setInteractive()
        Credits.on("pointerdown", function (pointer)
        {

            if(pointer.leftButtonReleased)
            {
              var MontiMatias =  this.add.image(400, 300, "Creador");     
            }

        var Closed = this.add.image(550, 125, "Close")
            Closed.setInteractive()
            Closed.on("pointerup", function (pointer)
            {
                if(pointer.leftButtonReleased)
                {
                    MontiMatias.destroy();
                    Closed.destroy();
                }

            }, this)

        }, this);

    }    


}