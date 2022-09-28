<script setup>
import { reactive, ref } from 'vue';
import ClassroomIllustration from '@/assets/img/illustrations/classroom_illustration.svg';
import classroomService from '@/api/classrooms';

const formInitState = {
  name: '',
  capacity: 0,
};
const additionForm = reactive({ ...formInitState });
const errors = ref(null);

const emit = defineEmits(['reload']);
const addClassroom = async () => {
  const addResponse = await classroomService.addClassroom(additionForm);
  errors.value = addResponse.errors;

  if (errors.value) return;

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
    <div v-if="errors" class="rsprd-error">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error.message }}
        </li>
      </ul>
    </div>
    <div class="rsprd-body rsprd-d-flex">
      <div class="rsprd-body__form">
        <div class="rsprd-form__input-container">
          <label for="name" class="rsprd-form__label--bold">Name</label>
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
          <label for="capacity" class="rsprd-form__label--bold">Capacity</label>
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
