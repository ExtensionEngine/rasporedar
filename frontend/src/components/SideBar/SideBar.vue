<script setup>
import ClassroomIcon from '@/assets/img/sidebar/classroom_icon.svg';
import LogoURL from '@/assets/img/rasporedar_logo.svg';
import ProfileIcon from '@/assets/img/sidebar/profile_icon.svg';
import TeacherIcon from '@/assets/img/sidebar/teacher_icon.svg';
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
      <div class="link">
        <span class="icon-wrapper">
          <img class="icon" :src="ProfileIcon" />
        </span>
        <span class="link-text"> My Profile </span>
      </div>
      <div class="link">
        <span class="icon-wrapper">
          <img class="icon" :src="ClassroomIcon" />
        </span>
        <span class="link-text"> Classrooms </span>
      </div>
      <div class="link">
        <span class="icon-wrapper">
          <img class="icon" :src="TeacherIcon" />
        </span>
        <span class="link-text"> Teachers </span>
      </div>
      <div class="link">
        <span class="icon-wrapper">
          <img class="icon" :src="TimetableAddIcon" />
        </span>
        <span class="link-text"> Timetable Generator </span>
      </div>
      <div class="link">
        <span class="icon-wrapper">
          <img class="icon" :src="TimetableIcon" />
        </span>
        <span class="link-text"> Timetables </span>
      </div>
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

.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  margin-left: 0.4rem;
  padding: 0.5rem 1rem;
}

.link:hover {
  background-color: var(--color-active);
}

.icon-wrapper {
  font-size: 1em;
  color: var(--color-light);
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.link-text {
  opacity: 1;
  color: var(--color-light);
  transition: opacity 0.3s ease-in-out;
}
</style>
