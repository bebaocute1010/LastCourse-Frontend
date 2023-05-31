import {mapActions, mapGetters} from "vuex"
import router from "@/router"

export default {
    computed:{
      ...mapGetters([
          "alert"
      ])
    },
    methods: {
        ...mapActions([
            "onAlert",
            "offAlert",
        ]),
        setWindowTitle(title) {
            document.title = "M Clothing | " + title
        },
        showAlert(title, message, type, to) {
            this.onAlert({
                "title": title,
                "message": message,
                "type": type,
                "class_name": type,
                "to": to
            })
        },
        hideAlert() {
            const to = this.alert.to
            this.offAlert()
            if (to) {
                router.push({ name: to })
            }
        },
        login(token) {
            localStorage.setItem("token", token)
            localStorage.setItem("logged_in", true)
        },
        logout() {
            localStorage.removeItem("token")
            localStorage.setItem("logged_in", false)
        }
    }
}