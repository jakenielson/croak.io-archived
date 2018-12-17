<template>
  <div v-editable="blok" class="featured-articles util__flex-col util__container">
    <h2 class="featured-articles__header">Featured Articles</h2>
    <div class="featured-articles__wrapper util__flex-col">
      <nuxt-link v-for="article in blok.articles" :key="article._uid" class="featured-article container with-title is-center" :to="article.link.cached_url">
        <p class="featured-article__title title">{{ article.title }}</p>
        <p class="featured-article__description">{{ article.description }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.featured-articles__header {
  text-align: center;
}
.featured-articles__wrapper {
  flex-grow: 1;
  margin-top: 20px;

  .featured-article {
    cursor: pointer;
    max-width: 500px;
    margin: 20px 0;

    &:first-child {
      margin-top: 0px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>