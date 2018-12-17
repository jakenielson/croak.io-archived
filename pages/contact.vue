<template>
  <section class="contact__section util__container util__flex-col">
    <h1 class="contact__header">Contact</h1>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    <contact-form></contact-form>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview';
import ContactForm from '~/components/ContactForm.vue';

export default {
  components: {
    ContactForm
  },
  data () {
    return { story: { content: {} } }
  },
  computed: {
    ogImage () {
      return `https://${this.story.content.og_image.slice(2)}`;
    },
    twitterImage () {
      return `https://${this.story.content.twitter_image.slice(2)}`;
    },
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    return context.app.$storyapi.get('cdn/stories/contact', {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  },
  head() {
    return {
      title: 'Contact',
      titleTemplate: 'croak.io | %s',
      meta: [
        {'charset': 'utf-8'},
        {'Content-Type': 'text/html'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'},
        {'vmid': 'description', 'name': 'description', 'content': this.story.content.description},
        {'vmid': 'og:title', 'property': 'og:title', 'content': this.story.content.title},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io'},
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
.contact__section {
  align-items: center;
}
.contact-form {
  width: 100%;
}
</style>