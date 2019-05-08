<template>
  <div v-editable="blok" class="section-card-grid">
    <component :key="blok._uid" v-for="blok in blok.cards" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style lang="scss" scoped>
.section-card-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
</style>