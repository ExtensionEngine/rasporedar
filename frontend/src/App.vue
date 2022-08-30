<script setup>
import SideBar from './layouts/SideBar/SideBar.vue';
import TheHeader from './layouts/Header/TheHeader.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="app">
    <side-bar v-if="userStore.isLoggedIn" />
    <div class="rsprd-main">
      <the-header />
      <router-view />
    </div>
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/index.css';

.app {
  display: flex;
}

.rsprd-main {
  display: block;
  width: 100%;
}
</style>
