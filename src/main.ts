import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import '@/assets/styles/global.css'
import App from './App.vue'

console.log(import.meta.env)

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
