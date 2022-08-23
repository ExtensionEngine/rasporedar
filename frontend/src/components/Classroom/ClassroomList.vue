<script setup>
import { onMounted, ref, watch } from 'vue';
import classroomService from '@/api/classrooms';
import DeleteIcon from '@/assets/img/delete_icon.svg';
import { parseDates } from '@/helpers/parse';

const classrooms = ref(null);
const searchTerm = ref('');
const fields = {
  name: 'Name',
  capacity: 'Capacity',
  createdAt: 'Created At',
};

onMounted(() => filterClassrooms(''));
watch(searchTerm, newSearchTerm => filterClassrooms(newSearchTerm));
const filterClassrooms = (search = '') => {
  classroomService.getAllClassrooms().then(resp => {
    const parsed = parseDates(resp);
    const filtered = parsed.filter(room => room.name.toLowerCase().includes(search.toLowerCase()));
    classrooms.value = filtered;
  });
};
const handleDelete = async classroomId => {
  const isDeleteConfirmed = confirm('Do you really want to delete classroom?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await classroomService.deleteClassroomById(classroomId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not get classroooms.');
  }

  filterClassrooms(searchTerm.value);
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Classrooms</h2>
      <input v-model="searchTerm" class="rsprd-body__input" type="text" placeholder="Search..." />
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
            :class="{ 'rsprd-table__row-darker': index % 2 === 0 }"
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

.rsprd-body__input {
  border: none;
  border-bottom: 1px solid black;
  color: var(--color-muted);
  font-size: 1rem;
  margin-top: 5px;
}

.rsprd-body__input:focus {
  color: var(--color-darker);
  border-bottom: 1px solid black;
  outline: none;
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
