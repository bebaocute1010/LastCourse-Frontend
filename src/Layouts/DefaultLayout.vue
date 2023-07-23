<template>
  <v-app style="position: relative">
    <loading :is_loading="loading"></loading>
    <SystemBar />
    <Header @search="search" :search_rs="search_rs" />

    <div id="body-content">
      <HomeNavigation v-if="$route?.name != 'shop-profile'" />
      <v-main>
        <div
          class="main-content"
          :style="{
            'margin-top': $route?.name == 'shop-profile' ? 0 : '-100vh',
            'padding-top': $route?.name == 'shop-profile' ? 0 : '24px',
          }"
        >
          <Alert />
          <router-view></router-view>
        </div>
      </v-main>
    </div>

    <footer v-if="$route?.name != 'payment'"><Footer /></footer>
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
