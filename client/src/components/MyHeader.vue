<template>
    <div>
      <!-- Заголовок -->
      <header>
        <h1>Список туров</h1>
        <router-link to="/tours">Туры</router-link>
        <router-link to="/participants">Участники</router-link>
        <router-link to="/equipment">Арендная техника</router-link>
        <router-link to="/baza">База</router-link>
        <button @click="logout">Выйти</button>
      </header>
  
      <!-- Ваш контент и компоненты здесь -->
  
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Логика выхода пользователя
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  header {
    background-color: #3498db;
    color: #ffffff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 70px;
  }
  
  header h1 {
    margin: 0;
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
  </style>