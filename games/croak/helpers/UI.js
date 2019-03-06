import LifeFrog from '~/games/croak/sprites/LifeFrog';

export default class UIHelper {
  constructor(uiScene, playScene) {
    this.uiScene = uiScene;
    this.playScene = playScene;
    this.lifeFrogs = [];
    this.centerFrog = null;
    this.score = 0;
    this.level = 1;
    this.waterline = 192;
    this.dropCounter = 0;
    this.dropThresh = 40;
    this.dropLock = false;

    // create ui
    for (let i = 0; i < this.playScene.lives; i++) {
      const frog = new LifeFrog(this.playScene, 16 + (i * 32), 204);
      this.playScene.add.existing(frog);
      this.lifeFrogs.push(frog);
    }
    this.playScene.add.rectangle(0, 224, 240, 16, 0x000000).setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    this.playScene.add.rectangle(0, 224, 240, 1, 0xffffff).setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    this.levelText = this.playScene.add.bitmapText(4, 230, 'font', `LEVEL ${this.level}`, 8).setScrollFactor(0).setDepth(100);
    this.scoreText = this.playScene.add.bitmapText(228, 230, 'font', this.score, 8).setScrollFactor(0).setDepth(100);
  }

  update() {
    if (this.centerFrog) this.centerFrog.update();
    this.lifeFrogs.forEach((frog) => frog.update());
    
    if (this.dropCounter >= this.dropThresh) {
      this.dropCounter = 0;
      if (this.score > 0) {
        this.score -= 10;
        this.updateScore();
      }
    } else if (!this.dropLock) {
      this.dropCounter += 1;
    }
  }

  spawnFrog() {
    this.dropLock = true;
    this.dropCounter = 0;

    if (this.playScene.frog) {
      this.playScene.frog.destroy();
      this.playScene.frog = null;
    }
    if (this.lifeFrogs.length === 0) {
      this.playScene.goToNextLevel();
      return;
    }

    const frogIndex = Math.floor((this.lifeFrogs.length - 1) / 2);
    this.centerFrog = this.lifeFrogs.splice(frogIndex, 1)[0];
    this.centerFrog.enterGame().then(() => {
      this.centerFrog.destroy();
      this.centerFrog = null;
      this.playScene.spawnFrog();
    });

    for (let i = 0; i < this.lifeFrogs.length; i++) {
      this.lifeFrogs[i].jump(i < frogIndex);
    }

    this.waterline = 192;
  }

  updateScore() {
    const lastWidth = this.scoreText.width;
    this.scoreText.setText(this.score);
    const newWidth = this.scoreText.width;
    this.scoreText.setX(this.scoreText.x - (newWidth - lastWidth));
  }

  hop(nextY) {
    if (this.dropLock) this.dropLock = false;
    if (nextY < this.waterline) {
      this.waterline = nextY;
      this.score += 100;
      this.dropCounter = 0;
      this.updateScore();
    }
  }

  levelUp() {
    this.level += 1;
    this.levelText.setText(`LEVEL ${this.level}`);
  }
}
