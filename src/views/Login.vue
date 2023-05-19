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
          >
          </v-text-field>

          <v-text-field
              label="Mật khẩu"
              :type="show_password ? 'text' : 'password'"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              variant="outlined"
              color="red"
              name="password"
              @click:append-inner="show_password = !show_password"
          >
          </v-text-field>

          <v-row class="form-bottom-row">
            <v-checkbox
                label="Nhớ mật khẩu"
                color="#0074BD"
                class="form-check-box"
                name="remember_me"
            ></v-checkbox>

            <div>
              Quên mật khẩu ?
            </div>
          </v-row>

          <v-btn class="base-button button-login">Đăng nhập</v-btn>
        </form>
        <div>
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

export default {
  name: "Login",
  components: {Alert, AccountLayout},
  data() {
    return {
      show_password: false,
      countries: ["Việt Nam", "Mỹ"],
      country_selected: "Việt Nam",
    }
  }
}
</script>

<style scoped>
.form-bottom-row {
}
.button-login {
  background-color: #EC1C24;
}

</style>