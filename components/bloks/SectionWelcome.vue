<template>
  <div v-editable="blok" class="welcome-section">
    <h2 class="title-text">{{ blok.title }}</h2>
    <p class="body-text">{{ blok.body }}</p>
    <!-- <p class="signup-text">{{ blok.signup_text }}</p> -->
    <b-field :label="blok.signup_text" class="signup-text" custom-class="is-medium signup-text">
      <b-input :name="blok.signup_text" v-model="email" placeholder="you@email.com" size="is-medium" expanded></b-input>
    </b-field>
    <b-field>
      <p class="control">
        <button class="button is-medium is-primary" @click="registerEmail">
          Sign up
        </button>
      </p>
    </b-field>
  </div>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  props: ['blok'],
  data() {
    return {
      email: '',
    }
  },
  methods: {
    registerEmail() {
      axios.post('/api/mailing-list/register', {
        email: this.email
      }).then(() => {
        this.email = '';
      }).catch(() => {
        this.email = '';
      })
    }
  }
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
    font-size: 24px;
    font-weight: bold;
    width: 100%;
  }

  .button {
    font-weight: bold;
  }
}
</style>