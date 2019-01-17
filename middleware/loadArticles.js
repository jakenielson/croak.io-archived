export default function ({ app, isServer, route, store, isDev }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published';

  if (store.state.articles.length === 0) {
    return store.dispatch('loadArticles', {version: version})
  }
}