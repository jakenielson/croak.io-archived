<template>
  <div v-editable="blok" class="feature util__flex util__container">
    <nuxt-link class="feature__link" :to="blok.link.cached_url">
      <img class="feature__image" :src="imageSrc">
    </nuxt-link>
    <nuxt-link class="feature__container feature__link container with-title is-center" :to="blok.link.cached_url">
      <p class="feature__title title">{{ blok.name }}</p>
      <p class="feature__description">{{ blok.description }}</p>
    </nuxt-link>
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
    align-items: center;
    flex-direction: column;

    .feature__link {
      cursor: pointer;
      color: #000;
      text-decoration: none;
    }

    .feature__image {
      height: 312px;
      width: 312px;
      margin-bottom: 20px;
    }
  }
</style>