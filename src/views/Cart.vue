<template>
  <DefaultLayout :hidden_footer="true">
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
            <div class="product">
              <div class="product-image">
                <img :src="item.selectable.image" />
              </div>
              <div class="product-info">
                <span class="product-name">{{ item.selectable.name }}</span>
              </div>
            </div>
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
              <div class="table-footer__buttons-group">
                <span>Tổng tiền</span>
                <span class="sum-money">đ {{ getLocaleStringNumber(sumMoney()) }}</span>
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
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../Layouts/DefaultLayout.vue";
import DialogDelete from "../components/DialogDelete.vue";
import { mapActions } from "vuex";
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
    };
  },
  created() {
    this.setWindowTitle("Giỏ hàng");
    this.getCarts();
  },
  computed: {
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
    ...mapActions(["setCartProductsSelected"]),
    startTimer(id, quantity) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateCart(id, quantity);
      }, 100);
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
        await this.getCarts();
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async deleteCart(id) {
      this.startLoad();
      try {
        const response = await axios.delete("cart/delete?id=" + id);
        this.getCarts();
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async getCarts() {
      this.startLoad();
      try {
        const reponse = await axios.get("cart/get");
        this.table_rows = reponse.data.data;
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
        } else {
          throw error;
        }
      }
      this.finishLoad();
    },

    showDialogDelete(id) {
      this.dialog_delete = true;
      this.id_product_edit = id;
    },
    processResultDialogDelete(value) {
      this.dialog_delete = false;
      if (value && this.id_product_edit != null) {
        this.deleteCart(this.id_product_edit);
      }
      this.id_product_edit = null;
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
.product-price::before {
  content: "đ ";
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
  justify-content: flex-end;
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
