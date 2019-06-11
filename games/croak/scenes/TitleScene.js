import { Scene, GameObjects } from 'phaser';
import TitleCard from '~/games/croak/ui/TitleCard';
import TitleTurtle from '~/games/croak/sprites/TitleTurtle';
import TitleFrog from '~/games/croak/sprites/TitleFrog';
import AboutCard from '~/games/croak/ui/AboutCard';

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
    this.aboutCard = null;
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
    this.scale.on('resize', this.onResize, this);
    this.splash();
  }

  splash() {
    this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x92d63b).setOrigin(0, 0);
    this.icon = this.add.image(120, 120, 'splashScreen').setScale(2).setAlpha(0.01);
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

    this.input.on('pointerup', (event, target) => {
      const xDiff = event.upX - event.downX;
      const yDiff = event.upY - event.downY;
      const time = event.upTime - event.downTime;

      if (time < 1000) {
        if ((xDiff <= 5 && xDiff >= -5) && (yDiff <= 5 && yDiff >= -5)) {
          this.clickHandler();
        } else if (yDiff >= 10) {
          this.swipeHandler('DOWN');
        } else if (yDiff <= -10) {
          this.swipeHandler('UP');
        }
      }
    });

    this.swimIn();
  }

  clickHandler() {
    if (this.frog.body.velocity.x === 0 && this.frog.body.velocity.y === 0) {
      this.selectOption(this.frog.option);
    }
  }

  swipeHandler(direction) {
    if (this.frog.body.velocity.x === 0 && this.frog.body.velocity.y === 0) {
      if (direction === 'UP' && this.frog.option > 0) this.frog.hopUp();
      else if (direction === 'DOWN' && this.frog.option < 1) this.frog.hopDown();
    }
  }

  swimIn() {
    this.turtles.forEach(turtle => turtle.swimIn());
    this.frog.swimIn();
  }

  // triggered when the game resizes
  onResize(gameSize, baseSize, displaySize, resolution) {
    if (this.cameras.main) {
      this.setCamera(gameSize.height);
    }
  }

  // sets the size of the camera
  setCamera(size) {
    if (this.cameras.main) {
      this.cameras.main.setZoom(size / 240);
      this.cameras.main.setOrigin(0, 0);
      this.cameras.main.setPosition(0, 0);
      this.cameras.main.setSize(size);
    }
  }

  selectOption(option) {
    if (option === 0) {
      this.frog.swimOut();
      this.turtles[0].swimOut();
      setTimeout(() => this.toGame(), 1800);
    }
    else { 
      this.showAbout();
    }
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

  transitionOut() {
    this.rect.setAlpha(this.rect.alpha + 0.08 > 1 ? 1 : this.rect.alpha + 0.08);
  }

  toGame() {
    this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000)
      .setOrigin(0, 0).setAlpha(0.01);
    this.scene.transition({
      target: 'PlayScene',
      duration: 500,
      moveBelow: true,
      allowInput: false,
      onUpdate: this.transitionOut
    });
    this.scene.setVisible(0, 'PlayScene');
  }

  showAbout() {
    if (this.frog.locked) return;
    this.frog.locked = true;
    setTimeout(() => {
      this.frog.locked = false;
    }, 500);

    if (!this.aboutCard) this.aboutCard = new AboutCard(this);

    this.aboutCard.toggle();
  }

  update() {
    if (this.splashState === 'FadeIn') this.splashFadeIn();
    else if (this.splashState === 'FadeOut') this.splashFadeOut();
    if (this.frog) this.frog.update(this.cursors);
    this.turtles.forEach(turtle => turtle.update());
  }
}