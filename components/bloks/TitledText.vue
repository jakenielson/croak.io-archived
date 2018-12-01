<template>
  <div v-editable="blok" class="titled-text util__flex">
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
  .titled-text {
    align-items: center;
    flex-direction: column;

    .titled-text__title {
      font-size: 42px;
    }

    .titled-text__text {
      font-size: 20px;
    }
  }
</style>