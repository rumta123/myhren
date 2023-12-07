<template>
  <div class="all">


    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <!-- Крестик для закрытия модального окна -->
        <span class="modal-close" @click="hideModal">
          <i class="fas fa-times"></i>
        </span>
        <div>
          <p v-if="userDetails[0]?.user">Данные пользователя: {{ userDetails[0]?.user?.fio }}</p>
          <p v-if="userDetails[0]?.user">Дата рождения: {{ userDetails[0]?.user?.DateBirth }}</p>
          <p v-if="userDetails[0]?.user">Номер телефона: {{ userDetails[0]?.user?.phone }}</p>
        </div>
        <!-- Ваш контент модального окна -->


        <div v-for="(item, index) in userDetails" :key="index">
          <h2> {{ item.tourDate?.tour?.tour_name }}</h2>
          <table>
            <thead>
              <tr>

                <th>Дата</th>
                <th>До </th>
                <th>Цена тура</th>
                <th>Аванс</th>
                <th>Доплата</th>
                <th>Арендная техника</th>
                <th>Кол-во дней аренды</th>
                <th>Цена аренды</th>
                <th>Договор на тур</th>
                <th>Договор на аренду</th>
                <th>Гостиница</th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>{{ item.tourDate?.tour_date }} </td>
                <td>{{item.tourDate?.tour_date_end  }}</td>
                <td>{{ item.tourDate?.tour_price }}</td>
                <td>{{ item.tourDate?.advance }}</td>
                <td>{{ item.tourDate?.additional_payment }}</td>
                <td>{{ item.moto?.equipment_name }}</td>
                <td>{{ item.rental_days }}</td>
                <td>{{ item.rental_price }}</td>
                <td>{{ item.tourDate?.tour_contract }}</td>
                <td>{{ item.tourDate?.rental_contract }}</td>
                <td>
                  <span v-if="item.tourDate?.is_busy">Забронировано</span>
                  <span v-else>Не забронировано</span>
                </td>
              </tr>
              <!-- и так далее, извлекайте нужные данные как вам необходимо -->
            </tbody>
          </table>
        </div>
        <button @click="hideModal">Закрыть</button>
      </div>
    </div>



    <div class="tour-menu bike">

      <!-- Список клиентов слева -->






      <h2>Список клиентов</h2>
      <input type="text" v-model="searchQuery" placeholder="Поиск по клиентам" />
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Дата рождения</th>
            <th>Серия паспорта</th>
            <th>Номер паспорта</th>
            <th>Кем выдан паспорт</th>
            <th>Дата выдачи паспорта</th>
            <th>Код подразделения</th>
            <th>Водительское удостоверение</th>
            <th>Дата выдачи водительского удостоверения</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="index" @click="showTourDates(index)">
            <td>{{ index + 1 }}</td>
            <td>
              <template v-if="!user.isEditing">{{ user.fio }}</template>
              <template v-else>
                <input type="text" v-model="user.fioEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.phone }}</template>
              <template v-else>
                <input type="text" v-model="user.phoneEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.DateBirth }}</template>
              <template v-else>
                <input type="date" v-model="user.DateBirthEdit" />
              </template>
            </td>

            <td>
              <template v-if="!user.isEditing">{{ user.passportSeries }}</template>
              <template v-else>
                <input type="text" v-model="user.passportSeriesEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.passportNumber }}</template>
              <template v-else>
                <input type="text" v-model="user.passportNumberEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.passportKemVydan }}</template>
              <template v-else>
                <input type="text" v-model="user.passportKemVydanEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.passportVydan }}</template>
              <template v-else>
                <input type="date" v-model="user.passportVydanEdit" />
              </template>
            </td>


            <td>
              <template v-if="!user.isEditing">{{ user.passportKodP }}</template>
              <template v-else>
                <input type="text" v-model="user.passportKodPEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.driverLicense }}</template>
              <template v-else>
                <input type="text" v-model="user.driverLicenseEdit" />
              </template>
            </td>
            <td>
              <template v-if="!user.isEditing">{{ user.driverLicenseDate }}</template>
              <template v-else>
                <input type="date" v-model="user.driverLicenseDateEdit" />
              </template>
            </td>
            <!-- Add similar blocks for other fields -->
            <td>
              <button v-if="!user.isEditing" @click="editTour(index)">
                <i class="fas fa-edit"></i> 
              </button>
              <button v-else @click="saveTour(index)">
                <i class="fas fa-save"></i> Сохранить
              </button>
              <button @click="deleteMoto(index)">
                <i class="fas fa-trash-alt"></i> 
              </button>
              <button @click="showUserDetails(index)">
                <i class="fas fa-eye"></i> 
              </button>

            </td>
          </tr>
        </tbody>
      </table>


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
      users: [],
      searchQuery: '', // New property for search
      selectedUserDetails: null,
      userDetails: null,
      // modalShow: false,
      isDetailsVisible: false,

      isModalVisible: false,

    };
  },
  created() {
    this.fetchTours();
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user =>
        user.fio.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.DateBirth.includes(query)
        // ... add other fields as needed for search
      );

    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    toggleDetailsVisibility() {
      this.isDetailsVisible = !this.isDetailsVisible;
    },
    showTourDates(index) {
      if (this.selectedTour === index) {
        this.selectedTour = null;
      } else {
        this.selectedTour = index;
        this.editIndex = null; // Сбрасываем индекс редактирования
      }
    },

    async fetchUserDetails(userId) {
      try {
        const response = await axios.get(`${this.apiUrl}/arenda-status/${userId}`);

        console.log('User Details Response:', response);
        this.selectedUserDetails = response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    async showUserDetails(userId) {
      try {
        const response = await axios.get(`${this.apiUrl}/arenda-status/users/${userId}`);
        console.log('User Details Response:', response);
        this.userDetails = response.data || {}; // Убедитесь, что userDetails всегда определен
        // Откройте модальное окно
        this.showModal();
      } catch (error) {
        console.error('Error fetching user details:', error);
        console.log('Error Details:', error.response);
      }
    },


    // показ всей техники
    async fetchTours() {
      try {
        const response = await axios.get(`${this.apiUrl}/users`);
        console.log('API Response:', response);
        console.log('API Data:', response.data);

        this.users = response.data.map(user => {
          return {
            id: user.id,
            fio: user.fio.trim(),
            phone: user.phone,
            DateBirth: user.DateBirth,
            passportSeries: user.passportSeries,
            passportNumber: user.passportNumber,
            passportKemVydan: user.passportKemVydan,
            passportVydan: user.passportVydan,
            passportKodP: user.passportKodP,
            driverLicense: user.driverLicense,
            driverLicenseDate: user.driverLicenseDate,

          };
        });
        // Log names of all motos
        this.users.forEach(user => {
          console.log(user.id);
        });
      } catch (error) {
        console.error('Error fetching motos:', error);
      }
    },
    async deleteMoto(index) {
      try {
        const confirmation = confirm('Вы уверены, что хотите удалить этот мотоцикл');
        if (confirmation) {
          const userId = this.users[index].id;

          try {
            await axios.delete(`${this.apiUrl}/users/${userId}`);
            console.log(`${this.apiUrl}/users/${userId}`);
            this.users.splice(index, 1); // Remove the deleted moto directly
            this.selectedTour = null;
          } catch (error) {
            console.error('Error deleting moto:', error);
          }
        }
      } catch (error) {
        console.error('Error handling delete confirmation:', error);
      }
    },
    editTour(index) {
      // Set editing state to true for the clicked user
      this.users[index].isEditing = true;
      this.users[index].fioEdit = this.users[index].fio;
      this.users[index].phoneEdit = this.users[index].phone;
      this.users[index].DateBirthEdit = this.users[index].DateBirth;
      this.users[index].passportSeriesEdit = this.users[index].passportSeries;
      this.users[index].passportNumberEdit = this.users[index].passportNumber;
      this.users[index].passportKemVydanEdit = this.users[index].passportKemVydan;
      this.users[index].passportVydanEdit = this.users[index].passportVydan;
      this.users[index].passportKodPEdit = this.users[index].passportKodP;
      this.users[index].driverLicenseEdit = this.users[index].driverLicense;
      this.users[index].driverLicenseDateEdit = this.users[index].driverLicenseDate;
      // Add other fields here
    },
    updateTour(index) {
      const userId = this.users[index].id;
      const updatedUser = {
        fio: this.users[index].fio,
        phone: this.users[index].phone,
        DateBirth: this.users[index].DateBirth,
        passportSeries: this.users[index].passportSeries,
        passportNumber: this.users[index].passportNumber,
        passportKemVydan: this.users[index].passportKemVydan,
        passportVydan: this.users[index].passportVydan,
        passportKodP: this.users[index].passportKodP,
        driverLicense: this.users[index].driverLicense,
        driverLicenseDate: this.users[index].driverLicenseDate,
        // ... (добавьте другие поля, если необходимо)
      };

      axios.put(`${this.apiUrl}/users/${userId}`, updatedUser)
        .then(response => {
          console.log('User updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    },
    // ... (ваш код) ...
    saveTour(index) {
      this.updateTour(index);

      // Save the changes and set editing state back to false
      this.users[index].isEditing = false;
      this.users[index].fio = this.users[index].fioEdit;
      this.users[index].phone = this.users[index].phoneEdit;
      this.users[index].DateBirth = this.users[index].DateBirthEdit;
      this.users[index].passportSeries = this.users[index].passportSeriesEdit;
      this.users[index].passportNumber = this.users[index].passportNumberEdit;
      this.users[index].passportKemVydan = this.users[index].passportKemVydanEdit;
      this.users[index].passportVydan = this.users[index].passportVydanEdit;
      this.users[index].passportKodP = this.users[index].passportKodPEdit;
      this.users[index].driverLicense = this.users[index].driverLicenseEdit;
      this.users[index].driverLicenseDate = this.users[index].driverLicenseDateEdit;
      // ... (добавьте другие поля, если необходимо)

      // Clear the editing properties after saving
      this.users[index].fioEdit = '';
      this.users[index].phoneEdit = '';
      this.users[index].DateBirthEdit = '';
      // ... (очистите другие свойства редактирования, если необходимо)
    },




  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80vw;
  height: 80vh;
  /* Set a maximum height for the modal content */
  overflow: auto;
  /* Enable vertical scrolling */
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #333;
}

/* Общие стили */
.all {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  flex-direction: column;
}

/* Стили для таблицы с деталями пользователя и датами тура */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
width: auto;
}

th {
  background-color: #f2f2f2;
}

/* Стили для кнопок редактирования и удаления в таблице */
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

/* Стили для списка клиентов и поискового поля */
.tour-menu.bike {
  padding-left: 20px;
}

input{
  min-width: 150px;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

/* Стили для таблицы клиентов */
.tour-menu table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tour-menu th,
.tour-menu td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.tour-menu th {
  background-color: #f2f2f2;
}

/* Стили для кнопок в таблице клиентов */
.tour-menu button {
  padding: 8px;
  margin: 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tour-menu button:hover {
  background-color: #2980b9;
}

.tour-menu button i {
  margin-right: 5px;
}</style>
