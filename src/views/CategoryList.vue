<script>
import DialogDelete from "../components/DialogDelete.vue";

export default {
  name: "CategoryList",
  components: {DialogDelete},
  data() {
    return {
      dialog: {
        show: false,
        title: "Thêm danh mục",
        file: null,
        item: null
      },
      category_list: [],
      headers: [
        {
          key: "code",
          title: "Mã danh mục",
          width: 200
        },
        {
          key: "name",
          title: "Tên danh mục",
          width: 250
        },
        {
          key: "image",
          title: "Hình ảnh",
          width: 100
        },
        {
          key: "note",
          title: "Mô tả"
        },
        {
          key: "actions",
          title: "Hoạt động",
          width: 200
        }
      ],
      dialog_delete: false,
      item_edited: null
    }
  },
  created() {
    this.getAllCategories()
  },
  methods: {
    async getAllCategories() {
      this.startLoad()
      const response = await axios.get("get/category/all")
      this.category_list = response.data.data
      this.finishLoad()
    },
    async editCategory(id) {
      this.startLoad()
      const response = await axios.get(`get/category/show?id=${id}`)
      this.dialog.item= response.data.data
      this.dialog.show = true
      this.finishLoad()
    },
    resetForm() {
      this.dialog = {
        show: false,
        title: "Thêm danh mục",
        file: null,
        item: {
          code: null,
          name: null,
          image: null,
          note: null
        }
      }
    },
    openFormCategory() {
      this.resetForm()
      this.dialog.show = true
    },
    async processResultDialogDelete(value) {
      console.log(value)
      this.dialog_delete = false;
      if (value) {
        try {
          const response = await axios.delete(`category/delete/${this.item_edited}`)
          this.showAlert("Thành công", "Xóa danh mục thành công", "success", null)
          this.getAllCategories()
        } catch (error) {
          const res = error.response.data
          this.showAlert(res.title ?? "Lỗi", res.message ?? "Lỗi hệ thống", "error", null)
        }
      }
    },
    async submitForm() {
      console.log(this.dialog.item)
      const url = this.dialog.item.id > 0 ? "category/update" : "category"
      const formData = new FormData()
      if (typeof this.dialog.item.image == "string" || !this.dialog.item.image) {
        delete this.dialog.item.image
      }
      for (let key in this.dialog.item) {
        formData.append(key, this.dialog.item[key])
      }
      try {
        const response = await axios.post(url,formData)
        if (response) {
          this.getAllCategories()
          this.resetForm()
          this.showAlert(
              "Thành công",
              this.dialog.item.id > 0
                  ? "Thêm danh mục sản phẩm thành công"
                  : "Sửa danh mục sản phẩm thành công",
              "success",
              null)
        }
      } catch (error) {
        const res = error.response.data
        this.showAlert( "Lỗi", res.message, "error")
      }
    },
    showDialogDelete(id) {
      this.item_edited = id
      this.dialog_delete = true
    },
    handleChangeFile(event) {
      const files = event.target.files
      if (files.length === 0) {
        this.dialog.item.image = null
      } else if (files.length === 1) {
        this.dialog.item.image = files[0]
      } else {
        this.showAlert("Lỗi", "Tối đa 1 ảnh đại diện", "error")
      }
    }
  }
}
</script>

<template>
  <template>
    <dialog-delete
        :dialog="dialog_delete"
        title="Xóa danh mục"
        text="Sau khi xóa danh mục bạn sẽ không thể hoàn tác"
        @emitResultDialog="processResultDialogDelete"
    ></dialog-delete>

    <v-row justify="center">
      <v-dialog
          v-model="dialog.show"
          persistent
          width="1024"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialog.title ?? "Thêm danh mục" }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="6"
                >
                  <v-text-field
                      variant="outlined"
                      v-model="dialog.item.code"
                      label="Mã danh mục"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="6"
                >
                  <v-text-field
                      variant="outlined"
                      v-model="dialog.item.name"
                      label="Tên danh mục"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-file-input
                      multiple v-model="dialog.file" @input="handleChangeFile"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="dialog.item.note"
                    label="Mô tả"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="resetForm"
            >
              Hủy
            </v-btn>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="submitForm"
            >
              Lưu
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>


  <div class="d-flex flex-column w-100">
    <div class="d-flex justify-end mt-5 mb-5">
      <v-btn @click="openFormCategory" color="success">Thêm</v-btn>
    </div>

    <v-data-table
        :headers="headers"
        :items="category_list"
        class="elevation-1"
        hover
        height="700"
        item-value="name"
    >
      <template v-slot:[`item.image`]="{item}">
        <div  class="pt-2 pb-2">
          <v-img contain width="120px" height="60px" :src="item.selectable.image"></v-img>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <v-btn class="mr-2" icon @click="editCategory(item.selectable.id)">
          <v-icon>mdi-pencil-box</v-icon>
        </v-btn>
        <v-btn icon @click="showDialogDelete(item.selectable.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>

</template>

<style scoped>

</style>