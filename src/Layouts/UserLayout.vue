<template>
  <v-app>
    <v-layout class="user-layout">
      <SystemBar/>
      <Header/>

      <UserNavigation/>

      <v-main class="main-content">
        <slot></slot>
      </v-main>

      <v-navigation-drawer location="right">
        <v-list>
          <v-list-item title="Drawer right"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-app>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";
import Header from "@/components/Header.vue";
import UserNavigation from "@/components/UserNavigation.vue";

export default {
  name: "UserLayout",
  components: {UserNavigation, Header, SystemBar}
}
</script>

<style>
.container {
  max-width: 1200px;
}

.user-layout {
  background: #E5E5E5;
}

.main-content {

}
</style>