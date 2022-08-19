<script setup>
import DeleteIcon from '@/assets/img/delete_icon.svg';
import ProfileIllustration from '@/assets/img/illustrations/profile_illustration.svg';
import { useRouter } from 'vue-router';
import userService from '@/api/users.js';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const logout = () => {
  userStore.logoutUser();
  router.push({ name: 'auth' });
};
const deleteUser = async () => {
  const isDeleteConfirmed = confirm('Do you really want to delete account?');
  if (isDeleteConfirmed === false) return;

  const deleteResponse = await userService.deleteUserProfile();
  if ('error' in deleteResponse) return alert('Internal Server Error. User can not be deleted.'); // TODO: add better error handling

  logout();
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar-title">My Profile</h2>
    </div>
    <hr />
    <div class="rsprd-body">
      <div class="info">
        <p class="info-item">Email: {{ userStore.user.email }}</p>
        <p class="info-item">Password: *******</p>
        <div class="flex"></div>
        <button @click="deleteUser" class="delete-button">
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
.main {
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
  height: 120px;
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
