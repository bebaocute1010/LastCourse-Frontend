<template>
  <div class="form-content">
    <DialogRules
      :dialog_visible="dialog_visible"
      @updateDialogVisible="updateDialogVisible"
    />
    <div class="form-heading">
      <p class="form-heading-title">Đăng ký tài khoản</p>
      <p class="form-heading-subtitle">Đăng ký tài khoản ngay bây giờ</p>
    </div>

    <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
      <TextFieldWithValidation
        class="my-input"
        name="email"
        label="E-mail"
        variant="outlined"
        color="red"
      />

      <Field
        name="agreement"
        :value="true"
        type="checkbox"
        v-slot="{ value, handleChange, errors }"
      >
        <v-checkbox
          class="my-check-box"
          :model-value="value"
          @update:modelValue="handleChange"
          color="#0074BD"
          :error-messages="errors"
        >
          <template v-slot:label>
            <label class="check-box-label">
              <span @click="handleChange">Tôi đồng ý với các </span>
              <span
                @click.prevent="dialog_visible = true"
                class="check-box-label-highlight"
              >
                Chính sách và điều khoản
              </span>
            </label>
          </template>
        </v-checkbox>
      </Field>
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
</template>

<script>
import AccountLayout from "@/Layouts/AccountLayout.vue";
import DialogRules from "@/components/Register/DialogRules.vue";
import Alert from "@/components/Alert.vue";
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: { Alert, DialogRules, AccountLayout },
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
      agreement(value) {
        if (!value) return "Vui lòng chấp nhận Chính sách và điều khoản";
        return true;
      },
    };
    return { schema };
  },
  created() {
    this.setWindowTitle("Đăng Ký");
  },
  methods: {
    ...mapActions(["setEmailRegister", "setRouteVerified"]),
    onSubmit(values) {
      axios
        .post("auth/register", { email: values.email })
        .then((response) => {
          this.setEmailRegister(values.email);
          this.setRouteVerified("register-information");
          this.showAlert(response.data.title, response.data.message, "success", "verify");
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
