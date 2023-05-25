import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Resigter/Register.vue";
import VerifyOTP from "@/views/Resigter/VerifyOTP.vue";
import RegisterInformation from "@/views/Resigter/RegisterInformation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyOTP
    },
    {
      path: '/register-information',
      name: 'register-information',
      component: RegisterInformation
    }
  ]
})

export default router
