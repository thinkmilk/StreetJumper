import { GameObjects, Scene } from 'phaser';
import { PokePlayer } from '../../classes/header';

export class Outside extends Scene {
    private player!: PokePlayer;

    constructor() {
        super('outside-scene');
    }
    
    create(): void {
        
        this.player = new PokePlayer(this, 636, 406);
        

    }

    update(): void {

        this.player.update();

        if (this.player.getBody().onFloor() === true) {
            this.scene.start('level-1-scene');
        }




    }

}