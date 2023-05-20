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

        <form>
          <v-text-field
              label="E-mail"
              variant="outlined"
              color="red"
              name="email"
              class="my-input"
          >
          </v-text-field>

          <div class="check-box-group">
            <input class="check-box-input" type="checkbox" id="check-box-remember">
            <label for="check-box-remember" class="check-box-label">Tôi đồng ý với các <span @click.prevent="dialog_visible = true" class="check-box-label-highlight">Chính sách và điều khoản</span></label>
          </div>

          <v-btn class="base-button button-register">Tiếp tục</v-btn>
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
  created() {
    this.setWindowTitle("Register")
  },
  methods: {
    updateDialogVisible(value) {
      this.dialog_visible = value
    }
  }
}
</script>

<style scoped>
.button-register {
  background-color: #6F6F6F;
  margin-top: 3rem;
}
.check-box-label-highlight {
  color: #0074BD;
  font-weight: 600;
}
.bottom-content {
  margin-top: 1.5rem;
}
</style>