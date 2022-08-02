import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const user = ref(useStorage('user', {}));
  const token = ref(useStorage('token', ''));

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  async function logInUser(jwtToken) {
    const response = await fetch('http://localhost:3001/users/profile', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const json = await response.json();
    user.value = json;
    token.value = jwtToken;
  }

  function logOutUser() {
    user.value = {};
    token.value = '';
  }

  return { token, user, isLoggedIn, logInUser, logOutUser };
});
