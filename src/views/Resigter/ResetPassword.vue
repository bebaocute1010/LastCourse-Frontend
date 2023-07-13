<template>
  <div class="basic-page account-info-register-page center-row">
    <Alert />
    <AccountLayout class="hide-logo">
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Đặt lại mật khẩu</p>
        </div>
        <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
          <TextFieldWithValidation
            class="my-input"
            name="password"
            label="Mật khẩu mới"
            :type="show_password ? 'text' : 'password'"
            :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password = !show_password"
            variant="outlined"
            color="red"
          />
          <TextFieldWithValidation
            class="my-input"
            name="password_confirmation"
            label="Xác nhận mật khẩu mới"
            :type="show_password_2 ? 'text' : 'password'"
            :append-inner-icon="show_password_2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password_2 = !show_password_2"
            variant="outlined"
            color="red"
          />
          <v-btn type="submit" class="base-button button-finish">Xong</v-btn>
        </Form>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "@/Layouts/AccountLayout.vue";
import { ref } from "vue";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AccountInfoRegister",
  components: { AccountLayout },
  data() {
    return {
      show_password: false,
      show_password_2: false,
    };
  },
  computed: {
    ...mapGetters(["email_register"]),
  },
  setup() {
    const password = ref("");
    const schema = {
      password: (value) => {
        if (value?.length > 8) {
          password.value = value;
          return true;
        }
        return "Mật khẩu phải nhiều hơn 8 ký tự.";
      },
      password_confirmation: (value) => {
        if (value !== password.value) {
          return "Mật khẩu không trùng khớp.";
        }
        return true;
      },
    };
    return { schema };
  },
  created() {
    this.setWindowTitle("Đặt lại mật khẩu");
    if (!this.email_register) {
        router.push({ name: "forgot-password" });
    }
  },
  methods: {
    onSubmit(values) {
      values.email = this.email_register;
      axios
        .post("auth/reset-password", values)
        .then((response) => {
          this.showAlert(response.data.title, response.data.message, "success", "login");
        })
        .catch((error) => {
          this.showAlert(
            error.response.data.title,
            error.response.data.message,
            "error",
            null
          );
        });
    },
  },
};
</script>

<style scoped>
.form-heading {
  margin-bottom: 4rem;
}

.button-finish {
  background-color: #ec1c24;
}
</style>
