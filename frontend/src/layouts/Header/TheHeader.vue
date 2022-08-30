<script setup>
import UserIcon from '@/assets/img/header/user_icon.svg';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="header">
    <div class="header-text">Hello, {{ userStore.user.email }}</div>
    <img :src="UserIcon" alt="user icon" class="rsprd-icon" />
  </div>
</template>

<style scoped>
.header {
  color: var(--color-darker);
  display: flex;
  background-color: var(--color-lighter);
  height: 64px;
  justify-content: end;
  align-items: center;
  padding-right: 32px;
}

.rsprd-icon {
  margin: 12px;
  height: 32px;
  width: 32px;
}
</style>
