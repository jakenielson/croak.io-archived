<template>
  <div v-editable="blok" class="featured-articles util__flex util__container">
    <h1>Featured Articles:</h1>
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
.featured-articles__wrapper {
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  .featured-article {
    cursor: pointer;
    color: #000;
    text-decoration: none;
    margin: 20px 0px;
    max-width: 500px;
  }
}
</style>