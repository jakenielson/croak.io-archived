import { Scene } from 'phaser';
import UIHelper from '~/games/croak/helpers/UI';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'UIScene'});
  }

  init() {
    this.UIHelper = null;
    this.playScene = null;
  }

  create() {
    this.playScene = this.scene.get('PlayScene');
    this.UIHelper = new UIHelper(this, this.playScene);
    this.playScene.events.on('spawnFrog', () => {
      this.UIHelper.spawnFrog();
    });
    this.playScene.events.on('hop', (nextY) => {
      this.UIHelper.hop(nextY);
    });
    this.playScene.events.on('level_up', () => {
      this.UIHelper.levelUp();
    });
  }

  update() {
    this.UIHelper.update();
  }
}