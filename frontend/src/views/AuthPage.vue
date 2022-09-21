<script>
import { reactive, ref } from 'vue';
import authService from '@/api/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  name: 'auth-page',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const loginForm = reactive({
      email: '',
      password: '',
      error: null,
    });

    const login = async () => {
      loginForm.error = null;

      const user = await authService.loginUser({
        email: loginForm.email,
        password: loginForm.password,
      });

      if ('error' in user) {
        loginForm.error = user.error;
        return;
      }

      await userStore.loginUser(user.token);
      router.push({ name: 'profile' });
    };

    const registerForm = reactive({
      email: '',
      password: '',
      repeatedPassword: '',
      error: null,
    });

    const register = async () => {
      registerForm.error = null;

      if (registerForm.password !== registerForm.repeatedPassword) {
        registerForm.error = 'Password and repeated password are not matching';
        return;
      }

      const user = await authService.registerUser({
        email: registerForm.email,
        password: registerForm.password,
      });

      if ('error' in user) {
        registerForm.error = user.error;
        return;
      }

      await userStore.loginUser(user.token);
      router.push({ name: 'profile' });
    };

    const isToggled = ref(false);

    return { store: userStore, login, loginForm, register, registerForm, isToggled };
  },
};
</script>

<template>
  <div class="form-screen">
    <div class="form-illustration-wrapper">
      <img class="form-illustration" src="@/assets/img/timetable_illustration.png" />
    </div>
    <div class="form-wrapper" :class="{ toggled: isToggled }">
      <div class="login-form">
        <h2 class="form-title">Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginForm.email" type="email" placeholder="Email" class="input" required />
          <input v-model="loginForm.password" type="password" placeholder="Password" class="input" required />
          <div v-if="loginForm.error" class="form-error">
            {{ loginForm.error }}
          </div>
          <button type="submit" class="form-button">Login</button>
          <a @click="isToggled = !isToggled" class="form-link">Want to register?</a>
        </form>
      </div>

      <div class="registration-form">
        <h2 class="form-title">Register</h2>
        <form @submit.prevent="register">
          <input v-model="registerForm.email" type="email" placeholder="Email" class="input" required />
          <input v-model="registerForm.password" type="password" placeholder="Password" class="input" required />
          <input
            v-model="registerForm.repeatedPassword"
            type="password"
            placeholder="Repeat password"
            class="input"
            required
          />
          <div v-if="registerForm.error" class="form-error">
            {{ registerForm.error }}
          </div>
          <button type="submit" class="form-button">Register</button>
          <a @click="isToggled = !isToggled" class="form-link">Want to login?</a>
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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--color-lighter);
}

.form-illustration-wrapper,
.form-screen .form-wrapper {
  width: 40%;
}

.form-illustration {
  height: 100%;
  width: 80%;
  display: block;
  margin: 0 0 0 auto;
}

.form-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 450px;
  transition: transform 300ms ease-out;
}

.form-wrapper.toggled {
  transform: translateY(calc(-100vh - 450px));
}

.form-title {
  font-size: 36px;
}

.input {
  display: block;
  border: 0;
  border-bottom: 2px solid var(--color-muted);
  padding: 16px 8px;
  margin-bottom: 28px;
  width: 275px;
  transition: border 200ms ease-out;
}

.input:focus {
  outline: none;
  border-bottom-color: var(--color-main);
}

.form-error {
  color: red;
  margin-bottom: 28px;
}

.form-button {
  padding: 14px 56px;
  background-color: var(--color-main);
  border: 1px solid var(--color-muted);
  border-radius: 5px;
  cursor: pointer;
  transition: border 200ms ease-out;
  margin-bottom: 28px;
}
.form-button:hover,
.form-button:focus {
  border-color: var(--color-text);
}

.form-link {
  display: block;
  margin-bottom: 12px;
}

.login-form {
  margin-bottom: 100vh;
}
</style>
