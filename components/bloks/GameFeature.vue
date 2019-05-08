<template>
  <div v-editable="blok" class="game-feature hero is-large is-primary" :style="{'background-image': `url('${imageSrc}')`}">
    <div class="game-feature hero-body">
      <div class="container has-text-right">
        <h1 class="title is-white">
          {{ blok.title }}
        </h1>
        <div class="subtitle">
          <nuxt-link class="play-link" :to="blok.play_link.cached_url">
            <b-button class="game-button" type="is-white" size="is-medium">Play</b-button>
          </nuxt-link>
          <nuxt-link class="blog-link" :to="blok.blog_link.cached_url">
            <b-button class="game-button" type="is-white" size="is-medium">Blog</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    imageSrc() {
      return `https://${this.blok.background_image.slice(2)}`;
    }
  },
}
</script>
<style lang="scss" scoped>
.game-feature {
  background-size: cover;

  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;

  .hero-body {
    background: rgba(0, 0, 0, 0.3);
  }

  .title {
    text-shadow: 6px 6px 0px black;
    padding: 10px 0;
    font-size: 48px;
  }

  .subtitle button {
    font-family: 'Press Start 2P', cursive;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
    box-shadow: 6px 6px black;
  }
}
</style>