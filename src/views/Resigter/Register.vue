<template>
  <div class="register-page">
    <DialogRules :dialog_visible="dialog_visible" @updateDialogVisible="updateDialogVisible"/>
    <AccountLayout>
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Đăng ký tài khoản</p>
          <p class="form-heading-subtitle">
            Đăng ký tài khoản ngay bây giờ
          </p>
        </div>

        <form @submit.prevent="submit">
          <v-text-field
              label="E-mail"
              class="my-input"
              variant="outlined"
              color="red"
              name="email"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
          >
          </v-text-field>

          <div class="check-box-group">
            <input class="check-box-input" type="checkbox" id="check-box-agreement" name="agreement" v-model="agreement.value.value">
            <label for="check-box-agreement" class="check-box-label">Tôi đồng ý với các <span @click.prevent="dialog_visible = true" class="check-box-label-highlight">Chính sách và điều khoản</span></label>
          </div>
          <div class="v-input__details">
            <div class="error-message v-messages" role="alert" aria-live="polite">
              <div class="v-messages__message">{{agreement.errorMessage.value}}</div>
            </div>
          </div>

          <v-btn class="base-button button-register" type="submit">Tiếp tục</v-btn>
        </form>

        <div class="bottom-content">
          <p>Bạn đã có tài khoản  <router-link :to="{name: 'login'}" class="another-action">Đăng Nhập</router-link></p>
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
import AccountLayout from "@/Layouts/AccountLayout.vue";
import DialogRules from "@/components/Register/DialogRules.vue";
import mixins from "@/mixins/mixins";
import {useForm, useField} from "vee-validate";
import { useRouter } from "vue-router"

export default {
  name: "Register",
  mixins: [mixins],
  components: {DialogRules, AccountLayout},
  data() {
    return {
      countries: ["Việt Nam", "Mỹ"],
      country_selected: "Việt Nam",
      dialog_visible: false,
    }
  },
  setup() {
    const router = useRouter()
    const redirectTo = (page_name) => {
      router.push({name: page_name});
    };
    const { handleSubmit } = useForm({
      validationSchema: {
        email(value) {
          if (!value)
            return "Vui lòng nhập Email."
          if (/^[a-z.0-9]+@[a-z.0-9]+\.[a-z]+$/i.test(value)) return true
          return "Email không hợp lệ"
        },
        agreement(value) {
          if (!value) return "Vui lòng chấp nhận Chính sách và điều khoản"
          return true
        }
      }
    })
    const email = useField("email")
    const agreement = useField("agreement")

    const submit = handleSubmit(values => {
      console.log(values)
      redirectTo("verify")
    })

    return { email, agreement, submit }
  },
  created() {
    this.setWindowTitle("Register")
  },
  methods: {
    updateDialogVisible(value) {
      this.dialog_visible = value
    },
  }
}
</script>

<style scoped>
.button-register {
  background-color: #6F6F6F;
}
.check-box-label-highlight {
  color: #0074BD;
  font-weight: 600;
}
.v-messages {
  opacity: 1;
}
.error-message .v-messages__message{
  text-align: left;
  padding-left: 16px;
  color: #b00020;
}
</style>