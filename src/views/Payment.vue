<template>
  <default-layout :hidden_footer="true">
    <v-dialog class="dialog" v-model="dialog_show" persistent width="1024" v-if="dialog_show">
      <v-card>
        <v-card-title>
          <span class="text-h5">Thông tin nhận hàng</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                variant="outlined"
                label="Họ tên"
                v-model="dialog_data.name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                variant="outlined"
                label="Số điện thoại"
                v-model="dialog_data.phone_number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="Địa chỉ"
                v-model="dialog_data.address"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="updateShipping()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="container">
      <div class="block-info shipping" @click="showDialog()">
        <p class="headding-text shipping-headding">
          <v-icon size="20">mdi-map-marker</v-icon>Địa chỉ nhận hàng
        </p>
        <div class="shipping-information">
          <p class="shipping-information__customer after-chevron-right">
            {{ shipping.name }} • {{ shipping.phone_number }}
          </p>
          <p class="shipping-information__address">{{ shipping.address }}</p>
        </div>
      </div>

      <div class="block-info shop__item" v-for="(shop, index) in shops" :key="index">
        <div class="shop__item-wraper">
          <p class="headding-text shop__item-headding">{{ shop.name }}</p>
          <div
            class="shop__item-product"
            v-for="product in shop.products"
            :key="product.id"
          >
            <div>
              <div class="shop__item-product__image">
                <img :src="product.image" />
              </div>
              <p class="shop__item-product__name">{{ product.name }}</p>
            </div>
            <div>
              <p class="shop__item-product__price">
                đ {{ formattedNumber(product.price) }}
              </p>
              <p class="shop__item-product__quantity">x{{ product.quantity }}</p>
            </div>
            <p class="shop__item-product__into-money">
              đ {{ formattedNumber(product.quantity * product.price) }}
            </p>
          </div>
        </div>

        <v-row>
          <v-col cols="5">
            <div class="warehouse">
              <p class="headding-text">Kho hàng</p>
              <p class="after-chevron-right">{{ shop.warehouse }}</p>
            </div>
            <div class="shipping-fee">
              <p class="headding-text">Chi phí vận chuyển</p>
              <p>
                {{ shop.shipping_carrier }}
                <span class="after-chevron-right"
                  >đ {{ formattedNumber(shop.shipping_fee) }}</span
                >
              </p>
              <p>(Nhận hàng {{ shop.delivery_time }})</p>
            </div>
          </v-col>

          <v-col class="note-for-shop" cols="5">
            <p>Ghi chú cho shop</p>
            <v-textarea
              variant="outlined"
              no-resize
              rows="4"
              placeholder="Nhập ghi chú..."
            ></v-textarea>
          </v-col>
        </v-row>
      </div>

      <div class="block-info order-summary">
        <div class="payment user-not-select">
          <p>Hình thức thanh toán</p>
          <div class="payment-methods">
            <div class="payment-method-item" @click="payment_method = 0">
              <input
                type="radio"
                name="payment-method"
                v-model="payment_method"
                value="0"
              />
              <label>Tiền mặt</label>
            </div>

            <div class="payment-method-item" @click="payment_method = 1">
              <input
                type="radio"
                name="payment-method"
                v-model="payment_method"
                value="1"
              />
              <label>Zalo pay</label>
              <div class="payment-method-item__image">
                <img src="src/assets/icons/zalo-pay.svg" />
              </div>
            </div>
          </div>
        </div>

        <div class="fees-wraper">
          <div class="fees">
            <div class="fees-name">
              <p>Tổng tiền hàng</p>
              <p>Tổng tiền vận chuyển</p>
              <p>Tổng tiền thanh toán</p>
            </div>

            <div class="fees-sum">
              <p>đ {{ formattedNumber(subTotal()) }}</p>
              <p>đ {{ formattedNumber(totalShipping()) }}</p>
              <p>đ {{ formattedNumber(subTotal() + totalShipping()) }}</p>
            </div>
          </div>

          <div>
            <button>Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "../Layouts/DefaultLayout.vue";
export default {
  name: "Payment",
  components: { DefaultLayout },
  data() {
    return {
      dialog_show: false,
      dialog_data: null,
      payment_method: 0,
      shipping: {
        name: "Trần Thị Hồng",
        phone_number: "0123123123",
        address: "Lạch Tray, Ngô quyền, Hải Phòng",
      },
      shops: [
        {
          name: "Thế giới thời trang",
          warehouse: "Phố Thái Hà, Đống Đa, Hà Nội, Việt Nam",
          shipping_fee: 25000,
          delivery_time: "18Th3-1Th4",
          shipping_carrier: "Giao hàng tiết kiệm ",
          products: [
            {
              id: 1,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 3,
            },
            {
              id: 2,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 4,
            },
            {
              id: 3,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 3,
            },
          ],
        },
        {
          name: "Thế giới thời trang 2",
          warehouse: "Phố Thái Hà, Đống Đa, Hà Nội, Việt Nam",
          shipping_fee: 20000,
          delivery_time: "18Th3-1Th4",
          shipping_carrier: "Giao hàng tiết kiệm ",
          products: [
            {
              id: 4,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 3,
            },
            {
              id: 7,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 4,
            },
            {
              id: 9,
              name: "Áo phông nữ siêu sale mua 2 giảm 5k",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              price: 100000,
              quantity: 3,
            },
          ],
        },
      ],
    };
  },
  methods: {
    showDialog() {
      this.dialog_data = Object.assign({}, this.shipping);
      this.dialog_show = true;
    },
    closeDialog() {
      this.dialog_show = false;
      this.dialog_data = null;
    },
    updateShipping() {
      this.dialog_show = false;
      this.shipping = Object.assign({}, this.dialog_data);
    },
    totalShipping() {
      let sum = 0;
      this.shops.forEach((item) => {
        sum += item.shipping_fee;
      });
      return sum;
    },
    subTotal() {
      let sum = 0;
      this.shops.forEach((item) => {
        item.products.forEach((product) => {
          sum += product.price * product.quantity;
        });
      });
      return sum;
    },
    formattedNumber(num) {
      return num.toLocaleString("de-DE");
    },
  },
};
</script>

<style scoped>
.dialog .v-row {
  padding: 0;
  background: #ffffff;
  column-gap: 0;
}
.payment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 17px;
}
.payment-method-item input {
  width: 24px;
  height: 24px;
  background-color: #0074bd !important;
}
.payment-method-item {
  width: 220px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 32px;
  background: #e8f4fd;
  border-radius: 8px;
}
.payment-methods {
  display: flex;
  column-gap: 18px;
}
.fees-wraper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 17px;
}
.order-summary button {
  padding: 12px 136px;
  border-radius: 100px;
  background: #ec1c24;
  color: #ffffff;
}
.fees {
  display: flex;
  column-gap: 120px;
}
.fees p {
  line-height: 2rem;
}
.order-summary {
  padding: 30px 35px;
  display: flex;
  column-gap: 76px;
}
.note-for-shop p {
  padding: 0 0 6px 16px;
  font-size: 14px;
  color: #6f6f6f;
}
.shipping-fee .after-chevron-right {
  column-gap: 48px;
}
.shipping-fee p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}
.shipping-fee p:last-child {
  font-size: 14px;
}
.v-col .headding-text {
  font-weight: 600;
}
.v-col:first-child {
  display: flex;
  flex-direction: column;
  row-gap: 38px;
}
.shop__item-wraper {
  padding: 24px 30px 0;
}
.v-row {
  padding: 26px 33px;
  column-gap: 100px;
  background: #f6fcff;
}
.shop__item-product__quantity {
  font-size: 14px;
  color: #6f6f6f;
}
.shop__item-product__into-money {
  color: #ec1c24;
  font-weight: 500;
}
.shop__item-product div {
  display: flex;
  column-gap: 17px;
  align-items: center;
}
.v-responsive {
  width: 100%;
  height: 100%;
}
.shop__item-product__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shop__item-product__image {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
}
.shop__item-product {
  display: flex;
  padding: 30px;
  border-top: 1px solid #f1f1f1;
  justify-content: space-between;
  align-items: center;
}
.shop__item-headding {
  font-weight: 600;
  margin-bottom: 16px;
}
.shipping {
  color: #2a2a2a;
  padding: 24px 30px;
  cursor: pointer;
}
.after-chevron-right::after {
  content: "\F0142";
  font-family: "Material Design Icons";
  color: #0074bd;
}
.after-chevron-right {
  display: flex;
  justify-content: space-between;
}
.shipping-headding {
  display: flex;
  column-gap: 12px;
  font-weight: 700;
}
.headding-text {
  color: #0074bd;
}
.block-info {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}
.container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
