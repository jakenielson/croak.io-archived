import Phaser from 'phaser';

export default class Log extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, row, order) {
    const y = (row * 16) + 8;
    const x = (order * -140) - 10 - (row * 16);
    super(scene, x, y, 'log', 0);

    this.scene = scene;
    this.row = row;
    this.order = order;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setVelocityX(30 - ((row - 1) * 2));
  }

  update() {
    if (this.x > 292) {
      this.setPosition(-40, this.y);
    }
  }
}