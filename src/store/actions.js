export default {
    onAlert({commit}, info) {
        commit("showAlert", info)
    },
    offAlert({commit}) {
        commit("hideAlert")
    }
}