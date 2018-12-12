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