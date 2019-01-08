import { Scene, GameObjects } from 'phaser';
import TitleCard from '~/games/croak/ui/TitleCard';
import TitleTurtle from '~/games/croak/sprites/TitleTurtle';
import TitleFrog from '~/games/croak/sprites/TitleFrog';

export default class TitleScene extends Scene {
  constructor () {
    super({ key: 'TitleScene' });
  }

  init () {
    this.map = null;
    this.tiles = null;

    this.titleCard = null;
    this.turtles = [];
    this.frog = null;
    this.options = [];
    this.optionShadows = [];
    this.selected = null;

    this.cursors = null;
  }

  create () {
    this.physics.world.setBounds(0, 0, 208, 208);
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);

    this.map = this.make.tilemap({ key: 'titleMap' });
    this.tiles = this.map.addTilesetImage('mortTiles');
    this.map.createStaticLayer('Tile Layer 1', this.tiles, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.titleCard = new TitleCard(this);

    this.options.push(this.add.bitmapText(102, 142, 'outlineFont', 'START', 8));
    this.options.push(this.add.bitmapText(102, 158, 'outlineFont', 'ABOUT', 8));
    this.add.ellipse(102, 154, 40, 4, 0x000000, 170).setOrigin(0, 0);
    this.add.ellipse(102, 170, 40, 4, 0x000000, 170).setOrigin(0, 0);

    this.turtles.push(new TitleTurtle(this, 0));
    this.turtles.push(new TitleTurtle(this, 1));
    this.frog = new TitleFrog(this);
  }

  // triggered when the game resizes
  onResize(width, height) {
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    } 
    this.setCamera(width);
  }

  // sets the size of the camera
  setCamera(size) {
    this.cameras.main.setZoom(size / 208);
    this.cameras.main.setOrigin(0, 0);
    this.cameras.main.setPosition(0, 0);
    this.cameras.main.setSize(size);
  }
}