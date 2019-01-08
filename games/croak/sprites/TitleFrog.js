import Phaser from 'phaser';

export default class TitleFrog extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 80, 140, 'frog', 13);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.setFlipX(true);
  }
}