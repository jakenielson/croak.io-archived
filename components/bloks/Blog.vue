<template>
  <section v-editable="blok" class="blog section container">
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style lang="scss" scoped>
.blog {
  font-size: 20px;
  // max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>