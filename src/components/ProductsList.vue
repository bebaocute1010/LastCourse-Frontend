<template>
  <div class="products-list container">
    <div class="products-list__heading">
      <p class="products-list__title" v-if="!flash_sale">{{ name }}</p>
      <div class="flash-sale user-not-select" v-else>
        <div class="flash-sale__logo">
          <v-img contain src="/src/assets/flash-sale.svg"></v-img>
        </div>
        <div class="flash-sale__countdown">
          <span>{{ count_down }}</span>
        </div>
      </div>
      <button :id="'btn-view-all-' + id" class="products-list__btn-view-all">
        Xem tất cả
      </button>
    </div>
    <div
      class="user-not-select slide-group-container"
      ref="slideGroupContainer"
      @mousedown="startDrag"
      @mousemove="handleDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="handleDrag"
      @touchend="endDrag"
      @click.prevent="handleClick"
    >
      <v-slide-group v-model="currentSlide" show-arrows="false" class="slide-group" style="padding: 20px 0;">
        <v-slide-group-item v-for="(item, i) in items" :key="i">
          <Product
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :sold="item?.sold"
            :rate="item?.rate"
            :flash_sale="item?.flash_sale"
          ></Product>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  name: "ProductsList",
  components: { Product },
  created() {
    if (this.flash_sale) {
      this.countDown();
    }
  },
  data() {
    return {
      currentSlide: 0,
      startX: 0,
      currentX: 0,
      isDragging: false,
      count_down: "00 : 00 : 00",
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
    flash_sale: {
      expired_at: {
        type: Date,
        required: true,
      },
      required: false,
    },
  },
  methods: {
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
    countDown() {
      this.interval_id = setInterval(() => {
        let current_time = new Date().getTime();
        let distance = this.flash_sale.expired_at - current_time;
        let seconds = Math.floor(distance / 1000) % 60;
        let minutes = Math.floor(distance / (1000 * 60)) % 60;
        let hours = Math.floor(distance / (1000 * 60 * 60));

        let formattedHours = hours < 10 ? `0${hours}` : hours;
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        this.count_down = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
      }, 500);
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
