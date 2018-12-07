<template>
  <section class="games__section util__container util__flex-col">
    <h1 class="games__header">Games</h1>
    <search-bar :dataset="storyTitles" @filter="filter"/>
    <div class="games__wrapper util__flex-wrap">
      <nuxt-link v-for="game in filteredStories" :key="game.content._uid" v-if="game.name !== 'root'" class="game container with-title is-center" :to="'/' + game.full_slug">
        <p class="game__title title">{{ game.content.name }}</p>
        <p class="game__description">{{ game.content.description }}</p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import SearchBar from '~/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return { 
      total: 0,
      data: {
        stories: []
      },
      filteredTitles: [],
    }
  },
  computed: {
    root() {
      for (let i = 0; i < this.data.stories.length; i++) {
        if (this.data.stories[i].name === 'root') return this.data.stories[i].content;
      }
    },
    ogImage() {
      return `https://${this.root.og_image.slice(2)}`;
    },
    twitterImage() {
      return `https://${this.root.twitter_image.slice(2)}`;
    },
    storyTitles() {
      if (!this.data.stories) return [];
      return this.data.stories.map(story => story.name);
    },
    filteredStories() {
      return this.data.stories.filter(story => this.filteredTitles.includes(story.name));
    }
  },
  methods: {
    filter(filteredTitles) {
      this.filteredTitles = filteredTitles;
    },
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'publisher';

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `games`,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  },
  head() {
    return {
      title: 'Games',
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': this.root.description},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.root.title},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io/games'},
        {'vmid': 'og:image', 'property': 'og:image', 'content': this.ogImage},
        {'vmid': 'og:description', 'property': 'og:description', 'content': this.root.description},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': this.root.title},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': this.root.description},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': this.twitterImage},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': this.root.image_alt},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': this.root.title},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': this.root.description},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': this.ogImage},
      ]
    }
  }
}
</script>

<style lang="scss">
.games__section {
  align-items: center;
}

.game {
  margin: 40px;
  max-width: 600px;
}
</style>