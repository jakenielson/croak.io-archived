<template>
  <div v-editable="blok" class="welcome-section">
    <h2 class="title-text">{{ blok.title }}</h2>
    <p class="body-text">{{ blok.body }}</p>
    <!-- <p class="signup-text">{{ blok.signup_text }}</p> -->
    <b-field :label="blok.signup_text" class="signup-text">
      <b-input :name="blok.signup_text" placeholder="you@email.com" expanded></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss" scoped>
.welcome-section {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;;
  align-items: flex-start;

  .title-text {
    font-size: 48px;
    font-weight: bold;
  }

  .body-text {
    font-size: 24px;
    margin: 60px 0;
  }

  .signup-text {
    font-size: 18px;
    font-weight: bold;
    width: 100%;
  }
}
</style>