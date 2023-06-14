<template>
  <div class="product__container" :style="getStyleObject()">
    <div class="flash-sale" v-if="flash_sale">
      <v-progress-linear
        v-model="flash_sale.current"
        :max="flash_sale.max"
        height="14"
        rounded="100"
        color="#E60A32"
        bg-color="#E0E0E0"
        bg-opacity="1"
      >
        <template v-slot:default>
          <strong class="flash-sale__sold">Đã bán {{ flash_sale.current }}</strong>
        </template>
      </v-progress-linear>
    </div>

    <div class="product__image">
      <v-img cover :src="image"></v-img>
    </div>

    <div class="product__name">
      <p>{{ name }}</p>
    </div>

    <div class="product__more-info">
      <p class="product__price">{{ formattedNumber(price) }}</p>
      <p class="product__sold" v-if="sold || sold === 0">
        (Đã bán {{ formattedNumber(sold) }})
      </p>
      <div class="product__rate" v-if="rate || rate === 0">
        <v-icon color="#FFB800">mdi-star</v-icon>
        <span>({{ rate }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {};
  },
  props: {
    flash_sale: {
      max: {
        type: Number,
        required: true,
      },
      current: {
        type: Number,
        required: true,
      },
      required: false,
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
  },
  methods: {
    formattedNumber(num) {
      return num.toLocaleString("de-DE");
    },
    getStyleObject() {
      const objectStyle = {};
      if (this.width) {
        objectStyle.width = this.width;
      }
      if (this.height) {
        objectStyle.height = this.height;
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
.product__price::before {
  content: "đ";
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
}
.product__image {
  pointer-events: none;
  border-radius: 4px;
  overflow: hidden;
}
.product__container {
  width: 168px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 6px;
  user-select: none;
  background: #ffffff;
  cursor: pointer;
}
</style>
