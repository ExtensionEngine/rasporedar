<script setup>
import CollapseIcon from '@/assets/img/sidebar/collapse_icon.svg';
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

    <div class="menu-toggle-wrap">
      <button class="menu-toggle">
        <span class="toggle-icon">
          <img :src="CollapseIcon" />
        </span>
      </button>
    </div>

    <h4>Menu</h4>
    <hr class="sidebar-line" />
    <div class="menu">
      <side-bar-link to="/timetables" :icon="TimetableIcon">Timetables</side-bar-link>
      <side-bar-link to="/timetable-generator" :icon="TimetableAddIcon">Timetable Generator</side-bar-link>
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

.menu-toggle-wrap {
  top: -3rem;
}

.menu-toggle {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  transform: rotate(-180deg);
}

.toggle-icon {
  font-size: 3rem;
  color: var(--color-light);
  transition: 0.2s ease-out;
}

.toggle-icon {
  color: var(--color-main);
  transform: translateX(0.5rem);
}

.toggle-icon img {
  width: 24px;
  height: 24px;
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
