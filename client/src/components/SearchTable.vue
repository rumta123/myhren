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

          <form @submit.prevent="addPerson(selectedPerson.id)" v-if="searchResults.length > 0 && selectedPerson">
            <label for="newFio">ФИО:</label>
            <input type="text" v-model="selectedPerson.fio" id="newFio" readonly>

            <label for="newbirthDate">Дата рождения:</label>
            <input v-model="selectedPerson.DateBirth" type="date" id="newbirthDate" readonly />

            <label for="newPhone">Телефон:</label>
            <input v-model="selectedPerson.phone" id="newPhone" readonly />
            <h2>Паспорт</h2>

            <label for="newSeriaPassport">Cерия:</label>
            <input v-model="selectedPerson.passportSeries" id="newSeriaPassport" readonly />

            <label for="newNumberPassport">Номер:</label>
            <input v-model="selectedPerson.passportNumber" id="newNumberPassport" readonly />

            <label for="newKemVydanPassport">Кем выдан:</label>
            <input v-model="selectedPerson.passportKemVydan" id="newKemVydanPassport" readonly />

            <label for="newDataPassport">Дата выдачи:</label>
            <input v-model="selectedPerson.passportVydan" type="date" id="newDataPassport" readonly />

            <label for="newKodPassport">Код подразделения:</label>
            <input v-model="selectedPerson.passportKodP" id="newKodPassport" readonly />

            <h2>Водительское удостоверение</h2>

            <label for="newNumberPrava">Номер:</label>
            <input v-model="selectedPerson.driverLicense" id="newNumberPrava" readonly />

            <label for="newDataPrava">Дата выдачи:</label>
            <input v-model="selectedPerson.driverLicenseDate" type="date" id="newDataPrava" readonly />


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

            <select v-model="selectedOption" @change="loadData">
              <option value="">Выберите арендную технику</option>
              <option v-for="moto in motoList" :value="moto.id" :key="moto.id">{{ moto.equipment_name }}</option>
            </select>

            <label v-if="selectedMoto">
              <input type="text" v-model="selectedMotoPrice" id="input1" />

            </label>



            <label for="newDay">Количество дней:</label>
            <input type="number" @input="multiplyValues" v-model="newDay" id="input2" />

            <label for="newRental_cost">К оплате:</label>
            <input type="number" @input="multiplyValues" v-model="newRental_cost" id="result" />

            <!-- <label for="newTotal_rental_cost">Общая сумма:</label>
            <input type="number" v-model="newTotal_rental_cost" id="newTotal_rental_cost" />
 -->

            <h2>коментариии</h2>
            <textarea name="" v-model="newDescription" id="" cols="100" rows="10"></textarea>
            <br>
            <button type="submit">Добавить</button>
          </form>
        </template>

        <!-- добавление нового пользователя -->
        <template v-else>
          <p>Ничего не найдено</p>
          <form @submit.prevent="newaddPerson">

            <h2>Добавить нового клиента</h2>

            <label for="newFio">ФИО:</label>
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
              <option value="">Выберите тур:</option>
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

            <select v-model="selectedOption" @change="loadData">
              <option value="">Выберите арендную технику</option>
              <option v-for="moto in motoList" :value="moto.id" :key="moto.id">{{ moto.equipment_name }}</option>
            </select>

            <label v-if="selectedMoto">
              <input type="text" v-model="selectedMotoPrice" id="input1" />

            </label>



            <label for="newDay">Количество дней:</label>
            <input type="number" @input="multiplyValues" v-model="newDay" id="input2" />

            <label for="newRental_cost">К оплате:</label>
            <input type="number" @input="multiplyValues" v-model="newRental_cost" id="result" />

            <!-- <label for="newTotal_rental_cost">Общая сумма:</label>
            <input type="number" v-model="newTotal_rental_cost" id="newTotal_rental_cost" /> -->

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
      selectedOptionMoto: null,
      newPrice: 0,
      newDoplata: 0,
      newAllPrice: 0,
      newAvance: 0,
      motos: [],

      // все данные которые используем 


      motoList: [],
      selectedMoto: null,
      selectedMotoPrice: 0,
      newDay: 0,
      newRental_cost: 0,
      newTotal_rental_cost: 0



    };
  },
  async mounted() {
    await this.fetchTours();

    this.loadMotoList();
  },

  computed: {
    // Вычисляемая сумма
    totalSum: function () {
      return parseFloat(this.newPrice) + parseFloat(this.newDoplata);
    },
    //     totalSum1:function(){
    // return parseFloat(this.selectedMotoPrice)*parseFloat(this.newDay)
    //     },
    // Вычисляемый аванс (30% от суммы)
    advance: function () {
      return this.newPrice * 0.3;
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

    // totalSum1:function(newValue){
    //   this.newRental_cost =newValue
    // },

    selectedOption: {
      handler: 'loadData',
      immediate: true,
    },

    // Watcher for other properties
    'selectedMotoPrice': {
      handler: 'calculateTotalCost',
      deep: true
    },
    'newDay': {
      handler: 'calculateTotalCost',
      deep: true
    },
  },
  methods: {

    multiplyValues() {
      // Получаем значения из инпутов по их id
      const value1 = parseFloat(document.getElementById('input1').value) || 0;
      const value2 = parseFloat(document.getElementById('input2').value) || 0;

      // Производим вычисление
      const result = value1 * value2;

      document.getElementById('result').value = isNaN(result) ? '' : result;
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
        // Переводим значение в число (используйте parseFloat или parseInt в зависимости от ваших потребностей)
        const selectedMotoId = this.selectedOption;
        console.log('Selected Moto ID:', selectedMotoId);

        // Переводим значение в число (используйте parseFloat или parseInt в зависимости от ваших потребностей)
        // const selectedOptionMoto = parseFloat(inputValue);
        const dataToSendBikeArenda = {
          user: parseInt(personId),
          rental_days: parseInt(this.newDay),
          description: this.newDescription,
          rental_cost: parseInt(this.newRental_cost),
          // total_rental_cost: parseInt(this.newTotal_rental_cost),
          total_rental_cost: parseFloat(document.getElementById('result').value),
          moto: parseInt(selectedMotoId),
          rental_tour: parseInt(this.newPrice),
          total_tour: parseInt(this.newAllPrice),
          doplata_tour: parseInt(this.newAvance),

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



    // отправка ко второе значение
    async newaddPerson() {
  try {
    // Формируем объект с данными для отправки на сервер
    const dataToSend = {
      fio: this.newFio,
      DateBirth: this.newDateBirth,
      phone: this.newPhone,
      passportSeries: this.newSeriaPassport,
      passportNumber: this.newNumberPassport,
      passportKemVydan: this.newKemVydanPassport,
      passportVydan: this.newDataPassport,
      passportKodP: this.newKodPassport,
      driverLicense: this.newNumberPrava,
      driverLicenseDate: this.newDataPrava,
    }

    // Отправляем данные пользователя на сервер
    const response = await axios.post('http://localhost:3000/users', dataToSend);

    if (response.data && response.data.id) {
      const userId = response.data.id;
 // Ожидаем завершения первого запроса перед отправкой второго
 await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка в 1 секунду

      // Отправляем данные аренды на сервер
      const selectedOption = this.selectedTourDate;
      const response2 = await axios.get(`${this.apiUrl}/tour-dates/${selectedOption}`);
      const selectResponseData = response2.data;

      const selectedMotoId = this.selectedOption;
      const dataToSendBikeArenda = {
        user: userId,
        rental_days: this.newDay,
        description: this.newDescription,
        rental_cost: this.newRental_cost,
        total_rental_cost: parseFloat(document.getElementById('result').value),
        moto: selectedMotoId,
        rental_tour: this.newPrice,
        total_tour: this.newAllPrice,
        doplata_tour: this.newAvance,
        tourDate: selectResponseData,
      };

      const response3 = await axios.post('http://localhost:3000/arenda-status', dataToSendBikeArenda);
      alert(response3);
      alert('Данные успешно отправлены на сервер!');
    } else {
      console.error('Invalid response format from server:', response.data);
      // Другие действия в случае ошибки...
    }
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

    // async handleFormSubmit() {
    //   try {
    //     if (this.selectedPerson) {
    //       // Тут можно добавить логику отправки данных, например, вызов метода addPerson
    //       this.addPerson(this.selectedPerson.id);
    //       alert('Данные успешно отправлены на сервер!');
    //     } else {
    //       alert('Сначала выберите человека из списка!');
    //     }
    //   } catch (error) {
    //     console.error('Error handling form submission:', error);
    //     alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
    //   }
    // },



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
    async loadData() {
      if (this.selectedOption) {
        try {
          const response = await axios.get(`http://localhost:3000/moto/${this.selectedOption}`);
          this.selectedMoto = response.data;
          this.selectedMoto = this.motoList.find(moto => moto.id === this.selectedOption);
          // Set the selectedMotoPrice to the price of the selected moto
          this.selectedMotoPrice = this.selectedMoto ? this.selectedMoto.price : '';
        } catch (error) {
          console.error('Error fetching moto data:', error);
        }
      } else {
        this.selectedMoto = null;
      }
    },
    async loadMotoList() {
      try {
        const response = await axios.get('http://localhost:3000/moto');
        this.motoList = response.data;
      } catch (error) {
        console.error('Error fetching moto list:', error);
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
