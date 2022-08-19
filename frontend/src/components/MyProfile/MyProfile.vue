<script setup>
import DeleteIcon from '@/assets/img/delete_icon.svg';
import ProfileIllustration from '@/assets/img/illustrations/profile_illustration.svg';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
</script>

<template>
  <div class="main-wrapper">
    <h2>My Profile</h2>
    <hr />
    <div class="rsprd-body">
      <div class="info">
        <p class="info-item">Email: {{ store.user.email }}</p>
        <p class="info-item">Password: *******</p>
        <div class="flex"></div>
        <button class="delete-button">
          <img class="delete-icon" :src="DeleteIcon" />
          Delete your account
        </button>
      </div>
      <div class="illustration-wrapper">
        <img :src="ProfileIllustration" class="illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  width: 70%;
  padding: 20px;
  background-color: var(--color-lighter);
  border-radius: 20px;
  margin: 0 auto;
}

.rsprd-body {
  display: flex;
}

.delete-button {
  border: 0;
  background-color: var(--color-lighter);
  cursor: pointer;
}

.delete-button:hover {
  color: #ff6863;
  text-decoration: underline;
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

.delete-icon {
  height: 20px;
  width: 20px;
  vertical-align: bottom;
}

.illustration-wrapper {
  width: 50%;
  position: relative;
}

.illustration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 280px;
  height: 280px;
}
</style>
