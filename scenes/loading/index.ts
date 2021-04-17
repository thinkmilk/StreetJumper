import { Game, GameObjects, Scene } from 'phaser';
import { Alex } from '../../classes/header';


export class LoadingScene extends Scene {
    private zangief!: GameObjects.Sprite;
    private alex!: GameObjects.Sprite;
    
    constructor() {
        super('loading-scene');
    }

    preload(): void {
        this.load.baseURL = 'assets/';

        // Alex Sprites 
        this.load.spritesheet('alex','./alex/alexIdle.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 11 });
        
        this.load.spritesheet('alexWalk','./alex/alexWalk.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 13,
        });

        this.load.spritesheet('alexJump','./alex/alexJump.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 21
        });

        this.load.spritesheet('alexSwing','./alex/alexSwing.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 6
        });

        this.load.spritesheet('alexKick','./alex/alexKick-0.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 14
        });

        this.load.spritesheet('alexAir','./alex/alexAir.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 3 });

        this.load.spritesheet('alexDash', './alex/alexDash.png', {
            frameWidth: 288,
            frameHeight: 213,
            startFrame: 0,
            endFrame: 8
        });
        

    }


    create(): void {
        console.log('Loading scene was created');

        
        
        Alex.animations.filter(frame => {
            this.anims.create({
                key: frame.key,
                frames: this.anims.generateFrameNumbers((`${frame.key}`), {
                    start: frame.start,
                    end: frame.end,
                }),
                frameRate: 15,
                repeat: -1,
                yoyo: false
            });
        });




        // Load into first level
        this.scene.start('level-1-scene');
    }
}