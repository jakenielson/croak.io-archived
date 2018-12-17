<template>
  <div v-editable="blok" class="featured-game util__flex-col util__container">
    <h2 class="featured-game__header">Featured Game</h2>
    <div class="featured-game__wrapper util__flex-col">
      <nuxt-link class="featured-game__link" :to="blok.link.cached_url">
        <img class="featured-game__image" :src="imageSrc">
      </nuxt-link>
      <nuxt-link class="featured-game__container feature__link container with-title is-center" :to="blok.link.cached_url">
        <p class="featured-game__title title">{{ blok.name }}</p>
        <p class="featured-game__description">{{ blok.description }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    imageSrc() {
      return `https://${this.blok.image.slice(2)}`;
    }
  }
}
</script>

<style lang="scss">
.featured-game__header {
  text-align: center;
}
.featured-game__wrapper {
  align-items: center;

  .featured-game__link {
    cursor: pointer;
  }

  .featured-game__image {
    height: 416px;
    width: 416px;
    margin: 20px 0;
    border-color: #212529;
    border-style: solid;
    border-width: 4px;
    border-radius: 4px;
    image-rendering: pixelated;
  }

  .featured-game__container {
    max-width: 500px;
  }
}
@media screen and (max-width: 950px) { 
  .featured-game {
    margin-bottom: 40px;
  }
}
@media screen and (max-width: 650px) { 
  .featured-game__wrapper {
    .featured-game__image {
      height: 208px;
      width: 208px;
    }
  }
}
</style>