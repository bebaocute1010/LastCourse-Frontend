<template>
  <default-layout :hidden_footer="true">
    <v-dialog
      class="dialog"
      v-model="dialog_show"
      persistent
      width="1024"
      v-if="dialog_show"
    >
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
                v-model="dialog_data.phone"
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
        <p class="heading-text shipping-heading">
          <v-icon size="20">mdi-map-marker</v-icon>Địa chỉ nhận hàng
        </p>
        <div class="shipping-information">
          <p class="shipping-information__customer after-chevron-right">
            {{ receiver.name ?? "Họ tên người nhận" }} •
            {{ receiver.phone ?? "Số điện thoại" }}
          </p>
          <p class="shipping-information__address">{{ receiver.address ?? "Địa chỉ" }}</p>
        </div>
      </div>

      <div class="block-info shop__item" v-for="(shop, index) in shops" :key="index">
        <div class="shop__item-wraper">
          <div class="shop__info">
            <v-avatar>
              <v-img cover :src="shop.shop_avatar"></v-img>
            </v-avatar>
            <p class="heading-text shop__item-heading">{{ shop.shop_name }}</p>
          </div>
          <div
            class="shop__item-product"
            v-for="product in shop.products"
            :key="product.id"
          >
            <div class="shop__item-product__info">
              <div class="shop__item-product__image">
                <img :src="product.image" />
              </div>
              <p class="shop__item-product__name">{{ product.name }}</p>
            </div>
            <div>
              <p class="shop__item-product__price">
                đ {{ getLocaleStringNumber(product.price) }}
              </p>
              <p class="shop__item-product__quantity">x{{ product.quantity }}</p>
            </div>
            <p class="shop__item-product__into-money">
              đ {{ getLocaleStringNumber(product.quantity * product.price) }}
            </p>
          </div>
        </div>

        <v-row>
          <v-col cols="5">
            <div class="warehouse">
              <p class="heading-text">Kho hàng</p>
              <p>{{ shop.warehouse }}</p>
            </div>
            <div class="shipping-fee">
              <p class="heading-text">Chi phí vận chuyển</p>
              <p>
                {{ shop.shipping_carrier }}
                <span>đ {{ getLocaleStringNumber(shop.shipping_fee) }}</span>
              </p>
              <p>(Nhận hàng {{ shop.delivery_time }})</p>
            </div>
          </v-col>

          <v-col class="note-for-shop" cols="5">
            <p>Ghi chú cho shop</p>
            <v-textarea
              v-model="notes[index]"
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
                <img src="/src/assets/icons/zalo-pay.svg" />
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
              <p>đ {{ getLocaleStringNumber(subTotal()) }}</p>
              <p>đ {{ getLocaleStringNumber(totalShipping()) }}</p>
              <p>đ {{ getLocaleStringNumber(subTotal() + totalShipping()) }}</p>
            </div>
          </div>

          <button @click="createBills()">Đặt hàng</button>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultLayout from "../Layouts/DefaultLayout.vue";
export default {
  name: "Payment",
  components: { DefaultLayout },
  data() {
    return {
      dialog_show: false,
      dialog_data: null,
      payment_method: 0,
      receiver: {
        name: null,
        phone: null,
        address: null,
      },
      shops: [],
      notes: [],
    };
  },
  computed: {
    ...mapGetters(["cart_products_selected"]),
  },
  created() {
    if (!this.cart_products_selected || this.cart_products_selected.length <= 0) {
      this.$router.push({ name: "cart" });
      return;
    }
    this.getPreviewOrder();
  },
  methods: {
    createBills() {
      const isReceiverComplete = Object.values(this.receiver).every(
        (value) => value !== null && value !== ""
      );
      if (!isReceiverComplete) {
        this.showAlert("Lỗi", "Vui lòng nhập đủ thông tin người nhận.", "error", null);
        return;
      }
      try {
        this.shops.forEach(async (shop, note_index) => {
          this.startLoad();
          const response = await axios.post("bill/create", {
            receiver: this.receiver.name,
            phone: this.receiver.phone,
            address: this.receiver.address,
            cart_ids: shop.cart_ids,
            payment_method: this.payment_method,
            note: this.notes[note_index],
          });
          this.finishLoad();
        });
        this.showAlert("Thành công", "Tạo đơn hàng thành công, hãy theo dõi đơn hàng của bạn nhé.", "success", "bills")
      } catch (error) {
        console.log(error);
      }
    },
    async getPreviewOrder() {
      this.startLoad();
      try {
        const response = await axios.post("cart/preview-order", {
          selected: this.cart_products_selected,
        });
        this.shops = response.data.data;
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    showDialog() {
      this.dialog_data = Object.assign({}, this.receiver);
      this.dialog_show = true;
    },
    closeDialog() {
      this.dialog_show = false;
      this.dialog_data = null;
    },
    updateShipping() {
      this.dialog_show = false;
      this.receiver = Object.assign({}, this.dialog_data);
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
    getLocaleStringNumber(num) {
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
.order-summary button:hover {
  background: #8f1015;
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
.v-col .heading-text {
  font-weight: 600;
}
.v-col:first-child {
  display: flex;
  flex-direction: column;
  row-gap: 38px;
}
.shop__info {
  display: flex;
  column-gap: 24px;
  align-items: center;
  padding-bottom: 24px;
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
.shop__item-product__info {
  width: 330px;
}
.shop__item-product__name {
  font-size: 14px;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: flex;
  align-items: center;
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
  padding: 15px;
  border-top: 1px solid #f1f1f1;
  justify-content: space-between;
  align-items: center;
}
.shop__item-heading {
  font-weight: 600;
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
.shipping-heading {
  display: flex;
  column-gap: 12px;
  font-weight: 700;
  margin-bottom: 16px;
}
.heading-text {
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
