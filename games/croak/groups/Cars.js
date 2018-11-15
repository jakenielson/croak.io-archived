import 'phaser';
import Car from '~/games/croak/sprites/Car';

export default class Cars extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, rowOffset, numOfRows, carsPerRow) {
    super(world, scene, children, {});
    this.scene = scene;
    this.rowOffset = rowOffset;
    this.numOfRows = numOfRows;
    this.carsPerRow = carsPerRow;
    this.sprites = ['carRed', 'carYellow', 'carBlue', 'truck'];
    this.anims = ['car_red', 'car_yellow', 'car_blue', 'truck'];
    
    this.createCars(scene, rowOffset, numOfRows, carsPerRow);
    this.setCarVelocities(rowOffset, numOfRows);
  }

  createCars(scene, rowOffset, numOfRows, carsPerRow) {
    for (let i = 0; i < numOfRows; i++) {
      const row = i + rowOffset;
      const direction = row % 2 ? 'left' : 'right';

      for (let k = 0; k < carsPerRow; k++) {
        const r = Math.floor(Math.random() * 4);
        const sprite = this.sprites[r];
        const anim = this.anims[r];

        const car = new Car (scene, sprite, anim, row, direction, k);
        this.add(car);
      }
    }
  }

  setCarVelocities(rowOffset, numOfRows) {
    this.getChildren().forEach((child, i) => {
      const direction = child.row % 2 ? -1 : 1;
      const scalar = (rowOffset + numOfRows) - child.row;
      const v = direction * (20 + (scalar * 5));
      child.setVelocityX(v);
    })
  }
}