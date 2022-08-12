<script setup>
import { onMounted, reactive } from 'vue';
import TimeTable from '@/components/TimeTable';
import timetableService from '@/api/timetable';

const timetable = reactive({ data: null, loading: true, errored: false });

onMounted(() => {
  timetableService
    .getTimetable()
    .then(json => (timetable.data = json))
    .catch(error => {
      console.log(error);
      timetable.errored = true;
    })
    .finally(() => (timetable.loading = false));
});
</script>

<template>
  <div>
    <div v-if="timetable.errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </div>
    <div v-else>
      <div v-if="timetable.loading">Loading...</div>
      <div v-else>
        <TimeTable :timetable="timetable.data.timetable" />
      </div>
    </div>
  </div>
</template>
