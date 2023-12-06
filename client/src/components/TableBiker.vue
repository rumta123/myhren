<template>
    <div>
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
                            <button @click="cancelEdit(index)">Отмена</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="addParticipant">Добавить участника</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
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
            tableData: [
                {
                    '№': 1,
                    'ФИО': 'Иванов Иван',
                    'Аванс': 5000,
                    '№ счета': 123456,
                    'Оплачен': 'Да',
                    'Арендная техника': 'Камера',
                    'Стоимость аренды': 1500,
                    'Доплата': 500,
                    'Договор по туру': 'https://example.com/contractTour.pdf',
                    'Договор на аренду': 'https://example.com/contractRent.pdf',
                    'Комментарий': 'Комментарий к заказу',
                    // editable: false,
                    // isUploading: false,
                },
                {
                    '№': 2,
                    'ФИО': 'Петров Петр',
                    'Аванс': 3000,
                    '№ счета': 654321,
                    'Оплачен': 'Нет',
                    'Арендная техника': 'Объектив',
                    'SСтоимость аренды': 800,
                    'Доплата': 200,
                    'Договор по туру': 'https://example.com/contractTour2.pdf',
                    'Договор на аренду': 'https://example.com/contractRent2.pdf',
                    'Комментарий': 'Дополнительный комментарий',
                    // editable: false,
                    // isUploading: false,
                },
            ],
        };
    },
    methods: {
        editItem(index) {
            this.tableData[index].editable = true;
        },
        deleteItem(index) {
            this.tableData.splice(index, 1);
        },
        saveItem(index) {
            this.tableData[index].editable = false;
        },
        cancelEdit(index) {
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
                // editable: true,
                // isUploading: false,
            };

            this.tableData.push(newParticipant);

        },
    },
    computed: {
    selectedTour() {
      return this.$store.state.selectedTour;
    },
    selectedDate() {
      return this.$store.state.selectedDate;
    },
    filteredData() {
      if (this.selectedTour !== null && this.selectedDate !== null) {
        // Здесь фильтруйте tableData в соответствии с выбранным туром и датой
        // Например:
        return this.tableData.filter(item => {
          // Вернуть только данные, которые соответствуют выбранному туру и дате
          return (
            item.tourIndex === this.selectedTour &&
            item.dateIndex === this.selectedDate
          );
        });
      } else {
        return []; // Если тур или дата не выбраны, показать пустую таблицу
      }
    },
  },
};
</script>
  
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
</style>
  