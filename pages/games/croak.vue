<template>
  <section class="util__container">
    <div v-editable="story.content" class="game">
      <nuxt-link class="game__back-link" to="/games"> &lt; Back </nuxt-link>
      <h1>{{ story.content.name }}</h1>
      <Croak />
    </div>
  </section>
</template>

<script>
import Croak from '~/components/games/Croak.vue';

export default {
  components: {
    Croak,
  },
  data() {
    return { story: { content: { name: '' }} }
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    let endpoint = `cdn/stories/games/croak`

    return context.app.$storyapi.get(endpoint, {
      version: version,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res.data;
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang="scss">
.game {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 100px;
}
</style>