import {mapActions} from "vuex";

export default {
    data() {
        return {
            alert: {
                title: "",
                message: "",
                type: "",
                show: false,
            }
        }
    },
    methods: {
        setWindowTitle(title) {
            document.title = "M Clothing | " + title
        },
        resetAlert() {
            this.alert.title = ""
            this.alert.message = ""
            this.alert.type = ""
        },
        showAlert(title, message, type) {
            this.alert.title = title
            this.alert.message = message
            this.alert.type = type
            this.alert.show = true
        },
        hideAlert() {
            this.alert.show = false
            this.resetAlert()
        },
    }
}