import Phaser from 'phaser';

export default class Turtle extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, row, group, order) {
    const y = (row * 16) + 8;
    const x = 292 + ((row - 2) * 50) + (group * 120) + (order * 24);
    super(scene, x, y, 'turtle', 0);

    this.scene = scene;
    this.row = row;
    this.order = order;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setVelocityX(-20 - ((row - 2) * 2));

    this.play('turtle_float')
  }

  update() {
    if (this.x < -24) {
      this.setPosition(292, this.y);
    }
  }
}