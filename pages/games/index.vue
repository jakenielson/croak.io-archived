<template>
  <section class="section games__section">
    <page-index-search name="Games" :titles="gameTitles" :tags="gameTags" @searchInput="searchInput" @tagInput="tagInput"/>
    <div class="game-card-list">
      <nuxt-link v-for="game in filteredGames" :key="game.id" class="game-card card" :to="'/games/' + game.slug">
        <div class="card-header">
          <p class="card-header-title is-centered">
            {{ game.name }}
          </p>
        </div>
        <div class="card-image">
          <figure class="image is-3by1">
            <img :src="`https://${game.image.slice(2)}`" :alt="game.imageAlt">
          </figure>
        </div>
        <div class="card-content">
          <p class="content">
            {{ game.intro }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import PageIndexSearch from '~/components/PageIndexSearch.vue';

export default {
  middleware: 'loadGames',
  components: {
    PageIndexSearch,
  },
  data() {
    return {
      story: { content: {} },
      filteredTitles: [],
      selectedTags: []
    }
  },
  computed: {
    games() {
      return this.$store.state.games;
    },
    ogImage() {
      return `https://${this.story.content.og_image.slice(2)}`;
    },
    twitterImage() {
      return `https://${this.story.content.twitter_image.slice(2)}`;
    },
    gameTitles() {
      if (!this.games) return [];
      return this.games.map(game => game.name);
    },
    gameTags() {
      const res = [];
      if (!this.games) return res;
      this.games.forEach(game => {
        game.tags.forEach(tag => {
          if (!res.includes(tag)) res.push(tag);
        })
      });
      return res;
    },
    filteredGames() {
      return this.games.filter(game =>
        this.filteredTitles.includes(game.name)
        && (this.selectedTags.length === 0 || this.selectedTags.some(t => game.tags.indexOf(t) >= 0)));
    }
  },
  methods: {
    searchInput(filteredTitles) {
      this.filteredTitles = filteredTitles;
    },
    tagInput(selectedTags) {
      this.selectedTags = selectedTags;
    }
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'publisher';

    return context.app.$storyapi.get('cdn/stories/games', {
      version: version,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res.data
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
        {'vmid': 'description', 'name': 'description', 'content': this.story.content.description},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.story.content.title},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io/games'},
        {'vmid': 'og:image', 'property': 'og:image', 'content': this.ogImage},
        {'vmid': 'og:description', 'property': 'og:description', 'content': this.story.content.description},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': this.story.content.title},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': this.story.content.description},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': this.twitterImage},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': this.story.content.image_alt},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': this.story.content.title},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': this.story.content.description},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': this.ogImage},
      ]
    }
  }
}
</script>

<style lang="scss">
.games__section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  .game-card {
    height: auto;
    min-height: 325px;
    width: 400px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 5px;

    .card-header {
      font-size: 24px;
    }

    .card-content {
      font-size: 18px;
    }
  }
}
</style>