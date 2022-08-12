<script setup>
defineProps({
  timetable: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div>
    <pre>{{ timetable }}</pre>
  </div>
</template>
