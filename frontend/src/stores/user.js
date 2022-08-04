import { computed } from 'vue';
import { defineStore } from 'pinia';
import userService from '@/api/users';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const user = useStorage('user', {});
  const token = useStorage('token', '');

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  async function loginUser(jwtToken) {
    user.value = await userService.getUserProfileFromToken(jwtToken);
    token.value = jwtToken;
  }

  function logoutUser() {
    user.value = {};
    token.value = '';
  }

  return { token, user, isLoggedIn, loginUser, logoutUser };
});
