export default {
    setStatusAlert(state, status) {
        state.alert.show = status
    },
    setInfoAlert(state, info) {
        state.alert.title = info.title
        state.alert.message = info.message
        state.alert.type = info.type
    }
}