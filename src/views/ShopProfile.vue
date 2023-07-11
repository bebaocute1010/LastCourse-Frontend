<template>
  <default-layout :hidden_nav="true">
    <div class="shop-profile__header">
      <div class="container">
        <div class="shop-profile__banner">
          <v-img cover :src="shop?.banner"></v-img>
        </div>

        <div class="shop-profile__info">
          <div class="shop-profile__avatar">
            <v-avatar size="120"><v-img cover :src="shop?.avatar"></v-img></v-avatar>
            <div class="shop-profile__shop-name">
              <p>{{ shop?.name }}</p>
              <span>{{ shop?.followers }} Người theo dõi</span>
            </div>
          </div>

          <div class="shop-profile__overall">
            <div class="shop-profile__overall__item">
              <p class="__item-name">Đánh giá shop</p>
              <p class="__item__quantity">{{ shop?.rating }}/5.0</p>
            </div>

            <div class="shop-profile__overall__item">
              <p class="__item-name">Người theo dõi</p>
              <p class="__item__quantity">{{ shop?.followers }}</p>
            </div>

            <div class="shop-profile__overall__item">
              <p class="__item-name">Số sản phẩm</p>
              <p class="__item__quantity">{{ shop?.products_count }}</p>
            </div>
          </div>

          <div class="shop-profile__actions">
            <button class="button-follow">
              <v-icon>mdi-account-plus-outline</v-icon>Theo dõi
            </button>
          </div>
        </div>

        <div class="shop-profile__tab"><p>Tất cả sản phẩm</p></div>
      </div>
    </div>

    <div class="shop-profile__body">
      <div class="container">
        <products-grid
          :hidden_heading="true"
          :items="shop?.products"
          :column_number="6"
          image_w="180px"
          image_h="180px"
        >
        </products-grid>
      </div>
    </div>

    <div class="paginate-bar" v-if="shop?.num_page > 1">
      <v-pagination
        :length="shop?.num_page"
        :total-visible="5"
        active-color="#EC1C24"
      ></v-pagination>
    </div>
  </default-layout>
</template>

<script>
import ProductsGrid from "../components/ProductsGrid.vue";
import DefaultLayout from "../Layouts/DefaultLayout.vue";
export default {
  name: "ShopDetail",
  components: { DefaultLayout, ProductsGrid },
  data() {
    return {
      shop: null,
    };
  },
  created() {
    this.getShop();
  },
  methods: {
    async getShop() {
      this.startLoad();
      const response = await axios.get("get/shop/" + this.$route.params.id);
      this.shop = response.data.data;
      this.finishLoad();
    },
  },
};
</script>

<style scoped>
.button-follow {
  background: #f1f1f1;
  padding: 14px 22px;
  border-radius: 8px;
}
.__item__quantity {
  font-weight: 600;
}
.shop-profile__overall__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
}
.shop-profile__tab {
  text-align: center;
  color: #0074bd;
  padding: 20px 0;
}
.paginate-bar {
  padding-bottom: 40px;
}
.shop-profile__body {
  padding: 40px 0;
}
.shop-profile__shop-name p {
  font-weight: 700;
  font-size: 18px;
}
.shop-profile__shop-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;
}
.shop-profile__avatar {
  margin-top: -5%;
  display: flex;
  row-gap: 17px;
  flex-direction: column;
  align-items: center;
}
.shop-profile__overall {
  display: flex;
  column-gap: 30px;
  justify-content: center;
}
.shop-profile__info {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 132px;
  padding-bottom: 26px;
  border-bottom: 1px solid #c4c4c4;
}
.shop-profile__banner {
  height: 307px;
}
.shop-profile__header {
  background: #ffffff;
}
</style>
