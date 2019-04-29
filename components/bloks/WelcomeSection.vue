<template>
  <div v-editable="blok" class="welcome-section">
    <div class="outer-wrapper">
      <img :src="imageSrc" class="logo">
      <div class="content-wrapper">
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
.welcome-section {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .outer-wrapper {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .content-wrapper {
    width: 60%;
    max-width: 600px;
    padding: 0 60px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title-text {
      font-size: 42px;
      font-weight: bold;
    }
    .body-text {
      font-size: 20px;
    }
    .signup-text {
      font-size: 18px;
    }
  }


}
</style>