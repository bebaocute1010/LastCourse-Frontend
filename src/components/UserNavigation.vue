<template>
  <v-col cols="3">
    <div id="user-navigation">
      <div class="user-info">
        <v-avatar class="user-info__avatar">
          <v-img src="https://www.studytienganh.vn/upload/2022/05/112275.jpg"></v-img>
        </v-avatar>
        <span class="user-info__name">Meokio</span>
        <span class="user-info__type">Shop</span>
      </div>
      <div class="features-list">
        <v-list v-model:opened="open">
          <v-list-item prepend-icon="mdi-clipboard-text" title="Quản lý đơn hàng" value="Quản lý đơn hàng"></v-list-item>
          <ListGroup
            prepend_icon="mdi-shopping"
            title="Quản lý sản phẩm"
            :items="product_features"
            value="Quản lý sản phẩm"
          />
          <v-list-item prepend-icon="mdi-logout" value="Đăng xuất">Đăng xuất</v-list-item>
        </v-list>
      </div>
    </div>
  </v-col>
</template>

<script>
import ListGroup from "@/components/ListGroup.vue";

export default {
  name: "UserNavigation",
  components: { ListGroup },
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
};
</script>

<style scoped>
#user-navigation {
  position: sticky;
}
.v-col-3 {
  max-width: 349px;
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

.user-info__avatar {
  width: 73px !important;
  height: 73px !important;
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
