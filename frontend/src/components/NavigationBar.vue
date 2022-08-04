<script>
import { useUserStore } from '@/stores/user';
export default {
  name: 'navigation-bar',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>

<template>
  <nav class="navigation-bar">
    <img src="@/assets/img/rasporedar_logo.svg" class="logo" />
    <div>
      <router-link v-if="userStore.isLoggedIn" class="rsprd-link" :to="{ name: 'home' }">Home</router-link>
      <router-link class="rsprd-link" :to="{ name: 'about' }">About</router-link>
      <router-link v-if="!userStore.isLoggedIn" class="rsprd-link" :to="{ name: 'auth' }">Login</router-link>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  width: 75px;
}

.navigation-bar {
  margin: 16px 0;
}
</style>
