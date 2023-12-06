<template>
  <div class="all">
    <!-- Список туров слева -->
    <div class="tour-menu bike">
      <h2>Список арендной техники</h2>
      <ul>
        <li v-for="(moto, index) in motos" :key="index" @click="showTourDates(index)">
          <div v-if="!moto.isEditing">
            {{ moto.name }}  -
            {{ moto.price }}р
            <button @click="editTour(index)">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteMoto(index)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div v-else>
            <input type="text" placeholder="введите название" v-model="motos[index].name">
            <input type="text" placeholder="введите цену" v-model="motos[index].price"> <!-- Add input for price -->
            <button @click="saveMoto(index)">Сохранить</button>
            <button @click="deleteMoto(index)">Удалить</button>
          </div>
          <!-- <div v-else>
            <input type="text" v-model="motos[index].name">
            <button @click="saveMoto(index)">Сохранить</button>
            <button @click="deleteMoto(index)">Удалить</button>
          </div> -->
        </li>
      </ul>
      <button @click="addNewTour">Добавить технику</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';


import '@fortawesome/fontawesome-free/css/all.css';
export default {

  data() {
    return {
      apiUrl: 'http://localhost:3000',
      selectedTour: null,
      editIndex: null,
      motos: [],
    };
  },
  created() {
    this.fetchTours();
  },
  methods: {
    showTourDates(index) {
      if (this.selectedTour === index) {
        this.selectedTour = null;
      } else {
        this.selectedTour = index;
        this.editIndex = null; // Сбрасываем индекс редактирования
      }
    },

    // показ всей техники
    async fetchTours() {
      try {
        const response = await axios.get(`${this.apiUrl}/moto`);
        console.log('API Response:', response);
        console.log('API Data:', response.data);

        this.motos = response.data.map(moto => {
          return {
            id: moto.id,
            name: moto.equipment_name.trim(),
            price: moto.price,  // Add the price property
          };
        });
        // Log names of all motos
        this.motos.forEach(moto => {
          console.log(moto.id);
        });
      } catch (error) {
        console.error('Error fetching motos:', error);
      }
    },
    async deleteMoto(index) {
      try {
        const confirmation = confirm('Вы уверены, что хотите удалить этот мотоцикл');
        if (confirmation) {
          const motoId = this.motos[index].id;

          try {
            await axios.delete(`${this.apiUrl}/moto/${motoId}`);
            console.log(`${this.apiUrl}/moto/${motoId}`);
            this.motos.splice(index, 1); // Remove the deleted moto directly
            this.selectedTour = null;
          } catch (error) {
            console.error('Error deleting moto:', error);
          }
        }
      } catch (error) {
        console.error('Error handling delete confirmation:', error);
      }
    },

    saveMoto(index) {
      this.motos[index].isEditing = false;

      const motoId = this.motos[index].id;
      // Добавляем console.log для вывода в консоль
      console.log('Data before saving:', this.motos[index].name);
      console.log('id', motoId)

      const requestData = new URLSearchParams();
      requestData.append('equipment_name', this.motos[index].name);
      requestData.append('price', this.motos[index].price);
      axios.put(`${this.apiUrl}/moto/${motoId}`, requestData.toString(), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
        .then(response => {
          console.log('Tour updated successfully:', response.data);
          this.motos[index].name = response.data.equipment_name;

        })
        .catch(error => {
          console.error('Error updating tour:', error);
          this.fetchTours(); // Вернем данные к исходным
        });
    },

    dateToString(date) {
      return date.toISOString().substr(0, 10);
    },
    stringToDate(string) {
      const [day, month, year] = string.split('.');
      return new Date(`${year}-${month}-${day}`);
    },
    editTourDate(dateIndex) {
      this.startEditing(dateIndex);
    },
    editTour(index) {
      this.editedTourName = this.motos[index].name;
      this.motos[index].isEditing = true;
    },
    // addNewTour() {

    // },

    async addNewTour() {
      try {
        // Отправка POST-запроса для добавления нового тура
        const response = await axios.post(`${this.apiUrl}/moto`, {
          equipment_name: 'Новый мотоцикл',  // Убедитесь, что здесь указано правильное поле
          // Добавьте другие поля тура, если необходимо
        });
        this.motos.push({ equipment_name: 'Новый мотоцикл' });

        // Обработка успешного добавления тура
        console.log('Motos added successfully:', response.data);

        // Опционально: обновление списка туров после добавления нового тура
        this.fetchTours();
      } catch (error) {
        console.error('Error adding tour:', error);
      }
    },


  },
};
</script>

<style>
/* кнопки */
.edit-button,
.delete-button {
  padding: 10px;
  margin: 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #2980b9;
}

.edit-button i,
.delete-button i {
  margin-right: 5px;
}

/* конец кнопок */
.editData {
  display: flex;
  justify-content: center;
}

.all {
  display: flex;
  /* margin: 0 auto; */
  max-width: 1200px;
  justify-content: space-between;
}


.padding_palace {
  padding-right: 20px;
  /* Добавление стилей, чтобы текст выглядел как ссылка при наведении курсора */
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.padding_palace:hover {
  /* Изменение цвета текста при наведении курсора */
  color: red;
}

.padding_palace:active {
  /* Изменение цвета текста при клике */
  color: green;
}

/* Стилизация для внешнего вида списка туров и дат */
.tour-menu .bike {
  float: left;
  width: 400px;
  margin-right: 20px;
}

.tour-menu ul {
  list-style: none;
  padding: 0;
  cursor: pointer;
}

.tour-menu ul li {
  margin: 5px 0;
  color: blue;
}

.tour-menu ul li:hover {
  text-decoration: underline;
}

.tour-dates {
  clear: both;
  /* display: flex;
  flex-wrap: wrap; */
}

.tour-dates ul {
  list-style: none;
  padding: 0;
}

.tour-dates ul li {
  margin: 5px 0;
  color: green;
}
</style>
