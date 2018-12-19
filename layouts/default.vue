<template>
  <div class="wrapper util__flex-col">
    <top-header/>
    <main id="main" role="main" class="util__flex-col util__flex-start ">
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
}

#main {
  flex: 1;

  &.main__game {
    margin-top: -30px;
  }
}
@media screen and (max-width: 650px) {
  #main {
    margin-top: 73px;
    
    &.main__game {
      margin-top: 0;
    }
  }
}
</style>