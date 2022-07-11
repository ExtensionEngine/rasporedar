<script setup>
import { ref } from 'vue';

defineProps({
  msg: {
    type: String,
    default: 'aaa',
  },
});

const query = ref('');

const reset = event => {
  query.value = '';
};
</script>

<template>
  <div>
    <p>{{ msg }}</p>
    <input v-model="query" type="text" placeholder="Filter Search" />
    <p>{{ query }}</p>

    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
