import { Scene } from 'phaser';
import croakMap from '~/games/croak/maps/croakMap.json';
import titleMap from '~/games/croak/maps/titleMap.json';

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' });
  }

  preload () {
    this.load.tilemapTiledJSON('titleMap', titleMap);
    this.load.tilemapTiledJSON('croakMap', croakMap);
    this.load.image('splashScreen', '/croak/splash.png');
    this.load.image('mortTiles', '/croak/mortTiles.png');
    this.load.image('lilypads', '/croak/lilypads.png');
    this.load.bitmapFont('font', '/croak/font.png', '/croak/font.fnt');
    this.load.bitmapFont('outlineFont', '/croak/outlineFont.png', '/croak/outlineFont.fnt');
    this.load.spritesheet('frog', '/croak/mortFrog.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('carRed', '/croak/mortCarRed.png', {frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('carBlue', '/croak/mortCarBlue.png', {frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('carYellow', '/croak/mortCarYellow.png', {frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('truck', '/croak/mortTruck.png', {frameWidth: 48, frameHeight: 24 });
    this.load.spritesheet('turtle', '/croak/mortTurtle.png', {frameWidth: 24, frameHeight: 16 });
    this.load.image('log', '/croak/mortLog.png');
  }

  createAnimations() {
    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNames('frog', {frames: [44, 45, 46, 47]}),
      frameRate: 7,
      yoyo: false,
      repeat: 2
    });
    this.anims.create({
      key: 'idle_up',
      frames: this.anims.generateFrameNames('frog', {frames: [5, 6, 7, 8]}),
      frameRate: 7,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'idle_down',
      frames: this.anims.generateFrameNames('frog', {frames: [9, 10, 11, 12]}),
      frameRate: 7,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'idle_side',
      frames: this.anims.generateFrameNames('frog', {frames: [13, 14, 15, 16]}),
      frameRate: 7,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'jump_up',
      frames: this.anims.generateFrameNames('frog', {frames: [17, 18, 19, 20, 21]}),
      frameRate: 14,
      yoyo: false,
      repeat: 0
    });
    this.anims.create({
      key: 'jump_down',
      frames: this.anims.generateFrameNames('frog', {frames: [22, 23, 24, 25, 26]}),
      frameRate: 14,
      yoyo: false,
      repeat: 0
    });
    this.anims.create({
      key: 'jump_side',
      frames: this.anims.generateFrameNames('frog', {frames: [27, 28, 29, 30, 31]}),
      frameRate: 14,
      yoyo: false,
      repeat: 0
    });
    this.anims.create({
      key: 'home_frog',
      frames: this.anims.generateFrameNames('frog', {frames: [1, 2, 3, 4]}),
      frameRate: 7,
      yoyo: false,
      repeat: 0
    });
    this.anims.create({
      key: 'car_red',
      frames: this.anims.generateFrameNames('carRed', {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 4,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'car_blue',
      frames: this.anims.generateFrameNames('carBlue', {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 4,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'car_yellow',
      frames: this.anims.generateFrameNames('carYellow', {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 4,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'truck',
      frames: this.anims.generateFrameNames('truck', {frames: [0, 1, 2, 3]}),
      frameRate: 4,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'turtle_float',
      frames: this.anims.generateFrameNames('turtle', {frames: [0, 1, 2]}),
      frameRate: 4,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: 'turtle_sink',
      frames: this.anims.generateFrameNames('turtle', {frames: [0, 1, 2, 3, 4, 5]}),
      frameRate: 4,
      yoyo: false,
      repeat: 0
    });
    this.anims.create({
      key: 'turtle_underwater',
      frames: this.anims.generateFrameNames('turtle', {frames: [5, 6, 7, 8]}),
      frameRate: 4,
      yoyo: false,
      repeat: -1
    });
    this.anims.create({
      key: 'turtle_rise',
      frames: this.anims.generateFrameNames('turtle', {frames: [8, 9, 10, 11, 12, 13]}),
      frameRate: 4,
      yoyo: false,
      repeat: 0
    });
  }

  create () {
    this.createAnimations();
    this.scene.start('TitleScene');
  }
}