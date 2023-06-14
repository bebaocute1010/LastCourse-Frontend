<template>
  <v-app style="position: relative">
    <SystemBar />
    <header><Header @search="search" :search_rs="search_rs" /></header>

    <div id="body-content">
      <HomeNavigation />
      <Alert />
      <v-main>
        <div class="main-content">
          <slot></slot>
        </div>
      </v-main>
    </div>

    <footer><Footer /></footer>
  </v-app>
</template>

<script>
import Alert from "../components/Alert.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import HomeNavigation from "../components/HomeNavigation.vue";
import SystemBar from "../components/SystemBar.vue";
export default {
  components: { SystemBar, Header, Alert, HomeNavigation, Footer },
  name: "DefaultLayout",
  data() {
    return {};
  },
  props: {
    search_rs: {
      type: Array,
      required: false,
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
  padding: 24px 0 0;
  width: 100vw;
  background: #e5e5e5;
  margin-top: -100vh;
}
#body-content {
  position: relative;
}
.v-main {
  padding: 0 !important;
}
#app {
}
</style>
