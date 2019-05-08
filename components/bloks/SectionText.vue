<template>
  <div v-editable="blok" class="section-text">
    <p>
      {{ blok.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss" scoped>
.section-text {
  p {
    font-size: 48px;
    text-align: center;
    font-weight: bold;
    padding: 0 40px;
  }
}
</style>
