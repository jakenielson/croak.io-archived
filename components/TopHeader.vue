<template>
  <header class="top-header util__flex util__container">
    <nav class="top-header__col">
      <ul class="top-header__nav">
        <li v-for="(nav, index) in mainNav" :key="index">
          <nuxt-link class="top-header__link" :to="nav.link.cached_url">
            {{ nav.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    mainNav() {
      return this.$store.state.settings.main_nav;
    }
  }
}
</script>

<style lang="scss">
  .top-header {
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .top-header__nav {
    list-style: none;
    display: flex;
    flex-direction: row;

    .top-header__link {
      text-decoration: none;
      color: #41b883;
      margin: 0 5px;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>