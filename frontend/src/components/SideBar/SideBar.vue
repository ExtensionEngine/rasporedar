<script setup>
import LogoURL from '@/assets/img/rasporedar_logo.svg';
import SideBarLink from './SideBarLink.vue';
import TimetableAddIcon from '@/assets/img/sidebar/timetable_add_icon.svg';
import TimetableIcon from '@/assets/img/sidebar/timetable_icon.svg';
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <img :src="LogoURL" alt="Vue" />
    </div>

    <h4>Menu</h4>
    <hr class="sidebar-line" />
    <div class="menu">
      <side-bar-link :icon="TimetableIcon">Timetables</side-bar-link>
      <side-bar-link :icon="TimetableAddIcon">Timetable Generator</side-bar-link>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--color-darker);
  color: var(--color-light);
  width: 300px;
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

h4 {
  color: var(--color-muted);
  margin-bottom: 0;
}

.sidebar-line {
  color: var(--color-muted);
  width: 100%;
}

.menu {
  margin: 0 -1rem;
}
</style>
