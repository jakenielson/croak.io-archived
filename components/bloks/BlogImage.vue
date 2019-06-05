<template>
  <div class="blog-image__background" :class="blok.background_color">
    <img v-editable="blok" class="blog-image" :src="src"/>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    src() {
      return `https://${this.blok.image.slice(2)}`;
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-image__background {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.blog-image {
  flex: 1;
  object-fit: contain;
}
</style>