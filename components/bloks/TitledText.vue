<template>
  <div v-editable="blok" class="titled-text util__flex-col">
    <h1 class="titled-text__title">{{ blok.title }}</h1>
    <p class="titled-text__text">{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
</style>