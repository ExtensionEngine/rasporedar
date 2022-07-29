<script>
import 'normalize.css/normalize.css';
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
    <!-- 
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/about">About</router-link>
    <router-link class="link" to="/login">Login</router-link>
    <router-link class="link" to="/register">Register</router-link>
    -->

    <router-view></router-view>
  </nav>
</template>

<style></style>
