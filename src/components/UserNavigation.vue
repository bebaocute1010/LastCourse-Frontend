<template>
  <v-navigation-drawer width="337" id="user-navigation">
    <div class="user-info">
      <v-avatar class="user-info__avatar">
        <v-img src="https://www.studytienganh.vn/upload/2022/05/112275.jpg"></v-img>
      </v-avatar>
      <span class="user-info__name">Meokio</span>
      <span class="user-info__type">Shop</span>
    </div>
    <div class="features-list">
      <v-list v-model:opened="open">
        <ListGroup prepend_icon="mdi-clipboard-text" title="Quản lý đơn hàng" :items="bill_features"
                   value="Quản lý đơn hàng"/>
        <ListGroup prepend_icon="mdi-shopping" title="Quản lý sản phẩm" :items="product_features"
                   value="Quản lý sản phẩm"/>
        <ListGroup prepend_icon="mdi-store" title="Quản lý thông tin shop" :items="shop_features"
                   value="Quản lý thông tin shop"/>
        <ListGroup prepend_icon="mdi-poll" title="Phân tích bán hàng" :items="[]"
                   value="Phân tích bán hàng"/>
        <ListGroup prepend_icon="mdi-sale" title="Tham gia Flash sale" :items="[]"
                   value="Tham gia Flash sale"/>
        <ListGroup prepend_icon="mdi-cog" title="Thiết lập shop" :items="[]"
                   value="Thiết lập shop"/>
        <ListGroup prepend_icon="mdi-forum" title="Trò chuyện với Mtom" :items="[]"
                   value="Trò chuyện với Mtom"/>
        <v-list-item prepend-icon="mdi-logout">Đăng xuất</v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ListGroup from "@/components/ListGroup.vue";

export default {
  name: "UserNavigation",
  components: {ListGroup},
  data() {
    return {
      open: [],
      product_features: [
        ["Thêm sản phẩm", "/user/product/add"],
        ["Tất cả sản phẩm", "/user/product/all"],
        ["Còn hàng"],
        ["Hết hàng"],
        ["Đã ẩn"]
      ],
      bill_features: [
        ["Chờ xác nhận"],
        ["Chờ đóng hàng"],
        ["Đang giao"],
        ["Đã giao"],
        ["Đã hủy"],
      ],
      shop_features: [
        ["Đánh giá shop"],
        ["Thành viên"],
        ["Xem shop"],
      ]
    }
  }
}
</script>

<style scoped>
#user-navigation {
  width: 337px !important;
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