import Phaser from 'phaser';

export default class Frog extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'frog', 0);

    this.scene = scene;
    this.moving = false;
    this.dead = false;

    this.direction = 'up';
    this.startX = x;
    this.startY = y;

    this.nextTile = [];
    this.willTriggerTile = false;

    this.setDepth(1);
    this.setOrigin(0, 0.25);

    this.scene.physics.world.enable(this);
    this.body.setOffset(0, 4);
    this.scene.add.existing(this);

    this.play('idle_down');
  }

  // called once per frame
  update(cursors) {
    if (this.body.x < 0 || this.x + 16 > this.scene.physics.world.bounds.width) this.die();
    if (!this.dead) {
      if (this.moving) {
        this.stopCheck();
      } else if (this.willTriggerTile) {
        this.willTriggerTile = false;
        this.scene.triggerTile()
      } else {
        this.hopCheck(cursors);
      }
    }
  }

  // check if the player hit a hop button
  hopCheck(cursors) {
    if (cursors.up.isDown && ((this.y) > this.scene.physics.world.bounds.y)) this.hop([0, -64], 'up');
    else if (cursors.down.isDown && ((this.y + 16) < (this.scene.physics.world.bounds.y + this.scene.physics.world.bounds.height))) this.hop([0, 64], 'down');
    else if (cursors.left.isDown && ((this.x) > this.scene.physics.world.bounds.x)) this.hop([-64, 0], 'left');
    else if (cursors.right.isDown && ((this.x + 16) < (this.scene.physics.world.bounds.x + this.scene.physics.world.bounds.width))) this.hop([64, 0], 'right');
  }

  // check if the frog should stop moving
  stopCheck() {
    if ((this.direction === 'up' && [this.y] <= this.nextTile[1] + 1)
    || (this.direction === 'down' && this.y >= this.nextTile[1] - 1)
    || (this.direction === 'left' && this.x <= this.nextTile[0] + 1)
    || (this.direction === 'right' && this.x >= this.nextTile[0] - 1)) this.stop();
  }

  // hop to a tile
  hop(velocity, direction) {
    this.direction = direction;
    const x = this.x + (Math.sign(velocity[0]) * 16);
    const y = this.y + (Math.sign(velocity[1]) * 16);
    let snapX = x % 16;
    let snapY = y % 16;
    const snapCheck = this.snapCheck(x, y);
    snapX = snapCheck ? snapX > 8 ? snapX - 16 : snapX : 0;
    snapY = snapCheck ? snapY > 8 ? snapY - 16 : snapY : 0;
    velocity[0] -= snapX * 5;
    velocity[1] -= snapY * 5;
    this.moving = true;
    this.setVelocity(0, 0);
    let nextX = x - snapX;
    let nextY = y - snapY;
    this.nextTile = [nextX, nextY];
    this.setVelocity(...velocity);
    if (direction === 'right') this.setFlipX(true);
    else this.setFlipX(false);
    let animSuff;
    if (direction === 'right' || direction === 'left') animSuff = 'side';
    else animSuff = direction;
    this.play(`jump_${animSuff}`);
    this.on('animationcomplete', () => {
      this.play(`idle_${animSuff}`);
      this.removeAllListeners('animationcomplete');
    }, this);
  }

  // stop the frog
  stop() {
    this.moving = false;
    this.setVelocity(0, 0);
    this.setPosition(...this.nextTile);
    this.nextTile = [];
    this.willTriggerTile = true;
  }

  // check if the frog should snap to the grid
  snapCheck(x, y) {
    const tileX = Math.round(x / 16);
    const tileY = Math.round(y / 16);
    const tile = this.scene.mapLayers.ground.data.getTileAt(tileX, tileY);
    if (tile) return true;
    return false;
  }

  // commit die
  die() {
    if (!this.dead) {
      this.dead = true;
      this.moving = false;
      this.setDepth(99);
      this.setVelocity(0);
      this.on('animationstart', () => {
        this.setFlipX(false);
      }, this);
      this.play('die');
      this.on('animationcomplete', this.reset, this);
    }
  }

  // respawn the frog
  reset() {
    this.scene.spawnFrog();
  }
}