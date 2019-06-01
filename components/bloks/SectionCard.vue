<template>
  <nuxt-link v-editable="blok" class="section-card card" :to="blok.link.cached_url">
    <div class="card-header">
      <p class="card-header-title is-centered">
        {{ blok.title }}
      </p>
    </div>
    <div class="card-image">
      <div class="card-image__background" :class="preview.imageColor">
        <img class="card-image__image" :src="`https://${preview.image.slice(2)}`"/>
      </div>
    </div>
    <!-- <div class="card-content">
      <p class="content">
        {{ blok.body }}
      </p>
    </div> -->
  </nuxt-link>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    preview() {
      return this.$store.getters.getPreviewBySlug(this.blok.link.cached_url.split('/').slice(-1)[0]);
    },
    imageSrc() {
      return `https://${this.preview.image.slice(2)}`;
    },
  }
}
</script>

<style lang="scss" scoped>
.section-card {
  border-radius: 5px;
  max-width: calc(100vw - 80px);
  width: 400px;

  .card-header-title {
    font-size: 24px;
  }

  .card-image__background {
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-self: stretch;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .card-image__image {
    height: 240px;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .card-content {
    font-size: 16px;
  }
}
</style>
