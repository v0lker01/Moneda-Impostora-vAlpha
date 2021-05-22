class Escena7 extends Phaser.Scene {
    constructor()
    {
        super("Loser");
    }

    preload()
    {
        this.load.image("Perdedor", "./assets/Perdedor.png")
        this.load.image("NewGame", "./assets/NewGame.png")

        this.load.audio("Lose", "./sound/Lose.mp3")
    }

    create()
    {
        var Perdiste = this.add.image(400, 300, "Perdedor")

        var NuevoJuego = this.add.image(400, 400, "NewGame")
        NuevoJuego.setInteractive()
        NuevoJuego.on('pointerdown', () => this.scene.start("Nivel1") );

        var Defeat = this.sound.add("Lose");
        Defeat.play();
    }
}
