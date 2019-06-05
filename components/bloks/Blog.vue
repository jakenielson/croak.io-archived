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
  padding-left: 80px;
  padding-right: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media (max-width: 768px) {
  .blog {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>