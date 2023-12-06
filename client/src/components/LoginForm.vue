<template>
  <div class="login-form">
    <h2>Login</h2>
    <form v-if="!showRecoveryForm" @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-control">
      </div>
      <button type="submit" class="btn">Login</button>
    </form>

    <div class="forgot-password" v-if="!showRecoveryForm">
      <p>Забыли ваш пароль?</p>
      <button @click="showRecoveryForm = true" class="btn-link">Восстановить</button>
    </div>

    <!-- Форма восстановления -->
    <form v-if="showRecoveryForm" @submit.prevent="recover" class="form">
      <h2>Восстановить Login/Password</h2>
      <div class="form-group">
        <label for="recovery-email">Email:</label>
        <input type="email" id="recovery-email" v-model="recoveryEmail" required class="form-control">
      </div>
      <button type="submit" class="btn">Восстановить </button>
      <button @click="showRecoveryForm = false" type="button" class="btn-link">Отменить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      showRecoveryForm: false,
      recoveryEmail: '',
    };
  },
  methods: {
    async login() {
      try {
        console.log('Login method called');
        // Sending a POST request to the login endpoint
        
        const response = await axios.post('http://localhost:3000/auth/login', {
          login: this.username,
          password: this.password,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Assuming the server responds with a token upon successful login
        const token = response.data.token;

        // Saving the token to local storage or Vuex store
        // Adjust this based on your authentication flow
        localStorage.setItem('token', token);

        // Setting authentication status in Vuex store or component state
        this.$store.commit('setAuthentication', true);

        // Redirecting to the dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        // Handling login error
        console.error('Login error:', error);
        // this.$notify.error('Login failed. Please check your credentials.');
      } finally {
    // Hide loading indicator (optional)
    this.isLoading = false;
  }
    },
    checkLogin(username, password) {
      // Ваша реализация проверки логина и пароля
      // В данном случае, просто сравнение с предопределенными значениями
      return username === 'ваш_логин' && password === 'ваш_пароль';
    },
    recover() {
      // Ваша логика для восстановления логина/пароля
      console.log('Recovering...', this.recoveryEmail);
      // Здесь вы можете отправить запрос на сервер для восстановления
      // и выполнить дополнительные действия по вашему усмотрению
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}

.btn {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-link {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  text-decoration: underline;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
