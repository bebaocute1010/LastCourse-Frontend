<template>
  <div id="banners__containner">
    <v-carousel
      id="banners-list"
      :height="height ?? 450"
      hide-delimiter-background
      :show-arrows="false"
      color="#ffffff"
      :cycle="true"
      interval="2000"
    >
      <v-carousel-item
        class="banner-item"
        v-for="(item, i) in items"
        :key="i"
        :src="item.url"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "BannerSlides",
  data() {
    return {};
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: false,
    },
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
</style>
