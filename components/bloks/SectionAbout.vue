<template>
  <div v-editable="blok" class="section-about">
    <div class="markdown">
      <div class="markdown__body" v-html="body">
      </div>
    </div>
    <component :key="blok._uid" v-for="blok in blok.contact" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  props: ['blok'],
  computed: {
    body () {
      return marked(this.blok.content)
    },
  }
}
</script>

<style lang="scss" scoped>
.section-about {
  .markdown {
    padding-left: 120px;
    font-size: 24px;
    font-weight: 300;
    width: 100%;
  }
}
@media (max-width: 1087px) {
  .section-about {
    .markdown {
      padding-left: 0;
    }
  }
}
</style>
