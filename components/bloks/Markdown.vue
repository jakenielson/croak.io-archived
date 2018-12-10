<template>
  <div v-editable="blok" class="markdown">
    <div class="markdown__body" v-html="body">
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  props: ['blok'],
  computed: {
    body () {
      return marked(this.blok.markdown)
    },
  }
}
</script>