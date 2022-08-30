<script setup>
import { onBeforeMount, ref } from 'vue';
import { AccordionItem } from 'vue3-rich-accordion';
import classroomService from '@/api/classrooms';
import teacherService from '@/api/teachers';
import { useFormStore } from '@/stores/form';

const props = defineProps({
  index: {
    type: Number,
    default: -1,
  },
  classIndex: {
    type: Number,
    default: -1,
  },
});
const teachers = ref([]);
const classrooms = ref([]);
const formStore = useFormStore();
const subject = formStore.form.classes[props.classIndex].subjects[props.index];

onBeforeMount(() => {
  loadTeachers();
  loadClassrooms();
});

const loadTeachers = () => {
  teacherService.getAllTeachers().then(response => (teachers.value = response));
};

const loadClassrooms = () => {
  classroomService.getAllClassrooms().then(response => (classrooms.value = response));
};

const getTeacherOptionContent = teacher => {
  return `${teacher.teacherCode} - ${teacher.firstName} ${teacher.lastName}`;
};

const handleSubjectDelete = () => {
  if (!confirm('Are you sure?')) {
    return;
  }

  formStore.deleteSubject(props.classIndex, props.index);
};
</script>

<template>
  <accordion-item
    :id="subject._id"
    :default-opened="formStore?.accordionState?.[subject._id] ?? true"
    class="subject-accordion"
  >
    <template #summary>
      <div class="rsprd-accordion-header">
        <input
          v-model="subject.name"
          @click.stop
          type="text"
          class="rsprd-input rsprd-input--lighter"
          placeholder="Math"
        />
        <button @click.stop="handleSubjectDelete" type="button" class="rsprd-btn rsprd-btn--delete">
          <img class="rsprd-icon" src="@/assets/img/delete_icon.svg" />
        </button>
      </div>
    </template>
    <div class="row">
      <span>Times per week</span>
      <input v-model="subject.timesPerWeek" type="number" class="rsprd-input rsprd-input--lighter" />
    </div>
    <div class="row">
      <span>Teacher</span>
      <select v-model="subject.teacher.name" class="rsprd-select">
        <option value="">-</option>
        <option v-for="teacher in teachers" :key="teacher">
          {{ getTeacherOptionContent(teacher) }}
        </option>
      </select>
    </div>
    <div class="row">
      <span>Classroom</span>
      <select v-model="subject.classroom.name" class="rsprd-select">
        <option value="">-</option>
        <option v-for="classroom in classrooms" :key="classroom">{{ classroom.name }}</option>
      </select>
    </div>
  </accordion-item>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  max-width: 450px;
}

.row:not(:last-child) {
  margin-bottom: 16px;
}
</style>
