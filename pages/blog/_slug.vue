<template>
  <section class="blog-container">
    <div class="blog-hero__background" :class="article.content.hero_color">
      <img class="blog-hero__image" :src="heroImage"/>
    </div>
    <component v-if="article.content.component" :key="article.content._uid" :blok="article.content" :is="article.content.component"></component>
  </section>
</template>

<script>
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  middleware: 'loadArticle',
  data () {
    return { 
      slug: '',
    }
  },
  computed: {
    article() {
      return this.$store.getters.getArticleBySlug(this.slug);
    },
    url () {
      return `https://croak.io/${this.article.full_slug}`;
    },
    ogImage () {
      return `https://${this.article.content.og_image.slice(2)}`;
    },
    twitterImage () {
      return `https://${this.article.content.twitter_image.slice(2)}`;
    },
    heroImage() {
      return `https://${this.article.content.hero_image.slice(2)}`;
    }
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.params;
  },
  head() {
    return {
      title: this.article.content.name,
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': this.article.content.intro},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.article.content.name},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': this.url},
        {'vmid': 'og:image', 'property': 'og:image', 'content': this.ogImage},
        {'vmid': 'og:description', 'property': 'og:description', 'content': this.article.content.intro},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': this.article.content.name},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': this.article.content.intro},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': this.twitterImage},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': this.article.content.image_alt},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': this.article.content.name},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': this.article.content.intro},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': this.ogImage},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.blog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-hero__background {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
}
.blog-hero__image {
  width: 100%;
  object-fit: contain;
  image-rendering: pixelated;
}
</style>