<template>
  <DefaultLayout :hidden_footer="true">
    <div class="container">
      <div class="content-search-table user-not-select">
        <v-data-table
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
              formattedNumber(item.selectable.price)
            }}</span>
          </template>

          <template v-slot:[`item.into_money`]="{ item }">
            <span class="product-price product-into-money">{{
              formattedNumber(item.selectable.price * item.selectable.quantity)
            }}</span>
          </template>

          <template v-slot:[`item.quantity`]="{ item }">
            <div class="quantity-order">
              <div
                class="quantity-order__button user-not-select"
                @click="
                  item.selectable.quantity =
                    item.selectable.quantity > 0 ? item.selectable.quantity - 1 : 0
                "
              >
                <v-icon>mdi-minus</v-icon>
              </div>
              <input
                type="number"
                class="quantity-order__input"
                v-model="item.selectable.quantity"
              />
              <div
                class="quantity-order__button user-not-select"
                @click="item.selectable.quantity = item.selectable.quantity + 1"
              >
                <v-icon>mdi-plus</v-icon>
              </div>
            </div>
          </template>

          <template v-slot:[`item.actions`]>
            <div class="delete-item-button" @click="showDialog()">
              <v-icon>mdi-delete</v-icon>
              <span>Xóa</span>
            </div>
          </template>

          <template v-slot:bottom>
            <div id="table-footer" v-if="selected.length > 0">
              <div class="table-footer__buttons-group">
                <span>Tổng tiền</span>
                <span class="sum-money">đ {{ formattedNumber(sumMoney()) }}</span>
                <button class="table-footer__buttons-item" id="footer__button-show">
                  Mua hàng
                </button>
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
export default {
  name: "Cart",
  components: { DefaultLayout },
  data() {
    return {
      selected: [],
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
      table_rows: [
        {
          id: 1,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 0,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
        {
          id: 2,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 0,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
        {
          id: 3,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 2,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
        {
          id: 4,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 2,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
        {
          id: 5,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 1,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
        {
          id: 6,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 1,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },

        {
          id: 7,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 1,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },

        {
          id: 8,
          name: "Áo phông nữ siêu sale mua 2 giảm 5k",
          price: 100000,
          image:
            "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
          quantity: 1,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
      ],
    };
  },
  methods: {
    sumMoney() {
      let sum = 0;
      this.selected.forEach((index) => {
        let item = this.table_rows.find((item) => item.id === index);
        sum += item.price * item.quantity;
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
  width: 30px;
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
.container {
  height: 100vh;
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
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-into-money {
  color: #e60a32;
}
.product-info {
  display: flex;
  flex-direction: column;
  margin-left: 17px;
  text-align: left;
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
