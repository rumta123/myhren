<!-- пока вот -->

<template>
    <div id="app">
      <form @submit.prevent="searchOrAdd">
        <label for="search">Поиск или добавление по ФИО:</label>
        <input type="text" v-model="searchText" id="search" @input="searchOrAdd">
        <select v-if="matchingPeople.length > 0" v-model="selectedPerson">
          <option v-for="person in matchingPeople" :key="person.fio" :value="person">
            {{ person.fio }}
          </option>
        </select>
      </form>
  
      <div>
        <h2>Результаты поиска:</h2>
        <div>
          <template v-if="searchResults.length > 0">
  
            <form @submit.prevent="addPerson" v-if="searchResults.length > 0 && selectedPerson">
  
              <label for="newFio">Добавить нового человека:</label>
              <input type="text" v-model="selectedPerson.fio" id="newFio">
  
  
  
              <label for="newbirthDate">Дата рождения:</label>
              <input v-model="selectedPerson.DateBirth" type="date" id="newbirthDate" />
  
              <label for="newPhone">Телефон:</label>
              <input v-model="selectedPerson.phone" id="newPhone" />
              <h2>Паспорт</h2>
  
              <label for="newSeriaPassport">Cерия:</label>
              <input v-model="selectedPerson.passportSeries" id="newSeriaPassport" />
  
              <label for="newNumberPassport">Номер:</label>
              <input v-model="selectedPerson.passportNumber" id="newNumberPassport" />
  
              <label for="newKemVydanPassport">Кем выдан:</label>
              <input v-model="selectedPerson.passportKemVydan" id="newKemVydanPassport" />
  
              <label for="newDataPassport">Дата выдачи:</label>
              <input v-model="selectedPerson.passportVydan" type="date" id="newDataPassport" />
  
              <label for="newKodPassport">Код подразделения:</label>
              <input v-model="selectedPerson.passportKodP" id="newKodPassport" />
  
              <h2>Водительское удостоверение</h2>
  
              <label for="newNumberPrava">Номер:</label>
              <input v-model="selectedPerson.driverLicense" id="newNumberPrava" />
  
              <label for="newDataPrava">Дата выдачи:</label>
              <input v-model="selectedPerson.driverLicenseDate" type="date" id="newDataPrava" />
  
  
              <h2>Тур </h2>
              <label for="tourSelect">Выберите тур:</label>
              <select id="tourSelect" @change="fetchTours">
                <option v-for="(tour, index) in tours" :key="index" :value="tour.id">{{ tour.tour_name }}</option>
              </select>
  
              <select v-model="selectedTourDate" id="dataSelect" v-if="tourDates.length > 0">
                <option v-for="(tour_date, index) in tourDates" :key="index" :value="tour_date">{{ tour_date }}</option>
              </select>
  
              <label for="newPrice">Цена:</label>
              <input v-model="newPrice" type="number" id="newPrice" />
              <label for="newDoplata">Доплата:</label>
              <input v-model="newDoplata" type="number" id="newDoplata" />
              <label for="newAllPrice">Общая сумма:</label>
              <input v-model="newAllPrice" type="number" id="newAllSumma" />
  
              <label for="newAvance">Аванс:</label>
              <input v-model="newAvance" type="number" id="newAvance" />
  
              <h2>Арендная техника</h2>
              <select id="tourSelect" v-model="selectedMoto" v-if="motos" @change="updatePrice">
                <option v-for="(moto, index) in motos" :key="index" :value="moto?.equipment_name">
                  {{ moto?.equipment_name }} {{ moto?.price }}
                </option>
  
              </select>
  
  
              <label for="newDay">Количество дней:</label>
              <input type="number" v-model="newDay" id="newDay" />
  
  
              <label for="newRental_cost">К оплате:</label>
              <input type="number" v-model="newRental_cost" id="newRental_cost" />
  
              <label for="newTotal_rental_cost">Общая сумма:</label>
              <input type="number" v-model="newTotal_rental_cost" id="newTotal_rental_cost" />
  
              <h2>коментариии</h2>
              <textarea name="" v-model="newDescription" id="" cols="100" rows="10"></textarea>
              <br>
              <button @click="addPerson(selectedPerson.id)" type="submit">Добавить</button>
            </form>
          </template>
  
          <!-- добавление нового пользователя -->
          <template v-else>
            <p>Ничего не найдено</p>
            <form @submit.prevent="newaddPerson">
  
              <h2>Добавить нового клиента</h2>
  
              <label for="newFio">Введите ФИО:</label>
              <input type="text" v-model="newFio" id="newFio">
  
  
  
              <label for="newbirthDate">Дата рождения:</label>
              <input v-model="newDateBirth" type="date" id="newbirthDate" />
  
              <label for="newPhone">Телефон:</label>
              <input v-model="newPhone" id="newPhone" />
              <h2>Паспорт</h2>
  
              <label for="newSeriaPassport">Cерия:</label>
              <input v-model="newSeriaPassport" id="newSeriaPassport" />
  
              <label for="newNumberPassport">Номер:</label>
              <input v-model="newNumberPassport" id="newNumberPassport" />
  
              <label for="newKemVydanPassport">Кем выдан:</label>
              <input v-model="newKemVydanPassport" id="newKemVydanPassport" />
  
              <label for="newDataPassport">Дата выдачи:</label>
              <input v-model="newDataPassport" type="date" id="newDataPassport" />
  
              <label for="newKodPassport">Код подразделения:</label>
              <input v-model="newKodPassport" id="newKodPassport" />
  
              <h2>Водительское удостоверение</h2>
  
              <label for="newNumberPrava">Номер:</label>
              <input v-model="newNumberPrava" id="newNumberPrava" />
  
              <label for="newDataPrava">Дата выдачи:</label>
              <input v-model="newDataPrava" type="date" id="newDataPrava" />
  
  
  
  
              <h2>Тур </h2>
              <label for="tourSelect">Выберите тур:</label>
              <select id="tourSelect" @change="fetchTours">
                <option v-for="(tour, index) in tours" :key="index" :value="tour.id">{{ tour.tour_name }}</option>
              </select>
  
              <select v-model="selectedTourDate" id="dataSelect" v-if="tourDates.length > 0">
                <option v-for="(tour_date, index) in tourDates" :key="index" :value="tour_date">{{ tour_date }}</option>
              </select>
  
              <label for="newPrice">Цена:</label>
              <input v-model="newPrice" type="number" id="newPrice" />
              <label for="newDoplata">Доплата:</label>
              <input v-model="newDoplata" type="number" id="newDoplata" />
              <label for="newAllPrice">Общая сумма:</label>
              <input v-model="newAllPrice" type="number" id="newAllSumma" />
  
              <label for="newAvance">Аванс:</label>
              <input v-model="newAvance" type="number" id="newAvance" />
  
              <h2>Арендная техника</h2>
              <select id="tourSelect" v-model="selectedMoto" v-if="motos" @change="updatePrice">
                <option v-for="(moto, index) in motos" :key="index" :value="moto?.equipment_name">
                  {{ moto?.equipment_name }} {{ moto?.price }}
                </option>
  
              </select>
  
  
              <input type="text" v-model="selectedMotoPrice" />
  
              <label for="newDay">Количество дней:</label>
              <input type="number" v-model="newDay" id="newDay" />
  
              <label for="newRental_cost">К оплате:</label>
              <input type="number" v-model="newRental_cost" id="newRental_cost" />
              <label for="newTotal_rental_cost">Общая сумма:</label>
              <input type="number" v-model="newTotal_rental_cost" id="newTotal_rental_cost" />
  
              <h2>коментариии</h2>
              <textarea name="" v-model="newDescription" id="" cols="100" rows="10"></textarea>
              <br>
              <button type="submit">Добавить в базу пользователя </button>
            </form>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        apiUrl: 'http://localhost:3000',
        people: [],
        searchText: '',
        matchingPeople: [],
        searchResults: [],
        newFio: '',
        newPhone: '',
        newbirthDate: '',
        selected: '',
        selectedPerson: null,
        tours: [],
        tours1: '',
        selectedTourDate: null,
        tourDates: [],
        tourSelect: '',
        dataSelect: '',
        selectedTour: null,
        tourId: null,
        selectedOption: null,
        selectedValue2: null,
        options1: [
  
        ],
        selectedMotoPrice: 0,
        selectedOptionMoto: null,
        newPrice: 0,
        newDoplata: 0,
        newAllPrice: 0,
        newAvance: 0,
        motos: [],    // все данные которые используем 
  
      };
    },
    async mounted() {
      await this.fetchTours();
      this.fetchBikes(); // вызываем fetchTours при монтировании компонента
    },
    computed: {
  
  
      // Вычисляемая сумма
      totalSum: function () {
        return parseFloat(this.newPrice);
      },
      // Вычисляемый аванс (30% от суммы)
      advance: function () {
        return this.totalSum * 0.3;
      },
    },
    watch: {
      // Следим за изменениями totalSum и advance и обновляем поля ввода
      totalSum: function (newValue) {
        this.newAllPrice = newValue;
      },
      advance: function (newValue) {
        this.newAvance = newValue;
      },
    },
    methods: {
      handleMotoChange() {
        const selectedMoto = this.selectedMoto;
        if (selectedMoto && typeof selectedMoto.price !== 'undefined') {
          this.selectedMotoPrice = parseFloat(selectedMoto.price) || 0;
          console.log('блабббал', this.selectedMotoPrice)
        } else {
          this.selectedMotoPrice = 0;
        }
      },
  
      updatePrice() {
        if (this.selectedMoto && typeof this.selectedMoto.price !== 'undefined') {
          this.selectedMotoPrice = parseFloat(this.selectedMoto.price) || 0;
        } else {
          this.selectedMotoPrice = 0;
        }
      },
      // отправка данных в первое значение
  
      async addPerson(personId) {
        try {
  
          console.log(personId)
          // Получаем выбранный элемент напрямую из модели данных Vue.js
          const selectedOption = this.selectedTourDate;
          // Выводим выбранный элемент в консоль
          console.log('Selected Option:', selectedOption);
          const response4 = await axios.get(`${this.apiUrl}/tour-dates/${this.selectedOption}`);
  
          const selectResponseData = response4.data
          console.log('вывод цифры', selectResponseData)
  
          // мотик
  
          const selectedOptionMoto = this.selectedMoto; // замените на this.selectedMoto
          console.log("мотик", selectedOptionMoto);
  
          const response5 = await axios.get(`${this.apiUrl}/moto/name/${encodeURIComponent(selectedOptionMoto)}`);
          console.log("response5", response5);
  
          const mototest = response5.data;
          // выбор тура 
          const dataToSendBikeArenda = {
            user: personId,
            rental_days: this.newDay,
            description: this.newDescription,
            rental_cost: this.newRental_cost,
            total_rental_cost: this.newTotal_rental_cost,
  
            moto: mototest,
            rental_tour: this.newPrice,
            total_tour: this.newAllPrice,
            doplata_tour: this.newAvance,
  
            tourDate: selectResponseData,
  
            // "status_id": 2
  
          };
          console.log('вывод user', dataToSendBikeArenda)
  
          const response2 = await axios.post('http://localhost:3000/arenda-status', dataToSendBikeArenda)
          console.log(response2)
  
  
  
        } catch (error) {
          console.error('Ошибка отправки данных:', error);
  
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
          }
  
          alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
        }
      },
  
  
  
      // отправка ко второе значение
      async newaddPerson() {
        try {
  
          // Формируем объект с данными для отправки на сервер
          const dataToSend = {
            fio: this.newFio,
            DateBirth: this.newDateBirth,
            phone: this.newPhone,
            // driverLicenseDate:this.newNumberPrava,
            passportSeries: this.newSeriaPassport,
            passportNumber: this.newNumberPassport,
            passportKemVydan: this.newKemVydanPassport,
            passportVydan: this.newDataPassport,
            passportKodP: this.newKodPassport,
  
  
            driverLicense: this.newNumberPrava,
            driverLicenseDate: this.newDataPrava,
  
          }
  
  
          // Отправляем данные на сервер
          const response = await axios.post('http://localhost:3000/users', dataToSend);
  
  
          // Получаем выбранный элемент напрямую из модели данных Vue.js
          const selectedOption = this.selectedTourDate;
  
  
          // Выводим выбранный элемент в консоль
          console.log('Selected Option:', selectedOption);
          const response4 = await axios.get(`${this.apiUrl}/tour-dates/${this.selectedOption}`);
  
          const selectResponseData = response4.data
          console.log('вывод цифры', selectResponseData)
  
          // мотик
  
          const selectedOptionMoto = this.selectedMoto; // замените на this.selectedMoto
          console.log("мотик", selectedOptionMoto);
  
          const response5 = await axios.get(`${this.apiUrl}/moto/name/${encodeURIComponent(selectedOptionMoto)}`);
          console.log("response5", response5);
  
          console.log('мотик', response5.data);
          // http://localhost:3000/moto/name/
  
          // id
          const userId = response.data.id;
          // мотик
          // const motoId1 = response5.data
          console.log('ID созданного пользователя:', userId);
          const mototest = response5.data;
          // выбор тура 
  
  
          const dataToSendBikeArenda = {
            user: userId,
            rental_days: this.newDay,
            description: this.newDescription,
            rental_cost: this.newRental_cost,
            total_rental_cost: this.newTotal_rental_cost,
  
            moto: mototest,
            rental_tour: this.newPrice,
            total_tour: this.newAllPrice,
            doplata_tour: this.newAvance,
  
            tourDate: selectResponseData,
  
            // "status_id": 2
  
          };
          console.log('вывод user', dataToSendBikeArenda)
  
          const response2 = await axios.post('http://localhost:3000/arenda-status', dataToSendBikeArenda)
          console.log(response2)
  
  
          alert('Данные успешно отправлены на сервер!');
        } catch (error) {
          console.error('Ошибка отправки данных:', error);
          alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
        }
      },
  
      async searchOrAdd() {
        try {
          if (!this.searchText.trim()) {
            // Если строка поиска пуста или состоит только из пробелов, выполнить сброс
            this.selectedPerson = null;
            this.searchResults = [];
            return;
          }
  
          const response = await axios.get(`http://localhost:3000/users/fio/${encodeURIComponent(this.searchText)}`);
  
          this.matchingPeople = response.data;
  
          if (this.matchingPeople.length !== 0) {
            // Если найдены совпадения, выбрать первого в списке
            this.selectedPerson = this.matchingPeople[0];
            console.log('ID выбранного человека:', this.selectedPerson.id);
            this.searchResults = this.matchingPeople;
  
            console.log();
          } else {
            console.log('сброс');
            // Если совпадений не найдено, очистить результаты
            this.selectedPerson = null;
            this.searchResults = [];
          }
        } catch (error) {
          console.error('Error fetching data from the API:', error);
        }
      },
  
      async handleFormSubmit() {
        try {
          if (this.selectedPerson) {
            // Тут можно добавить логику отправки данных, например, вызов метода addPerson
            this.addPerson(this.selectedPerson.id);
            alert('Данные успешно отправлены на сервер!');
          } else {
            alert('Сначала выберите человека из списка!');
          }
        } catch (error) {
          console.error('Error handling form submission:', error);
          alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
        }
      },
  
  
  
      async fetchTours() {
        try {
  
          const response = await axios.get('http://localhost:3000/tours');
          this.tours = response.data;
          console.log('Тур апи:', this.tours);
  
          // Вызываем fetchDataTours сразу после получения списка туров
          this.fetchDataTours();
  
          var selectElement = document.getElementById("tourSelect");
          var isHandlingEvent = false;
  
          selectElement.addEventListener('change', async () => {
            if (isHandlingEvent) {
              return;
            }
  
            isHandlingEvent = true;
            var selectedValue = selectElement.value;
  
            const response1 = await axios.get(`${this.apiUrl}/tours/name-tour/${selectedValue}`);
            this.tourId = response1.data.tour_id;
  
            console.log('Выбранное значение:', selectedValue);
            console.log('Ответ от сервера:', this.tourId);
  
            this.fetchDataTours();
  
            isHandlingEvent = false;
          });
        } catch (error) {
          console.error('Error fetching tours:', error);
        }
      },
  
  
      async fetchDataTours() {
        try {
          const response3 = await axios.get(`${this.apiUrl}/tour-dates/${this.tourId}/tour-date`);
          this.tourDates = response3.data.map(item => item.tour_date);
          console.log('tour_dates:', this.tourDates);
  
          // http://localhost:3000/tour-dates/переменная
  
  
          // alert(`Selected Option Index: ${selectedIndex}`);
  
  
  
        } catch (error) {
          console.error('Error fetching tour dates:', error);
        }
      },
      async fetchBikes() {
        try {
          const response = await axios.get(`${this.apiUrl}/moto`);
          this.motos = response.data;
          console.log('Motos Array:', this.motos);
          this.motos.forEach((moto, index) => {
            console.log(`Moto at index ${index}:`, moto);
          });
        } catch (error) {
          console.error('Error fetching motos:', error);
        }
      },
  
    },
  
  };
  
  </script>
  
  <style>
  form {
    margin-bottom: 20px;
  }
  
  select {
    margin-left: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  
  h2 {
    margin-top: 20px;
  }
  </style>
  