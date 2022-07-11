<script>
import HeaderLogo from './components/HeaderLogo.vue';

export default {
  name: 'app',
  components: {
    HeaderLogo,
  },
};
</script>

<template>
  <nav>
    <HeaderLogo />
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/about">About</router-link>

    <router-view></router-view>
  </nav>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.link {
  padding: 15px;
}
</style>
