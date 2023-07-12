import state from "./state";

export default {
  alert: (state) => state.alert,
  email_register: (state) => state.email_register,
  user: (state) => state.user,
  loading: (state) => state.loading,
  shop: (state) => state.shop,
  cart_products_selected: (state) => state.cart_products_selected,
  route_verified: (state) => state.route_verified,
};
