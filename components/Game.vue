<template>
  <div id="game-container"/>
</template>

<script>
import config from '~/games/croak/config';

export default {
  name: 'game',
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
      const header = document.getElementById('nav');
      const footer = document.getElementById('footer');
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const widthOffset = windowWidth >= 900 ? 240 : 40;
      const heightOffset = windowWidth >= 900 ? 40 : 240;
      const gameWidth = (windowWidth - widthOffset);
      const gameHeight = (windowHeight - heightOffset);
      const innerRatio = gameWidth / gameHeight;
      const gameRatio = this.width / this.height;

      if (innerRatio < gameRatio) {
        this.width = gameWidth;
        this.height = (gameWidth / gameRatio);
      } else {
        this.width = (gameHeight * gameRatio);
        this.height = gameHeight;
      } if (this.game) {
        this.game.resize(this.width, this.height);
      }
    },
    triggerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        // this.resize();
      }, 300);
    },
  },
  mounted() {
    this.resize();
    this.game = new Game(config, this.height, this.width);
    window.addEventListener("resize", this.triggerResize, false);
  },
  beforeDestroy() {
    this.game.destroy(true);
  }
}
</script>

<style lang="css">
#game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
@media only screen and (max-width: 900px) {
  #game-container {
    margin-right: 0;
  }
}
</style>