<template>
  <div id="app">
    <!-- <BikeUsersVue/> -->
    <header v-if="$store.state.isAuthenticated">
      <!-- Отобразить активную ссылку вместо h1 -->
      <router-link to="/dashboard" :class="{ 'active': $route.path === '/tours' }">Туры</router-link>
      <router-link to="/participants" :class="{ 'active': $route.path === '/participants' }">Участники</router-link>
      <router-link to="/equipment" :class="{ 'active': $route.path === '/equipment' }">Арендная техника</router-link>
      <router-link to="/baza" :class="{ 'active': $route.path === '/baza' }">База</router-link>
      
      <button @click="logout">Выйти</button>
    </header>
    <router-view />
    <LoginForm v-if="!$store.state.isAuthenticated" />



  </div>
</template>

<script>
// import BikeUsersVue from './components/BikeUsers.vue';
// import BikeToor from './components/BikeToor.vue';
// import TableBiker from './components/TableBiker.vue';

export default {
  name: 'App',
  components: {
    // BikeUsersVue



    // TableBiker
  },
  data() {
    return {
      isAuthenticated: true, // Предположим, что изначально пользователь не аутентифицирован
    };
  },
  methods: {
    logout() {
      // Логика выхода пользователя
      this.isAuthenticated = false;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 margin: 0;
}
body{
  margin: 0;
}
header {
  margin-bottom: 70px;
  background-color: #3498db;
  color: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 15px;
}

header button {
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

/* Стиль для активной ссылки */
header a.active {
  font-weight: bold;
  /* или другие стили для выделения */
}
</style>
