<script>
import authService from '../api/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  name: 'auth-page',
  data: () => {
    return {};
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const loginForm = ref({
      email: '',
      password: '',
      error: null,
    });

    const login = async e => {
      e.preventDefault();
      loginForm.value.error = null;

      const user = await authService.loginUser({
        email: loginForm.value.email,
        password: loginForm.value.password,
      });

      if ('error' in user) {
        loginForm.value.error = user.error;
        return;
      }

      await userStore.loginUser(user.token);
      router.push({ name: 'home' });
    };

    const registerForm = ref({
      email: '',
      password: '',
      repeatedPassword: '',
      error: null,
    });

    const register = async e => {
      e.preventDefault();
      registerForm.value.error = null;

      if (registerForm.value.password !== registerForm.value.repeatedPassword) {
        registerForm.value.error = 'Password and repeated password are not matching';
        return;
      }

      const user = await authService.registerUser({
        email: registerForm.value.email,
        password: registerForm.value.password,
      });

      if ('error' in user) {
        registerForm.value.error = user.error;
        return;
      }

      await userStore.loginUser(user.token);
      router.push({ name: 'home' });
    };

    return { store: userStore, login, loginForm, register, registerForm };
  },
  components: {},
};
</script>

<template>
  <div class="form-screen">
    <img src="../assets/img/timetable_illustration.png" />
    <div class="form-wrapper">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginForm.email" type="email" placeholder="Email" required />
          <br />
          <br />
          <input v-model="loginForm.password" placeholder="Password" type="password" required />
          <br />
          <br />
          <div v-if="loginForm.error" class="error">
            {{ loginForm.error }}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      <div class="registration-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <input v-model="registerForm.email" type="email" placeholder="Email" required />
          <br />
          <br />
          <input v-model="registerForm.password" placeholder="Password" type="password" required />
          <br />
          <br />
          <input v-model="registerForm.repeatedPassword" placeholder="Repeat password" type="password" required />
          <br />
          <br />
          <div v-if="registerForm.error" class="error">
            {{ registerForm.error }}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-screen {
  display: flex;
}

.form-screen img,
.form-screen .form-wrapper {
  width: 50%;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10%;
}

h2 {
  font-size: 36px;
}

input[type='email'],
input[type='password'] {
  border: 0;
  border-bottom: 2px solid var(--color-muted);
  padding: 16px 8px;
  margin-bottom: 16px;
  width: 275px;
  transition: border 200ms ease-out;
}

input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  border-bottom-color: var(--color-main);
}

.error {
  color: red;
}

button[type='submit'] {
  padding: 14px 56px;
  background-color: var(--color-main);
  border: 1px solid var(--color-muted);
  border-radius: 5px;
  cursor: pointer;
  transition: border 200ms ease-out;
}
button[type='submit']:hover,
button[type='submit']:focus {
  border-color: var(--color-text);
}

.registration-form {
  /* temp */
  display: none;
}
</style>
