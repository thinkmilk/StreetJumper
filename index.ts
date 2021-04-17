console.log("is there anybody out there?")

import { Game, Types } from 'phaser';
import { WEBGL } from "phaser";
import { Level1, LoadingScene, Outside } from './scenes';




const gameConfig: Types.Core.GameConfig = {
        title: 'StreetJumper',
    type: Phaser.WEBGL,
    parent: 'game',
    scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: 1280,
    height: 630
    },
    backgroundColor: '#351f1b',
    physics:{ 
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    render: { 
    antialiasGL: false,
    pixelArt: true
    },
//    callbacks: {
//        postBoot: () => {
//            game: sizeChanged()
//            },
//    },
    canvasStyle: `display: block; width: 100%; height: 50%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene, Level1, Outside],
};


/*
function sizeChanged(){
    if (game.isBooted) {
    setTimeout(() => {


        game.scale.resize(window.innerWidth, window.innerHeight);
        //gameConfig.zoom = (window.innerHeight / window.innerWidth);
            game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,);
                }, 100);
    }

};


window.addEventListener('resize', function () {
    gameConfig.callbacks;   
    return sizeChanged();
});
*/

let game = new Game(gameConfig);


console.log("this is another message for all the haters...");
