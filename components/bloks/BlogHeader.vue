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

<style lang="scss" scoped>
.blog-header {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  &.header--large {
    text-align: center;
    font-size: 48px;
    margin: 40px 0 60px 0;
  }
  &.header--medium {
    text-align: left;
    font-size: 24px;
    margin: 40px 0 40px 0;
    padding-left: 50px;
    align-self: flex-start;
    &::before {
      content: ">";
      margin-left: -50px;
    }
  }
}
</style>