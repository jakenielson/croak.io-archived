import { Scene } from 'phaser';

export default class OverScene extends Scene {
  constructor () {
    super({ key: 'OverScene'});
  }

  init() {
  }

  create() {
    this.add.rectangle(0, 0, 240, 240, 0x000000).setOrigin(0, 0).setDepth(9999);
    // this.add.bitmapText(48, 104, 'font', 'GAME OVER', 16).setDepth(9999);
    this.add.bitmapText(48, 40, 'font', 'GAME OVER', 16).setDepth(9999);
    this.add.bitmapText(48, 104, 'outlineFont', 'Continue?', 16).setDepth(9999);
    this.add.bitmapText(126, 160, 'font', 'YES', 16).setDepth(9999);
    this.add.bitmapText(128, 184, 'font', 'NO', 16).setDepth(9999);
    this.chevron = this.add.bitmapText(98, 156, 'outlineFont', '>', 16).setDepth(9999);
    this.option = 0;
    this.lockedInput = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);
  }

  onResize(width, height) {
    if (this.cameras.main) {
      if (width === undefined) {
        width = this.sys.game.config.width;
      }
      if (height === undefined) {
        height = this.sys.game.config.height;
      } 
      this.setCamera(width);
    }
  }

  setCamera(size) {
    if (this.cameras.main) {
      this.cameras.main.setZoom(size / 240);
      this.cameras.main.setOrigin(0, 0);
      this.cameras.main.setPosition(0, 0);
      this.cameras.main.setSize(size);
    }
  }

  changeOption() {
    this.option = Math.abs(this.option - 1);

    const newY = this.chevron.y += (this.option * 48) - 24;

    this.chevron.setY(newY);

    this.lockedInput = true;
  }

  selectOption() {
    if (this.option === 0) {
      this.scene.start('PlayScene');
    } else {
      this.scene.start('TitleScene');
    } this.lockedInput = true;
  }

  update() {
    if (this.cursors.up.isDown || this.cursors.down.isDown) {
      if (!this.lockedInput) {
        this.changeOption();
      }
    } else if (this.cursors.space.isDown) {
      if (!this.lockedInput) {
        this.selectOption();
      }
    } else if (this.lockedInput = true) {
      this.lockedInput = false;
    }
  }
}