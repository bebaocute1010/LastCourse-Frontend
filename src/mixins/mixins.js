import { mapActions, mapGetters } from "vuex";
import router from "@/router";

export default {
  computed: {
    ...mapGetters(["alert", "user", "loading", "notifications"]),
  },
  methods: {
    delayMethod(method, delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(method());
        }, delay);
      });
    },
    getNotifications() {
      if (!localStorage.getItem("token")) {
        return;
      }
      axios
        .get("get/notifications")
        .then((response) => {
          this.setNotifications(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLocaleStringNumber(num) {
      return num.toLocaleString("de-DE");
    },
    prefixSymbolsNumber(number) {
      if (number >= 1000) {
        const suffixes = ["", "k", "M", "B", "T"];
        const suffix_index = Math.floor(Math.log10(number) / 3);
        const formatted_number = (number / Math.pow(1000, suffix_index))
          .toFixed(1)
          .replace(".", ",");
        return formatted_number + suffixes[suffix_index];
      }

      return number;
    },
    ...mapActions([
      "onAlert",
      "offAlert",
      "setUser",
      "unsetUser",
      "setLoading",
      "setNotifications",
    ]),
    startLoad() {
      this.setLoading(true);
    },
    finishLoad() {
      this.setLoading(false);
    },
    setWindowTitle(title) {
      document.title = title;
    },
    showAlert(title, message, type, to) {
      this.onAlert({
        title: title,
        message: message,
        type: type,
        class_name: type,
        to: to,
      });
      setTimeout(() => {
        if (this.alert.show) {
          this.hideAlert();
        }
      }, 1500);
    },
    hideAlert() {
      const to = this.alert.to;
      this.offAlert();
      if (to) {
        router.push({ name: to });
      }
    },
    login() {
      localStorage.setItem("logged_in", "true");
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("logged_in");
      this.unsetUser();
      location.reload();
    },
    getUser() {
      axios
        .get("auth/me")
        .then((response) => {
          this.setUser({
            name: response.data.data.fullname,
            avatar: response.data.data.avatar,
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.logout();
          }
        });
    },
  },
};
