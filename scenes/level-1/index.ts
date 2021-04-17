import { GameObjects, Scene } from 'phaser';

import { Player } from '../../classes/header';

export class Level1 extends Scene {
    private player!: Player;

    constructor() {
        super('level-1-scene');
    }

    create(): void {
     
        this.player = new Player(this, this.game.canvas.width/2, this.game.canvas.height);
        
    
    }

    update(): void {

        this.player.update();

        if (this.player.getBody().onWall() === true) {
            this.scene.start('outside-scene');
        };

    }

}