<template>
    <div>
        <h2>Personal Information</h2>
        <form>
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
                <div v-if="searchResults.length > 0">
                    <!-- Форма для поиска и добавления новой записи -->
                    <form @submit.prevent="addPerson">
                        <input v-model="newPerson.fullName" @focus="focusInput('fullName')" @blur="blurInput('fullName')" required />

                        <label for="newFio">
                            <span :class="{ 'focused': isFocused.fullName || newPerson.fullName !== '' }">ФИО:</span>
                            <input v-model="newPerson.fullName" @focus="focusInput('fullName')"
                                @blur="blurInput('fullName')" required />
                        </label>
                        <div class="column2">
                            <div>
                                <label for="newFio">
                                    <span
                                        :class="{ 'focused': isFocused.fullName || newPerson.fullName !== '' }">ФИО:</span>
                                    <input v-model="newPerson.fullName" @focus="focusInput('fullName')"
                                        @blur="blurInput('fullName')" required />
                                </label>

                                <label for="newData">
                                    <span :class="{ 'focused': isFocused.birthDate || newPerson.birthDate !== '' }">Дата
                                        рождения:</span>
                                    <input v-model="newPerson.birthDate" @focus="focusInput('birthDate')"
                                        @blur="blurInput('birthDate')" type="date" required />
                                </label>

                                <h2>Паспорт</h2>
                                <label for="newSeriaPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportSeries || newPerson.passport.series !== '' }">Паспорт
                                        серия:</span>
                                    <input v-model="newPerson.passport.series" @focus="focusInput('passportSeries')"
                                        @blur="blurInput('passportSeries')" required />
                                </label>

                                <label for="newNumberPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportNumber || newPerson.passport.number !== '' }">Паспорт
                                        номер:</span>
                                    <input v-model="newPerson.passport.number" @focus="focusInput('passportNumber')"
                                        @blur="blurInput('passportNumber')" required />
                                </label>

                                <label for="newKemVydanPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportIssuedBy || newPerson.passport.issuedBy !== '' }">Кем
                                        выдан:</span>
                                    <input v-model="newPerson.passport.issuedBy" @focus="focusInput('passportIssuedBy')"
                                        @blur="blurInput('passportIssuedBy')" required />
                                </label>

                                <label for="newDataPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportIssueDate || newPerson.passport.issueDate !== '' }">Дата
                                        выдачи:</span>
                                    <input v-model="newPerson.passport.issueDate" @focus="focusInput('passportIssueDate')"
                                        @blur="blurInput('passportIssueDate')" type="date" required />
                                </label>

                                <label for="newKodPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportDepartmentCode || newPerson.passport.departmentCode !== '' }">Код
                                        подразделения:</span>
                                    <input v-model="newPerson.passport.departmentCode"
                                        @focus="focusInput('passportDepartmentCode')"
                                        @blur="blurInput('passportDepartmentCode')" required />
                                </label>

                                <h2>Водительское удостоверение</h2>
                                <label for="newNumberPrava">
                                    <span
                                        :class="{ 'focused': isFocused.driverLicenseNumber || newPerson.driverLicense.number !== '' }">Номер
                                        прав:</span>
                                    <input v-model="newPerson.driverLicense.number"
                                        @focus="focusInput('driverLicenseNumber')" @blur="blurInput('driverLicenseNumber')"
                                        required />
                                </label>

                                <label for="newDataPrava">
                                    <span
                                        :class="{ 'focused': isFocused.driverLicenseIssueDate || newPerson.driverLicense.issueDate !== '' }">Дата
                                        выдачи прав:</span>
                                    <input v-model="newPerson.driverLicense.issueDate"
                                        @focus="focusInput('driverLicenseIssueDate')"
                                        @blur="blurInput('driverLicenseIssueDate')" type="date" required />
                                </label>

                                <label for="newPhone">
                                    <span :class="{ 'focused': isFocused.phone || newPerson.phone !== '' }">Телефон:</span>
                                    <input v-model="newPerson.phone" @focus="focusInput('phone')" @blur="blurInput('phone')"
                                        required />
                                </label>


                            </div>
                            <div>
                                <label>
                                    <span :class="{ 'focused': isFocused.tourName || newTour.tourName !== '' }">Тур:</span>
                                    <input v-model="newTour.tourName" @focus="focusInput('tourName')"
                                        @blur="blurInput('tourName')" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.tourDate || newTour.tourDate !== '' }">Дата
                                        тура:</span>
                                    <input v-model="newTour.tourDate" @focus="focusInput('tourDate')"
                                        @blur="blurInput('tourDate')" type="date" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.price || newTour.price !== '' }">Цена:</span>
                                    <input v-model="newTour.price" @focus="focusInput('price')" @blur="blurInput('price')"
                                        type="number" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.extraFee || newTour.extraFee !== '' }">Доплата:</span>
                                    <input v-model="newTour.extraFee" @focus="focusInput('extraFee')"
                                        @blur="blurInput('extraFee')" type="number" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.totalAdvance || newTour.totalAdvance !== '' }">Общая
                                        сумма
                                        аванса:</span>
                                    <input v-model="newTour.totalAdvance" @focus="focusInput('totalAdvance')"
                                        @blur="blurInput('totalAdvance')" type="number" required />
                                </label>

                                <h2>Арендная техника</h2>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.equipmentTitle || newTour.equipment.title !== '' }">Заголовок:</span>
                                    <input v-model="newTour.equipment.title" @focus="focusInput('equipmentTitle')"
                                        @blur="blurInput('equipmentTitle')" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.equipmentName || newTour.equipment.name !== '' }">Наименование:</span>
                                    <input v-model="newTour.equipment.name" @focus="focusInput('equipmentName')"
                                        @blur="blurInput('equipmentName')" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.rentalDays || newTour.equipment.rentalDays !== '' }">Количество
                                        дней аренды:</span>
                                    <input v-model="newTour.equipment.rentalDays" @focus="focusInput('rentalDays')"
                                        @blur="blurInput('rentalDays')" type="number" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.toPay || newTour.equipment.toPay !== '' }">К
                                        оплате:</span>
                                    <input v-model="newTour.equipment.toPay" @focus="focusInput('toPay')"
                                        @blur="blurInput('toPay')" type="number" required />
                                </label>
                            </div>

                        </div>


                        <button type="submit">Добавить</button>
                    </form>
                </div>
                <div v-else>
                    <p>Ничего не найдено</p>
                    <form @submit.prevent="addPerson">
                      
                        <div class="column2">
                            <div>
                                <label for="newFio">
                                    <span
                                        :class="{ 'focused': isFocused.fullName || newPerson.fullName !== '' }">ФИО:</span>
                                    <input v-model="newPerson.fullName" @focus="focusInput('fullName')"
                                        @blur="blurInput('fullName')" required />
                                </label>

                                <label for="newData">
                                    <span :class="{ 'focused': isFocused.birthDate || newPerson.birthDate !== '' }">Дата
                                        рождения:</span>
                                    <input v-model="newPerson.birthDate" @focus="focusInput('birthDate')"
                                        @blur="blurInput('birthDate')" type="date" required />
                                </label>

                                <h2>Паспорт</h2>
                                <label for="newSeriaPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportSeries || newPerson.passport.series !== '' }">Паспорт
                                        серия:</span>
                                    <input v-model="newPerson.passport.series" @focus="focusInput('passportSeries')"
                                        @blur="blurInput('passportSeries')" required />
                                </label>

                                <label for="newNumberPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportNumber || newPerson.passport.number !== '' }">Паспорт
                                        номер:</span>
                                    <input v-model="newPerson.passport.number" @focus="focusInput('passportNumber')"
                                        @blur="blurInput('passportNumber')" required />
                                </label>

                                <label for="newKemVydanPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportIssuedBy || newPerson.passport.issuedBy !== '' }">Кем
                                        выдан:</span>
                                    <input v-model="newPerson.passport.issuedBy" @focus="focusInput('passportIssuedBy')"
                                        @blur="blurInput('passportIssuedBy')" required />
                                </label>

                                <label for="newDataPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportIssueDate || newPerson.passport.issueDate !== '' }">Дата
                                        выдачи:</span>
                                    <input v-model="newPerson.passport.issueDate" @focus="focusInput('passportIssueDate')"
                                        @blur="blurInput('passportIssueDate')" type="date" required />
                                </label>

                                <label for="newKodPassport">
                                    <span
                                        :class="{ 'focused': isFocused.passportDepartmentCode || newPerson.passport.departmentCode !== '' }">Код
                                        подразделения:</span>
                                    <input v-model="newPerson.passport.departmentCode"
                                        @focus="focusInput('passportDepartmentCode')"
                                        @blur="blurInput('passportDepartmentCode')" required />
                                </label>

                                <h2>Водительское удостоверение</h2>
                                <label for="newNumberPrava">
                                    <span
                                        :class="{ 'focused': isFocused.driverLicenseNumber || newPerson.driverLicense.number !== '' }">Номер
                                        прав:</span>
                                    <input v-model="newPerson.driverLicense.number"
                                        @focus="focusInput('driverLicenseNumber')" @blur="blurInput('driverLicenseNumber')"
                                        required />
                                </label>

                                <label for="newDataPrava">
                                    <span
                                        :class="{ 'focused': isFocused.driverLicenseIssueDate || newPerson.driverLicense.issueDate !== '' }">Дата
                                        выдачи прав:</span>
                                    <input v-model="newPerson.driverLicense.issueDate"
                                        @focus="focusInput('driverLicenseIssueDate')"
                                        @blur="blurInput('driverLicenseIssueDate')" type="date" required />
                                </label>

                                <label for="newPhone">
                                    <span :class="{ 'focused': isFocused.phone || newPerson.phone !== '' }">Телефон:</span>
                                    <input v-model="newPerson.phone" @focus="focusInput('phone')" @blur="blurInput('phone')"
                                        required />
                                </label>


                            </div>
                            <div>
                                <label>
                                    <span :class="{ 'focused': isFocused.tourName || newTour.tourName !== '' }">Тур:</span>
                                    <input v-model="newTour.tourName" @focus="focusInput('tourName')"
                                        @blur="blurInput('tourName')" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.tourDate || newTour.tourDate !== '' }">Дата
                                        тура:</span>
                                    <input v-model="newTour.tourDate" @focus="focusInput('tourDate')"
                                        @blur="blurInput('tourDate')" type="date" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.price || newTour.price !== '' }">Цена:</span>
                                    <input v-model="newTour.price" @focus="focusInput('price')" @blur="blurInput('price')"
                                        type="number" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.extraFee || newTour.extraFee !== '' }">Доплата:</span>
                                    <input v-model="newTour.extraFee" @focus="focusInput('extraFee')"
                                        @blur="blurInput('extraFee')" type="number" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.totalAdvance || newTour.totalAdvance !== '' }">Общая
                                        сумма
                                        аванса:</span>
                                    <input v-model="newTour.totalAdvance" @focus="focusInput('totalAdvance')"
                                        @blur="blurInput('totalAdvance')" type="number" required />
                                </label>

                                <h2>Арендная техника</h2>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.equipmentTitle || newTour.equipment.title !== '' }">Заголовок:</span>
                                    <input v-model="newTour.equipment.title" @focus="focusInput('equipmentTitle')"
                                        @blur="blurInput('equipmentTitle')" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.equipmentName || newTour.equipment.name !== '' }">Наименование:</span>
                                    <input v-model="newTour.equipment.name" @focus="focusInput('equipmentName')"
                                        @blur="blurInput('equipmentName')" required />
                                </label>

                                <label>
                                    <span
                                        :class="{ 'focused': isFocused.rentalDays || newTour.equipment.rentalDays !== '' }">Количество
                                        дней аренды:</span>
                                    <input v-model="newTour.equipment.rentalDays" @focus="focusInput('rentalDays')"
                                        @blur="blurInput('rentalDays')" type="number" required />
                                </label>

                                <label>
                                    <span :class="{ 'focused': isFocused.toPay || newTour.equipment.toPay !== '' }">К
                                        оплате:</span>
                                    <input v-model="newTour.equipment.toPay" @focus="focusInput('toPay')"
                                        @blur="blurInput('toPay')" type="number" required />
                                </label>
                            </div>

                        </div>


                        <button type="submit">Добавить</button>
                    </form>
                </div>
            </div>
        </div>



        <!-- Таблица с данными -->
        <table>
            <thead>
                <tr>
                    <!-- Заголовки таблицы... -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person, index) in filteredPeople" :key="index" @click="fillForm(person)">
                    <!-- Тут остались те же поля -->
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    data() {
        return {

            people: [
                { fio: 'Иванов Иван Иванович', tel: '123-456-7890' },
                { fio: 'Иванов Иван Иванович', tel: '987-654-3210' },
                { fio: 'Петров Петр Петрович', tel: '555-555-5555' },
                // Добавьте другие данные по желанию
            ],
            searchText: '',
            matchingPeople: [],
            searchResults: [],
            newFio: '',
            newPhone: '',
            selectedPerson: null,

            // people: [/* Существующие данные */],
            newPerson: {
                fullName: "",
                birthDate: "",
                passport: {
                    series: "",
                    number: "",
                    issuedBy: "",
                    issueDate: "",
                    departmentCode: ""
                },
                driverLicense: {
                    number: "",
                    issueDate: ""
                },
                phone: ""
            },
            newTour: {
                tourName: "",
                tourDate: "",
                price: "",
                extraFee: "",
                totalAdvance: "",
                equipment: {
                    title: "",
                    name: "",
                    rentalDays: "",
                    toPay: "",
                }
            },
            isFocused: {
                fullName: false,
                birthDate: false,
                passportSeries: false,
                passportNumber: false,
                passportIssuedBy: false,
                passportIssueDate: false,
                passportDepartmentCode: false,
                driverLicenseNumber: false,
                driverLicenseIssueDate: false,
                phone: false,
            },
        };
    },
    computed: {
        filteredPeople() {
            return this.people.filter(person =>
                person.fullName && person.fullName.toLowerCase().startsWith(this.searchText.toLowerCase().slice(0, 2))
            );
        },
    },
    methods: {
        searchOrAdd() {
            const searchSubstring = this.searchText.slice(0, 3).toLowerCase();
            this.matchingPeople = this.people.filter(person =>
                person.fio.toLowerCase().includes(searchSubstring)
            );

            if (this.matchingPeople.length > 0) {
                // Если найдены совпадения, выбрать первого в списке
                this.selectedPerson = this.matchingPeople[0];
                this.searchResults = this.matchingPeople;
            } else {
                // Если совпадений не найдено, очистить результаты
                this.selectedPerson = null;
                this.searchResults = [];
            }
        },
        // addPerson() {
        //     // Добавить нового человека
        //     this.people.push({
        //         fio: this.newFio,
        //         tel: this.newPhone,
        //     });

        //     // Очистка полей для нового ввода
        //     this.newFio = '';
        //     this.newPhone = '';

        //     // Очистка результатов поиска
        //     this.searchResults = [];
        //     this.matchingPeople = [];
        //     this.selectedPerson = null;
        // },
  
   

        // конец
        addPerson() {
            console.log("Adding person:", this.newPerson);
            this.people.push({ ...this.newPerson });
            this.newPerson = {
                fullName: "",
                birthDate: "",
                passport: {
                    series: "",
                    number: "",
                    issuedBy: "",
                    issueDate: "",
                    departmentCode: ""
                },
                driverLicense: {
                    number: "",
                    issueDate: ""
                },
                phone: ""
            };
            this.resetFocus();
        },
        fillForm(person) {
            this.newPerson = { ...person };
            this.resetFocus();
        },
        focusInput(field) {
            this.isFocused[field] = true;
        },
        blurInput(field) {
            if (this.newPerson[field] === '') {
                this.isFocused[field] = false;
            }
        },
        resetFocus() {
            for (const key in this.isFocused) {
                this.isFocused[key] = false;
            }
        },
    },
};
</script>
  
<style scoped>
.column2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.column2 div {
    display: grid;
}

label {
    position: relative;
    margin-bottom: 30px;
}

span {
    position: absolute;
    top: 19px;
    left: 10%;
    color: #9e9e9e;
    font-size: 16px;
    cursor: text;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
}

span.focused {
    top: -10px;
    left: 5%;
    font-size: 10px;
    color: #2196F3;
}

input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
}
</style>
 