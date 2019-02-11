import LifeFrog from '~/games/croak/sprites/LifeFrog';

export default class UIHelper {
  constructor(scene) {
    this.scene = scene;
    this.livesIcons = [];

    // create ui
    for (let i = 0; i < this.scene.lives; i++) {
      // const icon = new Phaser.GameObjects.Image(this.scene, 24 + i * 32, 232, 'frog', 0);
      const frog = new LifeFrog(this.scene, 16 + (i * 32), 220);
      this.scene.add.existing(frog);
      this.livesIcons.push(frog);
    }
  }

  onDeath() {
    const l = this.livesIcons.pop();
      if (l) l.destroy();
      else this.scene.gameOver();
  }
}