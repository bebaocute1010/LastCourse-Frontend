<template>
  <div class="form-content">
    <div class="form-heading">
      <p class="form-heading-title">Hoàn tất đăng ký</p>
    </div>
    <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
      <v-window v-model="step">
        <v-window-item :value="1">
          <TextFieldWithValidation
            class="my-input"
            name="username"
            label="Tên đăng nhập"
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
          <TextFieldWithValidation
            class="my-input"
            name="password_confirmation"
            label="Nhập lại mật khẩu"
            :type="show_password_2 ? 'text' : 'password'"
            :append-inner-icon="show_password_2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password_2 = !show_password_2"
            variant="outlined"
            color="red"
          />
          <TextFieldWithValidation
            class="my-input"
            name="introduced_code"
            label="Mã giới thiệu"
            variant="outlined"
            color="red"
          />
        </v-window-item>

        <v-window-item :value="2">
          <TextFieldWithValidation
            class="my-input"
            name="fullname"
            label="Họ và tên"
            variant="outlined"
            color="red"
          />
          <TextFieldWithValidation
            class="my-input"
            name="birthday"
            label="Ngày sinh"
            type="date"
            variant="outlined"
            color="red"
          />
          <Field name="gender" type="combobox" v-slot="{ value, handleChange, errors }">
            <v-combobox
              :model-value="value"
              @update:modelValue="handleChange"
              :error-messages="errors"
              class="my-input"
              label="Giới tính"
              variant="outlined"
              color="red"
              :items="['Nam', 'Nữ', 'Khác']"
            />
          </Field>
        </v-window-item>
      </v-window>

      <v-btn
        type="button"
        class="base-button"
        color="blue"
        v-if="step == 1"
        @click="step++"
        >Tiếp tục</v-btn
      >
      <v-btn
        type="button"
        class="base-button"
        v-if="step == 2"
        @click="step--"
        color="blue"
        >Quay lại</v-btn
      >
      <v-btn type="submit" class="base-button button-finish" v-if="step == 2">Xong</v-btn>
    </Form>
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
      step: 1,
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
      username: (value) => {
        if (!value) return "Vui lòng điền tên đăng nhập.";
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value))
          return "Tên đăng nhập không hợp lệ.";
        if (value?.length < 8) return "Tên đăng nhập phải nhiều hơn 8 ký tự.";
        return true;
      },
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
      introduced_code: (value) => {
        return true;
      },
      fullname: (value) => {
        if (!value) {
          return "Vui lòng nhập họ và tên.";
        }
        return true;
      },
      gender: (value) => {
        if (!value) {
          return "Vui lòng chọn giới tính.";
        }
        return true;
      },
    };
    return { schema };
  },
  created() {
    this.setWindowTitle("Đăng ký thông tin");
    if (!this.email_register) {
      // router.push({ name: "register" });
    }
  },
  methods: {
    onSubmit(values) {
      values.email = this.email_register;
      values.gender = values.gender == "Nam" ? 0 : values.gender == "Nữ" ? 1 : -1;
      axios
        .post("auth/register-information", values)
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
