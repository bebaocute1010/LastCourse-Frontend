<template>
  <v-navigation-drawer id="home-nav" v-model="drawer" rail="true" permanent>
    <v-list density="comfortable">
      <v-list-item-group>
        <v-list-item
          value="search"
          key="search"
          :to="{ name: 'search' }"
          class="user-not-select"
        >
          <v-icon>mdi-home</v-icon>
        </v-list-item>

        <v-list-item
          value="home"
          key="home"
          :to="{ name: 'home' }"
          class="user-not-select"
        >
          <div class="v-list-item__image-prepend">
            <img src="src/assets/logo.svg" />
          </div>
        </v-list-item>

        <v-list-item value="notify" key="notify" class="user-not-select item-badge">
          <v-badge v-if="number_notify > 0" :content="number_notify" color="#0074BD">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell</v-icon>
        </v-list-item>

        <v-list-item
          value="cart"
          key="cart"
          class="user-not-select item-badge"
          :to="{ name: 'cart' }"
        >
          <v-badge v-if="number_cart" :content="number_notify" color="#0074BD">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
        </v-list-item>

        <v-list-item value="logout" key="logout" class="user-not-select">
          <v-icon>mdi-logout</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HomeNavigation",
  data() {
    return {
      drawer: true,
      number_notify: 3,
      number_chat: 5,
      number_cart: 0,
      active_logo: false,
    };
  },
};
</script>

<style>
.v-navigation-drawer {
  position: sticky !important;
  position: -webkit-sticky !important;
  height: 100vh !important;
}
.v-navigation-drawer.sticky {
  position: absolute !important;
  top: 0;
}
.v-list-item {
  position: relative;
}
.v-list-item__image-prepend {
  width: 24px;
  height: 24px;
}
.v-list-item__image-prepend img {
  object-fit: cover;
  max-width: 100%;
}
</style>
