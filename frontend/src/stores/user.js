import { computed } from 'vue';
import { defineStore } from 'pinia';
import userService from '@/api/users';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const token = useStorage('token', '');
  const user = useStorage('user', {});

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  async function loginUser(jwtToken) {
    token.value = jwtToken;
    user.value = await userService.getUserProfile();
  }

  function logoutUser() {
    user.value = {};
    token.value = '';
  }

  return { token, user, isLoggedIn, loginUser, logoutUser };
});
