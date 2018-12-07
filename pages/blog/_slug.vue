<template>
  <section class="util__container">
    <div v-editable="story.content" class="blog">
      <nuxt-link class="blog__back-link" to="/blog"> &lt; Back </nuxt-link>
      <h1>{{ story.content.name }}</h1>
      <div class="blog__body" v-html="body">
      </div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return { story: { content: { body: '' } } }
  },
  computed: {
    body () {
      return marked(this.story.content.body)
    },
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
.blog {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 100px;

  img {
    width: 100%;
    height: auto;
  }
}

.blog__body {
  line-height: 1.6;
}

.blog__back-link {
  margin-left: -10px;
  font-size: 16px;
  font-weight: bold;
}
</style>