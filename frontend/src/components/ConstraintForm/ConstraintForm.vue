<script>
import { AccordionList } from 'vue3-rich-accordion';
import ClassAccordionItem from './ClassAccordionItem.vue';
import { useFormStore } from '@/stores/form';

export default {
  setup() {
    const formStore = useFormStore();

    const generateTimetable = () => {
      // TODO: submit handler will be implemented when algorithm backend is merged
      console.log(formStore.form);
    };

    return { formStore, generateTimetable };
  },
  components: {
    AccordionList,
    ClassAccordionItem,
  },
};
</script>

<template>
  <form @submit.prevent="generateTimetable">
    <div class="bar">
      <h2>Classes</h2>
      <button @click.prevent="formStore.addClass()">Add class</button>
    </div>
    <accordion-list
      @update:state="newState => (formStore.accordionState = newState)"
      open-multiple-items
      :state="formStore.accordionState"
    >
      <class-accordion-item v-for="(_, classIndex) in formStore.form.classes" :key="classIndex" :index="classIndex" />
    </accordion-list>
    <button type="submit">Generate timetable</button>
    <pre>{{ JSON.stringify(formStore.form, null, 2) }}</pre>
    <pre>{{ JSON.stringify(formStore.accordionState, null, 2) }}</pre>
  </form>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';

.bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>

<!--
TODO:
- constraints (timesPerWeek, teacher and classroom)
- autoexpand on add
- styles
-->
