import Phaser from 'phaser';
import BootScene from '~/games/croak/scenes/BootScene';
import TitleScene from '~/games/croak/scenes/TitleScene';
import PlayScene from '~/games/croak/scenes/PlayScene';
import UIScene from '~/games/croak/scenes/UIScene';
import OverScene from '~/games/croak/scenes/OverScene';

class Game extends Phaser.Game {
    constructor(config, height, width) {
      super({...config, height, width, type: Phaser.AUTO, scene: [BootScene, TitleScene, PlayScene, UIScene, OverScene]});
    }
}

export default Game;
