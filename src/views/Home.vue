<template>
  <DefaultLayout @search="search" :search_rs="search_rs">
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
      data_search: [
        "Áo sơ mi cute dành cho đàn ông ",
        "Áo sơ mi rẻ cho nữ ",
        "Áo sơ mi rẻ cho con trai ",
        "Váy cute dành cho con trai ",
        "Quần sang trọng cho nam ",
        "Quần rẻ cho phụ nữ ",
        "Quần âu siêu rẻ dành cho đàn ông ",
        "Quần siêu rẻ cho con gái ",
        "Váy rẻ dành cho con trai ",
        "Quần xinh dành cho nam ",
        "Đồ bơi cực xinh dành cho phụ nữ ",
        "Quần xinh cho con gái ",
        "Đồ bơi xinh cho đàn ông ",
        "Váy rẻ dành cho đàn ông ",
        "Chân váy rẻ cho con gái ",
        "Váy cute cho phụ nữ ",
        "Váy xinh dành cho nữ ",
        "Váy cực xinh dành cho nam ",
        "Áo sơ mi sang trọng dành cho nam ",
        "Áo sơ mi rẻ dành cho con gái ",
        "Quần âu sang trọng cho đàn ông ",
        "Áo sơ mi rẻ cho nam ",
        "Áo xinh cho nữ ",
        "Chân váy xinh cho đàn ông ",
        "Quần siêu rẻ dành cho con trai ",
        "Áo sơ mi sang trọng cho đàn ông ",
        "Áo cực xinh cho nam ",
        "Áo sơ mi cực xinh dành cho con trai ",
        "Quần rẻ dành cho con gái ",
        "Áo sơ mi cực xinh dành cho đàn ông ",
        "Áo sơ mi xinh dành cho nữ ",
        "Áo siêu rẻ dành cho con gái ",
        "Áo sơ mi sang trọng dành cho đàn ông ",
        "Quần xinh cho đàn ông ",
        "Áo cute dành cho con trai ",
        "Đồ bơi xinh dành cho đàn ông ",
        "Quần cute cho nữ ",
        "Áo sơ mi sang trọng cho nam ",
        "Áo cực xinh cho phụ nữ ",
        "Áo xinh dành cho con trai ",
        "Chân váy cực xinh dành cho nam ",
        "Quần siêu rẻ cho nữ ",
        "Quần âu cực xinh cho nữ ",
        "Chân váy cute cho con gái ",
        "Quần sang trọng cho nam ",
        "Đồ bơi rẻ cho nữ ",
        "Quần âu cực xinh cho phụ nữ ",
        "Áo cực xinh dành cho đàn ông ",
        "Váy cute dành cho nam ",
        "Váy siêu rẻ dành cho con gái ",
        "Váy cute cho phụ nữ ",
        "Đồ bơi cực xinh cho đàn ông ",
        "Chân váy rẻ dành cho phụ nữ ",
        "Áo cực xinh dành cho con trai ",
        "Váy cute dành cho đàn ông ",
        "Quần âu siêu rẻ dành cho nam ",
        "Quần cực xinh dành cho nữ ",
        "Quần xinh dành cho nữ ",
        "Quần sang trọng cho phụ nữ ",
        "Áo siêu rẻ dành cho con gái ",
        "Chân váy cute dành cho phụ nữ ",
        "Quần siêu rẻ dành cho phụ nữ ",
        "Áo sơ mi xinh dành cho nữ ",
        "Váy rẻ dành cho phụ nữ ",
        "Quần rẻ cho nam ",
        "Đồ bơi sang trọng dành cho đàn ông ",
        "Đồ bơi sang trọng cho nữ ",
        "Áo sơ mi cute dành cho con trai ",
        "Quần âu cực xinh cho nữ ",
        "Đồ bơi rẻ cho đàn ông ",
        "Quần siêu rẻ dành cho nam ",
        "Quần âu xinh cho con gái ",
        "Chân váy cực xinh dành cho đàn ông ",
        "Áo cực xinh cho nữ ",
        "Chân váy xinh cho con gái ",
        "Quần âu xinh dành cho con trai ",
        "Áo xinh dành cho phụ nữ ",
        "Quần xinh dành cho phụ nữ ",
        "Áo cực xinh cho đàn ông ",
        "Quần âu xinh dành cho nam ",
        "Quần siêu rẻ cho nữ ",
        "Váy cực xinh dành cho con trai ",
        "Váy siêu rẻ cho nam ",
        "Chân váy cute cho con trai ",
        "Quần cực xinh cho nam ",
        "Chân váy xinh cho con trai ",
        "Đồ bơi cực xinh dành cho nam ",
        "Đồ bơi rẻ cho nữ ",
        "Áo sơ mi rẻ dành cho phụ nữ ",
        "Đồ bơi siêu rẻ dành cho nam ",
        "Chân váy xinh cho con gái ",
        "Chân váy siêu rẻ dành cho phụ nữ ",
        "Chân váy xinh cho nam ",
        "Áo siêu rẻ cho con trai ",
        "Đồ bơi cực xinh dành cho nam ",
        "Đồ bơi cute dành cho nữ ",
        "Chân váy siêu rẻ dành cho con trai ",
        "Chân váy sang trọng cho con trai ",
        "Váy rẻ dành cho con trai ",
        "Áo siêu rẻ cho nam ",
        "Áo sơ mi sang trọng dành cho con trai ",
        "Quần âu xinh cho đàn ông ",
        "Quần siêu rẻ cho phụ nữ ",
        "Chân váy rẻ dành cho con gái ",
        "Đồ bơi cute cho nữ ",
        "Đồ bơi siêu rẻ cho đàn ông ",
        "Áo sơ mi siêu rẻ dành cho con gái ",
        "Quần siêu rẻ dành cho con trai ",
        "Đồ bơi cute cho con gái ",
        "Quần âu xinh cho con trai ",
        "Váy cực xinh cho nam ",
        "Quần âu sang trọng cho con gái ",
        "Quần âu sang trọng cho con gái ",
        "Chân váy sang trọng dành cho đàn ông ",
        "Áo siêu rẻ dành cho phụ nữ ",
        "Quần sang trọng cho con gái ",
        "Đồ bơi cực xinh dành cho đàn ông ",
        "Chân váy rẻ dành cho con gái ",
        "Áo xinh cho đàn ông ",
        "Chân váy sang trọng cho nam ",
        "Chân váy xinh dành cho đàn ông ",
        "Áo cực xinh cho nam ",
        "Quần âu siêu rẻ cho con gái ",
        "Váy rẻ dành cho phụ nữ ",
        "Váy sang trọng dành cho phụ nữ ",
        "Chân váy rẻ dành cho nam ",
        "Quần sang trọng dành cho nữ ",
        "Áo rẻ dành cho nữ ",
        "Áo rẻ dành cho đàn ông ",
        "Quần âu rẻ dành cho con gái ",
        "Áo cute dành cho phụ nữ ",
        "Áo sơ mi rẻ dành cho con gái ",
        "Áo sơ mi sang trọng cho phụ nữ ",
        "Áo xinh cho đàn ông ",
        "Chân váy siêu rẻ cho con gái ",
        "Quần cực xinh dành cho phụ nữ ",
        "Váy siêu rẻ dành cho đàn ông ",
        "Quần cute cho nam ",
        "Chân váy xinh cho nữ ",
        "Chân váy siêu rẻ cho phụ nữ ",
        "Quần âu cute dành cho nữ ",
        "Quần âu cực xinh dành cho con trai ",
        "Quần xinh dành cho con gái ",
        "Quần âu siêu rẻ dành cho đàn ông ",
        "Áo cực xinh dành cho nam ",
        "Đồ bơi cute cho nữ ",
        "Chân váy xinh dành cho con gái ",
        "Đồ bơi xinh dành cho phụ nữ ",
        "Đồ bơi cực xinh cho nam ",
        "Quần âu sang trọng dành cho con gái ",
        "Đồ bơi rẻ dành cho con trai ",
        "Áo sang trọng dành cho con gái ",
        "Chân váy siêu rẻ dành cho nam ",
        "Váy xinh cho nam ",
        "Quần âu xinh dành cho phụ nữ ",
        "Váy cực xinh dành cho nam ",
        "Váy rẻ dành cho nam ",
        "Quần cute dành cho con gái ",
        "Áo xinh dành cho đàn ông ",
        "Quần âu cute dành cho phụ nữ ",
        "Đồ bơi cực xinh dành cho con gái ",
        "Quần âu sang trọng cho phụ nữ ",
        "Quần âu cực xinh cho con gái ",
        "Quần âu cute dành cho nữ ",
        "Quần âu cute cho nam ",
        "Quần âu rẻ dành cho con gái ",
        "Áo sơ mi sang trọng dành cho phụ nữ ",
        "Quần âu cực xinh cho nữ ",
        "Quần âu xinh cho con trai ",
        "Chân váy cực xinh dành cho đàn ông ",
        "Chân váy rẻ cho đàn ông ",
        "Quần sang trọng dành cho con gái ",
        "Quần âu cực xinh cho nữ ",
        "Đồ bơi cute dành cho con trai ",
        "Quần âu cute dành cho phụ nữ ",
        "Váy cute cho phụ nữ ",
        "Quần âu siêu rẻ dành cho nữ ",
        "Áo sơ mi rẻ dành cho nam ",
        "Quần rẻ cho nữ ",
        "Chân váy xinh cho đàn ông ",
        "Quần xinh cho con trai ",
        "Váy xinh dành cho đàn ông ",
        "Váy rẻ cho phụ nữ ",
        "Quần âu siêu rẻ cho con trai ",
        "Chân váy rẻ dành cho nam ",
        "Đồ bơi siêu rẻ dành cho con gái ",
        "Váy cute cho phụ nữ ",
        "Áo sơ mi sang trọng cho con trai ",
        "Áo sơ mi xinh dành cho con gái ",
        "Áo cực xinh cho nữ ",
        "Áo sơ mi cute cho đàn ông ",
        "Áo sơ mi sang trọng cho phụ nữ ",
        "Quần cute dành cho nam ",
        "Quần âu rẻ cho con trai ",
        "Váy sang trọng cho nữ ",
        "Quần rẻ cho nữ ",
        "Váy rẻ cho nữ ",
        "Áo rẻ dành cho nữ ",
        "Váy siêu rẻ cho con gái ",
        "Váy sang trọng cho nam ",
      ],
      search_rs: [],
      banners: [
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
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
    search(value) {
      console.log();
      if (!value) {
        this.search_rs = [];
        return;
      }
      let keywords = value.split(" ");
      let d = this.data_search.filter((item) => {
        let lowercaseItem = item.toLowerCase();
        return keywords.every((keyword) => lowercaseItem.includes(keyword.toLowerCase()));
      });
      this.search_rs = d.slice(0, 5);
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
