<script setup>
import { ClassroomForm, ClassroomList } from '@/components/Classroom';
import { onMounted, ref } from 'vue';
import classroomService from '@/api/classrooms';
import { formatDates } from '@/helpers/format';

const classrooms = ref([]);

onMounted(() => reloadClassrooms());
const reloadClassrooms = () => {
  classroomService.getAllClassrooms().then(clasroomsResponse => {
    const formattedClassrooms = formatDates(clasroomsResponse);
    classrooms.value = formattedClassrooms;
  });
};
</script>

<template>
  <div class="container">
    <classroom-form @reload="reloadClassrooms" />
    <classroom-list @reload="reloadClassrooms" :classrooms="classrooms" />
  </div>
</template>
