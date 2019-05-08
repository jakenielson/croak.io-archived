<template>
  <div v-editable="blok" class="section-grid-card box">
    <p class="content">
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
.section-grid-card {
  height: 180px;
  width: calc(50% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
