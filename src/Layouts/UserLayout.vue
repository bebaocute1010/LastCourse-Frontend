<template>
  <v-app style="position: relative">
    <SystemBar />
    <Header />
    <div id="body-content">
      <v-row>
        <Alert />
        <UserNavigation />

        <v-main style="background: #e5e5e5">
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

export default {
  name: "UserLayout",
  components: { UserNavigation, Header, SystemBar },
};
</script>

<style>
.container {
  max-width: 1200px;
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
