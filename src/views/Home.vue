<template>
  <DefaultLayout :search_rs="search_rs">
    <section id="banners">
      <div class="container">
        <BannerSlides :items="banners" />

        <div id="facilities">
          <div class="facility-item">
            <v-icon class="facility__icon">mdi-sale</v-icon>
            <div class="facility__info">
              <span class="facility__title">ƯU ĐÃI</span>
              <span class="facility__sub-title">Liên tục cập nhật vô vàn ưu đãi</span>
            </div>
          </div>
          <div class="facility-item">
            <v-icon class="facility__icon">mdi-truck-fast</v-icon>
            <div class="facility__info">
              <span class="facility__title">GIAO HÀNG TẬN TAY</span>
              <span class="facility__sub-title">Giao hàng tận nơi khi đặt hàng</span>
            </div>
          </div>
          <div class="facility-item">
            <v-icon class="facility__icon">mdi-phone-in-talk</v-icon>
            <div class="facility__info">
              <span class="facility__title">HỖ TRỢ 24/7</span>
              <span class="facility__sub-title">Hỗ trợ giải đáp 24 giờ trong ngày</span>
            </div>
          </div>
        </div>

        <div id="services">
          <div class="service-item" v-for="(item, i) in services" :key="i">
            <div class="service__icon">
              <v-img contain :src="item.image"></v-img>
            </div>
            <span class="service__name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="products-lists">
      <ProductsList
        name="Sản phẩm nổi bật"
        id="2"
        :items="products_feature"
        :show_rate="true"
      />
      <ProductsList name="Sản phẩm bán chạy" id="3" :items="products_top_selling" />
      <ProductsGrid
        name="Có thể bạn thích"
        id="4"
        :column_number="6"
        :items="products_recommended"
        imageW="170px"
        imageH="170px"
      ></ProductsGrid>

      <div id="button-view-more">
        <button @click="viewMore()">Xem thêm</button>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../Layouts/DefaultLayout.vue";
import BannerSlides from "../components/BannerSlides.vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import ProductsList from "../components/ProductsList.vue";
export default {
  components: { DefaultLayout, BannerSlides, ProductsList, ProductsGrid },
  name: "Home",
  data() {
    return {
      page_recommend: 1,
      services: [
        {
          image: "/src/assets/icons/service-cat.svg",
          name: "Danh mục",
        },
        {
          image: "/src/assets/icons/shop-mall.svg",
          name: "ShopMall",
        },
        {
          image: "/src/assets/icons/work-shop.svg",
          name: "Xưởng",
        },
        {
          image: "/src/assets/icons/digital-wallet.svg",
          name: "Ví tiền",
        },
        {
          image: "/src/assets/icons/voucher.svg",
          name: "Voucher",
        },
      ],
      products_feature: [],
      products_top_selling: [],
      products_recommended: [],
      search_rs: [],
      banners: [
        {
          url:
            "https://img.freepik.com/free-photo/fabulous-life-shopping-online-feminine_53876-125599.jpg?w=1380&t=st=1689005841~exp=1689006441~hmac=f33f4b9ec1925fda362dfe891361655c6f6a5ef04f12698bbc4eef2a7e0d452f",
        },
        {
          url:
            "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-119094.jpg?w=900&t=st=1689005962~exp=1689006562~hmac=36b86c4768137a85c2320eeba6ac8f0b08ea7ad865bfe00ca01b299a51834446",
        },
        {
          url:
            "https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
        },
        {
          url:
            "https://static.vecteezy.com/system/resources/previews/015/614/507/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-podium-vector.jpg",
        },
      ],
    };
  },
  created() {
    this.getProducts("get/featured-products", this.products_feature);
    this.getProducts("get/top-selling-products", this.products_top_selling);
    this.getProducts("get/recommended-products", this.products_recommended);
  },
  methods: {
    async getProducts(url, array) {
      this.startLoad();
      try {
        const response = await axios.get(url);
        array.splice(0, array.length, ...response.data.data);
      } catch (error) {
        throw error;
      }
      this.finishLoad();
    },
    async viewMore() {
      this.page_recommend += 1;
      this.startLoad();
      try {
        const response = await axios.get(
          "get/recommended-products?page=" + this.page_recommend
        );
        this.products_recommended.push(...response.data.data);
      } catch (error) {
        throw error;
      }
      this.finishLoad();
    },
  },
};
</script>

<style>
.facility__sub-title {
  font-size: 14px;
  color: #555555;
}
.facility__title {
  font-weight: 700;
  color: #555555;
}
.facility__icon {
  font-size: 28px;
}
.facility__info {
  display: flex;
  flex-direction: column;
}
.facility-item:last-child {
  border: unset;
}
.facility-item {
  display: flex;
  column-gap: 24px;
  align-items: center;
  width: 33.33%;
  padding: 0 45px;
  margin: 16px 0;
  border-right: 2px solid #7f7f7f;
}
#facilities {
  display: flex;
  background: #ffffff;
}
#button-view-more {
  display: flex;
  justify-content: center;
  padding: 36px 0;
}
#button-view-more button {
  background: #fbd2d3;
  color: #ec1c24;
  padding: 11px 96px;
  border: 1px solid #ec1c24;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
}
.service__icon {
  width: 55px;
  height: 55px;
  border-radius: 16px;
  padding: 10px;
  background: #ffffff;
}
.service-item {
  display: flex;
  align-items: center;
  column-gap: 8px;
}
#services {
  display: flex;
  justify-content: center;
  column-gap: 28px;
  padding: 30px 0;
}
.container {
  max-width: 1175px;
  margin: auto;
}
</style>
