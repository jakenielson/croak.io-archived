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
      width: 240,
      height: 240,
    };
  },
  methods: {
    toDevlog() {
      this.$router.push({
        path: '/'
      });
    },
    initGame() {
      this.game = new Croak(config, this.height, this.width);
      this.game.toDevlog = this.toDevlog;
    }
  },
  mounted() {
    this.initGame();
  },
  beforeDestroy() {
    this.game.destroy();
  }
}
</script>

<style lang="scss">
#game-container {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  flex: 1;
  max-height: calc(100vh - 132px);
  margin-left: 40px;
  margin-right: 40px;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
  
  canvas {
    border: 4px solid black;
  }
}
</style>