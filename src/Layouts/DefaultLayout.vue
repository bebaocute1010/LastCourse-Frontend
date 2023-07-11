<template>
  <v-app style="position: relative">
    <loading :is_loading="loading"></loading>
    <SystemBar />
    <header><Header @search="search" :search_rs="search_rs" /></header>

    <div id="body-content">
      <HomeNavigation v-if="!hidden_nav ?? true" />
      <v-main>
        <div
          class="main-content"
          :style="{
            'margin-top': hidden_nav ? 0 : '-100vh',
            'padding-top': hidden_nav ? 0 : '24px',
          }"
        >
          <Alert />
          <slot></slot>
        </div>
      </v-main>
    </div>

    <footer v-if="!hidden_footer ?? true"><Footer /></footer>
  </v-app>
</template>

<script>
import Alert from "../components/Alert.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import HomeNavigation from "../components/HomeNavigation.vue";
import SystemBar from "../components/SystemBar.vue";
import Loading from "../components/Loading.vue";
export default {
  components: { SystemBar, Header, Alert, HomeNavigation, Footer, Loading },
  name: "DefaultLayout",
  data() {
    return {};
  },
  props: {
    search_rs: {
      type: Array,
      required: false,
    },
    hidden_footer: {
      type: Boolean,
      required: false,
      default: false,
    },
    hidden_nav: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    search(value) {
      this.$emit("search", value);
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 24px 0 24px;
  width: 100vw;
  background: #e5e5e5;
}
#body-content {
  position: relative;
}
.v-main {
  padding: 0 !important;
}
</style>
