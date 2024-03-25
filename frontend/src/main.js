import './assets/main.css'

import { createApp } from 'vue'
import root from './root.vue'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createApp(root).mount('#app')
