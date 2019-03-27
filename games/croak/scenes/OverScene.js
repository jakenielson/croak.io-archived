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
    this.add.bitmapText(126, 160, 'font', 'YES', 16)
      .setDepth(9999)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.option != 0) {
          this.changeOption()
        } setTimeout(() => {
          this.selectOption();
        }, 100);
      });
    this.add.bitmapText(128, 184, 'font', 'NO', 16)
      .setDepth(9999)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.option != 1) {
          this.changeOption()
        } setTimeout(() => {
          this.selectOption();
        }, 100);
      });
    this.chevron = this.add.bitmapText(98, 156, 'outlineFont', '>', 16).setDepth(9999);
    this.option = 0;
    this.lockedInput = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);
    // this.input.on('pointerup', (event, target) => {
    //   const xDiff = event.upX - event.downX;
    //   const yDiff = event.upY - event.downY;
    //   const time = event.upTime - event.downTime;

    //   if (time < 1000) {
    //     if ((xDiff <= 5 && xDiff >= -5) && (yDiff <= 5 && yDiff >= -5)) {
    //       this.selectOption();
    //     } else if (yDiff >= 10 || yDiff <= -10) {
    //       this.changeOption();
    //     }
    //   }
    // });
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

  transitionOut() {
    this.rect.setAlpha(this.rect.alpha + 0.08 > 1 ? 1 : this.rect.alpha + 0.08);
  }

  toGame() {
    this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000)
      .setOrigin(0, 0).setAlpha(0.01).setDepth(99999);
    this.scene.transition({
      target: 'PlayScene',
      duration: 500,
      moveBelow: true,
      allowInput: false,
      onUpdate: this.transitionOut
    });
    this.scene.setVisible(0, 'PlayScene');
  }

  selectOption() {
    if (this.option === 0) {
      this.toGame();
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