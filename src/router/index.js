import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Resigter/Register.vue";
import VerifyOTP from "@/views/Resigter/VerifyOTP.vue";
import RegisterInformation from "@/views/Resigter/RegisterInformation.vue";
import AddProduct from "@/views/User/Product/AddProduct.vue";
import AllProducts from "@/views/User/Product/AllProducts.vue";
import Search from "@/views/Search.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyOTP,
    },
    {
      path: "/register-information",
      name: "register-information",
      component: RegisterInformation,
    },
    {
      path: "/user/product/add",
      name: "add-product",
      component: AddProduct,
    },
    {
      path: "/user/product/all",
      name: "all-products",
      component: AllProducts,
    },
  ],
});

export default router;
