<template>
    <table>
      <thead>
        <tr>
          <th>Наименование техники</th>
          <th>Занята/Свободна</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      items: Array // Передавайте массив объектов в формате { name: 'Техника 1', status: 'Свободна' }
    }
  };
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: orange;
  }
  
  th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  </style>