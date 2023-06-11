<template>
  <UserLayout>
    <DialogDelete
      :dialog="dialog.show"
      :title="dialog.title"
      :text="dialog.text"
      @result="dialogResult"
    />
    <Breadcrumbs :items="breadcrumbs" />
    <div id="main-content">
      <div class="content-headding">
        <div>
          <ul class="content-headding__list">
            <li
              :class="{
                'content-headding__item': true,
                'content-headding__active': i === status_selected,
              }"
              v-for="(item, i) in headding_items"
              :key="i"
              @click="status_selected = i"
            >
              <span class="content-headding__item-title">{{ item.title }}</span>
              <span class="content-headding__item-quantity"
                >({{ filterStatus(i).length }})</span
              >
            </li>
          </ul>
        </div>

        <div class="content-headding__buttons">
          <router-link :to="{ name: 'add-product' }">
            <button id="button-add-product">+ Thêm sản phẩm</button></router-link
          >
          <button id="button-filter" v-if="selected.length == 0">
            <span>Bộ lọc</span>
            <v-icon>mdi-menu-down</v-icon>
          </button>
        </div>
      </div>

      <div class="content-search">
        <div class="content-search-box">
          <input
            type="text"
            class="content-search__input"
            placeholder="Tìm kiếm ..."
            v-model="search"
          />
          <v-icon class="content-search__icon">mdi-magnify</v-icon>
        </div>
      </div>

      <div class="content-search-table">
        <v-data-table
          :headers="table_headers"
          :items="filterStatus(status_selected)"
          :search="search"
          v-model="selected"
          class="elevation-1"
          show-select
          height="460"
        >
          <template v-slot:[`item.product`]="{ item }">
            <div class="product">
              <div class="product-image">
                <img :src="item.selectable.image" />
              </div>
              <div class="product-info">
                <span class="product-name">{{ item.selectable.name }}</span>
                <span class="product-price">
                  {{ formattedNumber(item.selectable.price) }}
                </span>
              </div>
            </div>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span
              :class="{
                available: item.selectable.status == 0,
                unavailable: item.selectable.status == 1,
                hidden: item.selectable.status == 2,
              }"
              >{{ getStatusString(item.selectable.status) }}</span
            >
          </template>
          <template v-slot:[`item.actions`]>
            <div class="actions-group-button">
              <div class="user-not-select action-button edit-item-button">
                <v-icon>mdi-pencil-box</v-icon>
                <span>Sửa</span>
              </div>
              <div class="user-not-select action-button delete-item-button" @click="showDialog()">
                <v-icon>mdi-delete</v-icon>
                <span>Xóa</span>
              </div>
            </div>
          </template>
          <template v-slot:bottom>
            <div id="table-footer" v-if="selected.length > 0">
              <div class="table-footer__checkbox-group">
                <input
                  type="checkbox"
                  class="table-checkbox"
                  id="table-footer__checkbox"
                  v-model="selected_all"
                  @change="footerSelectAll"
                />
                <label for="table-footer__checkbox" id="table-footer__label"
                  >Chọn tất cả</label
                >
              </div>
              <div id="table-footer__number-selected">
                <span>{{ selected.length }} sản phẩm đã được chọn</span>
                <div class="table-footer__buttons-group">
                  <button
                    class="table-footer__buttons-item"
                    id="footer__button-hidden"
                    v-if="status_selected < 3"
                  >
                    Ẩn
                  </button>
                  <button
                    class="table-footer__buttons-item"
                    id="footer__button-show"
                    v-if="status_selected == 0 || status_selected == 3"
                  >
                    Hiển thị
                  </button>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import UserLayout from "@/Layouts/UserLayout.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import DialogDelete from "../../../components/DialogDelete.vue";

export default {
  name: "AllProduct",
  components: { UserLayout, Breadcrumbs, DialogDelete },
  data() {
    return {
      selected_all: false,
      dialog: {
        show: false,
        title: "",
        content: "",
      },
      id_item_editting: null,
      search: "",
      breadcrumbs: [
        {
          title: "Quản lý sản phẩm",
        },
        {
          title: "Tất cả sản phẩm",
        },
      ],
      headding_items: [
        {
          title: "Tất cả",
          quantity: 100,
        },
        {
          title: "Còn hàng",
          quantity: 90,
        },
        {
          title: "Hết hàng",
          quantity: 80,
        },
        {
          title: "Đã ẩn",
          quantity: 70,
        },
      ],
      status_selected: 0,
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
          title: "Trạng thái",
          sortable: false,
          key: "status",
          align: "center",
        },
        {
          title: "Kho hàng",
          sortable: false,
          key: "warehouse",
          align: "center",
        },
        {
          title: "Đã bán",
          key: "sold",
          align: "center",
        },
        {
          title: "Còn lại",
          key: "remaining",
          align: "center",
        },
        {
          title: "Tùy chọn thêm",
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
          status: 0,
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
          status: 0,
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
          status: 2,
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
          status: 2,
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
          status: 1,
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
          status: 1,
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
          status: 1,
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
          status: 1,
          warehouse: "Hà nội",
          sold: 30,
          remaining: 10,
        },
      ],
    };
  },
  watch: {
    selected() {
      this.selected_all = this.isSelectedAll();
    },
    status_selected() {
      this.selected_all = this.isSelectedAll();
    },
  },
  methods: {
    isSelectedAll() {
      return this.selected.length == this.filterStatus(this.status_selected).length;
    },
    hideDialog() {
      this.dialog.show = false;
      this.dialog.title = this.dialog.text = "";
    },
    showDialog() {
      this.dialog.title = "Xóa sản phẩm";
      this.dialog.text = "Sau khi xóa sản phẩm bạn sẽ không thể hoàn tác";
      this.dialog.show = true;
    },
    dialogResult(value) {
      this.hideDialog();
    },
    formattedNumber(num) {
      return num.toLocaleString("de-DE");
    },
    getStatusString(status) {
      return status === 0 ? "Còn hàng" : status === 1 ? "Hết hàng" : "Đã ẩn";
    },
    filterStatus(status) {
      if (status == 0) {
        return this.table_rows;
      }
      return this.table_rows.filter((item) => {
        return item.status == status - 1;
      });
    },
    footerSelectAll() {
      if (!this.selected_all) {
        this.selected = [];
        this.selected_all = false;
      } else {
        this.filterStatus(this.status_selected).forEach((item) => {
          if (!this.selected.includes(item.id)) {
            this.selected.push(item.id);
          }
        });
        this.selected_all = true;
      }
    },
  },
};
</script>

<style scoped>
#main-content {
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
}
.content-headding {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid #f1f1f1;
}
.content-headding__list {
  display: flex;
}
.content-headding__item {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px;
  margin-right: 54px;
  cursor: pointer;
  user-select: none;
}
.content-headding__active {
  color: #0172cb;
  box-shadow: 0px 3px 0px 0px blue;
  outline-offset: -3px;
}

.content-headding__active .content-headding__item-title {
  font-weight: 600;
}
.content-headding__item-quantity {
  font-size: 12px;
}
#button-add-product {
  padding: 8px 14px;
  background: #0172cb;
  color: #ffffff;
  border-radius: 100px;
}
#button-filter {
  padding: 8px 14px;
  background: #ec1c24;
  color: #ffffff;
  margin-left: 30px;
  border-radius: 100px;
}
.content-search {
  display: flex;
  padding: 23px 0;
  justify-content: center;
  border-bottom: 1px solid #f1f1f1;
}
.content-search-box {
  position: relative;
}
.content-search__input {
  padding: 12px;
  width: 657px;
  background: #f1f1f1;
  border-radius: 100px;
}
.content-search__icon {
  position: absolute;
  top: 3px;
  right: 3px;
  height: 42px;
  width: 58px;
  background: #0172cb;
  color: #ffffff;
  border-radius: 100px;
}
.table-footer__checkbox-group {
  display: flex;
  align-content: center;
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
  content: "đ";
}
.available {
  color: #0172cb;
}
.unavailable {
  color: #ec1c24;
}
.hidden {
  color: #8f8f8f;
}
.actions-group-button {
  display: flex;
  column-gap: 27px;
}
.action-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 10px;
}
.edit-item-button {
  color: #0172cb;
}
.delete-item-button {
  color: #e60a32;
}
#table-footer {
  display: flex;
  padding: 30px 20px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px #8f8f8f;
}
.table-checkbox {
  height: 20px;
  width: 20px;
  border-radius: 8px;
  border: 1.5px solid #0172cb;
}
#table-footer__checkbox {
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
