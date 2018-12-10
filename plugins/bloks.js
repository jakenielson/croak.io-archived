import Vue from 'vue';
import Page from '~/components/bloks/Page.vue';
import Markdown from '~/components/bloks/Markdown.vue';
import TitledText from '~/components/bloks/TitledText.vue';
import Feature from '~/components/bloks/Feature.vue';
import FeaturedArticles from '~/components/bloks/FeaturedArticles.vue';

Vue.component('page', Page);
Vue.component('markdown', Markdown);
Vue.component('titled-text', TitledText);
Vue.component('feature', Feature);
Vue.component('featured-articles', FeaturedArticles);