<script setup>
import ClassroomIcon from '@/assets/img/sidebar/classroom_icon.svg';
import CollapseIcon from '@/assets/img/sidebar/collapse_icon.svg';
import { computed } from 'vue';
import LogoURL from '@/assets/img/rasporedar_logo.svg';
import LogoutIcon from '@/assets/img/sidebar/logout_icon.svg';
import ProfileIcon from '@/assets/img/sidebar/profile_icon.svg';
import SideBarLink from './SideBarLink.vue';
import TeacherIcon from '@/assets/img/sidebar/teacher_icon.svg';
import TimetableAddIcon from '@/assets/img/sidebar/timetable_add_icon.svg';
import TimetableIcon from '@/assets/img/sidebar/timetable_icon.svg';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/stores/user';

const collapsed = useStorage('collapsed', false);
const toggleMenu = () => (collapsed.value = !collapsed.value);
const isCollapsed = computed(() => ({ expanded: !collapsed.value }));
const buttonTitle = computed(() => (collapsed.value ? 'Expand menu' : 'Collapse menu'));
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
      <img :src="LogoURL" alt="logo" />
    </div>

    <div class="toggle-wrap">
      <button @click="toggleMenu" class="toggle-button" :title="buttonTitle">
        <span class="toggle-icon">
          <img :src="CollapseIcon" />
        </span>
      </button>
    </div>

    <h4 class="menu-header">Menu</h4>
    <hr class="sidebar-line" />
    <div class="menu">
      <side-bar-link to="profile" :icon="ProfileIcon" :is-collapsed="collapsed" title="My profile page">
        My Profile
      </side-bar-link>
      <side-bar-link to="classrooms" :icon="ClassroomIcon" :is-collapsed="collapsed" title="Classrooms page">
        Classrooms
      </side-bar-link>
      <side-bar-link to="teachers" :icon="TeacherIcon" :is-collapsed="collapsed" title="Teachers page">
        Teachers
      </side-bar-link>
      <side-bar-link to="timetables" :icon="TimetableIcon" :is-collapsed="collapsed" title="Timetables page">
        Timetables
      </side-bar-link>
      <side-bar-link to="home" :icon="TimetableAddIcon" :is-collapsed="collapsed" title="Timetable generator page">
        Timetable Generator
      </side-bar-link>
    </div>

    <div class="flex"></div>

    <div class="menu rsprd-logout">
      <side-bar-link @click="handleLogOut" to="auth" :icon="LogoutIcon" :is-collapsed="collapsed" title="Logout">
        Logout
      </side-bar-link>
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
  width: 6rem;
  overflow: hidden;
  min-height: 100vh;
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
  position: relative;
  top: 0;
  transition: 0.2s ease-out;
}

.toggle-button {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding-right: 12px;
}

.toggle-icon {
  font-size: 4rem;
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
  transition: opacity 0.3s ease-in-out;
  color: var(--color-muted);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  text-transform: uppercase;
}

.sidebar-line {
  opacity: 0;
  width: 100%;
  transition: opacity 0.4s ease-in-out;
}

.rsprd-logout {
  margin-bottom: 1rem;
}

.expanded {
  width: 280px;
  transition: 0.3s ease-in-out;
}
.expanded .rsprd-logo img {
  width: 7rem;
}
.expanded .toggle-wrap {
  top: -7.5rem;
  transition: 0.5s ease-in-out;
}
.expanded .toggle-wrap .toggle-button {
  padding-left: 12px;
  transform: rotate(-180deg);
  transition: 0.3s ease-in-out;
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
