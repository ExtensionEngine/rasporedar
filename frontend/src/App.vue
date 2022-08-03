<script>
import 'normalize.css';
import HeaderLogo from './components/HeaderLogo.vue';
import { useUserStore } from './stores/user';

export default {
  name: 'app',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: {
    HeaderLogo,
  },
};
</script>

<template>
  <div>
    <nav>
      <HeaderLogo />

      <div>
        <router-link v-if="userStore.isLoggedIn" class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About</router-link>
        <router-link v-if="!userStore.isLoggedIn" class="link" to="/auth">Login</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
@import '@/assets/styles/global.css';
</style>
