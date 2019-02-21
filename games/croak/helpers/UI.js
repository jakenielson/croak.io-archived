import LifeFrog from '~/games/croak/sprites/LifeFrog';

export default class UIHelper {
  constructor(scene) {
    this.scene = scene;
    this.lifeFrogs = [];
    this.centerFrog = null;

    // create ui
    for (let i = 0; i < this.scene.lives; i++) {
      // const icon = new Phaser.GameObjects.Image(this.scene, 24 + i * 32, 232, 'frog', 0);
      const frog = new LifeFrog(this.scene, 16 + (i * 32), 204);
      this.scene.add.existing(frog);
      this.lifeFrogs.push(frog);
    }
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
    // Find the center frog
    const frogIndex = Math.floor((this.lifeFrogs.length - 1) / 2);
    this.centerFrog = this.lifeFrogs.splice(frogIndex, 1)[0];
    // Center frog hops upwards into position (create method in LifeFrog for this)
    // Destroy the center frog when it gets into position (part of method mentioned previously)
    // When the frog is destroyed, spawn the player in its place
    this.centerFrog.enterGame().then(() => {
      this.centerFrog.destroy();
      this.centerFrog = null;
      this.scene.spawnFrog();
    });
    // At the same time, other frogs fill in the gap (create another method in LifeFrog for this)
    // Determine which side has more frogs
    // If they are equal, favor the right side
    // const rightOrLeft = !!(this.lifeFrogs.length % 2);
    // for (let i = rightOrLeft ? 0 : frogIndex; rightOrLeft ? i < frogIndex : i < this.lifeFrogs.length; i++) {
    //   this.lifeFrogs[i].jump(rightOrLeft);
    // }

    for (let i = 0; i < this.lifeFrogs.length; i++) {
      this.lifeFrogs[i].jump(i < frogIndex);
    }
  }
} 

// Determine center frog
// Anything above the center frog moves one space left
// Anything below the center frog moves one space right
// Center frog checks if it's centered. 
// If not, it hops to the center before spawning.