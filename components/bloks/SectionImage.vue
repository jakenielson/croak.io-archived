<template>
  <div class="section-image__wrapper">
    <figure v-editable="blok" class="section-image image" :class="sizeClass">
      <img :src="imageSrc" :class="{'img-is-pixelated': blok.pixelated}">
    </figure>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    imageSrc() {
      return `https://${this.blok.image.slice(2)}`;
    },
    sizeClass() {
      return this.blok.size || '';
    },
  }
}
</script>

<style lang="scss" scoped>
.section-image__wrapper {
  width: 100%;
}
.section-image {
  width: 100%;

  .img-is-pixelated {
    image-rendering: pixelated;
  }
}
</style>
