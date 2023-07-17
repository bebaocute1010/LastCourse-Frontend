import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Resigter/Register.vue";
import VerifyOTP from "@/views/Resigter/VerifyOTP.vue";
import ForgotPassword from "@/views/Resigter/ForgotPassword.vue";
import ResetPassword from "@/views/Resigter/ResetPassword.vue";
import RegisterInformation from "@/views/Resigter/RegisterInformation.vue";
import AddProduct from "@/views/User/Product/AddProduct.vue";
import AllProducts from "@/views/User/Product/AllProducts.vue";
import Search from "@/views/Search.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ShopProfile from "@/views/ShopProfile.vue";
import Cart from "@/views/Cart.vue";
import Payment from "@/views/Payment.vue";
import Bills from "@/views/Bills.vue";
import BillsManage from "@/views/User/BillsManage.vue";
import ComingSoon from "@/views/ComingSoon.vue";

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
      path: "/chi-tiet-san-pham/:slug",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: "/don-hang-cua-toi",
      name: "bills",
      component: Bills,
    },
    {
      path: "/thanh-toan",
      name: "payment",
      component: Payment,
    },
    {
      path: "/chi-tiet-shop/:id",
      name: "shop-profile",
      component: ShopProfile,
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
      path: "/quen-mat-khau",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/dat-lai-mat-khau",
      name: "reset-password",
      component: ResetPassword,
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
      path: "/shop/don-hang/quan-ly",
      name: "bills-manage",
      component: BillsManage,
    },
    {
      path: "/shop/san-pham/them",
      name: "add-product",
      component: AddProduct,
    },
    {
      path: "/shop/san-pham/sua/:id",
      name: "edit-product",
      component: AddProduct,
    },
    {
      path: "/shop/san-pham/tat-ca",
      name: "all-products",
      component: AllProducts,
    },
    {
      path: "/coming-soon",
      name: "coming-soon",
      component: ComingSoon,
    },
  ],
});

export default router;
