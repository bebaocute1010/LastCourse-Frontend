<template>
  <div class="verify-otp-page center-row">
    <Alert/>
    <AccountLayout class="hide-logo">
      <div class="form-content">
        <div class="form-heading">
          <p class="form-heading-title">Nhập mã OTP</p>
          <p class="form-heading-subtitle">Mã OTP sẽ được gửi đến email của bạn</p>
        </div>
        <div class="otp-container">
          <input
              v-for="(digit, index) in otp_digits"
              :key="index"
              v-model="otp_digits[index]"
              type="text"
              maxlength="1"
              @input="handleInput(index, $event)"
              ref="otp"
              class="otp-input"
          />
        </div>
        <div class="otp-wait-time">
          <button :disabled="!(otp_time_wait === '')" @click="sendOtp">{{otp_time_wait ? ("Gửi lại mã OTP(" + otp_time_wait  + ")"): "Gửi mã OTP"}}</button>
        </div>

        <v-btn :disabled=!isAllDigitsFilled :class="{'base-button': true, 'btn-confirm': true, 'otp-filled':isAllDigitsFilled}" :to="{name: 'register-information'}">Xác nhận</v-btn>

        <div class="bottom-content">
          <p>Bạn đã có tài khoản  <router-link :to="{name: 'login'}" class="another-action">Đăng Nhập</router-link></p>
        </div>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
import AccountLayout from "@/Layouts/AccountLayout.vue";
import Alert from "@/components/Alert.vue";
import mixins from "@/mixins/mixins";
export default {
  name: "VerifyOTP",
  mixins: [mixins],
  components: {AccountLayout, Alert},
  data() {
    return {
      otp_digits: ['', '', '', '', '', ''],
      otp_time_wait: "",
      wait_until: null,
      interval_id: null
    }
  },
  computed: {
    isAllDigitsFilled() {
      for (let i=0; i<this.otp_digits.length; i++) {
        if (this.otp_digits[i] === '' || !/^\d*$/.test(this.otp_digits[i])) {
          return false
        }
      }
      return true
    }
  },
  created() {
    this.setWindowTitle('Verify OTP')
    let current_time = new Date().getTime()
    this.wait_until = new Date(current_time + (10 * 1000));
  },
  mounted() {
  },
  methods: {
    sendOtp() {
      let current_time = new Date().getTime()
      this.wait_until = new Date(current_time + (10 * 1000));
      this.showAlert("Gửi mã OTP thành công", "Gửi mã OTP thành công, vui lòng kiểm tra Email của bạn !", "success")
      this.countDown();
    },
    countDown() {
      this.interval_id = setInterval(() => {
        let current_time = new Date().getTime();
        if (this.wait_until && this.wait_until > current_time) {
          let dif =  this.wait_until.getTime() - current_time;
          let seconds = dif / 1000;
          this.otp_time_wait = this.convertSeconds(seconds)
        } else {
          this.otp_time_wait = ""
          clearInterval(this.interval_id)
        }
      }, 100);
    },
    handleInput(index, event) {
      const value = event.target.value
      if (/^\d*$/.test(value)) {
        this.otp_digits[index] = value
        if (index < this.otp_digits.length - 1 && value !== '') {
          this.$refs.otp[index + 1].focus()
        }
      } else {
        event.target.value = ''
      }
    },
    convertSeconds(seconds) {
      const result_minutes = Math.floor(seconds / 60)
      const result_seconds = Math.ceil(seconds % 60)
      return (result_minutes >= 10 ? result_minutes : "0" + result_minutes) + ":" + (result_seconds >= 10 ? result_seconds : "0" + result_seconds)
    }
  }
}
</script>

<style scoped>
.form-content {
}
.otp-container:focus-within .otp-input{
  border: 1px solid #EC1C24;
  outline: none;
}
.otp-input {
  width: 54px;
  height: 54px;
  border-radius: 8px;
  border: 1px solid #000000;
  margin-left: 12px;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  text-align: center;
}
.otp-input:first-child {
  margin-left: 0;
}
.otp-wait-time {
  color: #6F6F6F;
  font-weight: 700;
  line-height: 19px;
  text-align: left;
  margin-top: 3.5rem;
}
.v-btn--disabled{
  background-color: #6F6F6F !important;
}
.otp-filled {
  background-color: #EC1C24;
}
</style>