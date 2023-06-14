<template>
  <div class="products-grid container">
    <div class="products-grid__headding">
      <p class="products-grid__title">{{ name }}</p>
      <button :id="'btn-view-all-' + id" class="products-grid__btn-view-all">
        Xem tất cả
      </button>
    </div>

    <div class="producst-grid__grid" :style="getStyleObject()">
      <div class="products-grid__item" v-for="(item, i) in items" :key="i">
        <Product
          width="100%"
          height="100%"
          :image="item.image"
          :name="item.name"
          :price="item.price"
          :sold="item?.sold"
          :rate="item?.rate"
          :flash_sale="item?.flash_sale"
        ></Product>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  name: "ProductGrid",
  components: { Product },
  data() {
    return {};
  },
  props: {
    id: {
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    column_number: {
      type: Number,
      required: false
    }
  },
  methods: {
    getStyleObject() {
      const objectStyle = {};
      if (this.column_number) {
        return {
          'grid-template-columns': `repeat(${this.column_number}, 1fr)`
        }
      }
    },
    startDrag(event) {
      this.isDragging = true;
      this.startX = this.getClientX(event);
    },
    handleDrag(event) {
      if (!this.isDragging) return;
      this.currentX = this.getClientX(event);
      const container = this.$refs.slideGroupContainer;
      const containerWidth = container.offsetWidth;
      const dragDistance = this.currentX - this.startX;
      container.scrollLeft -= dragDistance;
      this.startX = this.currentX;
    },
    endDrag() {
      this.isDragging = false;
    },
    getClientX(event) {
      return event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
    },
  },
};
</script>

<style scoped>
.producst-grid__grid {
  display: grid;
  gap: 13px;
}
.products-grid__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #0074bd;
  text-transform: uppercase;
}
.products-grid__headding {
  display: flex;
  justify-content: space-between;
  padding: 30px 0 26px;
  align-items: center;
}
</style>
