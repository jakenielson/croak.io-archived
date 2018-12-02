<template>
  <section class="util__container">
    <search-bar :dataset="storyTitles" @filter="filter"/>
    <div :key="blogPost.content._uid" v-for="blogPost in filteredStories" v-if="blogPost.name !== 'root'" class="blog__overview">
      <h2>
        <nuxt-link class="blog__detail-link" :to="'/' + blogPost.full_slug">
          {{ blogPost.content.name }}
        </nuxt-link>
      </h2>
      <small>
        {{ blogPost.published_at }}
      </small>
      <p>
        {{ blogPost.content.intro }}
      </p>
    </div>
  </section>
</template>

<script>
import SearchBar from '~/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data () {
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
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'publisher';

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `blog`,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
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
.blog__overview {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 60px;

  p {
    line-height: 1.6;
  }
}

.blog__detail-link {
  color: #3b8070;
  text-decoration: none;
}
</style>