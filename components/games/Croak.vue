<template>
  <div id="game-container" class="util__flex-col util__flex-center"/>
</template>

<script>
import config from '~/games/croak/config';

export default {
  name: 'croak',
  data() {
    return {
      game: null,
      width: 208,
      height: 208,
      resizeTimeout: null
    };
  },
  methods: {
    resize() {
      const header = document.getElementById('top-header');
      const windowHeight = window.innerHeight - header.offsetHeight - 40;
      const windowWidth = window.innerWidth - 40;
      const windowRatio = windowWidth / windowHeight;
      const gameRatio = this.width / this.height;

      if (windowRatio < gameRatio) {
        this.width = windowWidth;
        this.height = (windowWidth / gameRatio);
      } else {
        this.width = (windowHeight * gameRatio);
        this.height = windowHeight;
      } if (this.game) {
        this.game.resize(this.width, this.height);
      }
    },
    triggerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
      }, 200);
    },
    initGame() {
      this.resize();
      this.game = new Croak(config, this.height, this.width);
      window.addEventListener("resize", this.triggerResize, false);
    }
  },
  mounted() {
    document.getElementById('main').classList.remove('util__flex-start');
    document.getElementById('main').classList.add('util__flex-center');
    this.initGame();
  },
  beforeDestroy() {
    document.getElementById('main').classList.remove('util__flex-center');
    document.getElementById('main').classList.add('util__flex-start');
    this.game.destroy();
  }
}
</script>

<style lang="css">
</style>