import Phaser from 'phaser';

export default class TitleTurtle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, index, text) {
    super(scene, 208, 144 + (index * 16), 'turtle', 0);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setOrigin(0, 0);

    this.swimming = false;
    this.leaving = false;

    this.text = this.scene.add.bitmapText(208 + 32, 142 + (index * 16), 'outlineFont', text, 8);
    this.textShadow = this.scene.add.ellipse(208 + 32, 154 + (index * 16), 40, 4, 0x000000, 170).setOrigin(0, 0);
  }

  swimIn() {
    this.swimming = true;
    this.setVelocity(-80, 0);
  }

  swimOut() {
    this.leaving = true;
    this.setVelocity(-80, 0);
  }

  stopCheck() {
    if (this.x <= 52) {
      this.setVelocity(0);
      this.x = 52;
      this.swimming = false;
    }
  }

  update() {
    if (this.swimming || this.leaving) {
      this.text.x = this.x + 32;
      this.textShadow.x = this.x + 32;
      if (this.swimming) this.stopCheck();
    }
  }
}