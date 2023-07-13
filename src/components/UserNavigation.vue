<template>
  <v-col cols="3">
    <div id="user-navigation">
      <div class="user-info">
        <v-avatar class="user-info__avatar" @click="openDialogShopUpdate">
          <v-img cover :src="shop?.avatar"></v-img>
        </v-avatar>
        <span class="user-info__name">{{ shop?.name }}</span>
        <span class="user-info__type">Shop</span>
      </div>
      <div class="features-list">
        <v-list v-model:opened="open">
          <v-list-item
            prepend-icon="mdi-clipboard-text"
            title="Quản lý đơn hàng"
            value="Quản lý đơn hàng"
            :to="{ name: 'bills-manage' }"
          ></v-list-item>
          <ListGroup
            prepend_icon="mdi-shopping"
            title="Quản lý sản phẩm"
            :items="product_features"
            value="Quản lý sản phẩm"
          />
          <v-list-item prepend-icon="mdi-logout" @click="logout()">Đăng xuất</v-list-item>
        </v-list>
      </div>
    </div>
  </v-col>
</template>

<script>
import ListGroup from "@/components/ListGroup.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserNavigation",
  components: { ListGroup },
  computed: {
    ...mapGetters(["shop"]),
  },
  data() {
    return {
      open: [],
      product_features: [
        { title: "Thêm sản phẩm", to: "add-product" },
        { title: "Tất cả sản phẩm", to: "all-products" },
      ],
      bill_features: [],
    };
  },
  created() {
    if (localStorage.getItem("logged_in") === null) {
      this.$router.push({ name: "login" });
    } else if (!this.shop) {
      this.getShopInfor();
    }
  },
  methods: {
    ...mapActions(["setShop", "unsetShop"]),
    openDialogShopUpdate() {
      this.$emit("openDialogShopUpdate");
    },
    async getShopInfor() {
      this.startLoad();
      const response = await axios.get("shop/infor");
      this.setShop(response.data.data);
      this.finishLoad();
    },
  },
};
</script>

<style scoped>
#user-navigation {
  position: sticky;
  height: 100%;
}
.v-col-3 {
  max-width: 25%;
  height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.user-info {
  padding: 42px 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-info__avatar:hover {
  box-shadow: 0 4px 16px rgba(236, 28, 36, 0.5);
}
.user-info__avatar {
  width: 73px !important;
  height: 73px !important;
  cursor: pointer;
  margin-bottom: 24px;
}

.user-info__name {
  font-weight: 700;
  font-size: 18px;
}

.user-info__type {
  font-size: 14px;
}

.features-list {
  padding: 0 1rem;
}
</style>
