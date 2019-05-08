<template>
  <section v-editable="blok" class="section page-section" :class="colorClass">
    <div class="container">
      <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component"></component>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    colorClass() {
      if (!this.blok || !this.blok.color) return;
      switch (this.blok.color) {
        case 'white':
          return 'has-background-white';
        case 'brand-1':
          return 'has-background-primary has-text-white';
        case 'brand-2':
          return 'has-background-secondary has-text-white';
        case 'brand-3':
          return 'has-background-tertiary has-text-white';
        case 'brand-4':
          return 'has-background-twitter has-text-white';
        case 'default':
          return 'has-background-white';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-section {
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>