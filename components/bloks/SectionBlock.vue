<template>
  <div v-editable="blok" class="section-block" :class="customClasses">
    <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    hideClass() {
      if (this.blok.hide_when_small) {
        return 'hide-when-small';
      }
    },
    sizeClass() {
      switch (this.blok.size) {
        case 'small':
          return 'size-small';
        case 'medium':
          return 'size-medium';
        case 'large':
          return 'size-large';
        default:
          return 'size-medium';
      }
    },
    customClasses() {
      return this.hideClass + ' ' + this.sizeClass;
    }
  }
}
</script>
<style lang="scss" scoped>
.section-block {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
}
.size-small {
  flex: 3;
}
.size-medium {
  flex: 4;
}
.size-large {
  flex: 5;
}
@media (max-width: 1010px) {
  .hide-when-small {
    display: none;
  }
}
</style>