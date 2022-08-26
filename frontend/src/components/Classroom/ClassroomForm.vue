<script setup>
import ClassroomIllustration from '@/assets/img/illustrations/classroom_illustration.svg';
import classroomService from '@/api/classrooms';
import { reactive } from 'vue';

const formInitState = {
  name: '',
  capacity: 0,
};
const additionForm = reactive({ ...formInitState });

const emit = defineEmits(['reload']);
const addClassroom = async () => {
  const addResponse = await classroomService.addClassroom(additionForm);

  if (!addResponse) {
    return alert('Internal Server Error. Can not get classroooms.');
  }

  Object.assign(additionForm, formInitState);
  emit('reload');
};
</script>

<template>
  <div class="rsprd-container__item">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Add Classroom</h2>
    </div>
    <div class="rsprd-body rsprd-d-flex">
      <div class="rsprd-body__form">
        <div class="rsprd-form__input-container">
          <label for="name">Name</label>
          <input
            v-model="additionForm.name"
            id="name"
            class="rsprd-form__input"
            type="text"
            placeholder="Enter name here..."
            required
          />
        </div>
        <div class="rsprd-form__input-container">
          <label for="capacity">Capacity</label>
          <input v-model="additionForm.capacity" id="capacity" class="rsprd-form__input" type="number" required />
        </div>
        <button @click="addClassroom" class="rsprd-btn rsprd-btn--primary rsprd-btn--m rsprd-btn-bottom">Add</button>
      </div>
      <div class="rsprd-body__illustration-wrapper">
        <img :src="ClassroomIllustration" class="rsprd-body__illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rsprd-body {
  height: 250px;
}
</style>
