<script setup>
import DeleteIcon from '@/assets/img/delete_icon.svg';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
</script>

<template>
  <div class="main">
    <h2>My Profile</h2>
    <hr />
    <div class="info">
      <p class="info-item">Email: {{ store.user.email }}</p>
      <p class="info-item">Password: *******</p>
      <div class="flex"></div>
      <div class="delete-wrapper">
        <img class="item-icon" :src="DeleteIcon" />
        Delete your account
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 20px;
  background-color: var(--color-lighter);
  border-radius: 20px;
}

.info {
  padding: 8px;
  width: 50%;
}

.info-item {
  border-bottom: 1px solid var(--color-muted);
  padding: 4px;
}

.flex {
  height: 100px;
}

.item-icon {
  height: 20px;
  width: 20px;
  vertical-align: bottom;
}
</style>
