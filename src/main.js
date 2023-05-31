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
import storeConfig from "@/store"
import Vuetify from "@/flugins/vuetify"
import axios from "@/flugins/axios"
import {Field, Form} from "vee-validate"
import TextFieldWithValidation from "@/components/TextFieldWithValidation.vue"
import Alert from "@/components/Alert.vue"
import mixins from "@/mixins/mixins"

const store = createStore(storeConfig)
const app = createApp(App)

window.axios = axios

app.use(router)
    .use(store)
    .use(Vuetify)
app.component("Field", Field)
    .component("Form", Form)
    .component("TextFieldWithValidation", TextFieldWithValidation)
    .component("Alert", Alert)
app.mixin(mixins)
app.mount('#app')
