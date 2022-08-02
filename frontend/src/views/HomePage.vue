<script>
import PageGreeting from '@/components/PageGreeting.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  name: 'home-page',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const handleLogOut = () => {
      userStore.logOutUser();
      router.push({ name: 'auth' });
    };

    return {
      handleLogOut,
    };
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
