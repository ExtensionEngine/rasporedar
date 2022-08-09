<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'app',
  components: {
    NavigationBar,
  },
};
</script>

<template>
  <div>
    <navigation-bar />
    <router-view />
  </div>
</template>

<style>
@import 'normalize.css';
@import '@/assets/styles/global.css';
</style>
