import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  function isLoggedIn() {
    return getUser() !== null;
  }

  function getUser() {
    if (user.value) {
      return user.value;
    }

    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
      return user.value;
    }

    return null;
  }

  async function setUser(token) {
    const response = await fetch('http://localhost:3001/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    user.value = json;

    localStorage.setItem('token', token);
  }

  return { getUser, setUser, isLoggedIn };
});
