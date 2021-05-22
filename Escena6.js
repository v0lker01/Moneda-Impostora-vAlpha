class Escena6 extends Phaser.Scene {
    constructor()
    {
        super("Ganador");
    }

    preload()
    {
        this.load.image("Ganaste", "./assets/Ganaste!.png");
        this.load.image("Inicio", "./assets/BotonInicio.png");

        this.load.audio("Win", "./sound/Win.mp3");
    }

    create()
    {
        var Win = this.add.image(400, 300, "Ganaste");

        var Regreso = this.add.image(710, 40, "Inicio")
        Regreso.setInteractive()
        Regreso.on('pointerdown', () => this.scene.start("Inicio") )

        var Musica = this.sound.add("Win");
        Musica.play();
    }

}