<template>
  <section class="util__container">
    <div :key="blogPost.content._uid" v-for="blogPost in data.stories" class="blog__overview">
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
export default {
  data () {
    return { total: 0, data: { stories: [] } }
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
        {'vmid': 'description', 'name': 'description', 'content': 'Game development, the internet, and design.'},
        {'vmid': 'og:title', 'property': 'og:title', 'content': 'Read my blog!'},
        {'vmid': 'og:site_name', 'property': 'og:site_name', 'content': 'croak.io'},
        {'vmid': 'og:type', 'property': 'og:type', 'content': 'website'},
        {'vmid': 'og:url', 'property': 'og:url', 'content': 'https://croak.io/blog'},
        {'vmid': 'og:image', 'property': 'og:image', 'content': 'https://croak.io/logo.png'},
        {'vmid': 'og:description', 'property': 'og:description', 'content': 'Game development, the internet, and design.'},
        {'vmid': 'twitter:card', 'name': 'twitter:card', 'content': 'summary'},
        {'vmid': 'twitter:site', 'name': 'twitter:site', 'content': '@croak_io'},
        {'vmid': 'twitter:title', 'name': 'twitter:title', 'content': 'Read my blog!'},
        {'vmid': 'twitter:description', 'name': 'twitter:description', 'content': 'Game development, the internet, and design.'},
        {'vmid': 'twitter:image', 'name': 'twitter:image', 'content': 'https://croak.io/logo.png'},
        {'vmid': 'twitter:image:alt', 'name': 'twitter:image:alt', 'content': 'croak.io logo'},
        {'vmid': 'itemprop:name', 'itemprop': 'name', 'content': 'Read my blog!'},
        {'vmid': 'itemprop:description', 'itemprop': 'description', 'content': 'Game development, the internet, and design.'},
        {'vmid': 'itemprop:image', 'itemprop': 'image', 'content': 'https://croak.io/logo.png'},
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