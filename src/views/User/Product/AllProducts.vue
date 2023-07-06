<template>
  <UserLayout>
    <DialogDelete
      :dialog="dialog.show"
      :title="dialog.title"
      :text="dialog.text"
      @emitResultDialog="processResultDialogDelete"
    />
    <div id="main-content">
      <div class="content-heading">
        <div>
          <ul class="content-heading__list">
            <li
              :class="{
                'content-heading__item': true,
                'content-heading__active': i === status_selected,
              }"
              v-for="(item, i) in heading_items"
              :key="i"
              @click="status_selected = i"
            >
              <span class="content-heading__item-title">{{ item.title }}</span>
              <span class="content-heading__item-quantity"
                >({{ filterStatus(i).length }})</span
              >
            </li>
          </ul>
        </div>

        <div class="content-heading__buttons">
          <router-link :to="{ name: 'add-product' }">
            <button id="button-add-product">+ Thêm sản phẩm</button>
          </router-link>
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
          v-model:page="page"
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
                available: item.selectable.status === 'Còn hàng',
                unavailable: item.selectable.status === 'Hết hàng',
                hidden: item.selectable.status === 'Đã ẩn',
              }"
              >{{ item.selectable.status }}</span
            >
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="actions-group-button">
              <div
                class="user-not-select action-button edit-item-button"
                @click="editeProduct(item.selectable.id)"
              >
                <v-icon>mdi-pencil-box</v-icon>
                <span>Sửa</span>
              </div>
              <div
                class="user-not-select action-button delete-item-button"
                @click="showDialog(item.selectable.id)"
              >
                <v-icon>mdi-delete</v-icon>
                <span>Xóa</span>
              </div>
            </div>
          </template>
          <template v-slot:bottom>
            <v-pagination
              v-if="pageCount > 1"
              v-model="page"
              :length="pageCount"
              :total-visible="5"
            ></v-pagination>
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
                    @click="updateProductStatuses(0)"
                  >
                    Ẩn
                  </button>
                  <button
                    class="table-footer__buttons-item"
                    id="footer__button-show"
                    v-if="status_selected == 0 || status_selected == 3"
                    @click="updateProductStatuses(1)"
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
import DialogDelete from "../../../components/DialogDelete.vue";

export default {
  name: "AllProduct",
  components: { UserLayout, DialogDelete },
  data() {
    return {
      page: 1,
      selected_all: false,
      dialog: {
        show: false,
        title: "",
        content: "",
      },
      id_item_editting: null,
      search: "",
      heading_items: [
        {
          title: "Tất cả",
        },
        {
          title: "Còn hàng",
        },
        {
          title: "Hết hàng",
        },
        {
          title: "Đã ẩn",
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
          key: "inventory",
          align: "center",
        },
        {
          title: "Tùy chọn thêm",
          sortable: false,
          key: "actions",
          align: "center",
        },
      ],
      table_rows: [],
      product_edited_id: null,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filterStatus(this.status_selected).length / 10);
    },
  },
  watch: {
    selected() {
      this.selected_all = this.isSelectedAll();
    },
    status_selected() {
      this.selected_all = this.isSelectedAll();
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    editeProduct(id) {
      this.$router.push({ name: "edit-product", params: { id: id } });
    },
    async updateProductStatuses(type = null) {
      let url = null;
      if (type === 0) {
        url = "product/hidden";
      } else if (type === 1) {
        url = "product/show";
      }
      if (!url) {
        return;
      }
      this.startLoad();
      try {
        const response = await axios.post(url, {
          ids: this.selected,
        });
        this.getProducts();
        this.showAlert(response.data.title, response.data.message, "success", null);
      } catch (error) {
        console.log(error);
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          null
        );
      }
      this.finishLoad();
    },
    async showProducts() {},
    async getProducts() {
      this.startLoad();
      const response = await axios.get("shop/products");
      this.table_rows = response.data.data;
      this.finishLoad();
    },
    isSelectedAll() {
      return this.selected.length == this.filterStatus(this.status_selected).length;
    },
    hideDialog() {
      this.dialog.show = false;
      this.dialog.title = this.dialog.text = "";
    },
    showDialog(product_id) {
      this.product_edited_id = product_id;
      this.dialog.title = "Xóa sản phẩm";
      this.dialog.text = "Sau khi xóa sản phẩm bạn sẽ không thể hoàn tác";
      this.dialog.show = true;
    },
    async processResultDialogDelete(value) {
      if (value) {
        this.startLoad();
        try {
          const response = await axios.delete(
            `product/delete?id=${this.product_edited_id}`
          );
          this.getProducts();
          this.showAlert(response.data.title, response.data.message, "success", null);
        } catch (error) {
          console.log(error);
          this.showAlert(
            error.response.data.title,
            error.response.data.message,
            "error",
            null
          );
        }
        this.finishLoad();
      }
      this.hideDialog();
    },
    formattedNumber(num) {
      return num.toLocaleString("de-DE");
    },
    getStatusCode(status) {
      return status === "Còn hàng" ? 0 : status === "Hết hàng" ? 1 : 2;
    },
    filterStatus(status) {
      if (status == 0) {
        return this.table_rows;
      }
      return this.table_rows.filter((item) => {
        return this.getStatusCode(item.status) == status - 1;
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
  margin: 40px 0;
}
.content-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid #f1f1f1;
}
.content-heading__list {
  display: flex;
}
.content-heading__item {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px;
  margin-right: 54px;
  cursor: pointer;
  user-select: none;
}
.content-heading__active {
  color: #0172cb;
  box-shadow: 0px 3px 0px 0px blue;
  outline-offset: -3px;
}

.content-heading__active .content-heading__item-title {
  font-weight: 600;
}
.content-heading__item-quantity {
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
  width: 48px;
  height: 48px;
  object-fit: cover;
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
