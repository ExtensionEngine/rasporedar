<script setup>
import { ClassroomForm, ClassroomList } from '@/components/Classroom';
import { ref } from 'vue';

const reloadKey = ref(0);
const reload = () => {
  ++reloadKey.value;
};
</script>

<template>
  <div class="container">
    <classroom-form @reload="reload" />
    <classroom-list :key="reloadKey" />
  </div>
</template>
