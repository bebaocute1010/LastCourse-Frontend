<script>
import Loading from "../components/Loading.vue";

export default {
  name: "Admin",
  components: {Loading},
  data() {

  },
  methods: {

  }
}
</script>

<template>
  <Alert />
  <loading :is_loading="loading"></loading>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

    <v-app-bar
        color="grey-lighten-2"
        flat
        title="Admin dashboard"
    >
    </v-app-bar>

    <v-main class="d-flex align-center justify-center pl-10 pr-10 pt-10 pb-10" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>