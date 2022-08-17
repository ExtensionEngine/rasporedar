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
  <div class="app">
    <side-bar />
    <router-view />
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/global.css';

.app {
  display: flex;
}
</style>
