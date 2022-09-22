<script setup>
import { reactive } from 'vue';
import TeacherIllustration from '@/assets/img/illustrations/teacher_illustration.svg';
import teacherService from '@/api/teachers';

const formInitState = {
  teacherCode: '',
  firstName: '',
  lastName: '',
};
const additionForm = reactive({ ...formInitState });

const emit = defineEmits(['reload']);
const addTeacher = async () => {
  const addResponse = await teacherService.addTeacher(additionForm);

  if (!addResponse) {
    return alert('Internal Server Error. Can not get teachers.');
  }

  Object.assign(additionForm, formInitState);
  emit('reload');
};
</script>

<template>
  <div class="rsprd-container__item">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Add Teacher</h2>
    </div>
    <div class="rsprd-body rsprd-d-flex">
      <div class="rsprd-body__form">
        <div class="rsprd-form__input-container">
          <label for="code" class="rsprd-form__label--bold">Teachers code</label>
          <input
            v-model="additionForm.teacherCode"
            id="code"
            class="rsprd-form__input"
            type="text"
            placeholder="Enter teachers code here..."
            required
          />
        </div>
        <div class="rsprd-form__input-container">
          <label for="fname" class="rsprd-form__label--bold">First name</label>
          <input
            v-model="additionForm.firstName"
            id="fname"
            class="rsprd-form__input"
            type="text"
            placeholder="Enter first name here..."
            required
          />
        </div>
        <div class="rsprd-form__input-container">
          <label for="lname" class="rsprd-form__label--bold">Last name</label>
          <input
            v-model="additionForm.lastName"
            id="lname"
            class="rsprd-form__input"
            type="text"
            placeholder="Enter last name here..."
            required
          />
        </div>
        <button @click="addTeacher" class="rsprd-btn rsprd-btn--primary rsprd-btn--m rsprd-btn-bottom">Add</button>
      </div>
      <div class="rsprd-body__illustration-wrapper">
        <img :src="TeacherIllustration" class="rsprd-body__illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rsprd-body {
  height: 320px;
}
</style>
