import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      settings: {
        main_nav: []
      },
      articles: [],
    },
    getters: {
      getArticleBySlug: (state) => (slug) => {
        return state.articles.find(article => article.slug === slug)
      }
    },
    mutations: {
      setSettings(state, settings) {
        state.settings = settings;
      },
      setCacheVersion(state, version) {
        state.cacheVersion = version;
      },
      setArticles(state, articles) {
        state.articles = articles;
      }
    },
    actions: {
      loadSettings({ commit }, context) {
        return this.$storyapi.get('cdn/stories/settings', {
          version: context.version
        }).then((res) => {
          commit('setSettings', res.data.story.content);
        })
      },
      loadArticles({ commit }, context) {
        return this.$storyapi.get('cdn/stories', {
          version: context.version,
          starts_with: `blog`,
          cv: context.cacheVersion
        }).then((res) => {
          commit('setArticles', res.data.stories);
        })
      }
    }
  })
}

export default createStore;