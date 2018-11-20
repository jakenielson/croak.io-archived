<template>
  <section class="util__container">
    <div v-for="game in data.stories" :key="game.content._uid" class="game__overview">
      <h2>
        <nuxt-link class="game__detail-link" :to="'/' + game.full_slug">
          {{ game.content.name }}
        </nuxt-link>
      </h2>
      <small>
        {{ game.published_at }}
      </small>
      <p>
        {{ game.content.description }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { total: 0, data: { stories: [] } }
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'publisher';

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `games`,
      cv: context.store.state.cacheVersion
    }).then((res) => {
      return res
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang="scss">
.game__overview {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 60px;

  p {
    line-height: 1.6;
  }
}

.game__detail-link {
  color: #3b8070;
  text-decoration: none;
}
</style>