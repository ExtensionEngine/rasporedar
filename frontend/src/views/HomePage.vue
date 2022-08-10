<script>
import ConstraintForm from '@/components/ConstraintForm';
import PageGreeting from '@/components/PageGreeting.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  name: 'home-page',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const handleLogOut = () => {
      userStore.logoutUser();
      router.push({ name: 'auth' });
    };

    return {
      handleLogOut,
    };
  },
  components: {
    PageGreeting,
    ConstraintForm,
  },
};
</script>

<template>
  <div class="home">
    <PageGreeting msg="This is the Home Page" />
    <button @click="handleLogOut">Logout</button>
    <hr />
    <constraint-form />
  </div>
</template>
