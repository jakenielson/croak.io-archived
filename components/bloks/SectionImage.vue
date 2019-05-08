<template>
  <div v-editable="blok" class="section-image">
    <img :src="imageSrc">
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

<style lang="scss" scoped>
.section-image {
  img {
    min-height: 250px;
    min-width: 250px;
  }
}
</style>
