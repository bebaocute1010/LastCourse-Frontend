<template>
  <div id="banners__containner">
    <v-carousel
      id="banners-list"
      hide-delimiter-background
      color="#ffffff"
      interval="2"
      show-arrows="hover"
    >
      <v-carousel-item
        class="banner-item"
        v-for="(item, i) in items"
        :key="i"
        :src="item.url"
        cover
      ></v-carousel-item>
    </v-carousel>
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
  </div>
</template>

<script>
export default {
  name: "BannerSlides",
  data() {
    return {
      items: [
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
};
</script>

<style scoped>
.v-btn--active .v-btn__content {
  color: red !important;
}
.v-btn--variant-text .v-btn__overlay {
  background-color: red !important;
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
#banners-list {
  height: 450px !important;
}
</style>
