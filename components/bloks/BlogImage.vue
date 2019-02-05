<template>
  <!-- <div class="blog-image__wrapper"> -->
    <img v-editable="blok" class="blog-image" :src="src"/>
  <!-- </div> -->
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
  position: relative;
  flex-direction: row;
  justify-content: center;
}
.blog-image {
  width: 100%;
  object-fit: contain;
  margin-bottom: 40px;
  border-radius: 6px;
}
</style>