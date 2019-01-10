import Phaser from 'phaser';

export default class TitleFrog extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 216, 140, 'frog', 13);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.setFlipX(true);

    this.direction = 'stop';

    this.totalOptions = 1;
    this.option = 0;

    this.swimming = false;

    this.play(`idle_side`);
  }

  update(cursors) {
    if (this.swimming) this.swimCheck();
    else if (this.direction === 'stop') this.inputCheck(cursors);
    else this.stopCheck();
  }

  inputCheck(cursors) {
    if (this.swimming) return;
    else if (cursors.down.isDown && this.option < this.totalOptions) this.hopDown();
    else if (cursors.up.isDown && this.option != 0) this.hopUp();
    else if (cursors.space.isDown) this.scene.selectOption(this.option);
  }

  stopCheck() {
    if (this.direction === 'up' && this.y < this.targetY) {
      this.direction = 'stop';
      this.y = this.targetY;
      this.setVelocity(0);
    }
    else if (this.direction === 'down' && this.y > this.targetY) {
      this.direction = 'stop';
      this.y = this.targetY;
      this.setVelocity(0);
    }
  }

  hopDown() {
    this.option += 1;
    this.targetY = this.y + 16;
    this.direction = 'down';
    this.setVelocity(0, 64);
    this.play(`jump_down`);
    this.on('animationcomplete', () => {
      this.play(`idle_side`);
      this.removeAllListeners('animationcomplete');
    }, this);
  }

  hopUp() {
    this.option -= 1;
    this.targetY = this.y - 16;
    this.direction = 'up';
    this.setVelocity(0, -64);
    this.play(`jump_up`);
    this.on('animationcomplete', () => {
      this.play(`idle_side`);
      this.removeAllListeners('animationcomplete');
    }, this);
  }

  swimIn() {
    this.swimming = true;
    this.setVelocity(-80, 0);
  }

  swimOut() {
    
  }

  swimCheck() {
    if (this.x <= 80) {
      this.setVelocity(0);
      this.x = 80;
      this.swimming = false;
    }
  }
}