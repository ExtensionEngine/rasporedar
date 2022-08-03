<script>
import authService from '../api/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  name: 'auth-page',
  data: () => {
    return { isToggled: false };
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
};
</script>

<template>
  <div class="form-screen">
    <img src="../assets/img/timetable_illustration.png" />
    <div class="form-wrapper" :class="{ toggled: isToggled }">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginForm.email" type="email" placeholder="Email" required />
          <input v-model="loginForm.password" placeholder="Password" type="password" required />
          <div v-if="loginForm.error" class="form-error">
            {{ loginForm.error }}
          </div>
          <button type="submit">Login</button>
          <a @click="isToggled = !isToggled" class="link">Want to register?</a>
          <a class="link">Forgot your password?</a>
        </form>
      </div>

      <div class="registration-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <input v-model="registerForm.email" type="email" placeholder="Email" required />
          <input v-model="registerForm.password" placeholder="Password" type="password" required />
          <input v-model="registerForm.repeatedPassword" placeholder="Repeat password" type="password" required />
          <div v-if="registerForm.error" class="form-error">
            {{ registerForm.error }}
          </div>
          <button type="submit">Register</button>
          <a @click="isToggled = !isToggled" class="link">Want to login?</a>
          <a class="link">Forgot your password?</a>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  overflow: hidden;
}

.form-screen img,
.form-screen .form-wrapper {
  width: 50%;
}

.form-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 450px;
  transition: translate 300ms ease-out;
}

.form-wrapper.toggled {
  translate: 0 calc(-100vh - 450px);
}

h2 {
  font-size: 36px;
}

input[type='email'],
input[type='password'] {
  display: block;
  border: 0;
  border-bottom: 2px solid var(--color-muted);
  padding: 16px 8px;
  margin-bottom: 28px;
  width: 275px;
  transition: border 200ms ease-out;
}

input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  border-bottom-color: var(--color-main);
}

.form-error {
  color: red;
}

button[type='submit'] {
  padding: 14px 56px;
  background-color: var(--color-main);
  border: 1px solid var(--color-muted);
  border-radius: 5px;
  cursor: pointer;
  transition: border 200ms ease-out;
  margin-bottom: 28px;
}
button[type='submit']:hover,
button[type='submit']:focus {
  border-color: var(--color-text);
}

.link {
  display: block;
  margin-bottom: 12px;
}

.login-form {
  margin-bottom: 100vh;
}
</style>
