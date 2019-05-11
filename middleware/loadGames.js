export default function ({ app, isServer, route, store, isDev }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published';

  if (store.state.games.length === 0) {
    return store.dispatch('loadGames', {version: version})
  }
}