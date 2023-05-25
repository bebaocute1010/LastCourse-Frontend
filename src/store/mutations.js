export default {
    showAlert(state, info) {
        state.alert.title = info.title
        state.alert.message = info.message
        state.alert.type = info.type
        state.alert.show = true
    },
    hideAlert(state) {
        state.alert.title = ""
        state.alert.message = ""
        state.alert.type = ""
        state.alert.show = false
    }
}