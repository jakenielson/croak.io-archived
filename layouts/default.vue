<template>
  <div class="wrapper">
    <top-header/>
    <main id="main" role="main" class="">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue';

export default {
  components: {
    TopHeader
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>