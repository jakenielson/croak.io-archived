export default function ({ app, isServer, route, store, isDev }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published';

  if (isServer) {
    store.commit('setCacheVersion', app.$storyapi.cacheVersion)
  }

  if (!store.state.settings._uid) {
    return store.dispatch('loadSettings', {version: version})
  }
}