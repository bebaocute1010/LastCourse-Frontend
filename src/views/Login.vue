<template>
  <div class="login-page">
    <Alert/>
    <AccountLayout>
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Đăng nhập</p>
          <p class="form-heading-subtitle">
            Đăng nhập tài khoản ngay bây giờ
          </p>
        </div>
        <form>
          <v-text-field
              label="E-mail"
              variant="outlined"
              color="red"
              name="email"
              class="my-input"
          >
          </v-text-field>

          <v-text-field
              label="Mật khẩu"
              :type="show_password ? 'text' : 'password'"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              variant="outlined"
              color="red"
              name="password"
              class="my-input"
              @click:append-inner="show_password = !show_password"
          >
          </v-text-field>

          <div class="form-bottom-row">
            <div class="check-box-group">
              <input class="check-box-input" type="checkbox" id="check-box-remember">
              <label for="check-box-remember" class="check-box-label">Nhớ mật khẩu</label>
            </div>
            <div class="forgot-password">
              Quên mật khẩu ?
            </div>
          </div>

          <v-btn class="base-button button-login">Đăng nhập</v-btn>
        </form>
        <div class="bottom-content">
          <p>Bạn chưa có tài khoản  <router-link :to="{name: 'register'}" class="another-action">Đăng ký</router-link></p>
          <div class="countries-select">
            <v-select
                :items="countries"
                v-model="country_selected"
                single-line
                hide-selected
                variant="plain"
            ></v-select>
          </div>
        </div>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "../Layouts/AccountLayout.vue";
import Alert from "@/components/Alert.vue";
import mixins from "@/mixins/mixins";

export default {
  name: "Login",
  mixins: [mixins],
  components: {Alert, AccountLayout},
  data() {
    return {
      show_password: false,
      countries: ["Việt Nam", "Mỹ"],
      country_selected: "Việt Nam",
    }
  },
  created() {
    this.setWindowTitle("Login")
  }
}
</script>

<style scoped>
.form-bottom-row {
  display: flex;
  justify-content: space-between;
}
.button-login {
  background-color: #EC1C24;
  margin-top: 3rem;
}
.countries-select {
  font-weight: 500;
}
.bottom-content {
  margin-top: 1.5rem;
}
.forgot-password {
  font-size: 14px;
}
</style>