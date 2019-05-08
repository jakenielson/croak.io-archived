<template>
  <div v-editable="blok" class="section-contact">
    <b-field horizontal label="From" custom-class="is-medium">
      <b-input name="name" placeholder="Name" size="is-medium" expanded></b-input>
      <b-input name="email" type="email" placeholder="you@email.com" size="is-medium" expanded></b-input>
    </b-field>
     <b-field horizontal label="Subject" custom-class="is-medium">
      <b-input name="subject" :placeholder="blok.subject_placeholder" size="is-medium" expanded></b-input>
    </b-field>
    <b-field horizontal label="Message" custom-class="is-medium">
      <b-input type="textarea" rows="10" :placeholder="blok.body_placeholder" size="is-medium" expanded></b-input>
    </b-field>
    <b-field horizontal>
      <p class="control">
        <button class="button is-primary is-medium">
          Send message
        </button>
      </p>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['blok'],
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
