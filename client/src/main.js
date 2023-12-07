// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



// import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
// import Login from './components/LoginForm'; // Убедитесь, что это правильный путь к компоненту Login

createApp(App)

  .use(router)
  .use(store)
 // Добавьте компонент Login
  .mount('#app');