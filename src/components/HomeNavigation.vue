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
            <img src="/src/assets/logo.svg" />
          </div>
        </v-list-item>

        <v-menu open-on-click location="right" @click:outside="markReadAll()">
          <template v-slot:activator="{ props }">
            <v-list-item key="notify" class="user-not-select item-badge" v-bind="props">
              <v-badge
                v-if="numberNotificationUnRead > 0"
                :content="numberNotificationUnRead"
                color="#0074BD"
              >
                <v-icon>mdi-bell</v-icon>
              </v-badge>
              <v-icon v-else>mdi-bell</v-icon>
            </v-list-item>
          </template>

          <v-list class="notifications-list" max-height="440">
            <v-list-item v-if="!notifications?.length">
              <v-list-item-title>Bạn không có thông báo nào.</v-list-item-title>
            </v-list-item>

            <div v-else class="notify-item">
              <v-list-item v-for="notify in notifications" :key="notify.id">
                <v-list-item-title
                  :class="{ 'notify-item__unread': notify.read_at == null }"
                  >{{ notify.title }}</v-list-item-title
                >
                <v-list-item-subtitle
                  :class="{ 'notify-item__unread': notify.read_at == null }"
                  >{{ notify.message }}</v-list-item-subtitle
                >
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
          <v-badge v-if="number_cart" :content="number_cart" color="#0074BD">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
        </v-list-item>

        <v-list-item key="logout" @click="this.logout()" class="user-not-select">
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
      notifications: [],
      drawer: true,
      number_cart: 0,
      active_logo: false,
    };
  },
  computed: {
    numberNotificationUnRead() {
      return this.notifications.filter((item) => item.read_at == null).length;
    },
  },
  created() {
    this.getNotifications();
    this.getNumberCart();
  },
  methods: {
    markReadAll() {
      if (!this.notifications.length) {
        return;
      }
      axios
        .put("get/notifications/mark-read-all")
        .then((response) => {
          this.getNotifications();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNumberCart() {
      axios
        .get("get/number-cart")
        .then((response) => {
          this.number_cart = response.data.number_cart;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNotifications() {
      axios
        .get("get/notifications")
        .then((response) => {
          this.notifications = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.v-list-item__content .notify-item__unread {
  font-weight: 700;
}
.notify-item .v-list-item__content .v-list-item-title {
  font-size: 14px;
  color: #000000;
}
.notify-item .v-list-item__content .v-list-item-subtitle {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
}
.notify-item .v-list-item {
  padding: 12px !important;
  border-bottom: 1px solid #eee;
}
.notifications-list {
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
