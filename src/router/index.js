import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import UserLayout from "@/Layouts/UserLayout.vue";
import AccountLayout from "@/Layouts/AccountLayout.vue";
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
import Admin from "../Layouts/Admin.vue";
import CategoryList from "../views/CategoryList.vue";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "defaul-layout",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "tim-kiem-san-pham",
          name: "search",
          component: Search,
        },
        {
          path: "san-pham/danh-muc",
          name: "products-category",
          component: Search,
        },
        {
          path: "san-pham/san-pham-noi-bat",
          name: "featured-products",
          component: Search,
        },
        {
          path: "san-pham/san-pham-ban-chay",
          name: "top-selling-products",
          component: Search,
        },
        {
          path: "chi-tiet-san-pham/:slug",
          name: "product-detail",
          component: ProductDetail,
        },
        {
          path: "don-hang-cua-toi",
          name: "bills",
          component: Bills,
        },
        {
          path: "thanh-toan",
          name: "payment",
          component: Payment,
        },
        {
          path: "chi-tiet-shop/:slug",
          name: "shop-profile",
          component: ShopProfile,
        },
        {
          path: "gio-hang",
          name: "cart",
          component: Cart,
        },
        {
          path: "coming-soon",
          name: "coming-soon",
          component: ComingSoon,
        },
      ],
    },
    {
      path: "/tai-khoan",
      name: "auth",
      component: AccountLayout,
      children: [
        {
          path: "dang-nhap",
          name: "login",
          component: Login,
        },
        {
          path: "dang-ky",
          name: "register",
          component: Register,
        },
        {
          path: "quen-mat-khau",
          name: "forgot-password",
          component: ForgotPassword,
        },
        {
          path: "dat-lai-mat-khau",
          name: "reset-password",
          component: ResetPassword,
        },
        {
          path: "xac-thuc",
          name: "verify",
          component: VerifyOTP,
        },
        {
          path: "dang-ky-thong-tin",
          name: "register-information",
          component: RegisterInformation,
        },
      ],
    },
    {
      path: "/shop",
      name: "shop",
      component: UserLayout,
      children: [
        {
          path: "don-hang/quan-ly",
          name: "bills-manage",
          component: BillsManage,
        },
        {
          path: "san-pham/them",
          name: "add-product",
          component: AddProduct,
        },
        {
          path: "san-pham/sua/:id",
          name: "edit-product",
          component: AddProduct,
        },
        {
          path: "san-pham/tat-ca",
          name: "all-products",
          component: AllProducts,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      children: [
        {
          path: "danh-muc",
          name: "category",
          children: [
            {
              path: "",
              name: "category-list",
              component: CategoryList
            },
          ]
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash && to.hash !== "#") {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    } else {
      document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    }
  },
});

export default router;
