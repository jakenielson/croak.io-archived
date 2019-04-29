<template>
  <div v-editable="blok" class="welcome-section">
    <img :src="imageSrc" class="logo">
    <div class="content-wrapper">
      <div class="title-block">
        <h2 class="title-text">{{ blok.title }}</h2>
        <p class="body-text">{{ blok.body }}</p>
        <p class="signup-text">{{ blok.signup_text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    imageSrc() {
      return `https://${this.blok.logo.slice(2)}`;
    }
  }
}
</script>
<style lang="scss">
</style>