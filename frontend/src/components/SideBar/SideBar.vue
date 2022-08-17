<script setup>
import logoURL from '@/assets/img/rasporedar_logo.svg';
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <img :src="logoURL" alt="Vue" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--color-darker);
  color: var(--color-light);
  width: calc(3rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
}

.logo {
  margin: 0 auto;
}

.logo .flex {
  flex: 1 1 0%;
}

.logo img {
  width: 4rem;
}
</style>
