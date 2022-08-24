<script setup>
import DeleteIcon from '@/assets/img/delete_icon.svg';
import teacherService from '@/api/teachers';

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
};

const handleDelete = async teacherId => {
  const isDeleteConfirmed = confirm('Do you really want to delete the teacher?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await teacherService.deleteTeacherById(teacherId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not get teachers.');
  }
};
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Teachers</h2>
    </div>
    <hr />
    <div class="rsprd-body">
      <table class="rsprd-table">
        <thead>
          <tr class="rsprd-table__heading rsprd-table__row">
            <th v-for="(value, key) in teacherFields" :key="key" class="rsprd-table__cell">{{ value }}</th>
          </tr>
        </thead>
        <tbody class="rsprd-table__body">
          <tr v-for="teacher in props.teachers" :key="teacher.id" class="rsprd-table__row">
            <td v-for="(value, key) in teacherFields" :key="key" class="rsprd-table__cell">{{ teacher[key] }}</td>
            <td class="rsprd-table__cell">
              <button @click="handleDelete(teacher.id)" class="delete-button">
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
