import {mapActions} from "vuex";

export default {
    methods: {
        ...mapActions([
            "onAlert",
            "offAlert"
        ]),
        setWindowTitle(title) {
            document.title = "M Clothing | " + title
        },
        showAlert(title, message, type) {
            this.onAlert({
                "title": title,
                "message": message,
                "type": type
            })
        },
        hideAlert() {
            this.offAlert()
        },
    }
}