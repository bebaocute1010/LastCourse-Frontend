<template>
  <div class="basic-page register-page">
    <Alert />
    <DialogRules
      :dialog_visible="dialog_visible"
      @updateDialogVisible="updateDialogVisible"
    />
    <AccountLayout>
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Quên mật khẩu</p>
          <p class="form-heading-subtitle">
            Nhập email đã đăng ký tài khoản để nhận mã OTP
          </p>
        </div>

        <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
          <TextFieldWithValidation
            class="my-input"
            name="email"
            label="E-mail"
            variant="outlined"
            color="red"
          />

          <v-btn type="submit" class="base-button button-register">Tiếp tục</v-btn>
        </Form>

        <div class="bottom-content">
          <p>
            Bạn đã có tài khoản
            <router-link :to="{ name: 'login' }" class="another-action"
              >Đăng Nhập</router-link
            >
          </p>
        </div>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "@/Layouts/AccountLayout.vue";
import Alert from "@/components/Alert.vue";
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: { Alert, AccountLayout },
  data() {
    return {
      dialog_visible: false,
    };
  },
  setup() {
    const schema = {
      email: (value) => {
        if (!value) return "Vui lòng nhập Email.";
        if (/^[a-z.0-9]+@[a-z.0-9]+\.[a-z]+$/i.test(value)) return true;
        return "Email không hợp lệ";
      },
    };
    return { schema };
  },
  created() {
    this.setWindowTitle("Quên mật khẩu");
  },
  methods: {
    ...mapActions(["setEmailRegister", "setRouteVerified"]),
    onSubmit(values) {
      axios
        .post("auth/forgot-password", { email: values.email })
        .then((response) => {
          this.setEmailRegister(values.email);
          this.setRouteVerified("reset-password");
          this.$router.push({ name: "verify" });
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
    updateDialogVisible(value) {
      this.dialog_visible = value;
    },
  },
};
</script>

<style scoped>
.button-register {
  background-color: #6f6f6f;
}

.check-box-label-highlight {
  color: #0074bd;
  font-weight: 600;
}

.v-messages {
  opacity: 1;
}

.error-message .v-messages__message {
  text-align: left;
  padding-left: 16px;
  color: #b00020;
}
</style>
