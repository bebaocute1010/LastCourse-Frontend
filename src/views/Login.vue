<template>
  <div class="basic-page login-page">
    <Alert />
    <AccountLayout>
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Đăng nhập</p>
          <p class="form-heading-subtitle">Đăng nhập tài khoản ngay bây giờ</p>
        </div>
        <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
          <TextFieldWithValidation
            class="my-input"
            name="account"
            label="E-mail/Tên đăng nhập"
            type="text"
            variant="outlined"
            color="red"
          />
          <TextFieldWithValidation
            class="my-input"
            name="password"
            label="Mật khẩu"
            :type="show_password ? 'text' : 'password'"
            :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password = !show_password"
            variant="outlined"
            color="red"
          />

          <div class="form-bottom-row">
            <Field
              name="remember"
              :value="true"
              type="checkbox"
              v-slot="{ value, handleChange }"
            >
              <v-checkbox
                class="my-check-box hide-input-detail"
                :model-value="value"
                @update:modelValue="handleChange"
                label="Nhớ mật khẩu"
                color="#0074BD"
              />
            </Field>
            <span class="forgot-password" @click="forgotPasswordShow">
              Quên mật khẩu ?
            </span>
          </div>

          <v-btn type="submit" class="base-button button-login">Đăng nhập</v-btn>
        </Form>

        <div class="bottom-content">
          <p>
            Bạn chưa có tài khoản
            <router-link :to="{ name: 'register' }" class="another-action"
              >Đăng ký</router-link
            >
          </p>
        </div>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "../Layouts/AccountLayout.vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: { AccountLayout },
  setup() {
    const schema = {
      account: (value) => {
        if (!value) {
          return "Vui lòng nhập Email hoặc Tên đăng nhập.";
        }
        if (value?.length < 8) {
          return "Tên đăng nhập phải nhiều hơn 8 ký tự.";
        }
        return true;
      },
      password: (value) => {
        if (value?.length >= 8) return true;
        return "Mật khẩu phải nhiều hơn 8 ký tự.";
      },
    };

    const router = useRouter();
    return { schema, router };
  },
  data() {
    return {
      show_password: false,
    };
  },
  created() {
    this.finishLoad();
    this.setWindowTitle("Login");
  },
  methods: {
    onSubmit(values) {
      axios
        .post("auth/login", values)
        .then((response) => {
          this.login();
          this.showAlert(response.data.title, response.data.message, "success", "home");
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
    forgotPasswordShow() {
      this.showAlert(
        "Bạn quên mật khẩu rồi à ?",
        "Quên thì tạo account mới đi nhé =))",
        "success"
      );
    },
  },
};
</script>

<style scoped>
.form-bottom-row {
  display: flex;
  align-items: center;
}

.button-login {
  background-color: #ec1c24;
}

.countries-select {
  font-weight: 500;
}

.forgot-password {
  cursor: pointer;
  font-size: 14px;
  width: 40%;
}
.forgot-password:hover {
  color: #0074bd;
}
</style>
