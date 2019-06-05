<template>
  <div class="wrapper default-layout-wrapper">
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
.default-layout-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>