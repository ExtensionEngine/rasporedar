<script>
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
    const registerForm = ref({
      email: '',
      password: '',
      repeatedPassword: '',
      error: null,
    });

    const login = async e => {
      e.preventDefault();
      loginForm.value.error = null;

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.value.email,
          password: loginForm.value.password,
        }),
      });
      const json = await response.json();

      if ('error' in json) {
        loginForm.value.error = json.error;
        return;
      }

      loginForm.value.email = '';
      loginForm.value.password = '';

      await userStore.logInUser(json.token);
      router.push({ name: 'home' });
    };

    const register = async e => {
      e.preventDefault();
      registerForm.value.error = null;

      if (registerForm.value.password !== registerForm.value.repeatedPassword) {
        registerForm.value.error = 'Password and repeated password are not matching';
        return;
      }

      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerForm.value.email,
          password: registerForm.value.password,
        }),
      });
      const json = await response.json();
      if ('error' in json) {
        registerForm.value.error = json.error;
        return;
      }

      registerForm.value.email = '';
      registerForm.value.password = '';
      registerForm.value.repeatedPassword = '';

      await userStore.logInUser(json.token);
      router.push({ name: 'home' });
    };
    return { store: userStore, login, loginForm, register, registerForm };
  },
  components: {},
};
</script>

<template>
  <div>
    <pre>{{ JSON.stringify(store.user, null, 2) }}</pre>

    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="loginForm.email" type="email" placeholder="email" required />
      <br />
      <br />
      <input v-model="loginForm.password" placeholder="password" type="password" required />
      <br />
      <br />
      <div v-if="loginForm.error" class="error">
        {{ loginForm.error }}
      </div>
      <button type="submit">Login</button>
    </form>

    <h1>REGISTER</h1>
    <form @submit.prevent="register">
      <input v-model="registerForm.email" type="email" placeholder="email" required />
      <br />
      <br />
      <input v-model="registerForm.password" placeholder="password" type="password" required />
      <br />
      <br />
      <input v-model="registerForm.repeatedPassword" placeholder="repeat password" type="password" required />
      <br />
      <br />
      <div v-if="registerForm.error" class="error">
        {{ registerForm.error }}
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
