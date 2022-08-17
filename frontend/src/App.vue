<script>
import SideBar from './components/SideBar/SideBar.vue';

export default {
  name: 'app',
  components: {
    SideBar,
  },
};
</script>

<template>
  <div>
    <side-bar />
    <router-view />
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/global.css';
</style>
