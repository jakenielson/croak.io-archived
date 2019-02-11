import Phaser from 'phaser';

export default class LifeFrog extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'frog', 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.play('idle_down');
  }
}