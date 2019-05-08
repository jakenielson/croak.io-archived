<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img :src="getSrc(siteLogo)" class="logo">
      <!-- <nuxt-link class="navbar-item" to="/">
        <img :src="getSrc(siteLogo)" class="logo">
      </nuxt-link> -->
      <a role="button" class="navbar-burger burger" :class="activeClass" aria-label="menu" aria-expanded="false" data-target="main-navbar" @click="toggleNav">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="main-navbar" class="navbar-menu" :class="activeClass">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" v-for="(nav, index) in mainNav" :key="index" :to="nav.link.cached_url" @click.native="closeNav">
          {{ nav.name }}
        </nuxt-link>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" v-for="(nav, index) in subNav" :key="index" :href="nav.link.cached_url" target="_blank" @click.native="closeNav">
          <b-icon
            pack="fab"
            icon="twitter"
            size="is-medium">
          </b-icon>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    mainNav() {
      return this.$store.state.settings.main_nav;
    },
    subNav() {
      return this.$store.state.settings.sub_nav;
    },
    collapseIcon() {
      return this.$store.state.settings.collapse_icon;
    },
    siteLogo() {
      return this.$store.state.settings.site_logo;
    },
    activeClass() {
      return this.isOpen ? 'is-active' : '';
    }
  },
  methods: {
    getSrc(src) {
      return `https://${src.slice(2)}`;
    },
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
    closeNav() {
      this.isOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  // text-shadow: 2px 2px 2px black;
  font-weight: bold;
  font-size: 12px;
  max-height: 40px;
}
.logo {
  position: relative;
  width: 160px;
  height: 120px;
  max-height: 200px;
  top: 5px;
}
.navbar-burger {
  span {
    height: 2px;
  }
}
@media screen and (max-width: 1087px) {
  .navbar-menu.is-active {
    position: absolute;
    top: 52px;
    right: 0;
    width: 150px;
    // font-size: 20px;
  }
}
@media screen and (max-width: 768px) {
  .logo {
    width: 120px;
    height: 90px;
  }
}
</style>