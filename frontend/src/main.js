import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

createApp(App).use(router).mount('#app')
