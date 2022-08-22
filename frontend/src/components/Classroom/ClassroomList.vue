<script setup>
import { onMounted, ref } from 'vue';
import classroomService from '@/api/classrooms';
import DeleteIcon from '@/assets/img/delete_icon.svg';
import { parseDates } from '@/helpers/parse';

const classrooms = ref(null);
const fields = {
  name: 'Name',
  capacity: 'Capacity',
  createdAt: 'Created At',
};

onMounted(() => loadClassrooms());
const loadClassrooms = () => {
  classroomService.getAllClassrooms().then(resp => (classrooms.value = parseDates(resp)));
};
const even = num => (num % 2 === 0 ? '' : 'rsprd-table__row-darker');
const handleDelete = async classroomId => {
  const isDeleteConfirmed = confirm('Do you really want to delete classroom?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await classroomService.deleteClassroomById(classroomId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not get classroooms.');
  }

  loadClassrooms();
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Classrooms</h2>
    </div>
    <hr />
    <div class="rsprd-body">
      <table class="rsprd-table">
        <thead>
          <tr class="rsprd-table__heading rsprd-table__row">
            <th v-for="(value, key) in fields" :key="key" class="rsprd-table__cell">{{ value }}</th>
            <th class="rsprd-table__cell">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(classroom, index) in classrooms"
            :key="classroom.id"
            class="rsprd-table__row"
            :class="even(index)"
          >
            <td v-for="(value, key) in fields" :key="key" class="rsprd-table__cell">{{ classroom[key] }}</td>
            <td class="rsprd-table__cell">
              <button @click="handleDelete(classroom.id)" class="delete-button">
                <img class="delete-icon" :src="DeleteIcon" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: var(--color-lighter);
  border-radius: 20px;
  margin: 0 auto 80px;
  padding: 20px;
  width: 70%;
}

.rsprd-table {
  border-collapse: collapse;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
}

.rsprd-table__heading {
  padding: 5px;
  text-align: left;
}

.rsprd-table__row {
  border-bottom: 1px solid black;
}

.rsprd-table__row-darker {
  background-color: var(--color-light);
}

.rsprd-table__cell {
  padding: 8px;
}

.rsprd-table__cell:last-child {
  text-align: center;
}

.delete-button {
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

.delete-icon {
  height: 20px;
  width: 20px;
}
</style>
