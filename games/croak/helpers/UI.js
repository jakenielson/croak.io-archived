import LifeFrog from '~/games/croak/sprites/LifeFrog';

export default class UIHelper {
  constructor(scene) {
    this.scene = scene;
    this.lifeFrogs = [];
    this.centerFrog = null;
    this.score = 0;
    this.level = 1;
    this.waterline = 192;

    // create ui
    for (let i = 0; i < this.scene.lives; i++) {
      const frog = new LifeFrog(this.scene, 16 + (i * 32), 204);
      this.scene.add.existing(frog);
      this.lifeFrogs.push(frog);
    }
    this.scene.add.rectangle(0, 224, 240, 16, 0x000000).setOrigin(0, 0);
    this.scene.add.rectangle(0, 224, 240, 1, 0xffffff).setOrigin(0, 0);
    this.levelText = this.scene.add.bitmapText(4, 230, 'font', `LEVEL ${this.level}`, 8);
    this.scoreText = this.scene.add.bitmapText(228, 230, 'font', this.score, 8);
  }

  update() {
    if (this.centerFrog) this.centerFrog.update();
    this.lifeFrogs.forEach((frog) => frog.update());
  }

  spawnFrog() {
    if (this.scene.frog) {
      this.scene.frog.destroy();
      this.scene.frog = null;
    }
    if (this.lifeFrogs.length === 0) return;

    const frogIndex = Math.floor((this.lifeFrogs.length - 1) / 2);
    this.centerFrog = this.lifeFrogs.splice(frogIndex, 1)[0];
    this.centerFrog.enterGame().then(() => {
      this.centerFrog.destroy();
      this.centerFrog = null;
      this.scene.spawnFrog();
    });

    for (let i = 0; i < this.lifeFrogs.length; i++) {
      this.lifeFrogs[i].jump(i < frogIndex);
    }
  }

  hop(nextY) {
    if (nextY < this.waterline) {
      this.waterline = nextY;
      this.score += 10;

      const lastWidth = this.scoreText.width;
      this.scoreText.setText(this.score);
      const newWidth = this.scoreText.width;
      console.log(lastWidth);
      console.log(newWidth);
      this.scoreText.setX(this.scoreText.x - (newWidth - lastWidth));
    }
  }
}
