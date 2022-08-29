<script setup>
import { onMounted, ref } from 'vue';
import { TeacherForm, TeacherList } from '@/components/Teacher';
import { formatDates } from '@/helpers/format';
import teacherService from '@/api/teachers';

const teachers = ref([]);

onMounted(() => reloadTeachers());
const reloadTeachers = () => {
  teacherService.getAllTeachers().then(teachersResponse => {
    const formattedTeachers = formatDates(teachersResponse);
    teachers.value = formattedTeachers;
  });
};
</script>

<template>
  <div class="rsprd-container">
    <teacher-form @reload="reloadTeachers" />
    <teacher-list @reload="reloadTeachers" :teachers="teachers" />
  </div>
</template>
