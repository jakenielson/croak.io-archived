<template>
  <div class="blog-image__wrapper">
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

<style lang="scss">
.blog-image__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 40px 0;
  max-width: 100%;
  overflow: hidden;
}
.blog-image {
  max-height: 400px;
  width: auto;
}
</style>