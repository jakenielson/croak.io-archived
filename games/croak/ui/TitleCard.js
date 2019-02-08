export default class TitleCard {
  constructor(scene) {
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.add.rectangle(62, 22, 116, 100, 0xffffff).setOrigin(0, 0);
    this.scene.add.rectangle(64, 24, 112, 96, 0x000000).setOrigin(0, 0);
    this.scene.add.bitmapText(80, 40, 'font', 'CROSS', 16);
    this.scene.add.bitmapText(112, 68, 'font', 'OR', 8);
    this.scene.add.bitmapText(80, 88, 'font', 'CROAK', 16);
  }
}