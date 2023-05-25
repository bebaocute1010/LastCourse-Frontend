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
        <form @submit.prevent="submit">
          <v-text-field
              label="E-mail/Tên đăng nhập"
              class="my-input"
              variant="outlined"
              color="red"
              name="email"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
          >
          </v-text-field>

          <v-text-field
              label="Mật khẩu"
              class="my-input"
              variant="outlined"
              color="red"
              name="password"
              v-model="password.value.value"
              :type="show_password ? 'text' : 'password'"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :error-messages="password.errorMessage.value"
              @click:append-inner="show_password = !show_password"
          >
          </v-text-field>

          <div class="form-bottom-row">
            <div class="check-box-group">
              <input class="check-box-input" type="checkbox" id="check-box-remember" v-model="remember.value.value">
              <label for="check-box-remember" class="check-box-label">Nhớ mật khẩu</label>
            </div>
            <span class="forgot-password" @click="forgotPasswordShow">
              Quên mật khẩu ?
            </span>
          </div>

          <v-btn type="submit" class="base-button button-login">Đăng nhập</v-btn>
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
import { useField, useForm } from 'vee-validate'

export default {
  name: "Login",
  mixins: [mixins],
  components: {Alert, AccountLayout},
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        password (value) {
          if (value?.length > 8) return true
          return "Mật khẩu phải nhiều hơn 8 ký tự."
        },
        email (value) {
          if (!value) return  "Vui lòng nhập Email hoặc Tên đăng nhập."
          return true
        }
      },
    })
    const email = useField("email")
    const password = useField("password")
    const remember = useField("remember")

    const submit = handleSubmit(values => {
      console.log(values)
    })

    return { email, password, remember, submit }
  },
  data() {
    return {
      show_password: false,
      countries: ["Việt Nam", "Mỹ"],
      country_selected: "Việt Nam",
    }
  },
  created() {
    this.setWindowTitle("Login")
    this.remember.value.value = false
  },
  methods: {
    forgotPasswordShow() {
      this.showAlert("Bạn quên mật khẩu rồi à ?", "Quên thì tạo account mới đi nhé =))", "success")
    }
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
}
.countries-select {
  font-weight: 500;
}
.forgot-password {
  cursor: pointer;
  font-size: 14px;
}
</style>