<template>
  <div v-editable="blok" class="game-carousel">
    <component :key="blok._uid" v-for="blok in blok.games" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style scoped>
</style>