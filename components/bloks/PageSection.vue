<template>
  <div v-editable="blok" class="page-section">
    <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style lang="scss">
.page-section {
  height: 400px;
  width: 100%;
  border-bottom: 6px solid #14a02e;
}
</style>