<template>
  <div class="search-bar__wrapper">
    <label class="search-bar__label" for="query">Search</label>
    <input class="search-bar__input input" v-model="query" type="text" id="query" name="query">
  </div>
</template>

<script>
export default {
  props: ['dataset'],
  data() {
    return {
      query: '',
      emitTimeout: null,
    }
  },
  computed: {
    filteredSet() {
      return this.dataset.filter(v => v.toLowerCase().includes(this.query.toLowerCase()));
    }
  },
  watch: {
    query() {
      if (this.emitTimeout) clearTimeout(this.emitTimeout);
      this.emitTimeout = setTimeout(() => {
        this.$emit('filter', this.filteredSet);
      }, 100);
    }
  },
  mounted() {
    this.$emit('filter', this.filteredSet);
  }
}
</script>

<style lang="scss">
.search-bar__label {
  width: 20%;
}
.search-bar__input {
  width: 70%;
}
</style>