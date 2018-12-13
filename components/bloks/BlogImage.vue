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
  position: relative;
  flex-direction: row;
  justify-content: center;
  padding: 60px 0;
}
.blog-image {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  max-height: 100%;
  -ms-transform: translate(-50%, -50%); /* IE 9 */
  -webkit-transform: translate(-50%, -50%); /* Safari */
  transform: translate(-50%, -50%);
}
</style>