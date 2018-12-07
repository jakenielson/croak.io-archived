<template>
  <div v-editable="blok" class="featured-articles util__flex util__container">
    <h2 class="featured-articles__header">Featured Articles</h2>
    <div class="featured-articles__wrapper util__flex">
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
.featured-articles {
  display: flex;
  flex-direction: column;
}
.featured-articles__header {
  text-align: center;
  margin-bottom: 40px;
}
.featured-articles__wrapper {
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .featured-article {
    cursor: pointer;
    color: #000;
    text-decoration: none;
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