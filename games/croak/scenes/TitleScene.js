import { Scene, GameObjects } from 'phaser';
import TitleCard from '~/games/croak/ui/TitleCard';
import TitleTurtle from '~/games/croak/sprites/TitleTurtle';
import TitleFrog from '~/games/croak/sprites/TitleFrog';

export default class TitleScene extends Scene {
  constructor () {
    super({ key: 'TitleScene' });
  }

  init () {
    this.rect = null;
    this.icon = null;

    this.map = null;
    this.tiles = null;

    this.titleCard = null;
    this.turtles = [];
    this.frog = null;
    this.options = [];
    this.optionShadows = [];
    this.selected = null;

    this.cursors = null;

    this.splashState = 'Hidden';
  }

  create () {
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);
    this.splash();
  }


  splash() {
    this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x92d63b).setOrigin(0, 0);
    this.icon = this.add.image(104, 104, 'splashScreen').setScale(2).setAlpha(0.01);
    this.splashState = 'FadeIn';
  }

  title() {
    this.rect.destroy(true);
    this.icon.destroy(true);

    this.map = this.make.tilemap({ key: 'titleMap' });
    this.tiles = this.map.addTilesetImage('mortTiles');
    this.map.createStaticLayer('Tile Layer 1', this.tiles, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.titleCard = new TitleCard(this);

    this.turtles.push(new TitleTurtle(this, 0, 'START'));
    this.turtles.push(new TitleTurtle(this, 1, 'ABOUT'));
    this.frog = new TitleFrog(this);

    this.swimIn();
  }

  swimIn() {
    this.turtles.forEach(turtle => turtle.swimIn());
    this.frog.swimIn();
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

  selectOption(option) {
    this.events.destroy();
    this.scene.start('PlayScene');
  }

  splashFadeIn() {
    if (this.icon.alpha < 1) this.icon.setAlpha(this.icon.alpha + 0.03 > 1 ? 1 : this.icon.alpha + 0.03);
    else {
      this.splashState = 'Show';
      setTimeout(() => {
        this.splashState = 'FadeOut'
      }, 1000);
    }
  }

  splashFadeOut() {
    if (this.icon.alpha > 0.01) this.icon.setAlpha(this.icon.alpha - 0.03 < 0.01 ? 0.01 : this.icon.alpha - 0.03);
    else {
      this.splashState = 'Hidden';
      setTimeout(() => {
        this.title();
      }, 500);
    }
  }

  update() {
    if (this.splashState === 'FadeIn') this.splashFadeIn();
    else if (this.splashState === 'FadeOut') this.splashFadeOut();
    if (this.frog) this.frog.update(this.cursors);
    this.turtles.forEach(turtle => turtle.update());
  }
}