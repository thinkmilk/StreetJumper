import { Vector } from 'matter';
import { Actor } from './header';

export class PokePlayer extends Actor {
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keyI: Phaser.Input.Keyboard.Key;
    private keyJ: Phaser.Input.Keyboard.Key;
    private keyShift: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'Alex');

        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.keyI = this.scene.input.keyboard.addKey('I');
        this.keyJ = this.scene.input.keyboard.addKey('J');
        this.keyShift = this.scene.input.keyboard.addKey('SHIFT');

        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
    }

    create(): void {

        


    }


    update(): void {

        this.getBody().setVelocity(0);
        

        if (this.keyW?.isDown) {
            this.body.velocity.y = -200;
        }

        if (this.keyA?.isDown) {
            this.body.velocity.x = -200;
            this.checkFlip();
            this.getBody().setOffset(48, 15);
        }

        if (this.keyS?.isDown) {
            this.body.velocity.y = 200;
        }

        if (this.keyD?.isDown) {
            this.body.velocity.x = 200;
            this.checkFlip();
            this.getBody().setOffset(15, 15);
        }

        if (this.anims.isPlaying === false) {
            this.anims.startAnimation('alex');
        }

    }
}
