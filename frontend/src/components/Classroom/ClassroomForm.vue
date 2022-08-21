<script setup>
import ClassroomIllustration from '@/assets/img/illustrations/classroom_illustration.svg';
import classroomService from '@/api/classrooms';
import { reactive } from 'vue';

const initialState = {
  name: '',
  capacity: 0,
};
const addForm = reactive({ ...initialState });
const addClassroom = async () => {
  await classroomService.addClassroom(addForm);
  Object.assign(addForm, initialState);
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Add Classroom</h2>
    </div>
    <hr class="rsprd-bar__separator" />
    <div class="rsprd-body">
      <div class="rsprd-body__form">
        <div class="input-container">
          <label for="name">Name</label>
          <input
            v-model="addForm.name"
            id="name"
            class="rsprd-body__input"
            type="text"
            placeholder="Enter name here..."
            required
          />
        </div>
        <div class="input-container">
          <label for="capacity">Capacity</label>
          <input
            v-model="addForm.capacity"
            id="capacity"
            class="rsprd-body__input"
            type="number"
            placeholder="Enter here..."
            required
          />
        </div>
        <button @click="addClassroom" class="rsprd-button rsprd-button--cta">Add</button>
      </div>
      <div class="illustration-container">
        <img :src="ClassroomIllustration" class="illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: var(--color-lighter);
  border-radius: 20px;
  margin: 0 auto 80px;
  padding: 20px;
}

.rsprd-body {
  display: flex;
  height: 250px;
}

.rsprd-body__form {
  padding: 16px;
  position: relative;
  width: 50%;
}

.input-container {
  margin: 24px 0;
}

.rsprd-body__input {
  border: none;
  border-bottom: 1px solid black;
  color: var(--color-muted);
  font-size: 1rem;
  margin-top: 5px;
  width: 100%;
}

.rsprd-body__input:focus {
  border-bottom: 1px solid black;
  outline: none;
}

.rsprd-body__input:focus::placeholder {
  color: transparent;
}

.rsprd-button {
  bottom: 0;
  height: 30px;
  padding: 5px 20px;
  position: absolute;
  width: 25%;
}

.illustration-container {
  position: relative;
  width: 50%;
}

.illustration {
  bottom: 0;
  height: 280px;
  position: absolute;
  right: 0;
  width: 280px;
}
</style>
