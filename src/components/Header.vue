<template>
  <div id="header">
    <v-dialog
      class="dialog"
      v-model="dialog_profile_show"
      persistent
      width="600"
      v-if="dialog_profile_show"
    >
      <v-card>
        <v-card-title class="dialog-title">
          <span class="text-h5">Thông tin cá nhân</span>
          <v-icon size="24" @click="closeProfileDialog()">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-row>
            <div class="user__avatar">
              <v-avatar size="120">
                <v-img cover :src="urlImage(user_info?.avatar) ?? avatar_url"></v-img>

                <div class="user__avatar__overlay" @click="$refs.btnChooseAvatar.click()">
                  <input
                    type="file"
                    ref="btnChooseAvatar"
                    @change="chooseAvatar"
                    accept="image/*"
                    style="display: none"
                  />
                  <v-icon>mdi-camera</v-icon>
                </div>
              </v-avatar>
            </div>
            <v-col cols="9" class="v-col-9-custom">
              <v-row>
                <v-col cols="12" class="v-col-12-custom">
                  <v-text-field
                    variant="outlined"
                    hide-details="true"
                    label="Họ tên"
                    v-model="user_info.fullname"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="v-col-12-custom">
                  <v-text-field
                    variant="outlined"
                    hide-details="true"
                    type="date"
                    label="Ngày sinh"
                    v-model="user_info.birthday"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                :items="genders"
                item-title="title"
                item-value="value"
                variant="outlined"
                hide-details="true"
                label="Giới tính"
                v-model="user_info.gender"
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-text-field
                variant="outlined"
                label="Mã giới thiệu"
                hide-details="true"
                readonly="true"
                v-model="user_info.invite_code"
                append-icon="mdi-content-copy"
                ref="inviteCode"
                @click:append="copyText()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeProfileDialog()">
            Đóng
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveProfileDialog()">
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class="dialog"
      v-model="dialog_password_show"
      persistent
      width="600"
      v-if="dialog_password_show"
    >
      <v-card>
        <v-card-title class="dialog-title">
          <span class="text-h5">Đổi mật khẩu</span>
          <v-icon size="24" @click="closePasswordDialog()">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                type="password"
                label="Mật khẩu hiện tại"
                v-model="form_change_password.password"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                variant="outlined"
                type="password"
                label="Mật khẩu mới"
                v-model="form_change_password.new_password"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                variant="outlined"
                type="password"
                label="Xác nhận mật khẩu mới"
                v-model="form_change_password.new_password_confirmation"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closePasswordDialog()">
            Đóng
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="savePasswordDialog()">
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="container header">
      <div class="header-images" :to="{ name: 'home' }">
        <router-link :to="{ name: 'home' }">
          <img class="header-image__item" src="/src/assets/logo.svg" />
        </router-link>
      </div>
      <div class="header-search">
        <div class="header-search__box">
          <input
            class="header-search__input"
            placeholder="Tìm kiếm"
            v-model="search_text"
            @input="startSearch"
          />
          <v-btn class="header-search__icon" icon><v-icon>mdi-magnify</v-icon></v-btn>
        </div>

        <div class="header-search__results" v-if="search_rs?.length > 0">
          <v-list>
            <v-list-item v-for="(item, i) in search_rs" :key="i">
              <span>{{ item }}</span>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <div class="header-buttons" v-if="!logged_in">
        <v-btn class="header-button__item" :to="{ name: 'login' }">Đăng nhập</v-btn>
      </div>
      <v-menu v-else open-on-hover>
        <template v-slot:activator="{ props }">
          <div class="user-info" v-bind="props">
            <p class="user__name" v-bind="props">{{ user?.name }}</p>

            <v-avatar class="user__avatar">
              <v-img cover :src="user?.avatar"></v-img>
            </v-avatar>
            <v-icon color="#EC1C24">mdi-menu-down</v-icon>
          </div>
        </template>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            :prepend-icon="item.icon"
            @click="userActions(item.id)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";

export default {
  name: "Header",
  components: { SystemBar },
  data() {
    return {
      genders: [
        { value: 0, title: "Nam" },
        { value: 1, title: "Nữ" },
        { value: 2, title: "Không xác định" },
      ],
      user_info: {
        fullname: null,
        avatar: null,
        birthday: null,
        gender: null,
      },
      avatar_url: null,
      logged_in: false,
      dialog_profile_show: false,
      dialog_password_show: false,
      form_change_password: {
        password: null,
        new_password: null,
        new_password_confirmation: null,
      },
      search_text: "",
      timer: null,
      items: [
        { id: 0, title: "Thông tin cá nhân", icon: "mdi-account-circle" },
        { id: 1, title: "Đổi mật khẩu", icon: "mdi-lock-outline" },
        { id: 2, title: "Đơn hàng của tôi", icon: "mdi-list-box-outline" },
        { id: 3, title: "Xem shop của tôi", icon: "mdi-store" },
        { id: 4, title: "Đăng xuất", icon: "mdi-logout" },
      ],
    };
  },
  props: {
    search_rs: {
      type: Array,
      required: false,
    },
  },
  created() {
    this.logged_in = localStorage.getItem("logged_in") === "true";
    if (this.logged_in && !this.user) {
      this.getUser();
    }
  },
  methods: {
    copyText() {
      const element = this.$refs.inviteCode;
      element.select();
      element.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    async updatePassword() {
      this.startLoad();
      try {
        const response = await axios.post(
          "auth/change-password",
          this.form_change_password
        );
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
    savePasswordDialog() {
      this.updatePassword();
      this.closePasswordDialog();
    },
    closePasswordDialog() {
      this.dialog_password_show = false;
      this.form_change_password.password = null;
      this.form_change_password.new_password = null;
      this.form_change_password.new_password_confirmation = null;
    },
    openPasswordDialog() {
      this.dialog_password_show = true;
    },
    async updateProfile() {
      this.startLoad();
      try {
        const form_data = new FormData();
        for (var key in this.user_info) {
          if (this.user_info[key] !== null) {
            form_data.append(key, this.user_info[key]);
          }
        }
        const response = await axios.post("auth/update-profile", form_data);
        this.showAlert(response.data.title, response.data.message, "success", null);
        this.getUser();
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
    saveProfileDialog() {
      this.updateProfile();
      this.closeProfileDialog();
    },
    closeProfileDialog() {
      this.dialog_profile_show = false;
      this.user_info = null;
      // this.user_info.fullname = null;
      // this.user_info.avatar = null;
      // this.user_info.birthday = null;
      // this.user_info.gender = null;
    },
    async openProfileDialog() {
      try {
        const response = await axios.get("auth/me");
        this.user_info = response.data.data;
        this.avatar_url = this.user_info.avatar;
        this.user_info.avatar = null;
      } catch (error) {
        console.log(error);
      }
      this.dialog_profile_show = true;
    },
    chooseAvatar(event) {
      this.user_info.avatar = event.target.files[0];
    },
    urlImage(image) {
      if (typeof image != "object" || !image) {
        return null;
      }
      return window.URL.createObjectURL(image);
    },
    userActions(id_action) {
      switch (id_action) {
        case 0:
          this.openProfileDialog();
          break;
        case 1:
          this.openPasswordDialog();
          break;
        case 2:
          this.$router.push({ name: "bills" });
          break;
        case 3:
          this.$router.push({ name: "all-products" });
          break;
        case 4:
          this.logout();
          this.logged_in = false;
          break;
        default:
          break;
      }
    },
    startSearch() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.search, 500);
    },
    search() {
      this.$emit("search", this.search_text.trim());
    },
  },
};
</script>

<style scoped>
.v-col-9-custom {
  padding: 0 12px;
}
.v-col-12-custom {
  padding: 0 0 12px;
}
.dialog-title {
  display: flex;
  justify-content: space-between;
}
.dialog {
  padding: 24px;
}
.user__avatar__overlay:hover {
  background: #000000dd;
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
.user-info {
  display: flex;
  align-items: center;
  width: 25%;
  justify-content: flex-end;
  column-gap: 13px;
  cursor: pointer;
}
.header-search__results {
  position: absolute;
  width: 100%;
  top: 80%;
  z-index: 2;
}
.container {
  max-width: 1175px;
  margin: auto;
}
#header {
  height: 109px;
  background-color: #fbd2d3;
}
.header {
  display: flex;
  justify-content: space-between;
  max-height: 100%;
}
.header-images {
  width: 25%;
  padding: 10px 0;
  display: flex;
}
.header-image__item {
  /* max-width: 50%; */
  max-height: 100%;
}
.header-search {
  display: flex;
  position: relative;
}
.header-search__box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.header-search__input {
  background-color: #f1f1f1;
  width: 570px;
  max-width: 100%;
  height: 48px;
  padding: 12px 24px;
  border-radius: 100px;
  border: 1px solid #ec1c24;
}
.header-search__input:focus-visible {
  border: 1px solid #ec1c24;
}
.header-search__icon {
  position: absolute;
  right: 12px;
  max-height: 34px;
  max-width: 34px;
  background-color: #ec1c24;
  color: white;
}
.header-buttons {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: right;
}
.header-button__item {
  background-color: #ec1c24;
  color: white;
  text-transform: none;
  border-radius: 8px;
}
</style>
