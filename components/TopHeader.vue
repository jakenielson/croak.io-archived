<template>
  <header id="top-header" class="top-header">
    <i class="nes-logo top-header__open" @click="openNav"></i>
    <div class="top-header__wrapper util__flex" :class="{'is-open': isOpen}">
      <i class="icon close top-header__close" v-if="isOpen" @click="closeNav"></i>
      <nav class="top-header__col">
      <ul class="top-header__nav">
        <li class="top-header__nav-item" v-for="(nav, index) in mainNav" :key="index">
          <nuxt-link class="top-header__link" :to="nav.link.cached_url">
            <button class="btn">{{ nav.name }}</button>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <nav class="top-header__col">
      <ul class="top-header__nav top-header__social">
        <li class="top-header__nav-item" v-for="(nav, index) in socialNav" :key="index">
          <a class="top-header__link" :href="nav.link.cached_url"><img class="top-header__icon" :src="getSrc(nav.icon)"></a>
        </li>
      </ul>
    </nav>
    </div>
  </header>
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
    socialNav() {
      return this.$store.state.settings.social_nav;
    }
  },
  methods: {
    getSrc(src) {
      return `https://${src.slice(2)}`;
    },
    openNav() {
      this.isOpen = true;
    },
    closeNav() {
      this.isOpen = false;
    }
  }
}
</script>

<style lang="scss">
  .top-header {
    justify-content: space-between;
    padding: 30px;
  }

  .top-header__wrapper {
    justify-content: space-between;
    max-width: calc(100% - 40px);
  }

  .top-header__open {
    display: none;
    cursor: pointer;
  }

  .top-header__close {
    display: none;
    cursor: pointer;
  }

  .top-header__nav {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding-left: 0;

    .top-header__link {
      margin: 0 5px;
      font-size: 1em;
      font-weight: bold;

      .top-header__icon {
        height: 32px;
        width: 32px;
        margin: 7px;
        image-rendering: pixelated;
      }
    }
  }
  @media screen and (max-width: 650px) {
    .util__flex.top-header__wrapper, .util__flex.top-header {
      display: none;
    }

    .util__flex.top-header__wrapper.is-open {
      display: flex;
      position: fixed;
    }

    .top-header__open {
      display: block;
      position: absolute;
    }

    .top-header__close {
      display: block;
      margin: 30px;
    }

    .top-header__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      flex-direction: column;
      width: 180px;
      z-index: 999;
      background-color: #fff;
      box-shadow: 2px 2px lightgrey;

      .top-header__nav {
        flex-direction: column;
        padding-left: 0;
        align-items: center;
        justify-content: space-between;

        .top-header__nav-item {
          padding: 20px 5px;
        }
      }

      .top-header__social {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
</style>