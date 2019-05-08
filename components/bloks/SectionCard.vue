<template>
  <nuxt-link v-editable="blok" class="section-card card" :to="blok.link.cached_url">
    <div class="card-header">
      <p class="card-header-title is-centered">
        {{ blok.title }}
      </p>
    </div>
    <div class="card-image">
      <figure class="image is-3by1">
        <img :src="imageSrc" :alt="blok.title">
      </figure>
    </div>
    <div class="card-content">
      <p class="content">
        {{ blok.body }}
      </p>
    </div>
  </nuxt-link>
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

<style lang="scss" scoped>
.section-card {
  border-radius: 5px;
  width: 100%;

  .card-header-title {
    font-size: 24px;
  }

  .card-content {
    font-size: 16px;
  }
}
</style>
