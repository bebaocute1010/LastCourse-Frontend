<template>
  <div id="system-bar">
    <div class="container">
      <v-dialog
        class="dialog"
        v-model="dialog_show"
        persistent
        width="600"
        v-if="dialog || dialog_show"
      >
        <v-card>
          <v-card-title class="dialog-title">
            <span class="text-h5">{{
              form_shop.id ? "Cập nhật Shop" : "Đăng ký Shop"
            }}</span>
            <v-icon size="24" @click="closeDialog()">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-row>
              <div class="user__avatar">
                <v-avatar size="120">
                  <v-img
                    v-if="form_shop?.avatar"
                    cover
                    :src="urlImage(form_shop?.avatar) ?? form_shop.avatar"
                  ></v-img>

                  <div
                    class="user__avatar__overlay"
                    @click="$refs.btnChooseAvatar.click()"
                  >
                    <input
                      type="file"
                      ref="btnChooseAvatar"
                      @change="chooseAvatar"
                      accept="image/*"
                      style="display: none"
                    />
                    <div class="choose-image__title">
                      <v-icon>mdi-camera</v-icon>
                      <p v-if="!form_shop.avatar">Chọn avatar</p>
                    </div>
                  </div>
                </v-avatar>
              </div>
              <v-col cols="9">
                <div class="user__banner">
                  <v-img
                    v-if="form_shop?.banner"
                    cover
                    :src="urlImage(form_shop?.banner) ?? form_shop.banner"
                  ></v-img>
                  <div
                    class="user__avatar__overlay"
                    @click="$refs.btnChooseBanner.click()"
                  >
                    <input
                      type="file"
                      ref="btnChooseBanner"
                      @change="chooseBanner"
                      accept="image/*"
                      style="display: none"
                    />
                    <div class="choose-image__title">
                      <v-icon>mdi-camera</v-icon>
                      <p v-if="!form_shop.banner">Chọn ảnh bìa</p>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  hide-details="true"
                  label="Tên shop"
                  v-model="form_shop.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  hide-details="true"
                  type="text"
                  label="Địa chỉ"
                  v-model="form_shop.locate"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  hide-details="true"
                  type="text"
                  label="Email"
                  v-model="form_shop.email"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  :items="carriers"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  hide-details="true"
                  label="Đơn vị vận chuyển"
                  v-model="form_shop.carrier_id"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  hide-details="true"
                  label="Giá vận chuyển"
                  readonly
                  v-model="priceCarrier"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
              Đóng
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="subcribeShop()">
              {{ form_shop.id ? "Cập nhật" : "Đăng ký" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ul class="system-bar--menu">
        <li class="system-bar__item right-border">
          <a href="#">Thương gia và thị trường </a>
        </li>
        <li class="system-bar__item right-border">
          <a href="#">Tải ứng dụng </a>
        </li>
        <li class="system-bar__item">
          <p class="btn-show-dialog" @click="openDialog">Kênh người bán</p>
        </li>
      </ul>

      <ul class="system-bar--menu">
        <a href="#">
          <li class="system-bar__item">
            <v-icon>mdi-chat-question</v-icon>
            Hỗ trợ
          </li>
        </a>
        <li class="system-bar__item" id="menu-languages">
          <v-icon>mdi-web</v-icon>
          Tiếng Việt
          <v-icon>mdi-menu-down</v-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemBar",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      dialog_show: false,
      form_shop: {
        name: null,
        email: null,
        carrier_id: null,
        avatar: null,
        banner: null,
        locate: null,
      },
      carriers: [],
    };
  },
  watch: {
    dialog() {
      if (this.dialog !== null) {
        this.dialog_show = this.dialog;
      }
      if (this.dialog) {
        this.getCarriers();
        axios
          .get("shop/infor")
          .then((response) => {
            this.form_shop = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  computed: {
    priceCarrier() {
      let price = 0;
      this.carriers.filter((carrier) => {
        if (carrier.id == this.form_shop.carrier_id) {
          price = carrier.price;
        }
      });
      return price;
    },
  },
  created() {},
  methods: {
    urlImage(file) {
      if (typeof file == "string") {
        return null;
      }
      return URL.createObjectURL(file) ?? "#";
    },
    chooseBanner(event) {
      this.form_shop.banner = event.target.files[0];
    },
    chooseAvatar(event) {
      this.form_shop.avatar = event.target.files[0];
    },
    async subcribeShop() {
      this.startLoad();
      try {
        const form_data = new FormData();
        for (let key in this.form_shop) {
          form_data.append(key, this.form_shop[key]);
        }
        let url = this.form_shop.id ? "shop/update" : "shop/create";
        const response = await axios.post(url, form_data);
        this.showAlert(response.data.title, response.data.message, "success", null);
        this.closeDialog();
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
    closeDialog() {
      this.$emit("closeDialogShopUpdate");
      this.dialog_show = false;
      this.form_shop.name = null;
      this.form_shop.email = null;
      this.form_shop.carrier_id = null;
      this.form_shop.avatar = null;
      this.form_shop.banner = null;
      this.form_shop.locate = null;
    },
    openDialog() {
      this.$emit("showDialogShopUpdate");
      this.dialog_show = true;
      this.getCarriers();
    },
    async getCarriers() {
      this.startLoad();
      try {
        const response = await axios.get("get/carriers");
        this.carriers = response.data.data;
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
  },
};
</script>

<style scoped>
.btn-show-dialog {
  cursor: pointer;
}
.v-col-6 {
  padding: 0;
  padding-right: 12px;
  /* margin-right: 12px; */
}
.v-col-6:last-child {
  padding: 0;
}
.v-col-12 {
  padding: 0 0 12px;
}
.v-col-9 {
  margin-left: 8px;
  padding: 0 12px;
}
.dialog-title {
  display: flex;
  justify-content: space-between;
}
.dialog {
  padding: 24px;
}
.user__banner {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 120px;
  border-radius: 8px;
  overflow: hidden;
}
.choose-image__title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user__avatar__overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000080;
  /* border-radius: 50%; */
  color: #ffffff;
  cursor: pointer;
}
.user__avatar {
  position: relative;
}
.user__name {
  font-weight: 600;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #ffffff;
}

#system-bar {
  width: 100vw;
  height: 32px;
  background-color: #ec1c24;
  font-size: 14px;
  font-weight: 400;
}
.container {
  width: 100%;
  height: 100%;
  max-width: 1175px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.system-bar--menu {
  display: flex;
}

.system-bar__item {
  color: white;
  padding: 0 8px;
}
.right-border:first-child {
  padding-left: 0;
}

.right-border {
  border-right: 1px solid white;
}
#menu-languages {
  cursor: pointer;
  padding-right: 0;
}
</style>
