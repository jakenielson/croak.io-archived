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

<style lang="scss" scoped>
</style>