<script setup>
import { computed, ref } from 'vue';
import DeleteIcon from '@/assets/img/delete_icon.svg';
import teacherService from '@/api/teachers';

const searchQuery = ref('');
const props = defineProps({
  teachers: {
    type: Array,
    default: () => [],
  },
});
const teacherFields = {
  teacherCode: 'Code',
  firstName: 'First name',
  lastName: 'Last name',
  createdAt: 'Created At',
};

const emit = defineEmits(['reload']);
const filteredTeachers = computed(() => {
  const searchQueryLowercased = searchQuery.value.toLowerCase();
  const filtered = props.teachers.filter(teacher => teacher.firstName.toLowerCase().includes(searchQueryLowercased));
  return filtered;
});
const handleDelete = async teacherId => {
  const isDeleteConfirmed = confirm('Do you really want to delete the teacher?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await teacherService.deleteTeacherById(teacherId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not delete teacher.');
  }

  emit('reload');
};
</script>

<template>
  <div class="rsprd-container__item">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Teachers</h2>
      <input v-model="searchQuery" class="rsprd-bar__input" type="text" placeholder="Search by first name..." />
    </div>
    <div class="rsprd-body">
      <table class="rsprd-table">
        <thead>
          <tr class="rsprd-table__heading rsprd-table__row">
            <th v-for="(value, key) in teacherFields" :key="key" class="rsprd-table__cell">{{ value }}</th>
            <th class="rsprd-table__cell">Action</th>
          </tr>
        </thead>
        <tbody class="rsprd-table__body">
          <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="rsprd-table__row">
            <td v-for="(value, key) in teacherFields" :key="key" class="rsprd-table__cell">{{ teacher[key] }}</td>
            <td class="rsprd-table__cell">
              <button @click="handleDelete(teacher.id)" class="rsprd-btn rsprd-btn--delete">
                <img class="rsprd-icon" :src="DeleteIcon" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
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
</style>
