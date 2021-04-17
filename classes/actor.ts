import { Physics } from 'phaser';


export class Actor extends Physics.Arcade.Sprite {
    protected hp = 100;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        

        // Define actors in scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        
        this.getBody().setCollideWorldBounds(true);
        scene.physics.world.bounds.bottom = 450;
    }
            // Sets damage animations
            public getDamage(value?: number): void {
                this.scene.tweens.add({
                    targets: this,
                    duration: 100,
                    repeat: 3,
                    yoyo: true,
                    alpha: 0.5,
                    onStart: () => {
                        if (value) {
                            this.hp = this.hp - value;
                        }
                    },
                    onComplete: () => {
                        this.setAlpha(1);
                    },
                });
            }

                // Flips character after changing direction
                public checkFlip(): void {
                    if(this.body.velocity.x < 0) {
                        this.scaleX = 1;
                    } else {
                        this.scaleX = -1;
                    }
                }

                public getBody(): Physics.Arcade.Body {
                    return this.body as Physics.Arcade.Body;
                }
}