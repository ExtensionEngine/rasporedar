import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import userService from '@/api/users';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const user = ref(useStorage('user', {}));
  const token = ref(useStorage('token', ''));

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  async function loginUser(jwtToken) {
    user.value = await userService.getUserProfile(jwtToken);
    token.value = jwtToken;
  }

  function logoutUser() {
    user.value = {};
    token.value = '';
  }

  return { token, user, isLoggedIn, loginUser, logoutUser };
});
