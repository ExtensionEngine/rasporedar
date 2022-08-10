<script>
import { AccordionItem } from 'vue3-rich-accordion';
import { useFormStore } from '@/stores/form';

export default {
  props: {
    index: { type: Number, default: -1 },
    classIndex: { type: Number, default: -1 },
  },
  setup() {
    const formStore = useFormStore();

    const teachers = ['Ante', 'Ana', 'Mate']; // TODO: replace with real data when teacher crud frontend is finished
    const classrooms = ['001', '002', '003']; // TODO: replace with real data when classroom crud frontend is finished

    return { formStore, teachers, classrooms };
  },
  components: {
    AccordionItem,
  },
};
</script>

<template>
  <accordion-item :id="`${classIndex}_${index}`" :default-opened="formStore.accordionState[`${classIndex}_${index}`]">
    <template #summary>
      <input v-model="formStore.form.classes[classIndex].subjects[index].name" @click.stop type="text" />
    </template>
    <div class="row">
      <span>Times per week</span>
      <input type="number" />
    </div>
    <div class="row">
      <span>Teacher</span>
      <select class="select">
        <option value="">-</option>
        <option v-for="teacher in teachers" :key="teacher">{{ teacher }}</option>
      </select>
    </div>
    <div class="row">
      <span>Classroom</span>
      <select class="select">
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
  max-width: 500px;
}

.row:not(:last-child) {
  margin-bottom: 12px;
}

.select {
  width: 230px;
}
</style>
