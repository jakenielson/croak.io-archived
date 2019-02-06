export default function ({ app, isServer, route, store, isDev, params }) {
  let version = route.query._storyblok || isDev ? 'draft' : 'published';
  
  let article = store.getters.getArticleBySlug(params.slug);

  if (article && article.content.body) return;

  return store.dispatch('loadArticle', {slug: params.slug, version: version})
}
