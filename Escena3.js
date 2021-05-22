class Escena3 extends Phaser.Scene {
    constructor()
    {
        super("Gameplay");
    }

    preload()
    {
        this.load.image("ComoJugar", "./assets/Ventana1.png")
        this.load.image("Inicio", "./assets/BotonInicio.png")
    }

    create()
    {
        var Jugabilidad = this.add.image(400, 300, "ComoJugar")

        var Regreso = this.add.image(710, 40, "Inicio")
        Regreso.setInteractive()
        Regreso.on('pointerdown', () => this.scene.start("Inicio") )
    }
}