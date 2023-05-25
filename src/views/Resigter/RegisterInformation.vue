<template>
  <div class="account-info-register-page center-row">
    <AccountLayout class="hide-logo">
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Hoàn tất đăng ký</p>
        </div>
        <form @submit.prevent="submit">
          <v-text-field
              label="Tên đăng nhập"
              class="my-input"
              variant="outlined"
              color="red"
              name="username"
              v-model="username.value.value"
              :error-messages="username.errorMessage.value"
          >
          </v-text-field>
          <v-text-field
              label="Mật khẩu"
              class="my-input"
              variant="outlined"
              color="red"
              name="password"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              :type="show_password ? 'text' : 'password'"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show_password = !show_password"
          >
          </v-text-field>
          <v-text-field
              label="Nhập lại mật khẩu"
              class="my-input"
              variant="outlined"
              color="red"
              name="password_confirmation"
              v-model="password_confirmation.value.value"
              :error-messages="password_confirmation.errorMessage.value"
              :type="show_password_2 ? 'text' : 'password'"
              :append-inner-icon="show_password_2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show_password_2 = !show_password_2"
          >
          </v-text-field>
          <v-text-field
              label="Mã giới thiệu"
              variant="outlined"
              color="red"
              name="referral_code"
              class="my-input"
          >
          </v-text-field>

          <v-btn type="submit" class="base-button button-finish">Xong</v-btn>
        </form>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "@/Layouts/AccountLayout.vue";
import mixins from "@/mixins/mixins";
import {useField, useForm} from "vee-validate";

export default {
  name: "AccountInfoRegister",
  mixins: [mixins],
  components: {AccountLayout},
  data() {
    return {
      show_password: false,
      show_password_2: false,
    }
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (!value) return "Vui lòng điền tên đăng nhập."
          if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) return "Tên đăng nhập không hợp lệ."
          if (value?.length < 6) return "Tên đăng nhập phải nhiều hơn 6 ký tự."
          return true
        },
        password (value) {
          if (value?.length > 8) return true
          return "Mật khẩu phải nhiều hơn 8 ký tự."
        },
        password_confirmation (value) {
          if (value != this.password) return "Mật khẩu không trùng."
        }
      }
    })
    const username = useField("username")
    const password = useField("password")
    const password_confirmation = useField("password_confirmation")
    const referral_code = useField("referral_code")

    const submit = handleSubmit(values => {
      console.log(values)
    })

    return {username, password, password_confirmation, referral_code, submit}
  },
  created() {
    this.setWindowTitle('Fill Information')
  }
}
</script>

<style scoped>
.form-heading {
  margin-bottom: 4rem;
}
.button-finish {
  background-color: #EC1C24;
}
</style>