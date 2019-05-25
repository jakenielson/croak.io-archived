<template>
  <div class="page-index-search is-centered">
    <h1 class="page-index-search__header">{{ name }}</h1>
    <b-field horizontal label="Search" custom-class="is-medium" class="search-input">
      <b-input name="search" size="is-medium" expanded v-model="query"></b-input>
    </b-field>
    <div class="tag-wrapper is-centered">
      <button v-for="(tag, index) in tagsWithStatuses" :key="index" @click="toggleTag(tag.tag)" class="tag-button" :class="{ 'has-background-primary': tag.status, 'has-text-white': tag.status, 'has-text-primary': !tag.status }" type="is-primary" outlined>{{ tag.tag }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'titles', 'tags'],
  data() {
    return {
      query: '',
      emitTimeout: null,
      selectedTags: [],
    }
  },
  computed: {
    filteredTitles() {
      return this.titles.filter(t => t.toLowerCase().includes(this.query.toLowerCase()));
    },
    tagsWithStatuses() {
      return this.tags.map(tag => {
        return {
          tag: tag,
          status: this.selectedTags.includes(tag)
        }
      })
    }
  },
  methods: {
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      } else {
        this.selectedTags.push(tag);
      }
    }
  },
  watch: {
    query() {
      if (this.emitTimeout) clearTimeout(this.emitTimeout);
      this.emitTimeout = setTimeout(() => {
        this.$emit('searchInput', this.filteredTitles);
      }, 100);
    },
    selectedTags() {
      this.$emit('tagInput', this.selectedTags);
    }
  },
  mounted() {
    this.$emit('searchInput', this.filteredTitles);
  }
}
</script>

<style lang="scss" scoped>
.page-index-search {
  margin: 40px 0;
  width: 600px;
  max-width: 80%;

  .search-input {
    padding-right: 96px;
  }

  .page-index-search__header {
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .tag-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    .tag-button {
      margin: 0 10px;
      font-weight: bold;
      border: none;
      box-shadow: none;
      outline: none;
      cursor: pointer;
      font-size: 18px;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
}
@media (max-width: 768px) {
  .page-index-search {
    .search-input {
      padding-right: 0;
    }
  }
}
</style>