<template>
    <div>
        <ListBike />
        <div class="all">
            <!-- Список туров слева -->
            <div class="tour-menu">
                <h2>Список туров</h2>
                <ul>
                    <li v-for="(tour, index) in tours" :key="index" @click="showTourDates(index)">
                        <div v-if="!tour.isEditing">
                            {{ tour.name }}
                            <button style="margin-left: 10px;" @click.prevent="editTour(index)">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button @click.prevent="deleteTour(index)">
                                <i class="fas fa-trash-alt"></i>

                            </button>
                        </div>
                        <div v-else>
                            <input type="text" v-model="tours[index].name" @click.stop>
                            <button @click.prevent="saveTour(index)">Сохранить тур</button>
                            <button @click.prevent="deleteTourData(index)">Удалить</button>
                        </div>
                    </li>
                </ul>
                <button @click="addNewTour">Добавить тур</button>
            </div>
            <!-- Отображение даты выбранного тура -->
            <div class="tour-dates" v-if="selectedTour !== null">
                <h2>Выбранный тур: {{ tours[selectedTour].name }}</h2>
                <p>Даты тура:</p>
                <ul>
                    <li v-for="(date, dateIndex) in tours[selectedTour].dates" :key="dateIndex">
                        <div v-if="!date.isEditing">
                            <span class="padding_palace" @click="generateMessage(date)">
                                {{ date.tour_date }} - Количество мест: {{ date.totalSeats }} - Количество свободных мест:
                            </span>
                            <button @click="editTourDate(dateIndex)">Редактировать дату</button>
                            <button @click="deleteDate(dateIndex)">Удалить дату</button>
                        </div>
                        <div v-else class="editData">
                            <Datepicker v-model="date.start" locale="ru" :placeholder="date.start" style="width: 200px;" />
                            <Datepicker v-model="date.end" locale="ru" :placeholder="date.end" style="width: 200px;" />
                            <input type="number" v-model="date.freeSpots" placeholder="Свободные места">
                            <button @click="saveEdit(dateIndex)">Сохранить</button>
                        </div>
                    </li>
                </ul>
                <div>
                    <Datepicker v-model="newDate" locale="ru"></Datepicker>
                    <button @click="addNewTourDate">Добавить дату</button>
                </div>
            </div>
        </div>
        <div class="message-box">
            <h2>{{ selectedTourMessage }}</h2>
            <div v-if="showTable == true">
                <table>
                    <thead>
                        <tr>
                            <th v-for="(header, index) in tableHeaders" :key="index" :style="{ backgroundColor: 'orange' }">
                                {{ header }}
                            </th>
                            <th :style="{ backgroundColor: 'orange' }">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <td v-for="(value, key) in item" :key="key">
                                <template v-if="!item.editable">
                                    {{ value }}
                                </template>
                                <template v-else>
                                    <template v-if="key !== 'Договор по туру' && key !== 'Договор на аренду'">
                                        <input v-model="item[key]" type="text">
                                    </template>
                                    <template v-else>
                                        <input v-if="!item.isUploading" type="file" @change="uploadDocument(index, key)">
                                        <span v-else>Загрузка...</span>
                                    </template>
                                </template>
                            </td>
                            <td>
                                <template v-if="!item.editable">
                                    <button @click="editItem(index)">Редактировать</button>
                                    <button @click="deleteItem(index)">Удалить</button>
                                </template>
                                <template v-else>
                                    <button @click="saveItem(index)">Сохранить</button>
                                    <button @click="cancelEditTable(index)">Отмена</button>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button @click="addParticipant">Добавить участника</button>
            </div>
            <!-- <TableBiker v-if="showTable" /> -->
        </div>
    </div>
</template>
  
<script>

import axios from 'axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
// import TableBiker from './TableBiker.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import ListBike from './ListBike.vue';
import { ref } from 'vue';

export default {
    components: {
        Datepicker,
        // TableBiker,
        ListBike,

    },
    data() {
        return {
            apiUrl: 'http://localhost:3000',
            selectedTour: null,
            editIndex: null,
            editedTourName: '',
            newDate: ref(''),
            selectedTourMessage: '',

            editedDate: {
                tour_date: new Date().toLocaleDateString('ru-RU'),
                tour_date_end: new Date().toLocaleDateString('ru-RU'),
                freeSpots: 0,
            },
            tours: [],
            showTable: false,
            date: '', // добавлено
            freeSpots: 0, // добавлено

            tableHeaders: [
                '№',
                'ФИО',
                'Аванс',
                '№ счета',
                'Оплачен',
                'Арендная техника',
                'Стоимость аренды',
                'Доплата',
                'Договор по туру',
                'Договор на аренду',
                'Комментарий',
            ],
            tableData: [],

        };
    },
    created() {
        this.fetchTours();
    },
    methods: {

        async showTourDates(index) {
            if (this.selectedTour === index) {
                this.selectedTour = null;
                this.showTable = false;
                this.selectedTourMessage = ''
            } else {
                try {
                    // Запрос на получение информации о туре
                    const tourResponse = await axios.get(`${this.apiUrl}/tours/${this.tours[index]._id}`);
                    console.log('Tour Response:', tourResponse.data);

                    // Запрос на получение дат тура
                    const datesResponse = await axios.get(`${this.apiUrl}/tour-dates/${this.tours[index]._id}/tour-date`);
                    console.log('Dates Response:', datesResponse.data);

                    // Обновление данных о туре в списке
                    this.tours = this.tours.map((tour, i) => {
                        if (i === index) {
                            return {
                                _id: tour._id,
                                name: tour.name,
                                dates: datesResponse.data,
                            };
                        }
                        return tour;
                    });

                    // Установка выбранного тура и сброс индекса редактирования
                    this.selectedTour = index;
                    this.editIndex = null;
                    // Добавьте эту строку, чтобы скрыть таблицу при выборе тура
                    this.showTable = false;
                    this.selectedTourMessage = ''
                } catch (error) {
                    console.error('Ошибка при загрузке тура и его дат:', error);
                }
            }
        },

        // показ всех туров из бд
        async fetchTours() {
            try {
                const response = await axios.get(`${this.apiUrl}/tours`);
                // this.tours = response.data.map(tour => ({ ...tour, isEditing: false }));
                console.log('API Response:', response);
                console.log('API Data:', response.data);

                // Assuming the response.data is an array of tours, update this line
                this.tours = response.data.map(tour => {
                    return {
                        _id: tour.tour_id,
                        name: tour.tour_name,
                        // Add other properties as needed
                    };
                });
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        },

        // удаление тура 
        async deleteTour(index) {
            const confirmation = confirm('Вы уверены, что хотите удалить этот тур?');
            if (confirmation) {
                const tourId = this.tours[index]._id;

                try {
                    await axios.delete(`${this.apiUrl}/tours/${tourId}`);
                    this.tours.splice(index, 1);
                    this.selectedTour = null;
                } catch (error) {
                    console.error('Error deleting tour:', error);
                }
            }
        },

        // удаление даты тура
        async deleteDate(index) {
            const confirmation = confirm('Вы уверены, что хотите удалить дату этого тура?');
            if (confirmation) {
                // this.tours[this.selectedTour].dates.splice(dateIndex, 1);

                const dateId = this.tours[this.selectedTour].dates[index].date_id;
                console.log(dateId)
                try {
                    await axios.delete(`${this.apiUrl}/tour-dates/${dateId}`);
                    this.tours[this.selectedTour].dates.splice(index, 1);
                } catch (error) {
                    console.error('Error deleting tour date:', error);
                }
            }
        },


        saveTour(index) {
            this.tours[index].isEditing = false;

            const tourId = this.tours[index]._id;
            // Добавляем console.log для вывода в консоль
            console.log('Data before saving:', this.tours[index].name);
            console.log('id', tourId)

            const requestData = new URLSearchParams();

            requestData.append('tour_name', this.tours[index].name);

            axios.put(`${this.apiUrl}/tours/${tourId}`, requestData.toString(), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
                .then(response => {
                    console.log('Tour updated successfully:', response.data);
                    this.tours[index].name = response.data.tour_name;
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
            this.editedTourName = this.tours[index].name;
            this.tours[index].isEditing = true;
        },
        // addNewTour() {

        // },

        async addNewTour() {
            try {
                // Отправка POST-запроса для добавления нового тура
                const response = await axios.post(`${this.apiUrl}/tours`, {
                    tour_name: 'Новый тур',  // Убедитесь, что здесь указано правильное поле
                    // Добавьте другие поля тура, если необходимо
                });
                this.tours.push({ name: 'Новый тур', dates: [] });

                // Обработка успешного добавления тура
                console.log('Tour added successfully:', response.data);

                // Опционально: обновление списка туров после добавления нового тура
                this.fetchTours();
            } catch (error) {
                console.error('Error adding tour:', error);
            }
        },


        startEditing(dateIndex) {
            const selectedDate = this.tours[this.selectedTour].dates[dateIndex];

            if (selectedDate && selectedDate.tour_date) {
                this.editedDate = {
                    date: this.stringToDate(selectedDate.tour_date),
                    freeSpots: selectedDate.totalSeats,
                };
                this.tours[this.selectedTour].dates[dateIndex].isEditing = true;
            } else {
                console.error('Selected date or date property is undefined.');
                // Handle the case where selectedDate or selectedDate.tour_date is undefined
            }
        },
        saveEdit(dateIndex) {
        const selectedDate = this.tours[this.selectedTour].dates[dateIndex];
        const formattedStartDate = this.dateToString(this.editedDate.start);
        const formattedEndDate = this.dateToString(this.editedDate.end);

        // Update local data
        selectedDate.tour_date = `${formattedStartDate} - ${formattedEndDate}`;
        selectedDate.freeSpots = this.editedDate.freeSpots;
        selectedDate.isEditing = false;

        // Prepare data for the PUT request
        const requestData = {
            tour_date: formattedStartDate,
            tour_date_end: formattedEndDate,
            totalSeats: this.editedDate.freeSpots,
        };

        // Make the PUT request
        const dateId = selectedDate.date_id;
        axios.put(`${this.apiUrl}/tour-dates/${dateId}`, requestData)
            .then(response => {
                console.log('Date updated successfully:', response.data);
                selectedDate.tour_date = response.data.tour_date;
                selectedDate.totalSeats = response.data.totalSeats;
            })
            .catch(error => {
                console.error('Error updating date:', error);
            });
    },

        cancelEdit(index) {
            this.tours[index].isEditing = false;
        },

        async addNewTourDate() {
            if (this.newDate && this.selectedTour !== null) {
                // Check if this.tours[this.selectedTour] exists
                if (!this.tours[this.selectedTour].dates) {
                    // If it doesn't exist, create a new array for dates
                    this.tours[this.selectedTour].dates = [];
                }

                try {
                    const formattedDate = new Date(this.newDate).toLocaleDateString('ru-RU');

                    // Use the tour ID from the selected tour
                    const tourId = this.tours[this.selectedTour]._id;
                    console.log('тест', tourId)
                    // Send a POST request to add a new tour date
                    const response = await axios.post(`${this.apiUrl}/tour-dates`, {
                        tour: tourId,
                        tour_date: formattedDate,
                        totalSeats: 0,
                    });
                    console.log(response)

                    // Add the new date to the selected tour
                    this.tours[this.selectedTour].dates.push({
                        tour_date: formattedDate,
                        tour: tourId,
                        totalSeats: 0,
                        isEditing: false,
                    });

                    // Optionally, update the list of tours after adding a new date
                    // this.fetchTours();
                    this.newDate = '';
                    // Log the server response
                    console.log('Server response:', response.data);
                } catch (error) {
                    console.error('Error adding tour date:', error);
                }

                // You can choose whether to reset the newDate field or not
                // this.newDate = '';
            }
        },

        saveTourDate(dateIndex) {
            this.editIndex = dateIndex;
            // Обработка сохранения редактирования даты тура
        },


        deleTour(index) {
            const confirmation = confirm('Вы уверены, что хотите удалить этот тур?');
            if (confirmation) {
                this.tours.splice(index, 1);
                this.selectedTour = null;
            }
        },
        formatDate(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
        // generateMessage(date){
        //     console.log('Вы кликнули по дате с индексом:', date.tour_date);
        // },
        generateMessage(date) {
            if (!this.tours[this.selectedTour].name) {
                this.showTable = false;
                this.selectedTourMessage = ''
            }
            else {

                this.selectedTourMessage = `Выбран тур ${this.tours[this.selectedTour].name} на дату ${date.tour_date} - список участников`;
                // console.log(this.tours[this.selectedTour].dates[0].tour_date)
                this.showTable = true;
            }

        },


        async loadDataBasedOnDate(selectedDate) {
            try {
                const response = await axios.get(`${this.apiUrl}/ваш-конечный-пункт-для-загрузки-данных/${selectedDate.tour_date}`);
                this.$refs.tableBiker.loadData(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных на основе даты:', error);
                // Обработайте ошибку по необходимости
            }
        },
        // обработка таблицы 
        editItem(index) {
            this.tableData[index].editable = true;
        },
        deleteItem(index) {
            this.tableData.splice(index, 1);
        },
        saveItem(index) {
            this.tableData[index].editable = false;
        },
        cancelEditTable(index) {
            this.tableData[index].editable = false;
        },
        uploadDocument(index, key) {
            const input = event.target;
            if (input.files && input.files[0]) {
                this.tableData[index].isUploading = true;

                const reader = new FileReader();
                reader.onload = (e) => {
                    this.tableData[index][key] = e.target.result;
                    this.tableData[index].isUploading = false;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },

        addParticipant() {
            const newParticipant = {
                '№': this.tableData.length + 1,
                'ФИО': 'Новый участник',
                'Аванс': 0,
                '№ счета': 0,
                'Оплачен': 'Нет',
                'Арендная техника': 'Нет',
                'Стоимость аренды': 0,
                'Доплата': 0,
                'Договор по туру': '',
                'Договор на аренду': '',
                'Комментарий': 'Нет комментария',

            };

            this.tableData.push(newParticipant);

        },
    },
    // computed: {
    //     selectedTour() {
    //         return this.$store.state.selectedTour;
    //     },
    //     selectedDate() {
    //         return this.$store.state.selectedDate;
    //     },
    //     filteredData() {
    //         if (this.selectedTour !== null && this.selectedDate !== null) {
    //             // Здесь фильтруйте tableData в соответствии с выбранным туром и датой
    //             // Например:
    //             return this.tableData.filter(item => {
    //                 // Вернуть только данные, которые соответствуют выбранному туру и дате
    //                 return (
    //                     item.tourIndex === this.selectedTour &&
    //                     item.dateIndex === this.selectedDate
    //                 );
    //             });
    //         } else {
    //             return []; // Если тур или дата не выбраны, показать пустую таблицу
    //         }
    //     },

    // },

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
.tour-menu {
    float: left;
    width: 400px;
    margin-right: 10px;
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
  