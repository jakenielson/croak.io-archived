import { Scene } from 'phaser';
import Frog from '~/games/croak/sprites/Frog';
import Cars from '~/games/croak/groups/Cars';
import Log from '~/games/croak/sprites/Log';
import Turtle from '~/games/croak/sprites/Turtle';
import HomeFrog from '~/games/croak/sprites/HomeFrog';
import UIHelper from '~/games/croak/helpers/UI';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  // called when the scene starts, before create
  init() {
    this.map = null;
    this.tiles = null;
    this.mapLayers = {};

    this.frog = null;
    this.cars = null;
    this.logs = [];
    this.turtles = [];
    this.homeFrogs = [];

    this.lives = 3;
    this.isGameOver = false;

    this.cursors = null;
    this.rect = null;
  }

  // called when the scene starts, after init
  create() {
    this.physics.world.setBounds(0, 0, 208, 208);
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);
    this.events.on('destroy', () => {
      this.destroyAll();
      this.events.destroy();
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.createMap();
    this.createGameObjects();
    this.createUI();
    this.spawnFrog();

    this.events.on('transitionstart', () => {
      this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000)
        .setOrigin(0, 0).setDepth(99);
      this.tweens.add({
        targets: this.rect,
        alpha: 0,
        duration: 1000
      });
    }, this);

    this.events.on('transitioncomplete', () => {
      this.scene.setVisible(1, 'PlayScene');
    }, this);

    this.input.on('pointerup', (event, target) => {
      const xDiff = event.upX - event.downX;
      const yDiff = event.upY - event.downY;
      const time = event.upTime - event.downTime;

      if (time < 1000 && !this.frog.dead) {
        if (yDiff >= 10 && Math.abs(yDiff) > Math.abs(xDiff)) {
          if ((this.frog.y + 16) < (this.physics.world.bounds.y + this.physics.world.bounds.height)) this.frog.hop([0, 64], 'down');
        } else if (yDiff <= -10 && Math.abs(yDiff) > Math.abs(xDiff)) {
          if ((this.frog.y) > this.physics.world.bounds.y) this.frog.hop([0, -64], 'up');
        } else if (xDiff >= 10 && Math.abs(xDiff) > Math.abs(yDiff)) {
          if ((this.frog.x + 16) < (this.physics.world.bounds.x + this.physics.world.bounds.width)) this.frog.hop([64, 0], 'right');
        } else if (xDiff <= -10 && Math.abs(xDiff) > Math.abs(yDiff)) {
          if ((this.frog.x) > this.physics.world.bounds.x) this.frog.hop([-64, 0], 'left');
        }
      }
    });
  }

  // create the map, tiles, and layers
  createMap() {
    this.map = this.make.tilemap({ key: 'mortMap' });
    this.tiles = this.map.addTilesetImage('mortTiles');
    this.mapLayers.ground = {
      data: this.map.createStaticLayer('Ground Layer', this.tiles, 0, 0)
    }
    this.mapLayers.water = {
      data: this.map.createStaticLayer('Water Layer', this.tiles, 0, 0),
      tileEffect: (tile) => {
        const riding = this.rideCheck();
        if (this.homeCheck(tile)) this.frogHome(tile);
        else if (tile && !riding) this.frog.die();
      }
    }
    this.mapLayers.lily = {
      data: this.map.createStaticLayer('Lily Layer', this.tiles, 0, 0)
    }
  }

  // create the cars, logs, etc.
  createGameObjects() {
    for (let i = 0; i < 3; i++) {
      const row = (i * 2) + 1;
      this.logs.push(new Log(this, row, 0));
      this.logs.push(new Log(this, row, 1));
    }

    for (let i = 0; i < 2; i++ ) {
      const row = (i * 2) + 2;
      this.turtles.push(new Turtle(this, row, 0, 0));
      this.turtles.push(new Turtle(this, row, 0, 1));
      this.turtles.push(new Turtle(this, row, 0, 2));
      this.turtles.push(new Turtle(this, row, 1, 0));
      this.turtles.push(new Turtle(this, row, 1, 1));
      this.turtles.push(new Turtle(this, row, 1, 2));
    }

    this.cars = new Cars(this.physics.world, this, [], 7, 5, 2);
  }

  // create the lives, score, etc.
  createUI() {
    this.UIHelper = new UIHelper(this);

    this.events.on('death', () => this.UIHelper.onDeath());
  }

  //TODO: this logic is awkward, clean it up
  spawnFrog() {
    if (this.frog) {
      this.frog.destroy();
      this.lives -= 1;
      this.events.emit('death', this.lives);
    }
    if (this.lives >= 0) {
      this.createFrog();
    }
  }

  //TODO: this logic is awkward, clean it up
  createFrog() {
    this.map.findObject('Player', (obj) => {
      this.frog = new Frog(this, obj.x, obj.y);
    });
    this.physics.add.overlap(this.frog, this.cars, this.frog.die.bind(this.frog));
  }

  // called once per frame
  update() {
    if (this.isGameOver && this.anyCursorIsDown()) this.scene.restart();
    if (this.frog) this.frog.update(this.cursors);
    this.updateGameObjects();
  }

  // triggers the update method of all game objects
  updateGameObjects() {
    this.cars.children.entries.forEach((child) => {
      child.update();
    });

    for (let i = 0; i < this.logs.length; i++) {
      this.logs[i].update();
    }
    for (let i = 0; i < this.turtles.length; i++) {
      this.turtles[i].update();
    }
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

  // checks if any cursor is down, used to restart the game
  anyCursorIsDown() {
    if (this.cursors.down.isDown ||
      this.cursors.up.isDown ||
      this.cursors.right.isDown ||
      this.cursors.right.isDown ||
      this.cursors.space.isDown) return true;
      return false;
  }

  // triggers the effect of a tile
  triggerTile() {
    const tileX = Math.round((this.frog.x) / 16);
    const tileY = Math.round((this.frog.y) / 16);
    for (let layer in this.mapLayers) {
      const l = this.mapLayers[layer];
      if (l.tileEffect) {
        const tile = l.data.getTileAt(tileX, tileY);
        if (tile) l.tileEffect(tile);
      }
    }
  }

  // check if the frog landed on a rideable object
  rideCheck() {
    for (let i = 0; i < this.logs.length; i++) {
      const log = this.logs[i];
      if (this.physics.overlap(this.frog, log)) {
        this.frog.setVelocityX(log.body.velocity.x);
        return true;
      }
    } 
    for (let i = 0; i < this.turtles.length; i++) {
      const turtle = this.turtles[i];
      if (this.physics.overlap(this.frog, turtle)) {
        this.frog.setVelocityX(turtle.body.velocity.x);
        return true;
      }
    }
    return false;
  }

  // TODO: this is awkward
  // check if the frog landed on a lilpad and scored
  frogHome(tile) {
    let frogExists = false;
    for (let i = 0; i < this.homeFrogs.length; i++) {
      const hf = this.homeFrogs[i];
      if ((tile.x * 16) === hf.x) frogExists = true;
    } if (frogExists) {
      this.frog.die();
    } else {
      this.frog.destroy();
      this.createFrog();
      const home = new HomeFrog(this, (tile.x * 16), 0);
      this.add.existing(home);
      this.homeFrogs.push(home);
      if (this.winCheck()) this.win();
    }
  }

  // TODO: this is awkward
  // check if the frog landed on a lilypad and scored
  homeCheck(tile) {
    const lily = this.mapLayers.lily.data.getTileAt(tile.x, tile.y);
    return (lily &&
        (((this.frog.x) % 16) <= 6 ||
        ((this.frog.x) % 16) >= 10))
  }

  // check if the player won the game
  winCheck() {
    return this.homeFrogs.length >= 6;
  }

  // show the win screen
  win() {
    this.destroyAll();

    this.isGameOver = true;

    this.winText = this.add.bitmapText(104, 48, 'font', `YOU WIN`, 16);
    this.winText.setOrigin(0.5);
  }

  // show the game over screen
  gameOver() {
    this.destroyAll();

    this.isGameOver = true;

    this.gameOverText = this.add.bitmapText(104, 48, 'font', `GAME OVER`, 16);
    this.gameOverText.setOrigin(0.5);
  }

  // clean up for win / game over
  destroyAll() {
    this.cars.clear(true, true);
    this.logs.forEach(log => log.destroy());
    this.turtles.forEach(turtle => turtle.destroy());
    this.homeFrogs.forEach(frog => frog.destroy());
    this.frog.destroy();
    this.frog = null;
    this.events.removeAllListeners('death');
  }
}