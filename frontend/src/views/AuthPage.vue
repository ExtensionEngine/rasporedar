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

      loginForm.value.email = '';
      loginForm.value.password = '';

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

      registerForm.value.email = '';
      registerForm.value.password = '';
      registerForm.value.repeatedPassword = '';

      await userStore.loginUser(user.token);
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
