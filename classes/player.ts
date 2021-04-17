import { Vector } from 'matter';
import { Actor } from './header';



export class Player extends Actor {
    // Declare movement keys as keyboard objects in scene
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keySpacebar: Phaser.Input.Keyboard.Key;
    private keyShift: Phaser.Input.Keyboard.Key;
    private keyJ: Phaser.Input.Keyboard.Key;
    private keyK: Phaser.Input.Keyboard.Key;
    private keyL: Phaser.Input.Keyboard.Key;

    public zero = Phaser.Math.Vector2.ZERO;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'Alex');


        // Define keyboard movement keys
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.keySpacebar = this.scene.input.keyboard.addKey('SPACE');
        this.keyShift = this.scene.input.keyboard.addKey('SHIFT');
        this.keyJ = this.scene.input.keyboard.addKey('J');
        this.keyK = this.scene.input.keyboard.addKey('K');
        this.keyL = this.scene.input.keyboard.addKey('L');

        // Sets character hitboxes
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
        this.setState('grounded');
    }

    create(): void {

        


    }
    

    update(): void {

        this.getBody().setGravityY(1100);
        
        const jump = (originX: number,originY: number) => {
            
            this.setState('jumping');

            this.body.velocity.y = -800;

            const point = originY;
            
        };
         
        const kick = () => {
            this.setState('attacking');
            this.anims.play({key: 'alexKick', repeat: 0})
        };

        const punch = () => {
            this.setState('attacking');
            this.anims.play({key: 'alexSwing', repeat: 0});
        }


        const dash = (key: string) => {
            this.setState('dashing');

            this.anims.play({ key: 'alexDash', repeat: 0 });

            if (key === 'D') {
               
                this.body.velocity.x += 5000;
            }
            if (key === 'A') {
                
                this.body.velocity.x -= 5000;
            }

        }
        
        // Set regular velocity at 0 if player is in "grounded" state,
        // if the player is in a "jumping" state, there is gravity on the physics body
        // and will play the ending of the "alexJump" animation on impact
        
        if (this.state === 'jumping') {
            this.keySpacebar.shutdown;
            //console.log('jumping');
            
            if (this.state === 'jumping' && this.anims.currentFrame.index === 12) {
                this.anims.play('alexAir');
            } 
            if (this.body.velocity.y === 0) {
                this.state = 'grounded';
                this.play({key: 'alexJump', startFrame: 12,
                frameRate: 30}).stopAfterRepeat(0);
            }
            if (this.anims.currentAnim.key === 'alex' || this.anims.currentAnim.key === 'alexWalk') {
                this.anims.play('alexAir');

            }
        }

        if (this.state === 'grounded') {
            this.getBody().setVelocity(0);
            //console.log('grounded');
        }

        if (this.state === 'attacking') {
            if (this.body.velocity.y === 0 && (this.anims.currentAnim.key === 'alexWalk' || this.anims.currentAnim.key === 'alex')) {
                this.state = 'grounded';
            }
            //console.log('attacking');

            if ((this.anims.currentAnim.key === 'alexSwing' && this.anims.currentFrame.isLast) || (this.anims.currentAnim.key === 'alexKick' && this.anims.currentFrame.isLast)) {
                if (this.body.velocity.y === 0) {
                console.log('attack animation finished..now grounded');
    
                this.state = 'grounded';
                }
                if (this.body.velocity.y !== 0) {
                    this.state = 'jumping';
                    console.log('attack animation finished..now jumping');
                }
            }
        }

        if (this.state === 'dashing' && this.anims.currentFrame.isLast) {
            //console.log('finished dashing');
            this.state = 'grounded';
        }

        // While defined keys are pressed,
        // player performs a specific action

        // 'S' and 'W' keys are not set to movements in platformer mode
        /*
        if (this.keyW?.isDown) {
            this.body.velocity.y = -110;
        }*/

        if (this.keyJ?.isDown) {
            if (this.state !== 'attacking') {
                punch();
            }
        }


        if (this.keyK?.isDown) {
            if (this.state !== 'attacking') {
            kick();
            }
        }

        if (this.keyD?.isDown) {
            this.body.velocity.x = 150;
            this.checkFlip();
            // When rotating the character, rendering point 
            // of physical model also moves
            this.getBody().setOffset(15, 15);

                // Dash key config right
                if (this.state !== 'dashing' && this.keyShift?.isDown) {
                    if (this.state === 'grounded') {
                            dash('D');
                    
                    }
                }
        }

        if (this.keyA?.isDown) {
            this.body.velocity.x = -150;
            this.checkFlip();
            // physical model must move, same as above
            this.getBody().setOffset(48, 15);

                // Dash key config left
                if (this.state !== 'dashing' && this.keyShift?.isDown) {
                    if (this.state === 'grounded') {
                            dash('A');
                    
                    }
                }
        }

        if (this.keySpacebar?.isDown) {

            if (this.body.velocity.y === 0 && this.state === 'grounded') {
        // While the player is in the "jumping" state, the jump function cannot be accessed

                const originX = this.getBody().x;
                const originY = this.getBody().y;

                jump(originX,originY);

                this.play('alexJump').stopAfterDelay(766.3333333333);
            }
        }
        
        
        if (this.body.velocity.equals(this.zero) && this.state === 'grounded') {
            if (this.anims.isPlaying === false) {

                this.anims.play('alex');

            } else if (this.anims.currentAnim.key !== 'alex' && this.anims.currentAnim.key !== 'alexJump') {

                this.anims.play('alex'); 

            }
            if (this.anims.currentAnim.key === 'alexJump') {  

                this.anims.chain('alex'); 

            }
        }
        
        if (this.body.velocity.x !== 0) {

            if (this.keyD.isDown || this.keyA.isDown) {

                if (this.anims.currentAnim.key === 'alex') {

                this.anims.play('alexWalk');

                } else if (this.anims.currentAnim.key === 'alexJump') { 

                    return; 

                } else if (this.state === 'grounded') { 
                    //console.log('chained');
                    this.anims.playAfterRepeat({key:'alexWalk',repeat: 0}); 
                }

            }

        }
        
    }
}