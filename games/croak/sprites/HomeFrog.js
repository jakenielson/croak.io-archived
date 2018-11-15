import Phaser from 'phaser';

export default class HomeFrog extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'frog', 1);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.play('home_frog');
    this.on('animationcomplete', () => {
      this.setFrame(4);
      this.removeAllListeners('animationcomplete');
    }, this);
  }
}