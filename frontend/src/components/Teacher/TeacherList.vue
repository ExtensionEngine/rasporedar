<script setup>
import { computed, ref } from 'vue';
import CancelIcon from '@/assets/img/cancel_icon.svg';
import DeleteIcon from '@/assets/img/delete_icon.svg';
import EditIcon from '@/assets/img/edit_icon.svg';
import SaveIcon from '@/assets/img/save_icon.svg';
import teacherService from '@/api/teachers';

const searchQuery = ref('');
const props = defineProps({
  teachers: {
    type: Array,
    default: () => [],
  },
});
const teacherFields = [
  {
    displayName: 'Code',
    property: 'teacherCode',
    isEditable: true,
  },
  {
    displayName: 'First name',
    property: 'firstName',
    isEditable: true,
  },
  {
    displayName: 'Last name',
    property: 'lastName',
    isEditable: true,
  },
  {
    displayName: 'Created At',
    property: 'createdAt',
    isEditable: false,
  },
];
const teacherEditingId = ref(null);

const emit = defineEmits(['reload']);
const filteredTeachers = computed(() => {
  const searchQueryLowercased = searchQuery.value.toLowerCase();
  const filtered = props.teachers.filter(teacher => teacher.firstName.toLowerCase().includes(searchQueryLowercased));
  return filtered;
});
const isToEdit = teacherId => {
  return teacherEditingId.value === teacherId;
};
const setEditing = teacherId => {
  teacherEditingId.value = teacherId;
};
const cancelEditing = () => {
  teacherEditingId.value = null;
  emit('reload');
};
const handleEdit = async teacher => {
  const editResponse = await teacherService.editTeacher(teacher);

  if ('error' in editResponse) {
    return alert(editResponse.error);
  }

  teacherEditingId.value = null;
  emit('reload');
};
const handleDelete = async teacherId => {
  const isDeleteConfirmed = confirm('Do you really want to delete the teacher?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await teacherService.deleteTeacherById(teacherId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not delete teacher.');
  }

  teacherEditingId.value = null;
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
            <th v-for="field in teacherFields" :key="field.property" class="rsprd-table__cell">
              {{ field.displayName }}
            </th>
            <th class="rsprd-table__cell">Action</th>
          </tr>
        </thead>
        <tbody class="rsprd-table__body">
          <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="rsprd-table__row">
            <td v-for="field in teacherFields" :key="field.property" class="rsprd-table__cell">
              <span v-if="isToEdit(teacher.id) && field.isEditable">
                <input v-model="teacher[field.property]" type="text" class="rsprd-input--edit" />
              </span>
              <span v-else>
                {{ teacher[field.property] }}
              </span>
            </td>
            <td class="rsprd-table__cell">
              <span v-if="isToEdit(teacher.id)">
                <button @click="cancelEditing" class="rsprd-btn-main rsprd-btn--clear">
                  <img class="rsprd-icon" :src="CancelIcon" />
                </button>
                <button @click="handleEdit(teacher)" class="rsprd-btn-main rsprd-btn--clear">
                  <img class="rsprd-icon" :src="SaveIcon" />
                </button>
              </span>
              <button v-else @click="setEditing(teacher.id)" class="rsprd-btn-main rsprd-btn--clear">
                <img class="rsprd-icon" :src="EditIcon" />
              </button>
              <button @click="handleDelete(teacher.id)" class="rsprd-btn-main rsprd-btn--clear">
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
  table-layout: fixed;
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
