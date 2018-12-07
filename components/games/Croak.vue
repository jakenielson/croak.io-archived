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
  mounted() {
    this.game = new Croak(config, this.height, this.width);
  },
  beforeDestroy() {
    this.game.destroy();
  }
}
</script>

<style lang="css">
#game-container {
  margin-right: 20px;
}
@media only screen and (max-width: 900px) {
  #game-container {
    margin-right: 0;
  }
}
</style>