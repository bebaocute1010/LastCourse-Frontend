export default {
  showAlert(state, info) {
    state.alert.title = info.title;
    state.alert.message = info.message;
    state.alert.type = info.type;
    state.alert.show = true;
    state.alert.class_name = info.class_name;
    state.alert.to = info.to;
  },
  hideAlert(state) {
    state.alert.title = "";
    state.alert.message = "";
    state.alert.type = "";
    state.alert.show = false;
    state.alert.class_name = "";
    state.alert.to = null;
  },
  setEmailRegister(state, email) {
    state.email_register = email;
  },
  clearEmailRegister(state) {
    state.email_register = "";
  },
  setUser(state, user) {
    state.user = user;
  },
  setLoading(state, value) {
    state.loading = value;
  },
  setShop(state, shop) {
    state.shop = shop;
  },
  setCartProductsSelected(state, selected) {
    state.cart_products_selected = selected;
  },
  setRouteVerified(state, route_name) {
    state.route_verified = route_name;
  },
  setNotifications(state, notifications) {
    state.notifications = notifications;
  },
  setNumberCarts(state, number_carts) {
    state.number_carts = number_carts;
  },
};
