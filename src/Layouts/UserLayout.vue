<template>
  <v-app style="position: relative">
    <loading :is_loading="loading"></loading>
    <SystemBar
      :dialog="dialog_shop_update"
      @closeDialogShopUpdate="dialog_shop_update = false"
    />
    <Header />
    <div id="body-content">
      <v-row>
        <Alert />
        <UserNavigation @openDialogShopUpdate="openDialogShopUpdate" />

        <v-main style="background: #e5e5e5; max-width: 75%">
          <div class="main-content">
            <slot></slot>
          </div>
        </v-main>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";
import Header from "@/components/Header.vue";
import UserNavigation from "@/components/UserNavigation.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "UserLayout",
  components: { UserNavigation, Header, SystemBar, Loading },
  data() {
    return {
      dialog_shop_update: false,
    };
  },
  methods: {
    openDialogShopUpdate() {
      this.dialog_shop_update = true;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1175px;
}
.body-content {
  position: relative;
}
.user-layout {
  background: #e5e5e5;
}

.main-content {
  padding: 0 30px;
  background-color: #e5e5e5;
}
.v-row {
  margin: unset !important;
}
</style>
