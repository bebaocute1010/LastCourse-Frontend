export default {
  onAlert({ commit }, info) {
    commit("showAlert", info);
  },
  offAlert({ commit }) {
    commit("hideAlert");
  },
  setEmailRegister({ commit }, email) {
    commit("setEmailRegister", email);
  },
  clearEmailRegister({ commit }) {
    commit("clearEmailRegister");
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  unsetUser({ commit }) {
    commit("setUser", null);
  },
  setLoading({ commit }, value) {
    commit("setLoading", value);
  },
  setShop({ commit }, shop) {
    commit("setShop", shop);
  },
  unsetShop({ commit }) {
    commit("setShop", null);
  },
  setCartProductsSelected({ commit }, selected) {
    commit("setCartProductsSelected", selected);
  },
  unsetCartProductsSelected({ commit }) {
    commit("setCartProductsSelected", []);
  },
};
