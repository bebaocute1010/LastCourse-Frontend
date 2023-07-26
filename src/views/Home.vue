<template>
  <div>
    <section id="banners">
      <div class="container">
        <BannerSlides
          :items="banners"
          :slide_model="slide_model"
          :auto_slide="true"
          @updateSlideModel="updateSlideModel"
        />

        <div id="facilities">
          <div class="facility-item user-not-select">
            <v-icon class="facility__icon">mdi-sale</v-icon>
            <div class="facility__info">
              <span class="facility__title">ƯU ĐÃI</span>
              <span class="facility__sub-title">Liên tục cập nhật vô vàn ưu đãi</span>
            </div>
          </div>
          <div class="facility-item user-not-select">
            <v-icon class="facility__icon">mdi-truck-fast</v-icon>
            <div class="facility__info">
              <span class="facility__title">GIAO HÀNG TẬN TAY</span>
              <span class="facility__sub-title">Giao hàng tận nơi khi đặt hàng</span>
            </div>
          </div>
          <div class="facility-item user-not-select">
            <v-icon class="facility__icon">mdi-phone-in-talk</v-icon>
            <div class="facility__info">
              <span class="facility__title">HỖ TRỢ 24/7</span>
              <span class="facility__sub-title">Hỗ trợ giải đáp 24 giờ trong ngày</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="categories">
      <div class="container">
        <Carousel class="custom-carousel carousel-no-gap" v-bind="settings">
          <Slide v-for="index in Math.ceil(categories.length / 2)" :key="index">
            <div class="carousel__item">
              <div class="grouped-items">
                <router-link
                  v-if="categories[(index - 1) * 2]"
                  :to="{
                    name: 'products-category',
                    query: {
                      name: categories[(index - 1) * 2].name,
                      id: categories[(index - 1) * 2].id,
                    },
                  }"
                  class="category-item"
                >
                  <v-avatar size="70" class="category-item__avatar"
                    ><v-img :src="categories[(index - 1) * 2].image"></v-img
                  ></v-avatar>
                  <p class="category-item__name">
                    {{ categories[(index - 1) * 2].name }}
                  </p>
                </router-link>
                <router-link
                  v-if="categories[(index - 1) * 2 + 1]"
                  :to="{
                    name: 'products-category',
                    query: {
                      name: categories[(index - 1) * 2 + 1].name,
                      id: categories[(index - 1) * 2 + 1].id,
                    },
                  }"
                  class="category-item"
                >
                  <v-avatar size="70" class="category-item__avatar"
                    ><v-img :src="categories[(index - 1) * 2 + 1].image"></v-img
                  ></v-avatar>
                  <p class="category-item__name">
                    {{ categories[(index - 1) * 2 + 1].name }}
                  </p>
                </router-link>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </section>

    <section id="products-lists">
      <ProductsList
        name="Sản phẩm nổi bật"
        id="2"
        :items="products_feature"
        :show_rate="true"
        @btnViewallClicked="btnViewallClicked(2)"
      />
      <ProductsList
        name="Sản phẩm bán chạy"
        id="3"
        :items="products_top_selling"
        @btnViewallClicked="btnViewallClicked(3)"
      />
      <ProductsGrid
        name="Có thể bạn thích"
        id="4"
        :column_number="6"
        :items="products_recommended"
        image_w="167px"
        image_h="167px"
      ></ProductsGrid>

      <div id="button-view-more">
        <button @click="viewMore()">Xem thêm</button>
      </div>
    </section>
  </div>
</template>

<script>
import DefaultLayout from "../Layouts/DefaultLayout.vue";
import BannerSlides from "../components/BannerSlides.vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import ProductsList from "../components/ProductsList.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    DefaultLayout,
    BannerSlides,
    ProductsList,
    ProductsGrid,
    Carousel,
    Navigation,
    Slide,
  },
  name: "Home",
  data() {
    return {
      settings: {
        itemsToShow: 6,
        itemsToScroll: 2,
        mouseDrag: false,
        snapAlign: "center",
      },
      slide_model: 0,
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
      categories: [],
    };
  },
  async created() {
    this.startLoad();
    await this.setWindowTitle("Trang chủ");
    await this.getCategories();
    await this.getProducts("get/featured-products", this.products_feature);
    await this.getProducts("get/top-selling-products", this.products_top_selling);
    await this.getProducts("get/recommended-products", this.products_recommended);
    this.finishLoad();
  },
  methods: {
    async getCategories() {
      try {
        const response = await axios.get("get/category/all");
        this.categories = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    btnViewallClicked(id) {
      if (id == 2) {
        this.$router.push({ name: "featured-products" });
      } else {
        this.$router.push({ name: "top-selling-products" });
      }
    },
    updateSlideModel(value) {
      this.slide_model = value;
    },
    async getProducts(url, array) {
      try {
        const response = await axios.get(url);
        array.splice(0, array.length, ...response.data.data);
      } catch (error) {
        throw error;
      }
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
.carousel-no-gap .carousel__track {
  column-gap: 0 !important;
}

.carousel__item {
  height: 100%;
}

.grouped-items {
  display: flex;
  flex-direction: column;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 24px;
}

.category-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-right: unset;
  transition: transform 0.3s ease;
  padding: 14px 0;
  opacity: 0.85;
  width: 183px;
  height: 175px;
}

.category-item:last-child {
  border-right: 1px solid #eeeeee;
}

.category-item:hover .carousel__item {
  z-index: 1;
}
.category-item:hover {
  opacity: 1;
  transform: scale(1.04);
  color: #ec1c24;
  border: none;
}

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
