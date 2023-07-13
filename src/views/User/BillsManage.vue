<template>
  <user-layout>
    <v-dialog v-model="dialog_detail" max-width="1200">
      <v-card class="dialog_detail">
        <v-card-title class="dialog_heading">
          <p>Thông tin sản phẩm</p>
          <v-icon @click="closeDialogBillDetail()">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-data-table
            items-per-page="5"
            v-model:page="dialog_detail_page"
            :headers="dialog_detail_header"
            :items="dialog_detail_data"
            height="460"
          >
            <template v-slot:[`item.name`]="{ item }">
              <div class="product">
                <div class="product-image">
                  <v-img cover :src="item.selectable.image"></v-img>
                </div>
                <p class="product-name">{{ item.selectable.name }}</p>
              </div>
            </template>

            <template v-slot:[`item.price`]="{ item }">
              <p class="product-price">
                {{ this.getLocaleStringNumber(item.selectable.price) }}
              </p>
            </template>

            <template v-slot:bottom>
              <v-pagination
                class="pagination-bar"
                v-if="dialogDetailPageCount > 1"
                v-model="dialog_detail_page"
                :length="dialogDetailPageCount"
                :total-visible="5"
              ></v-pagination>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialogBillDetail()"> Đóng </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <dialog-delete
      :dialog="dialog_delete"
      :title="dialog_delete_title"
      :text="dialog_delete_text"
      @emitResultDialog="processResultDialogDelete"
    ></dialog-delete>
    <div id="main-content">
      <div class="content-heading">
        <ul class="content-heading__list">
          <li
            :class="{
              'content-heading__item': true,
              'content-heading__active': i === status_selected,
            }"
            v-for="(item, i) in heading_items"
            :key="i"
            @click="
              {
                status_selected = i;
                selected = [];
              }
            "
          >
            <span class="content-heading__item-title">{{ item.title }}</span>
            <span class="content-heading__item-quantity"
              >({{ filterStatus(i).length }})</span
            >
          </li>
        </ul>
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
          height="500"
        >
          <template v-slot:[`item.delivery`]="{ item }">
            <div class="delivery">
              <p>{{ item.selectable.phone }}</p>
              <p class="delivery__address">{{ item.selectable.address }}</p>
            </div>
          </template>

          <template v-slot:[`item.detail`]="{ item }">
            <div class="detail">
              <button @click="viewDetail(item.selectable.id)">
                Xem <v-icon>mdi-eye</v-icon>
              </button>
            </div>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getColor(item.selectable.status)">{{
              getStatusString(item.selectable.status)
            }}</v-chip>
          </template>

          <template v-slot:[`item.order_time`]="{ item }">
            <span>{{ formatTime(item.selectable.created_at) }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div
              class="actions-group-button"
              v-if="[0, 1].includes(item.selectable.status)"
            >
              <button
                class="action-button edit-item-button"
                v-if="item.selectable.status == 0"
                @click="updateStatusBill(1, false, item.selectable)"
              >
                Xác nhận
              </button>
              <button
                class="action-button edit-item-button"
                v-if="item.selectable.status == 1"
                @click="updateStatusBill(2, false, item.selectable)"
              >
                Giao hàng
              </button>
              <button
                v-if="item.selectable.status === 0"
                class="action-button delete-item-button"
                @click="
                  showDialogDelete(
                    'Hủy đơn hàng',
                    'Bạn có chắc chắn muốn hủy đơn hàng này ?',
                    5,
                    false,
                    item.selectable
                  )
                "
              >
                Hủy
              </button>
            </div>
            <span v-else>-</span>
          </template>
          <template v-slot:bottom>
            <v-pagination
              class="pagination-bar"
              v-if="pageCount > 1"
              v-model="page"
              :length="pageCount"
              :total-visible="5"
            ></v-pagination>
            <div
              id="table-footer"
              v-if="selected.length > 0 && status_selected > 0 && status_selected < 3"
            >
              <div id="table-footer__number-selected">
                <span>{{ selected.length }} đơn hàng đã được chọn</span>
                <div class="table-footer__buttons-group">
                  <div class="actions-group-button">
                    <button
                      v-if="status_selected === 1"
                      class="action-button delete-item-button"
                      @click="
                        showDialogDelete(
                          'Hủy đơn hàng',
                          'Bạn có chắc chắn muốn hủy những đơn hàng này ?',
                          5,
                          true,
                          null
                        )
                      "
                    >
                      Hủy
                    </button>
                    <button
                      v-if="status_selected === 1"
                      class="action-button edit-item-button"
                      @click="updateStatusBill(1, true, null)"
                    >
                      Xác nhận
                    </button>
                    <button
                      class="action-button edit-item-button"
                      v-else-if="status_selected === 2"
                      @click="updateStatusBill(2, true, null)"
                    >
                      Giao hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </user-layout>
</template>

<script>
import DialogDelete from "../../components/DialogDelete.vue";
import UserLayout from "../../Layouts/UserLayout.vue";
export default {
  components: { UserLayout, DialogDelete },
  name: "BillsManage",
  data() {
    return {
      page: 1,
      dialog_delete: false,
      dialog_detail_data: [],
      dialog_detail_page: 1,
      dialog_detail_header: [
        {
          title: "Tên sản phẩm",
          key: "name",
          sortable: false,
        },
        {
          title: "Đơn giá",
          key: "price",
          sortable: false,
        },
        {
          title: "Phân loại",
          key: "variant",
          sortable: false,
          align: "center",
        },
        {
          title: "Số lượng",
          key: "quantity",
          sortable: false,
          align: "center",
        },
      ],
      dialog_detail: false,
      search: "",
      status_selected: 0,
      selected: [],
      heading_items: [
        {
          title: "Tất cả",
        },
        {
          title: "Chờ xác nhận",
        },
        {
          title: "Đã xác nhận",
        },
        {
          title: "Đang giao",
        },
        {
          title: "Thành công",
        },
        {
          title: "Đã hoàn",
        },
        {
          title: "Đã hủy",
        },
      ],
      table_headers: [
        {
          title: "Khách hàng",
          sortable: false,
          key: "receiver",
          width: 150,
        },
        {
          title: "Thông tin nhận hàng",
          sortable: false,
          key: "delivery",
          width: 200,
        },
        {
          title: "Thông tin sản phẩm",
          sortable: false,
          key: "detail",
          align: "center",
          width: 120,
        },
        {
          title: "Thời gian đặt",
          key: "order_time",
          align: "center",
        },
        {
          title: "Trạng thái",
          key: "status",
          align: "center",
        },
        {
          title: "Hành động",
          sortable: false,
          key: "actions",
          align: "center",
        },
      ],
      table_rows: [],
      dialog_delete_title: "",
      dialog_delete_text: "",
      cur_dialog_action: null,
      action_multiple: false,
      item_edited: null,
      cur_bill_id: null,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filterStatus(this.status_selected).length / 10);
    },
    dialogDetailPageCount() {
      return Math.ceil(this.dialog_detail_data.length / 5);
    },
  },
  created() {
    this.setWindowTitle("Quản lý đơn hàng");
    this.getBills();
  },
  methods: {
    closeDialogBillDetail() {
      this.dialog_detail = false;
      this.cur_bill_id = null;
      this.dialog_detail_data = [];
    },
    async getBillDetails(bill_id) {
      this.startLoad();
      try {
        const response = await axios.get(`bill/details?id=${bill_id}`);
        this.dialog_detail_data = response.data.data;
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async getBills() {
      this.startLoad();
      try {
        const response = await axios.get("shop/bills");
        this.table_rows = response.data.data;
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push({ name: "login" });
          return;
        }
        console.log(error);
      }
      this.finishLoad();
    },
    getIdsEdited() {
      if (this.action_multiple) {
        return this.selected;
      }
      return [this.item_edited.id];
    },
    async updateStatusBill(action, multiple = false, item_edited = null) {
      this.action_multiple = multiple;
      this.item_edited = item_edited;
      let title = null;
      let message = null;
      let type = null;
      try {
        this.startLoad();
        let response = null;
        let url = "bill/" + (action == 1 ? "confirm" : "delivery");
        response = await axios.post(url, { ids: this.getIdsEdited() });
        if (response) {
          title = response.data.title;
          message = response.data.message;
          type = "success";
        }
      } catch (error) {
        console.log(error);
        title = error.response.data.title;
        message = error.response.data.message;
        type = "error";
      }
      this.finishLoad();
      if (title && message) {
        this.showAlert(title, message, type, null);
        this.getBills();
        this.status_selected = 0;
      }
    },
    showDialogDelete(title, text, action, multiple = false, item_edited = null) {
      this.item_edited = item_edited;
      this.dialog_delete_title = title;
      this.dialog_delete_text = text;
      this.cur_dialog_action = action;
      this.action_multiple = multiple;
      this.dialog_delete = true;
    },
    async processResultDialogDelete(value) {
      this.dialog_delete = false;
      const ids = this.getIdsEdited();
      let title = null;
      let message = null;
      let type = null;
      if (value) {
        this.startLoad();
        try {
          if (this.cur_dialog_action === 5) {
            const response = await axios.post("bill/cancel", { ids: ids });
            title = response.data.title;
            message = response.data.message;
            type = "success";
            this.delayMethod(this.getNotifications, 2500);
          }
        } catch (error) {
          console.log(error);
          title = error.response.data.title;
          message = error.response.data.message;
          type = "error";
        }
        this.finishLoad();
      }
      if (title && message) {
        this.showAlert(title, message, type, null);
        this.getBills();
        this.status_selected = 0;
      }
      this.resetData();
    },
    resetData() {
      this.cur_dialog_action = null;
      this.item_edited = null;
      this.multiple = false;
    },
    resultDialogDelete(value) {
      this.dialog_delete = false;
    },
    isSelectedAll() {
      return this.selected.length == this.filterStatus(this.status_selected).length;
    },
    formatTime(time) {
      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      const formattedDate = `${day}/${month}/${year}`;

      return `${formattedTime} ${formattedDate}`;
    },
    viewDetail(bill_id) {
      this.getBillDetails(bill_id);
      this.cur_bill_id = bill_id;
      this.dialog_detail = true;
    },
    filterStatus(status) {
      if (status == 0) {
        return this.table_rows;
      }
      return this.table_rows.filter((item) => {
        return item.status + 1 == status;
      });
    },
    getColor(status) {
      if (status === 0) return "#ff6600";
      else if (status === 1) return "#ffbb00";
      else if (status === 2) return "#0172cb";
      else if (status === 3) return "#2eb02e";
      else if (status === 4) return "#8f8f8f";
      else if (status === 5) return "#e60a32";
      else return "-";
    },
    getStatusString(status) {
      if (status === 0) return "Chờ xác nhận";
      else if (status === 1) return "Đã xác nhận";
      else if (status === 2) return "Đang giao";
      else if (status === 3) return "Thành công";
      else if (status === 4) return "Đã hoàn";
      else if (status === 5) return "Đã hủy";
      else return "-";
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
};
</script>

<style scoped>
.product-name {
  width: 300px;
  font-size: 14px;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pagination-bar {
  padding-bottom: 20px;
}
.delivery__address {
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.delivery {
  font-size: 14px;
  padding: 8px 0;
  width: 250px;
}
.dialog_detail {
  padding: 12px;
}
.dialog_heading {
  display: flex;
  justify-content: space-between;
}
.cancel {
  color: #ec1c24;
}
.return {
  color: #8f8f8f;
}
.success {
  color: #2eb02e;
}
.delivering {
  color: #0172cb;
}
.confirm {
  color: #ffb800;
}
#main-content {
  margin: 24px 0;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
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
  justify-content: space-between;
  width: 100%;
}
.content-heading__item {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px;
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
.content-search__icon:hover {
  background: #3a01cb;
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
  cursor: pointer;
}
.table-footer__checkbox-group {
  display: flex;
  align-content: center;
}

.product {
  display: flex;
  column-gap: 16px;
  padding: 16px 0;
  align-items: center;
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
.actions-group-button {
  display: flex;
  column-gap: 8px;
  justify-content: flex-end;
}
.action-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 10px;
  font-size: 14px;

  padding: 8px 16px;
  border-radius: 100px;
}
.edit-item-button:hover {
  background: #3a01cb;
}
.edit-item-button {
  background: #0172cb;
  color: #ffffff;
}
.delete-item-button:hover {
  background: #9c0202;
}
.delete-item-button {
  background: #e60a32;
  color: #ffffff;
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
