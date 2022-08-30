<script setup>
import SideBar from './layouts/SideBar/SideBar.vue';
import TheHeader from './layouts/Header/TheHeader.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="app">
    <div v-if="userStore.isLoggedIn">
      <side-bar />
    </div>
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
