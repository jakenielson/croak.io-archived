import Phaser from 'phaser';

export default class LifeFrog extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'frog', 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setOrigin(0, 0);
    this.play('idle_down');

    this.direction = 'down';
    this.moving = false;
    this.stoppingPoint = 0;
  }

  update() {
    if (this.moving) this.stopCheck();
  }

  stopCheck() {
    if ((this.direction === 'left' && this.x <= this.stoppingPoint)
    || (this.direction === 'right' && this.x >= this.stoppingPoint)
    || (this.direction === 'up' && this.y <= this.stoppingPoint)) this.stop();
  }

  stop() {
    this.moving = false;
    this.setVelocity(0, 0);
    if (this.direction === 'up') {
      this.setPosition(this.x, this.stoppingPoint);
    } else {
      this.setPosition(this.stoppingPoint, this.y);
    }
  }

  // Frog hops forward into the game area
  // Leverages update() and stop() to get them to stop in the right place
  // Returns a promise so I can do something afterwards if I want
  enterGame() {
    return new Promise((resolve) => {
      this.direction = 'up';
      this.stoppingPoint = this.y - 16;
      this.setVelocity(0, -48);
      this.play('jump_up');
      this.moving = true;
      this.on('animationcomplete', () => {
        this.removeAllListeners('animationcomplete');
        this.stop();
        if (this.x !== 112) {
          this.play('idle_up');
          setTimeout(() => {
            this.direction = 'right';
            this.stoppingPoint = this.x + 16;
            this.setVelocity(48, 0);
            this.setFlipX(true);
            this.play('jump_side');
            this.moving = true;
            this.on('animationcomplete', () => {
              this.removeAllListeners('animationcomplete');
              this.stop();
              this.setFlipX(false);
              this.play('idle_down');
              this.direction = 'down';
              return resolve();
            })
          }, 150);
        } else {
          this.play('idle_down');
          this.direction = 'down';
          return resolve();
        }
      })
    })

  }

  // Frog hops right or left to fill in space
  // Leverages update() and stop() to get them to stop in the right place
  // Returns a promise so I can do something afterwards if I want
  jump(rightOrLeft) {
    return new Promise((resolve) => {
      if (rightOrLeft) {
        this.direction = 'right';
        this.setFlipX(true);
        this.stoppingPoint = this.x + 16;
        this.setVelocity(64, 0);
        this.play('jump_side');
        this.moving = true;
        this.on('animationcomplete', () => {
          this.removeAllListeners('animationcomplete');
          this.stop();
          this.setFlipX(false);
          this.play('idle_down');
          this.direction = 'down';
          return resolve();
        }, this);
      } else {
        this.direction = 'left';
        this.setFlipX(false);
        this.stoppingPoint = this.x - 16;
        this.setVelocity(-64, 0);
        this.play('jump_side');
        this.moving = true;
        this.on('animationcomplete', () => {
          this.removeAllListeners('animationcomplete');
          this.stop();
          this.play('idle_down');
          this.direction = 'down';
          return resolve();
        }, this);
      }
    })
  }
}
