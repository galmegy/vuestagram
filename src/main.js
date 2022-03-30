import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

import store from './store.js'
import './registerServiceWorker'
//import { version } from 'core-js';
//import axios from 'axios';

// createApp(App).mount('#app')
app.use(store).mount('#app')


// npm install -g yarn
// yarn -V // 여기서 설치 일어남
// yarn global add @vue/cli 
// vue --version

// yarn add vue-router@4
// yarn add axios
// yarn add mitt 
// yarn add vuex@next 

// vue create project_name
// yarn run serve 

