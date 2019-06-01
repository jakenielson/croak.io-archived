<template>
  <div v-editable="blok" class="section-contact">
    <b-field horizontal label="From" custom-class="is-medium">
      <b-input v-model="name" name="name" placeholder="Name" size="is-medium" expanded></b-input>
      <b-input v-model="email" name="email" type="email" placeholder="you@email.com" size="is-medium" expanded></b-input>
    </b-field>
     <b-field horizontal label="Subject" custom-class="is-medium">
      <b-input v-model="subject" name="subject" :placeholder="blok.subject_placeholder" size="is-medium" expanded></b-input>
    </b-field>
    <b-field horizontal label="Message" custom-class="is-medium">
      <b-input v-model="body" type="textarea" rows="5" :placeholder="blok.body_placeholder" size="is-medium" expanded></b-input>
    </b-field>
    <b-field horizontal>
      <p class="control">
        <button class="button is-primary is-medium" @click="sendEmail">
          Send message
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
      name: '',
      email: '',
      subject: '',
      body: '',
    }
  },
  methods: {
    sendEmail() {
      axios.post('/api/contact', {
        name: this.name,
        email: this.email,
        subject: this.subject,
        body: this.body
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.section-contact {
  width: 100%;
  
  .button {
    font-weight: bold;
  }
}
</style>
