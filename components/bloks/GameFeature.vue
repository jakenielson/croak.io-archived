<template>
  <div v-editable="blok" class="game-feature">
    <img :src="imageSrc" class="background-image">
    <div class="content-wrapper">
      <div class="title-block">
        <p class="title-text">{{ blok.title }}</p>
      </div>
      <div class="button-wrapper">
        <nuxt-link class="play-link" :to="blok.play_link.cached_url">
          <b-button class="game-button" type="is-white" size="is-medium">Play</b-button>
        </nuxt-link>
        <nuxt-link class="blog-link" :to="blok.blog_link.cached_url">
          <b-button class="game-button" type="is-white" size="is-medium">Blog</b-button>
        </nuxt-link>
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
  position: relative;
  height: 400px;

  .background-image {
    width: 100%;
    height: 400px;
  }

  .content-wrapper {
    position: absolute;
    right: 40px;
    top: 40px;

    .title-block {
      width: 250px;
      height: 250px;
      padding: 0 20px;
      background-color: black;
      color: white;
      font-family: 'Press Start 2P', cursive;
      font-size: 30px;
      text-align: center;
      border-radius: 4px;
      border: 4px solid white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .button-wrapper {
      display: flex;
      width: 250px;
      margin-top: 20px;
      justify-content: space-around;

      .game-button {
        font-family: 'Press Start 2P', cursive;
      }
    }
  }
}
</style>