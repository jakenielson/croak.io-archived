<template>
  <h3 v-editable="blok" class="blog-header" :class="sizeClass">
    {{ blok.text }}
  </h3>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    sizeClass() {
      switch(this.blok.size) {
        case 'l':
          return 'header--large';
        case 'm':
          return 'header--medium';
        case 's':
          return 'header--small';
        default:
          return 'header-medium';
      }
    }
  }
}
</script>

<style lang="scss">
</style>