import Vue from 'vue';
import Page from '~/components/bloks/Page.vue';
import Blog from '~/components/bloks/Blog.vue';
import Markdown from '~/components/bloks/Markdown.vue';
import Feature from '~/components/bloks/Feature.vue';
import FeaturedArticles from '~/components/bloks/FeaturedArticles.vue';
import Paragraph from '~/components/bloks/Paragraph.vue';
import BlogHeader from '~/components/bloks/BlogHeader.vue';
import BlogImage from '~/components/bloks/BlogImage.vue';

Vue.component('page', Page);
Vue.component('blog', Blog);
Vue.component('markdown', Markdown);
Vue.component('feature', Feature);
Vue.component('featured-articles', FeaturedArticles);
Vue.component('paragraph', Paragraph);
Vue.component('blog-header', BlogHeader);
Vue.component('blog-image', BlogImage);