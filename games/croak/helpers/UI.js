export default class UIHelper {
  constructor(scene) {
    this.scene = scene;
    this.livesIcons = [];

    // create ui
    for (let i = 0; i < this.scene.lives; i++) {
      const icon = new Phaser.GameObjects.Image(this.scene, 8 + i * 16, 200, 'frog', 0);
      this.scene.add.existing(icon);
      this.livesIcons.push(icon);
    }
  }

  onDeath() {
    const l = this.livesIcons.pop();
      if (l) l.destroy();
      else this.scene.gameOver();
  }
}