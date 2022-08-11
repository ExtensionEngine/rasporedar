<script setup>
import { onMounted, ref } from 'vue';
import timetableService from '@/api/timetable';

const timetable = ref(null);

onMounted(() => {
  timetableService.getTimetable().then(json => (timetable.value = json));
});
</script>

<template>
  <div>
    aaa

    <pre>{{ timetable }}</pre>
  </div>
</template>
