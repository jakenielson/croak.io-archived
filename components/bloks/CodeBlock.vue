<template>
  <div class="code-block container with-title">
    <p v-editable="blok" class="code-block__title title">{{ blok.title }}</p>
    <pre v-editable="blok" class="code-block__body prettyprint lang-js" :class="`lang-${blok.lang || 'js'}`">{{ blok.code }}</pre>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>