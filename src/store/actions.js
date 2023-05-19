export default {
    showAlert({ commit }) {
        commit("setStatusAlert", true)
    },
    hideAlert({ commit }) {
        commit("setStatusAlert", false)
    },
    setInfoAlert({ commit }, info) {
        commit("setInfoAlert", info)
    }
}