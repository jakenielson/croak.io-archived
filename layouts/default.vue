<template>
  <div class="wrapper">
    <top-header/>
    <main id="main" role="main">
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

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>