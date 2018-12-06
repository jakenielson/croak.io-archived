<template>
  <div v-editable="blok" class="feature util__flex util__container">
    <h1>Featured Game:</h1>
    <div class="feature__wrapper util__flex">
      <nuxt-link class="feature__link" :to="blok.link.cached_url">
        <img class="feature__image" :src="imageSrc">
      </nuxt-link>
      <nuxt-link class="feature__container feature__link container with-title is-center" :to="blok.link.cached_url">
        <p class="feature__title title">{{ blok.name }}</p>
        <p class="feature__description">{{ blok.description }}</p>
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
  .feature {
    display: flex;
    flex-direction: column;
  }
  .feature__wrapper {
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .feature__link {
      cursor: pointer;
      color: #000;
      text-decoration: none;
    }

    .feature__image {
      max-height: 312px;
      max-width: 312px;
      margin-bottom: 20px;
    }

    .feature__container {
      max-width: 400px;
    }
  }
</style>