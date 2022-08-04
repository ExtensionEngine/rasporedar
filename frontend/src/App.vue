<script>
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
      <header-logo />

      <div>
        <router-link v-if="userStore.isLoggedIn" class="rsprd-link" :to="{ name: 'home' }">Home</router-link>
        <router-link class="rsprd-link" :to="{ name: 'about' }">About</router-link>
        <router-link v-if="!userStore.isLoggedIn" class="rsprd-link" :to="{ name: 'auth' }">Login</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/global.css';
</style>
