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
  },
  head() {
    return {
      title: 'Croak',
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': 'Cross the road and get all the frogs home!'},
        {'vmid': 'og:title', 'property': 'og:title', 'content': 'Play Croak!'},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io/games/croak'},
        {'vmid': 'og:image', 'property': 'og:image', 'content': 'https://croak.io/logo.png'},
        {'vmid': 'og:description', 'property': 'og:description', 'content': 'Cross the road and get all the frogs home!'},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': 'Play Croak!'},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': 'Cross the road and get all the frogs home!'},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': 'https://croak.io/logo.png'},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': 'croak.io logo'},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': 'Play Croak!'},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': 'Cross the road and get all the frogs home!'},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': 'https://croak.io/logo.png'},
      ]
    }
  },
}
</script>

<style lang="scss">
.game {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 100px;
}
</style>