import Phaser from 'phaser';

export default class Car extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, sprite, anim, row, direction, order) {
    const y = (row * 16) + 2;
    const x = direction === 'left' ? 90 + (order * 120) : (order * -120) - 10;
    super(scene, x, y, sprite, 0);

    this.scene = scene;
    this.direction = direction;
    this.row = row;
    this.order = order;
    this.setDepth(2);

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    const bodyWidth = sprite === 'truck' ? 40 : 24;
    this.body.setSize(bodyWidth, 16);
    this.body.setOffset(4, 10);

    if (direction === 'right') {
      this.flipX = true;
    }

    this.play(anim);
  }

  update() {
    if (this.direction === 'left' && this.x < -40) {
      this.setPosition(240, this.y);
    } else if (this.direction === 'right' && this.x > 240) {
      this.setPosition(-40, this.y);
    }
  }
}