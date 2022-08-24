<script setup>
import { computed, ref } from 'vue';
import classroomService from '@/api/classrooms';
import DeleteIcon from '@/assets/img/delete_icon.svg';

const searchQuery = ref('');
const props = defineProps({
  classrooms: {
    type: Array,
    default: () => [],
  },
});
const classroomFields = {
  name: 'Name',
  capacity: 'Capacity',
  createdAt: 'Created At',
};

const emit = defineEmits(['reload']);
const filteredClassrooms = computed(() => {
  const searchQueryLowercased = searchQuery.value.toLowerCase();
  const filtered = props.classrooms.filter(classroom => classroom.name.toLowerCase().includes(searchQueryLowercased));
  return filtered;
});
const handleDelete = async classroomId => {
  const isDeleteConfirmed = confirm('Do you really want to delete classroom?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await classroomService.deleteClassroomById(classroomId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not delete classrooom.');
  }

  emit('reload');
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Classrooms</h2>
      <input v-model="searchQuery" class="rsprd-body__input" type="text" placeholder="Search..." />
    </div>
    <hr />
    <div class="rsprd-body">
      <table class="rsprd-table">
        <thead>
          <tr class="rsprd-table__heading rsprd-table__row">
            <th v-for="(value, key) in classroomFields" :key="key" class="rsprd-table__cell">{{ value }}</th>
            <th class="rsprd-table__cell">Action</th>
          </tr>
        </thead>
        <tbody class="rsprd-table__body">
          <tr v-for="classroom in filteredClassrooms" :key="classroom.id" class="rsprd-table__row">
            <td v-for="(value, key) in classroomFields" :key="key" class="rsprd-table__cell">{{ classroom[key] }}</td>
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

.rsprd-table__body .rsprd-table__row:nth-child(odd) {
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
