import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Resigter/Register.vue";
import VerifyOTP from "@/views/Resigter/VerifyOTP.vue";
import RegisterInformation from "@/views/Resigter/RegisterInformation.vue";
import AddProduct from "@/views/User/Product/AddProduct.vue";
import AllProducts from "@/views/User/Product/AllProducts.vue";
import Search from "@/views/Search.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/tim-kiem-san-pham",
      name: "search",
      component: Search,
    },
    {
      path: "/chi-tiet-san-pham",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: "/gio-hang",
      name: "cart",
      component: Cart,
    },
    {
      path: "/dang-nhap",
      name: "login",
      component: Login,
    },
    {
      path: "/dang-ky",
      name: "register",
      component: Register,
    },
    {
      path: "/xac-thuc",
      name: "verify",
      component: VerifyOTP,
    },
    {
      path: "/dang-ky-thong-tin",
      name: "register-information",
      component: RegisterInformation,
    },
    {
      path: "/shop/san-pham/them",
      name: "add-product",
      component: AddProduct,
    },
    {
      path: "/shop/san-pham/tat-ca",
      name: "all-products",
      component: AllProducts,
    },
  ],
});

export default router;
