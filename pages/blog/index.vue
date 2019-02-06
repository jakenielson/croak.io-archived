<template>
  <section class="blog__section util__container util__flex-col">
    <h1 class="blog__header">Blog</h1>
    <search-bar :dataset="storyTitles" @filter="filter"/>
    <div class="blog__wrapper util__flex-col">
      <nuxt-link v-for="preview in filteredPreviews" :key="preview.id" class="article container with-title is-center" :to="'/blog/' + preview.slug">
        <p class="article__title title">{{ preview.name }}</p>
        <p class="article__description">{{ preview.intro }}</p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import SearchBar from '~/components/SearchBar.vue';

export default {
  middleware: ['loadPreviews', 'loadArticle'],
  components: {
    SearchBar,
  },
  data () {
    return { 
      total: 0,
      filteredTitles: [],
    }
  },
  computed: {
    previews() {
      return this.$store.state.previews;
    },
    root() {
      return this.$store.getters.getArticleBySlug('blog').content;
    },
    ogImage() {
      return `https://${this.root.og_image.slice(2)}`;
    },
    twitterImage() {
      return `https://${this.root.twitter_image.slice(2)}`;
    },
    storyTitles() {
      if (!this.previews) return [];
      return this.previews.map(preview => preview.name);
    },
    filteredPreviews() {
      return this.previews.filter(preview => this.filteredTitles.includes(preview.name));
    }
  },
  methods: {
    filter(filteredTitles) {
      this.filteredTitles = filteredTitles;
    },
  },
  head() {
    return {
      title: 'Blog',
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': this.root.description},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.root.title},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io/blog'},
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
  },
}
</script>

<style lang="scss">
.blog__section {
  align-items: center;
}

.blog__header {
  margin-bottom: 40px;
}

.article {
  margin: 40px;
  max-width: 600px;
}
</style>