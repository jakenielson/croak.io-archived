<template>
  <form class="contact-form">
    <div class="contact-form__section util__flex-col">
      <label class="contact-form__label" for="email">Email</label>
      <input class="contact-form__text input" v-model="email" type="text" id="email" name="email">
    </div>
    <div class="contact-form__section util__flex-col">
      <label class="contact-form__label" for="message">Message</label>
      <textarea class="contact-form__textarea input" v-model="message" id="message" name="message" rows="10"></textarea>
    </div>
    <button class="contact-form__button btn" @click.prevent="submit" :disabled="sending">Send</button>
    <span class="contact-form__prompt">{{ prompt }}</span>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      prompt: '',
      sending: false,
    }
  },
  computed: {
    templateParams() {
      return {
        reply_to: this.email,
        content: this.message
      }
    }
  },
  methods: {
    submit() {
      if (this.email && this.message) {
        this.sending = true;
        this.prompt = 'Sending...';
        this.$email('gmail', 'template_kv8my4vB', this.templateParams)
        .then((response) => {
          this.sending = false;
          this.prompt = 'Sent!';
          this.clearForm();
        }, (error) => {
          this.sending = false;
          this.prompt = 'Error!';
          this.clearForm();
        });
      }
    },
    clearForm() {
      this.email = '';
      this.message = '';
    }
  }
}
</script>

<style lang="scss">
.contact-form {
  margin-top: 40px;
}
.contact-form__section {
  margin-bottom: 20px;
}
.contact-form__label {
  margin-bottom: 5px;
}
.contact-form__text {
  width: 250px;
}
</style>