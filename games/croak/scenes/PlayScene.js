import { Scene } from 'phaser';
import Frog from '~/games/croak/sprites/Frog';
import Cars from '~/games/croak/groups/Cars';
import Log from '~/games/croak/sprites/Log';
import Turtle from '~/games/croak/sprites/Turtle';
import HomeFrog from '~/games/croak/sprites/HomeFrog';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  // called when the scene starts, before create
  init() {
    this.map = null;
    this.nextMap = null;
    this.tiles = null;
    this.mapLayers = {};

    this.frog = null;
    this.cars = null;
    this.nextCars = null;
    this.logs = [];
    this.nextLogs = [];
    this.turtles = [];
    this.nextTurtles = [];
    this.homeFrogs = [];
    this.lives = 7;

    this.cursors = null;
    this.rect = null;
    this.cameraPanning = false;
    this.overcard = null;
  }

  // called when the scene starts, after init
  create() {
    this.physics.world.setBounds(0, 0, 240, 240);
    this.setCamera(this.sys.game.config.width);
    this.events.on('resize', this.onResize, this);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.createMap(); 
    this.createGameObjects();
    this.setupControls();
    this.scene.start('UIScene');
    this.transitionIn(); 
  }

  setupControls() {
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

  transitionIn() {
    this.events.on('transitionstart', () => {
      debugger;
      this.rect = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000)
        .setOrigin(0, 0).setDepth(99);
      this.tweens.add({
        targets: this.rect,
        alpha: 0,
        duration: 1000
      });
    }, this);

    this.events.on('transitioncomplete', () => {
      debugger;
      this.scene.setVisible(1, 'PlayScene');
      this.events.emit('spawnFrog');
    }, this);
  }

  // create the map, tiles, and layers
  createMap() {
    this.map = this.make.tilemap({ key: 'croakMap' });
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
  createGameObjects(newGame = false) {
    const turtles = [];
    const logs = [];
    let cars = null;
    for (let i = 0; i < 3; i++) {
      let row = (i * 2) + 1;
      if (newGame) row -= 15;
      logs.push(new Log(this, row, 0));
      logs.push(new Log(this, row, 1));
    }

    for (let i = 0; i < 2; i++ ) {
      let row = (i * 2) + 2;
      if (newGame) row -= 15;
      turtles.push(new Turtle(this, row, 0, 0));
      turtles.push(new Turtle(this, row, 0, 1));
      turtles.push(new Turtle(this, row, 0, 2));
      turtles.push(new Turtle(this, row, 1, 0));
      turtles.push(new Turtle(this, row, 1, 1));
      turtles.push(new Turtle(this, row, 1, 2));
    }

    const rowOffset = newGame ? -8 : 7;
    cars = new Cars(this.physics.world, this, [], rowOffset, 5, 2);

    if (newGame) {
      this.newTurtles = turtles;
      this.newLogs = logs;
      this.newCars = cars;
    } else {
      this.turtles = turtles;
      this.logs = logs;
      this.cars = cars;
    }
  }

  repositionGameObjects() {
    // Adjust the references of the objects
    this.cars = this.newCars;
    this.newCars = null;
    this.logs = this.newLogs;
    this.newLogs = [];
    this.turtles = this.newTurtles;
    this.newTurtles = [];

    // Adjust the positions of the objects by one game length
    this.cars.getChildren().forEach((car) => {
      car.row = car.row += 15;
      car.setY(car.y + 240)
    });
    this.logs.forEach((log) => {
      log.row = log.row += 15;
      log.setY(log.y + 240)
    });
    this.turtles.forEach((turtle) => {
      turtle.row = turtle.row += 15;
      turtle.setY(turtle.y + 240)
    });
  }

  //TODO: this logic is awkward, clean it up
  spawnFrog() {
    if (this.frog) {
      this.frog.destroy();
    } this.createFrog();
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
    if (!this.gameOver) {
      if (this.frog) this.frog.update(this.cursors);
      if (this.cameraPanning) this.panCamera();
      this.updateGameObjects();
    }
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
    this.cameras.main.setZoom(size / 240);
    this.cameras.main.setOrigin(0, 0);
    this.cameras.main.setPosition(0, 0);
    this.cameras.main.setScroll(0, 0);
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
      this.events.emit('spawnFrog');
      this.events.emit('home_frog');
      const home = new HomeFrog(this, (tile.x * 16), 0);
      this.add.existing(home);
      this.homeFrogs.push(home);
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

  // clean up for win / game over
  destroyAll() {
    this.cars.destroy(true);
    this.cars = [];
    this.logs.forEach(log => log.destroy(true));
    this.logs = [];
    this.turtles.forEach(turtle => turtle.destroy(true));
    this.turtles = [];
    this.homeFrogs.forEach(frog => frog.destroy(true));
    this.homeFrogs = [];
    for (let layer in this.mapLayers) {
      this.mapLayers[layer].data = this.mapLayers[layer].nextData;
    }
    this.map.destroy();
    this.map = this.nextMap;
  }

  // build a new level and go to it
  goToNextLevel() {
    this.createNextLevel();
    this.cameraPanning = true;
  }

  // create the next level
  createNextLevel() {
    this.nextMap = this.make.tilemap({ key: 'croakMap' });
    this.tiles = this.nextMap.addTilesetImage('mortTiles');
    this.mapLayers.ground.nextData = this.nextMap.createStaticLayer('Ground Layer', this.tiles, 0, -240);
    this.mapLayers.water.nextData = this.nextMap.createStaticLayer('Water Layer', this.tiles, 0, -240);
    this.mapLayers.lily.nextData = this.nextMap.createStaticLayer('Lily Layer', this.tiles, 0, -240);
    this.createGameObjects(true);
  }

  panCamera() {
    if (this.cameras.main.scrollY > -240) this.cameras.main.scrollY -= 2;
    // if (this.cameras.main.scrollY > -100) this.cameras.main.scrollY -= 2;
    else {
      this.destroyAll();
      this.resetLevelPosition();
      this.repositionGameObjects();
      this.events.emit('level_up');
      this.cameraPanning = false;
    }
  }

  resetLevelPosition() {
    for (let layer in this.mapLayers) {
      this.mapLayers[layer].data.setY(0);
      this.cameras.main.scrollY = 0;
    }
  }

  triggerGameOver() {
    this.events.removeAllListeners('spawnFrog');
    this.scene.start('OverScene');
  }
}