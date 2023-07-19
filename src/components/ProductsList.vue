<template>
  <div class="products-list container">
    <div class="products-list__heading">
      <p class="products-list__title" v-if="!flash_sale">{{ name }}</p>
      <button
        :id="'btn-view-all-' + id"
        class="products-list__btn-view-all"
        @click="handleClickBtn()"
      >
        Xem tất cả
      </button>
    </div>

    <Carousel v-bind="settings" class="custom-carousel">
      <Slide v-for="(item, i) in items" :key="i">
        <div class="carousel__item">
          <Product
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :sold="item?.sold"
            :rate="item?.rating"
            :show_rate="show_rate"
            :slug="item?.slug"
          ></Product>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  name: "ProductsList",
  components: { Product, Carousel, Navigation, Slide },
  created() {
    if (this.flash_sale) {
      this.countDown();
    }
  },
  data() {
    return {
      settings: {
        itemsToShow: 6.5,
        itemsToScroll: 3.5,
        mouseDrag: false,
        snapAlign: "center",
      },
    };
  },
  props: {
    id: {
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    show_rate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleClickBtn() {
      this.$emit("btnViewallClicked");
    },
  },
};
</script>

<style scoped>
.flash-sale {
  display: flex;
  align-items: center;
  column-gap: 30px;
  pointer-events: none;
}
.flash-sale__countdown {
  padding: 5px 7px;
  background: #e60a32;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
}
.flash-sale__logo {
  width: 170px;
  height: 100%;
}
.products-list__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #0074bd;
  text-transform: uppercase;
}
.products-list__heading {
  display: flex;
  justify-content: space-between;
  padding: 30px 0 6px;
  align-items: center;
}
.slide-group-container {
  overflow-x: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  width: 100%;
}

.slide-group {
  display: inline-flex;
  width: max-content;
}
</style>
