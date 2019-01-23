export default class AboutCard {
  constructor(scene) {
    this.scene = scene;
    this.scene.add.existing(this);
    this.rects = [];
    this.rects.push(this.scene.add.rectangle(6, 6, 196, 196, 0xffffff).setOrigin(0,0).setAlpha(0));
    this.rects.push(this.scene.add.rectangle(8, 8, 192, 192, 0x000000).setOrigin(0,0).setAlpha(0));
    const textContent = [
      "THIS IS CROSS OR CROAK,",
      "THE FIRST GAME I MADE",
      "FOR CROAK.IO.",
      "",
      "THIS GAME USES PHASER",
      "TILEMAPS, SPRITES,",
      "ANIMATION, PHYSICS,",
      "OBJECT GROUPS, INPUT,",
      "AND SCENE TRANSITIONS.",
      "",
      "MOVE THE FROG WITH THE",
      "ARROW KEYS OR SWIPE ON",
      "YOUR PHONE SCREEN. GET",
      "THEM ALL ACROSS THE",
      "RIVER TO WIN THE GAME!"
    ];
    this.text = this.scene.add.bitmapText(16, 16, 'font', textContent, 8).setAlpha(0);
  }

  toggle() {
    for (let rect of this.rects) {
      rect.setAlpha(1 - rect.alpha);
    }
    this.text.setAlpha(1 - this.text.alpha);
  }
}