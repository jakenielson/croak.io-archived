export default class TitleCard {
  constructor(scene) {
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.add.rectangle(46, 14, 116, 100, 0xffffff).setOrigin(0, 0);
    this.scene.add.rectangle(48, 16, 112, 96, 0x000000).setOrigin(0, 0);
    this.scene.add.bitmapText(64, 32, 'font', 'CROSS', 16);
    this.scene.add.bitmapText(96, 60, 'font', 'OR', 8);
    this.scene.add.bitmapText(64, 80, 'font', 'CROAK', 16);
  }
}