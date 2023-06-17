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

        <v-menu open-on-click location="right">
          <template v-slot:activator="{ props }">
            <v-list-item key="notify" class="user-not-select item-badge" v-bind="props">
              <v-badge v-if="number_notify > 0" :content="number_notify" color="#0074BD">
                <v-icon>mdi-bell</v-icon>
              </v-badge>
              <v-icon v-else>mdi-bell</v-icon>
            </v-list-item>
          </template>

          <v-list class="notifies-list">
            <div class="notify-item">
              <v-list-item v-for="notify in notifies" :key="notify.id">
                <v-list-item-title>{{ notify.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ notify.content }}</v-list-item-subtitle>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>

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

        <v-list-item key="logout" class="user-not-select">
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
      notifies: [
        {
          id: 1,
          title: "Xác nhận đơn hàng",
          content: "Đơn hàng 12345 của bạn đã được xác nhận",
        },
        {
          id: 2,
          title: "Xác nhận đơn hàng",
          content: "Đơn hàng 12345 của bạn đã được xác nhận",
        },
        {
          id: 3,
          title: "Xác nhận đơn hàng",
          content: "Đơn hàng 12345 của bạn đã được xác nhận",
        },
        {
          id: 4,
          title: "Xác nhận đơn hàng",
          content: "Đơn hàng 12345 của bạn đã được xác nhận",
        },
      ],
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
.notify-item .v-list-item{
  padding: 12px !important;
  border-bottom: 1px solid #eee;
}
.notifies-list {
  padding: 0;
}
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
