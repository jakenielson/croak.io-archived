export default class AboutCard {
  constructor(scene) {
    this.scene = scene;
    this.scene.add.existing(this);
    this.rects = [];
    this.rects.push(this.scene.add.rectangle(6, 6, 228, 228, 0xffffff).setOrigin(0,0).setAlpha(0));
    this.rects.push(this.scene.add.rectangle(8, 8, 224, 224, 0x000000).setOrigin(0,0).setAlpha(0));
    const textContent = [
      "THIS IS CROSS OR CROAK,",
      "MY FIRST GAME ON CROAK.IO!",
      "",
      "IN MAKING THIS GAME, I",
      "TOUCHED A LOT OF THE BASIC",
      "FEATURES OF PHASER -",
      "SCENES, TILEMAPS, SPRITES,",
      "OBJECT GROUPS, PHYSICS,",
      "INPUT, AND ANIMATION.",
      "",
      "I RAN INTO SOME SMALL",
      "CHALLENGES ALONG THE WAY,",
      "LIKE POLISHING UP THE GRID",
      "BASED MOVEMENT, SHOWING",
      "POINTS AND LIVES TO THE",
      "PLAYER, AND THIS TITLE",
      "SCREEN. YOU CAN READ MORE",
      "ABOUT IT IN MY BLOG!"
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