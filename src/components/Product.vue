<template>
  <router-link :to="{ name: 'product-detail', params: { slug: slug } }">
    <div class="product__container" :style="getStyleObject(width, height)">
      <div class="product__image" :style="getStyleObject(image_w, image_h)">
        <v-img class="img-thumbnail" cover :src="image"></v-img>
      </div>

      <div class="product__name">
        <router-link :to="{ name: 'product-detail', params: { slug: slug } }">
          <p>{{ name }}</p>
        </router-link>
      </div>

      <div class="product__more-info">
        <p class="product__price">{{ getLocaleStringNumber(price) }}</p>
        <p class="product__sold" v-if="!show_rate">
          (Đã bán {{ getLocaleStringNumber(sold) }})
        </p>
        <div class="product__rate" v-else>
          <v-icon color="#FFB800">mdi-star</v-icon>
          <span>({{ rate }})</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {};
  },
  props: {
    image_w: {
      type: String,
      required: false,
    },
    image_h: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    show_rate: {
      type: Boolean,
      required: false,
      default: false,
    },
    goto_page: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    detail() {
      this.$router.push({ name: "product-detail" });
    },
    getStyleObject(width, height) {
      const objectStyle = {};
      if (this.width) {
        objectStyle.width = width;
      }
      if (this.height) {
        objectStyle.height = height;
      }
      return objectStyle;
    },
  },
};
</script>

<style scoped>
.flash-sale {
  text-align: center;
}
.flash-sale__sold {
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1px;
}
.product__sold {
  font-size: 10px;
}
.product__rate {
  font-size: 10px;
  display: flex;
  align-items: center;
}
.product__price::after {
  content: " đ";
}
.product__price {
  font-weight: 500;
  color: #ec1c24;
  font-size: 14px;
}
.product__more-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product__name {
  font-size: 14px;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
}
.product__image .v-img {
  width: 100%;
  height: 100%;
}
.product__image {
  height: 152px;
  width: 152px;
  pointer-events: none;
  border-radius: 4px;
  overflow: hidden;
}
.product__container:hover {
  transform: scale(1.04);
}
.product__container:hover a {
  color: #ec1c24;
}
.product__container {
  width: 168px;
  height: 246px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 6px;
  user-select: none;
  background: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease;
}
</style>
