<script>
import { AccordionItem } from 'vue3-rich-accordion';
import { useFormStore } from '@/stores/form';

export default {
  props: {
    index: { type: Number, default: -1 },
    classIndex: { type: Number, default: -1 },
  },
  setup(props) {
    const formStore = useFormStore();

    const teachers = ['Ante', 'Ana', 'Mate']; // TODO: replace with real data when teacher crud frontend is finished
    const classrooms = ['001', '002', '003']; // TODO: replace with real data when classroom crud frontend is finished

    const subject = formStore.form.classes[props.classIndex].subjects[props.index];

    return { formStore, teachers, classrooms, subject };
  },
  components: {
    AccordionItem,
  },
};
</script>

<template>
  <accordion-item
    :id="`${classIndex}_${index}`"
    :default-opened="formStore?.accordionState?.[`${classIndex}_${index}`] ?? true"
    class="subject-accordion"
  >
    <template #summary>
      <input
        v-model="subject.name"
        @click.stop
        type="text"
        class="rsprd-input rsprd-input--lighter"
        placeholder="Math"
      />
    </template>
    <div class="row">
      <span>Times per week</span>
      <input v-model="subject.timesPerWeek" type="number" class="rsprd-input rsprd-input--lighter" />
    </div>
    <div class="row">
      <span>Teacher</span>
      <select v-model="subject.teacher.name" class="rsprd-select">
        <option value="">-</option>
        <option v-for="teacher in teachers" :key="teacher">{{ teacher }}</option>
      </select>
    </div>
    <div class="row">
      <span>Classroom</span>
      <select v-model="subject.classroom.name" class="rsprd-select">
        <option value="">-</option>
        <option v-for="classroom in classrooms" :key="classroom">{{ classroom }}</option>
      </select>
    </div>
  </accordion-item>
</template>

<style scoped>
.row {
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  max-width: 450px;
}

.row:not(:last-child) {
  margin-bottom: 16px;
}
</style>
