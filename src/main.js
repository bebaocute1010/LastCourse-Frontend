//import css
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';
import './assets/main.css'
//
import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { createStore } from 'vuex'
import storeConfig from "@/store";
import Vuetify from "@/flugins/vuetify"

const store = createStore(storeConfig)
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vuetify)

app.mount('#app')
