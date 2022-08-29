<script setup>
import SideBar from './layouts/SideBar/SideBar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="app">
    <side-bar v-if="userStore.isLoggedIn" />
    <router-view />
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/index.css';

.app {
  display: flex;
}
</style>
