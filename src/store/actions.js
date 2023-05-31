export default {
    onAlert({commit}, info) {
        commit("showAlert", info)
    },
    offAlert({commit}) {
        commit("hideAlert")
    },
    setEmailRegister({commit}, email) {
        commit('setEmailRegister', email)
    },
    clearEmailRegister({commit}) {
        commit('clearEmailRegister')
    },
}