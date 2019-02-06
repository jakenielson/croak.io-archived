import Vuex from 'vuex';
import Vue from 'vue';

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      settings: {
        main_nav: []
      },
      articles: {},
      previews: [],
    },
    getters: {
      getArticleBySlug: (state) => (slug) => {
        for (let uuid in state.articles) {
          if (state.articles[uuid].slug === slug) return state.articles[uuid];
        } return null;
      },
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
      },
      setPreviews(state, previews) {
        state.previews = previews;
      },
      setArticle(state, article) {
        Vue.set(state.articles, article.uuid, article);
      },
    },
    actions: {
      loadSettings({ commit }, context) {
        return this.$storyapi.get('cdn/stories/settings', {
          version: context.version
        }).then((res) => {
          commit('setSettings', res.data.story.content);
        })
      },
      loadPreviews({ commit }, context) {
        return this.$storyapi.get('cdn/stories', {
          version: context.version,
          cv: context.cacheVersion,
          starts_with: `blog`,
          is_startpage: `0`,
          excluding_fields: `body,component,image_alt,og_image,twitter_image`
        }).then((res) => {
          const previews = res.data.stories.map((story) => {
            return {
              id: story.uuid,
              slug: story.slug,
              name: story.content.name,
              intro: story.content.intro
            }
          });
          commit('setPreviews', previews);
        })
      },
      loadArticle({ commit }, context) {
        return this.$storyapi.get(`cdn/stories/blog/${context.slug || ''}`, {
          version: context.version,
          cv: context.cacheVersion
        }).then((res) => {
          commit('setArticle', res.data.story);
        })
      },
    }
  })
}

export default createStore;