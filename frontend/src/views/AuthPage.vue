<script>
import { useUserStore } from '@/stores/user';

export default {
  name: 'auth-page',
  data: () => {
    return {
      loginForm: {
        email: '',
        password: '',
        error: null,
      },
      registerForm: {
        email: '',
        password: '',
        repeatedPassword: '',
        error: null,
      },
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      this.loginForm.error = null;

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.loginForm.email,
          password: this.loginForm.password,
        }),
      });
      const json = await response.json();

      if ('error' in json) {
        this.loginForm.error = json.error;
        return;
      }

      this.loginForm.email = '';
      this.loginForm.password = '';

      const { setUser } = useUserStore();
      setUser(json.token);
    },
    async register(e) {
      e.preventDefault();
      this.registerForm.error = null;

      if (this.registerForm.password !== this.registerForm.repeatedPassword) {
        this.registerForm.error = 'Password and repeated password are not matching';
        return;
      }

      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.registerForm.email,
          password: this.registerForm.password,
        }),
      });
      const json = await response.json();
      if ('error' in json) {
        this.registerForm.error = json.error;
        return;
      }

      this.registerForm.email = '';
      this.registerForm.password = '';
      this.registerForm.repeatedPassword = '';

      const { setUser } = useUserStore();
      setUser(json.token);
    },
  },
  components: {},
  setup() {
    const store = useUserStore();
    return {
      store,
    };
  },
};
</script>

<template>
  <div>
    <pre>{{ JSON.stringify(store.getUser(), null, 2) }}</pre>
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
