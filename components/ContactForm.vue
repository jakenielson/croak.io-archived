<template>
  <form class="contact-form">
    <div class="contact-form__section">
      <label class="contact-form__label" for="email">Email</label>
      <input class="contact-form__text" v-model="email" type="text" id="email" name="email">
    </div>
    <div class="contact-form__section">
      <label class="contact-form__label" for="message">Message</label>
      <textarea class="contact-form__textarea" v-model="message" id="message" name="message" rows="10"></textarea>
    </div>
    <button class="contact-form__button" @click.prevent="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
    }
  },
  methods: {
    submit() {
      console.log('email', this.email);
      console.log('message', this.message);
    }
  }
}
</script>

<style lang="scss">
.contact-form__section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.contact-form__label {
  font-size: 32px;
  margin-bottom: 5px;
}
.contact-form__text {
  width: 250px;
}
.contact-form__text, .contact-form__textarea {
  font-size: 18px;
}
.contact-form__button {
  font-size: 18px;
}
</style>