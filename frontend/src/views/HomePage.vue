<script>
import PageGreeting from '../components/PageGreeting.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

export default {
  name: 'home-page',
  setup() {
    return {
      store: useUserStore(),
      router: useRouter(),
    };
  },
  methods: {
    handleLogOut() {
      this.store.logOutUser();
      this.router.push({ name: 'auth' });
    },
  },
  components: {
    PageGreeting,
  },
};
</script>

<template>
  <div class="home">
    <PageGreeting msg="This is the Home Page" />
    <button @click="handleLogOut">Logout</button>
  </div>
</template>
