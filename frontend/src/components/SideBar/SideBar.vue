<script setup>
import CollapseIcon from '@/assets/img/sidebar/collapse_icon.svg';
import { computed } from 'vue';
import LogoURL from '@/assets/img/rasporedar_logo.svg';
import LogoutIcon from '@/assets/img/sidebar/logout_icon.svg';
import SideBarLink from './SideBarLink.vue';
import TimetableAddIcon from '@/assets/img/sidebar/timetable_add_icon.svg';
import TimetableIcon from '@/assets/img/sidebar/timetable_icon.svg';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/stores/user';

const collapsed = useStorage('collapsed', false);
const toggleMenu = () => (collapsed.value = !collapsed.value);
const isCollapsed = computed(() => ({ expanded: !collapsed.value }));
const userStore = useUserStore();
const router = useRouter();

const handleLogOut = () => {
  userStore.logoutUser();
  router.push({ name: 'auth' });
};
</script>

<template>
  <aside :class="isCollapsed">
    <div class="rsprd-logo">
      <img :src="LogoURL" alt="Vue" />
    </div>

    <div class="toggle-wrap">
      <button @click="toggleMenu" class="toggle-button">
        <span class="toggle-icon">
          <img :src="CollapseIcon" />
        </span>
      </button>
    </div>

    <h4 class="menu-header">Menu</h4>
    <hr class="sidebar-line" />
    <div class="menu">
      <side-bar-link to="timetables" :icon="TimetableIcon" :is-collapsed="collapsed">Timetables</side-bar-link>
      <side-bar-link to="home" :icon="TimetableAddIcon" :is-collapsed="collapsed">Timetable Generator</side-bar-link>
    </div>

    <div class="flex"></div>

    <div class="menu rsprd-logout">
      <side-bar-link @click="handleLogOut" to="auth" :icon="LogoutIcon" :is-collapsed="collapsed">Logout</side-bar-link>
    </div>
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--color-darker);
  color: var(--color-light);
  height: 100vh;
  width: calc(3rem + 36px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  position: sticky;
  transition: 0.4s ease-in-out;
  top: 0;
}

.flex {
  flex: 1 1 0%;
}

.rsprd-logo {
  margin: 1rem auto;
}

.rsprd-logo img {
  width: 4rem;
  transition: 0.3s ease-in-out;
}

.toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
  top: 0;
  transition: 0.18s ease-out;
}

.toggle-button {
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
}

.toggle-icon {
  color: var(--color-main);
}

.toggle-icon img {
  width: 0.4em;
  height: 0.4em;
}
.toggle-icon {
  color: var(--color-main);
}
.menu-header {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  color: var(--color-muted);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.sidebar-line {
  opacity: 0;
  width: 100%;
  transition: opacity 0.8s ease-in-out;
}

.menu {
  margin: 0 -1rem;
}

.rsprd-logout {
  margin-bottom: 1rem;
}

.expanded {
  width: 16%;
  transition: 0.3s ease-in-out;
}
.expanded .rsprd-logo img {
  width: 7rem;
}
.expanded .toggle-wrap {
  top: -8rem;
  transition: 0.56s ease-in-out;
}
.expanded .toggle-wrap .toggle-button {
  transform: rotate(-180deg);
}
.expanded .menu-header {
  transition: 0.8s ease-in-out;
}
.expanded h4 {
  opacity: 1;
}

.expanded .sidebar-line {
  opacity: 1;
  color: var(--color-muted);
  width: 100%;
}

@media (max-width: 1024px) {
  aside {
    position: absolute;
    z-index: 99;
  }
}
</style>
