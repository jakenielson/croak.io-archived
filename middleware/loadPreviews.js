export default function ({ app, isServer, route, store, isDev }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published';

  if (store.state.previews.length === 0) {
    return store.dispatch('loadPreviews', {version: version})
  }
}