<script setup>
import { ClassroomForm, ClassroomList } from '@/components/Classroom';
import { onMounted, ref } from 'vue';
import classroomService from '@/api/classrooms';
import { parseDates } from '@/helpers/parse';

const classrooms = ref([]);

onMounted(() => reloadClassrooms());
const reloadClassrooms = () => {
  classroomService.getAllClassrooms().then(clasroomsResponse => {
    const classroomsParsed = parseDates(clasroomsResponse);
    classrooms.value = classroomsParsed;
  });
};
</script>

<template>
  <div class="container">
    <classroom-form @reload="reloadClassrooms" />
    <classroom-list @reload="reloadClassrooms" :classrooms="classrooms" />
  </div>
</template>
