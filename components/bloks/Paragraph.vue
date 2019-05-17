<template>
  <p v-editable="blok" class="paragraph">
    {{ blok.text }}
  </p>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss" scoped>
.paragraph {
  padding: 0 50px;
  margin-bottom: 1.5em;
  font-size: 24px;
  font-weight: 300;
  text-align: start;
  width: 100%;
}
</style>