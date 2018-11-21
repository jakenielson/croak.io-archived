<template>
  <div id="game-container"/>
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