<template>
  <div class="code-block card">
    <header class="card-header has-background-dark">
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
  width: calc(100% - 100px);
  margin: 20px 0 60px 0;

  .card-header {
    .card-header-title {
      color: white;
    }
  }
  
  .card-content {
    overflow-x: scroll;

    .code-block__body {
      border: none;
      padding: 0 20px;
    }
  }
}
</style>