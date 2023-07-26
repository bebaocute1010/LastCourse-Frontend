<template>
  <div>
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

          <div class="shop-profile__actions" v-if="shop">
            <button v-if="!shop?.is_followed" class="button-follow" @click="followShop">
              <v-icon>mdi-account-plus-outline</v-icon>Theo dõi
            </button>

            <button v-else class="button-unfollow" @click="unFollowShop">
              <v-icon>mdi-account-minus-outline</v-icon>Bỏ theo dõi
            </button>
          </div>
        </div>

        <div class="shop-profile__tab"><p>Tất cả sản phẩm</p></div>
      </div>
    </div>

    <div class="shop-profile__body">
      <div class="container">
        <div class="content-search-box">
          <input
            type="text"
            class="content-search__input"
            placeholder="Tìm kiếm trong shop này ..."
            autocomplete="false"
            v-model="search"
            v-on:keyup.enter="getShop(search)"
          />
          <v-icon class="content-search__icon" @click="getShop(search)"
            >mdi-magnify</v-icon
          >
        </div>

        <products-grid
          :hidden_heading="true"
          :items="shop?.products"
          :column_number="6"
          image_w="167px"
          image_h="167px"
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
  </div>
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
    this.setWindowTitle("Thông tin shop");
    this.getShop();
  },
  methods: {
    async unFollowShop() {
      this.startLoad();
      try {
        const response = await axios.get(`shop/unfollow/${this.shop.id}`);
        this.getShop();
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async followShop() {
      this.startLoad();
      try {
        const response = await axios.get(`shop/follow/${this.shop.id}`);
        this.getShop();
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async getShop(search = "") {
      this.startLoad();
      try {
        const response = await axios.get(
          "get/shop?slug=" + this.$route.params.slug + "&search=" + search
        );
        this.shop = response.data.data;
      } catch (error) {
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          "home"
        );
      }
      this.finishLoad();
    },
  },
};
</script>

<style scoped>
.content-search-box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
}
.content-search__input {
  padding: 12px 16px;
  width: 657px;
  background: #ffffff;
  border-radius: 100px;
}
.content-search__icon:hover {
  background: #3a01cb;
}
.content-search__icon {
  position: absolute;
  top: 3px;
  right: 522px;
  height: 42px;
  width: 58px;
  background: #0172cb;
  color: #ffffff;
  border-radius: 100px;
  cursor: pointer;
}
.button-unfollow:hover {
  background: #620000;
}
.button-unfollow {
  background: #ec0202;
  color: #ffffff;
}
.button-follow:hover {
  background: #6a6a6a;
  color: #ffffff;
}
.button-follow {
  background: #c1c1c1;
}
.shop-profile__actions button {
  padding: 14px 22px;
  border-radius: 8px;
  width: 168px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
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
