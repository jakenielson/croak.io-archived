<template>
  <section class="section blog__section">
    <page-index-search name="Blog" :titles="storyTitles" :tags="storyTags" @searchInput="searchInput" @tagInput="tagInput"/>
    <div class="blog-card-list">
      <nuxt-link v-for="preview in filteredPreviews" :key="preview.id" class="page-card card" :to="'/blog/' + preview.slug">
        <div class="card-header">
          <p class="card-header-title is-centered">
            {{ preview.name }}
          </p>
        </div>
        <div class="card-image">
          <figure class="image is-3by1">
            <img :src="`https://${preview.image.slice(2)}`" :alt="preview.imageAlt">
          </figure>
        </div>
        <div class="card-content">
          <p class="content">
            {{ preview.intro }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import PageIndexSearch from '~/components/PageIndexSearch.vue';

export default {
  middleware: ['loadPreviews', 'loadArticle'],
  components: {
    PageIndexSearch,
  },
  data () {
    return { 
      filteredTitles: [],
      selectedTags: [],
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
    storyTags() {
      const res = [];
      if (!this.previews) return res;
      this.previews.forEach(preview => {
        preview.tags.forEach(tag => {
          if (!res.includes(tag)) res.push(tag);
        })
      });
      return res;
    },
    filteredPreviews() {
      return this.previews.filter(preview =>
        this.filteredTitles.includes(preview.name)
        && (this.selectedTags.length === 0 || this.selectedTags.some(t => preview.tags.indexOf(t) >= 0)));
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  .page-card {
    height: auto;
    min-height: 325px;
    width: 400px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }
}
</style>