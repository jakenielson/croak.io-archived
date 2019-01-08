import Phaser from 'phaser';

export default class TitleTurtle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, index) {
    super(scene, 72, 144 + (index * 16), 'turtle', 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
  }
}