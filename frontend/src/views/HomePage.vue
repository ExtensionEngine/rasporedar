<script>
import PageGreeting from '../components/PageGreeting.vue';

export default {
  name: 'home-page',
  components: {
    PageGreeting,
  },
};
</script>

<template>
  <div class="home">
    <PageGreeting msg="This is the Home Page" />
  </div>
</template>
