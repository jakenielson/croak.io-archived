import 'phaser';

export default class LilyPads extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, newGame, totalLilies) {
    super(world, scene, children, {});
    this.scene = scene;
    this.totalLilies = totalLilies;

    this.createLilies(newGame, totalLilies);
  }
  
  createLilies(newGame, totalLilies) {
    for (let i = 0; i < totalLilies; i++) {
      const lilyX = 16 + ((7 - totalLilies) * 16) + (i * 32);
      const lilyY = newGame ? - 240 : 0;
      const spriteCrop = 0;
      const lily = this.scene.add.image(lilyX, lilyY, `lilypads`).setOrigin(0, 0).setCrop(spriteCrop, 0, 16, 16);
      this.scene.physics.world.enable(lily);
      lily.body.setSize(16, 16);
      lily.body.setOffset(0, 0);
      this.add(lily);
    }
  }
}