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
  if (!isDeleteConfirmed) return;

  const deleteResponse = await userService.deleteUserProfile();

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. User can not be deleted.'); // TODO: add better error handling
  }

  logout();
};
</script>

<template>
  <div class="rsprd-container__item">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">My Profile</h2>
    </div>
    <div class="rsprd-body rsprd-d-flex">
      <div class="rsprd-body__info-container">
        <p class="rsprd-body__info">Email: {{ userStore.user.email }}</p>
        <p class="rsprd-body__info">Password: *******</p>
        <div class="rsprd-body__btn-wrapper">
          <button @click="deleteUser" class="rsprd-btn-main rsprd-btn--delete rsprd-btn--clear">
            <img class="rsprd-icon rsprd-icon--bottom" :src="DeleteIcon" />
            Delete your account
          </button>
        </div>
      </div>
      <div class="rsprd-body__illustration-wrapper">
        <img :src="ProfileIllustration" class="rsprd-body__illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rsprd-body__info-container {
  padding: 8px;
  width: 50%;
}

.rsprd-body__info {
  border-bottom: 1px solid var(--color-muted);
  padding: 4px;
}

.rsprd-body__btn-wrapper {
  margin-top: 120px;
}
</style>
