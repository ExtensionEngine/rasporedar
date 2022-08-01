import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const user = ref(useStorage('user', {}));

  const getUser = computed(() => {
    return user.value;
  });

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  async function setUser(token) {
    const response = await fetch('http://localhost:3001/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    user.value = json;
  }

  return { user, getUser, setUser, isLoggedIn };
});
