<template>
  <section class="util__container blog-container">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </section>
</template>

<script>
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return { story: { content: { } } }
  },
  computed: {
    url () {
      return `https://croak.io/${this.story.full_slug}`;
    },
    ogImage () {
      return `https://${this.story.content.og_image.slice(2)}`;
    },
    twitterImage () {
      return `https://${this.story.content.twitter_image.slice(2)}`;
    },
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published';
    let endpoint = `cdn/stories/blog/${context.params.slug}`;

    return context.app.$storyapi.get(endpoint, {
      version: version,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res.data;
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data });
    })
  },
  head() {
    return {
      title: this.story.content.name,
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': this.story.content.intro},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.story.content.name},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': this.url},
        {'vmid': 'og:image', 'property': 'og:image', 'content': this.ogImage},
        {'vmid': 'og:description', 'property': 'og:description', 'content': this.story.content.intro},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': this.story.content.name},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': this.story.content.intro},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': this.twitterImage},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': this.story.content.image_alt},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': this.story.content.name},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': this.story.content.intro},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': this.ogImage},
      ]
    }
  },
}
</script>

<style lang="scss">
@media screen and (max-width: 650px) {
  .blog-container {
    text-align: center;
  }
}
</style>