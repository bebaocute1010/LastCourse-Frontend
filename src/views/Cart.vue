<template>
  <div>
    <dialog-delete
      :dialog="dialog_delete"
      title="Xóa sản phẩm khỏi giỏ hàng"
      text="Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng ?"
      @emitResultDialog="processResultDialogDelete"
    ></dialog-delete>
    <div class="container">
      <div class="content-search-table user-not-select">
        <v-data-table
          v-model:page="page"
          :headers="table_headers"
          :items="table_rows"
          v-model="selected"
          class="elevation-1"
          show-select
          height="600"
        >
          <template v-slot:[`item.product`]="{ item }">
            <router-link
              :to="{ name: 'product-detail', params: { slug: item.selectable.slug } }"
            >
              <div class="product">
                <div class="product-image">
                  <img class="img-thumbnail" :src="item.selectable.image" />
                </div>
                <div class="product-info">
                  <span class="product-name">{{ item.selectable.name }}</span>
                  <span v-if="item.selectable.variant != null" class="product-variant"
                    >Phân loại: {{ item.selectable.variant }}</span
                  >
                </div>
              </div>
            </router-link>
          </template>

          <template v-slot:[`item.price`]="{ item }">
            <span class="product-price">{{
              getLocaleStringNumber(item.selectable.price)
            }}</span>
          </template>

          <template v-slot:[`item.into_money`]="{ item }">
            <span class="product-price product-into-money">{{
              getLocaleStringNumber(item.selectable.price * item.selectable.quantity)
            }}</span>
          </template>

          <template v-slot:[`item.quantity`]="{ item }">
            <div class="quantity-order">
              <div
                class="quantity-order__button user-not-select"
                @click="updateCart(item.selectable.id, item.selectable.quantity - 1)"
              >
                <v-icon>mdi-minus</v-icon>
              </div>
              <input
                type="number"
                class="quantity-order__input"
                v-model="item.selectable.quantity"
                @input="startTimer(item.selectable.id, item.selectable.quantity)"
              />
              <div
                class="quantity-order__button user-not-select"
                @click="updateCart(item.selectable.id, item.selectable.quantity + 1)"
              >
                <v-icon>mdi-plus</v-icon>
              </div>
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="delete-item-button" @click="showDialogDelete(item.selectable.id)">
              <v-icon>mdi-delete</v-icon>
              <span>Xóa</span>
            </div>
          </template>

          <template v-slot:bottom>
            <v-pagination
              class="pagination-bar"
              v-if="pageCount > 1"
              v-model="page"
              :length="pageCount"
              :total-visible="5"
            ></v-pagination>
            <div id="table-footer" v-if="selected.length > 0">
              <div class="box-btn-delete">
                <button @click="showDialogDelete(null, true)">Xóa tất cả</button>
                <button @click="showDialogDelete(null)">Xóa đã chọn</button>
                <span>(Đã chọn {{ selected.length }} sản phẩm)</span>
              </div>
              <div class="table-footer__buttons-group">
                <span>Tổng tiền</span>
                <span class="sum-money">{{ getLocaleStringNumber(sumMoney()) }} đ</span>
                <router-link
                  class="table-footer__buttons-item"
                  id="footer__button-show"
                  :to="{ name: 'payment' }"
                >
                  Mua hàng
                </router-link>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultLayout from "../Layouts/DefaultLayout.vue";
import DialogDelete from "../components/DialogDelete.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Cart",
  components: { DefaultLayout, DialogDelete },
  data() {
    return {
      page: 1,
      dialog_delete: false,
      selected: [],
      id_product_edit: null,
      table_headers: [
        {
          title: "Sản phẩm",
          sortable: false,
          key: "product",
          align: "center",
          width: "300",
        },
        {
          title: "Đơn giá",
          sortable: false,
          key: "price",
          align: "center",
        },
        {
          sortable: false,
          title: "Số lượng",
          key: "quantity",
          align: "center",
        },
        {
          sortable: false,
          title: "Thành tiền",
          key: "into_money",
          align: "center",
        },
        {
          title: "Thao tác",
          sortable: false,
          key: "actions",
          align: "center",
        },
      ],
      table_rows: [],
      timer: null,
      delete_all: false,
    };
  },
  created() {
    this.setWindowTitle("Giỏ hàng");
    this.getCarts();
  },
  computed: {
    ...mapGetters(["cart_products_selected"]),
    pageCount() {
      return Math.ceil(this.table_rows.length / 10);
    },
  },
  watch: {
    selected() {
      this.setCartProductsSelected(this.selected);
    },
  },
  methods: {
    ...mapActions(["setCartProductsSelected", "setNumberCarts"]),
    startTimer(id, quantity) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateCart(id, quantity);
      }, 500);
    },
    async updateCart(id, quantity) {
      if (quantity <= 0) {
        this.showDialogDelete(id);
        return;
      }
      this.startLoad();
      try {
        const response = await axios.post("cart/update", {
          id: id,
          quantity: quantity,
        });
      } catch (error) {
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          null
        );
        console.log(error);
      }
      await this.getCarts();
      this.finishLoad();
    },
    async deleteCart(ids) {
      this.startLoad();
      try {
        const response = await axios.post("cart/delete", { ids: ids });
        this.selected.length = 0;
        this.getCarts();
        this.showAlert(response.data.title, response.data.message, "success", null);
      } catch (error) {
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          null
        );
        console.log(error);
      }
      this.finishLoad();
    },
    async getNumberCart() {
      if (!localStorage.getItem("token")) {
        return;
      }
      axios
        .get("get/number-cart")
        .then((response) => {
          this.setNumberCarts(response.data.number_cart);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCarts() {
      this.startLoad();
      try {
        const reponse = await axios.get("cart/get");
        this.table_rows = reponse.data.data;
        await this.getNumberCart();
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
        } else {
          throw error;
        }
      }
      this.finishLoad();
    },

    showDialogDelete(id, delete_all = false) {
      this.dialog_delete = true;
      this.id_product_edit = id;
      this.delete_all = delete_all;
    },
    processResultDialogDelete(value) {
      this.dialog_delete = false;
      if (value) {
        if (this.delete_all) {
          const ids = this.table_rows.map((item) => item.id);
          this.deleteCart(ids);
        } else if (this.id_product_edit != null) {
          this.deleteCart([this.id_product_edit]);
        } else {
          this.deleteCart(this.cart_products_selected);
        }
      }
      this.id_product_edit = null;
      this.delete_all = false;
    },
    sumMoney() {
      let sum = 0;
      this.selected.forEach((index) => {
        let item = this.table_rows.find((item) => item.id === index);
        sum += item.price * item.quantity;
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
.box-btn-delete span {
  font-size: 14px;
}
.box-btn-delete button:hover {
  background: #560413;
}
.box-btn-delete button {
  padding: 11px 33px;
  background: #ec1c24;
  border-radius: 100px;
  color: #ffffff;
}
.box-btn-delete {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pagination-bar {
  padding-bottom: 20px;
}
.table-footer__buttons-group {
  display: flex;
  column-gap: 40px;
  align-items: center;
}
.sum-money {
  font-size: 18px;
  font-weight: 600;
  color: #e60a32;
}
.quantity-order__input {
  width: 54px;
  height: 30px;
  border: 1px solid #8f8f8f;
  text-align: center;
}
.quantity-order {
  display: flex;
  column-gap: 4px;
  justify-content: center;
}
.quantity-order__button i {
  font-size: 11px;
}
.quantity-order__button {
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #c7e9ff;
  border: 1px solid #0074bd;
}
.content-search-table {
  padding-top: 47px;
}
.product:hover .product-name {
  color: #ec1c24;
}
.product-variant {
  font-size: 12px;
  text-decoration: underline;
}
.product {
  display: flex;
  padding: 15px 0;
}
.product-image {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
}
.product-image img {
  width: 48px;
  height: 48px;
  object-fit: cover;
}
.product-into-money {
  color: #e60a32;
}
.product-name {
  font-size: 14px;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-info {
  display: flex;
  flex-direction: column;
  margin-left: 17px;
  text-align: left;
  width: 202px;
}
.product-price {
  font-size: 14px;
  line-height: 22px;
}
.product-price::after {
  content: " đ ";
}
.delete-item-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 10px;
  color: #e60a32;
}
#table-footer {
  display: flex;
  padding: 30px 20px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px #8f8f8f;
  margin-bottom: 40px;
}
#table-footer__label {
  user-select: none;
  padding-left: 35px;
}
#table-footer__number-selected {
  display: flex;
  align-items: center;
  column-gap: 15px;
}
.table-footer__buttons-item {
  padding: 11px 33px;
  border-radius: 100px;
}
#footer__button-hidden {
  background: #fbd2d3;
  color: #ec1c24;
}
#footer__button-show {
  background: #ec1c24;
  color: #ffffff;
  margin-left: 18px;
}
</style>
