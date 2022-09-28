<script setup>
import { computed, ref } from 'vue';
import CancelIcon from '@/assets/img/cancel_icon.svg';
import classroomService from '@/api/classrooms';
import DeleteIcon from '@/assets/img/delete_icon.svg';
import EditIcon from '@/assets/img/edit_icon.svg';
import SaveIcon from '@/assets/img/save_icon.svg';

const searchQuery = ref('');
const props = defineProps({
  classrooms: {
    type: Array,
    default: () => [],
  },
});
const classroomFields = [
  {
    displayName: 'Name',
    property: 'name',
    isEditable: true,
  },
  {
    displayName: 'Capacity',
    property: 'capacity',
    isEditable: true,
  },
  {
    displayName: 'Created At',
    property: 'createdAt',
    isEditable: false,
  },
];
const classroomEditingId = ref(null);

const emit = defineEmits(['reload']);
const filteredClassrooms = computed(() => {
  const searchQueryLowercased = searchQuery.value.toLowerCase();
  const filtered = props.classrooms.filter(classroom => classroom.name.toLowerCase().includes(searchQueryLowercased));
  filtered.sort((a, b) => a.id > b.id);
  return filtered;
});
const isBeingEdited = classroomId => {
  return classroomEditingId.value === classroomId;
};
const setEditing = classroomId => {
  classroomEditingId.value = classroomId;
};
const cancelEditing = () => {
  classroomEditingId.value = null;
  emit('reload');
};
const handleEdit = async classroom => {
  const editResponse = await classroomService.editClassroom(classroom);

  if ('error' in editResponse) {
    return alert(editResponse.error);
  }

  classroomEditingId.value = null;
  emit('reload');
};
const handleDelete = async classroomId => {
  const isDeleteConfirmed = confirm('Do you really want to delete classroom?');
  if (!isDeleteConfirmed) return;

  const deleteResponse = await classroomService.deleteClassroomById(classroomId);

  if ('error' in deleteResponse) {
    return alert('Internal Server Error. Can not delete classrooom.');
  }

  classroomEditingId.value = null;
  emit('reload');
};
</script>

<template>
  <div class="rsprd-container__item">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Classrooms</h2>
      <input v-model="searchQuery" class="rsprd-bar__input" type="text" placeholder="Search by name..." />
    </div>
    <div class="rsprd-body">
      <table class="rsprd-table">
        <thead>
          <tr class="rsprd-table__heading rsprd-table__row">
            <th v-for="field in classroomFields" :key="field.property" class="rsprd-table__cell">
              {{ field.displayName }}
            </th>
            <th class="rsprd-table__cell">Action</th>
          </tr>
        </thead>
        <tbody class="rsprd-table__body">
          <tr v-for="classroom in filteredClassrooms" :key="classroom.id" class="rsprd-table__row">
            <td v-for="field in classroomFields" :key="field.property" class="rsprd-table__cell">
              <span v-if="isBeingEdited(classroom.id) && field.isEditable">
                <input v-model="classroom[field.property]" type="text" class="rsprd-input--edit" />
              </span>
              <span v-else>
                {{ classroom[field.property] }}
              </span>
            </td>
            <td class="rsprd-table__cell">
              <div class="rsprd-actions">
                <div v-if="isBeingEdited(classroom.id)">
                  <button @click="cancelEditing" class="rsprd-btn-main rsprd-btn--clear">
                    <img class="rsprd-icon" :src="CancelIcon" />
                  </button>
                  <button @click="handleEdit(classroom)" class="rsprd-btn-main rsprd-btn--clear">
                    <img class="rsprd-icon" :src="SaveIcon" />
                  </button>
                </div>
                <button v-else @click="setEditing(classroom.id)" class="rsprd-btn-main rsprd-btn--clear">
                  <img class="rsprd-icon" :src="EditIcon" />
                </button>
                <button @click="handleDelete(classroom.id)" class="rsprd-btn-main rsprd-btn--clear">
                  <img class="rsprd-icon" :src="DeleteIcon" />
                </button>
              </div>
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
