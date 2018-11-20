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
    }
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
  }
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
  text-decoration: none;
  color: #3b8070;
  // margin: 0 5px;
  margin-left: -10px;
  font-size: 16px;
  font-weight: bold;
}
</style>