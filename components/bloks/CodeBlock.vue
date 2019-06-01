<template>
  <div class="code-block card">
    <header class="card-header has-background-dark">
    <!-- <header class="card-header has-background-primary"> -->
      <p v-editable="blok" class="card-header-title">{{ blok.title }}</p>
    </header>
    <div class="card-content has-background-light">
      <pre v-editable="blok" class="code-block__body prettyprint lang-js has-background-light" :class="`lang-${blok.lang || 'js'}`">{{ blok.code }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss" scoped>
.code-block {
  width: 100%;
  margin: 20px 0 36px 0;

  .card-header {
    .card-header-title {
      color: white;
      font-family: 'Press Start 2P', cursive;
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: none;
      padding: 20px;
      font-size: 18px;
      overflow-x: scroll;
    }
  }
  
  .card-content {
    overflow-x: scroll;

    .code-block__body {
      border: none;
      padding: 0 25px;
    }
  }
}
</style>