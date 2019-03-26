import { Scene } from 'phaser';
import UIHelper from '~/games/croak/helpers/UI';

export default class UIScene extends Scene {
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
    this.playScene.events.on('home_frog', () => {
      this.UIHelper.homeFrog();
    });
  }

  update() {
    if (this.UIHelper) this.UIHelper.update();
  }
}