<template>
  <div v-editable="blok" class="logo util__flex">
    <img :src="blok.image" class="logo__image">
    <h1 class="logo__title">{{ blok.title }}</h1>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
  .logo {
    align-items: center;
    flex-direction: column;

    .logo__title {
      font-size: 42px;
    }
  }
</style>