<template>
  <div id="banners__containner">
    <v-carousel
      id="banners-list"
      :height="height ?? 450"
      hide-delimiter-background
      :show-arrows="false"
      color="#ffffff"
      :cycle="true"
      v-model="model"
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
    return {
      cur_index: 0,
    };
  },
  computed: {
    model() {
      if (this.slide_model == null) {
        return this.cur_index;
      }
      return this.slide_model;
    },
  },
  mounted() {
    setInterval(this.autoSlide, 2000);
  },
  props: {
    slide_model: {
      type: Number,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: false,
    },
  },
  methods: {
    autoSlide() {
      if (this.cur_index >= this.items.length - 1) {
        this.cur_index = 0;
      } else {
        this.cur_index += 1;
      }
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
