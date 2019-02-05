<template>
  <div v-editable="blok" class="blog">
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style>
.blog {
  max-width: 100%;
  overflow-x: hidden;
}
</style>