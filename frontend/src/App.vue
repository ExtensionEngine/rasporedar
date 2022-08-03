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

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 16px;
}

:root {
  --color-danger: #f00;
  --color-muted: #bbb;
  --color-main: #5ce2a7;
  --color-text: #000;
}
</style>
