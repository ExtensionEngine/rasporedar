<script setup>
import { onMounted, reactive } from 'vue';
import classroomService from '@/api/classrooms';
import DeleteIcon from '@/assets/img/delete_icon.svg';

const classrooms = reactive({ data: null });
const fields = {
  name: 'Name',
  capacity: 'Capacity',
  createdAt: 'Created At',
};
const even = num => (num % 2 === 0 ? '' : 'rsprd-table__row-darker');

onMounted(() => {
  classroomService.getAllClassrooms().then(resp => (classrooms.data = resp));
});
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
            <th class="rsprd-table__cell action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(classroom, index) in classrooms.data"
            :key="classroom.id"
            class="rsprd-table__row"
            :class="even(index)"
          >
            <td v-for="(value, key) in fields" :key="key" class="rsprd-table__cell">{{ classroom[key] }}</td>
            <td class="delete-container rsprd-table__cell">
              <img class="delete-icon" :src="DeleteIcon" />
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

.delete-container {
  text-align: center;
}

.delete-icon {
  height: 20px;
  width: 20px;
}

.action {
  text-align: center;
}
</style>
