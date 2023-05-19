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
          >
          </v-text-field>

            <v-checkbox
                color="#0074BD"
                class="form-check-box"
                name="accept"
            >
              <template #label>
                <div class="custom-label">
                  <span class="accept-text">Tôi đồng ý với các </span>
                  <span class="rules-text" @click.prevent="dialog_visible = true">Chính sách và điều khoản </span>
                </div>
              </template>
            </v-checkbox>

          <v-btn class="base-button button-register">Tiếp tục</v-btn>
        </form>

        <div>
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
export default {
  name: "Register",
  components: {DialogRules, AccountLayout},
  data() {
    return {
      countries: ["Việt Nam", "Mỹ"],
      country_selected: "Việt Nam",
      dialog_visible: false,
    }
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
}
.accept-text {
  color: black;
}

.rules-text {
  color: #0074BD;
  font-weight: 600;
}
</style>