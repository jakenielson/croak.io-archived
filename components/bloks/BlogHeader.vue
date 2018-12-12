<template>
  <h3 v-editable="blok" class="blog-header">
    {{ blok.text }}
  </h3>
</template>

<script>
export default {
  props: ['blok'],
}
</script>