<template>
  <img v-editable="blok" class="blog-image" :src="src" />
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    src() {
      return `https://${this.blok.image.slice(2)}`;
    }
  }
}
</script>