<script>
import { AccordionList } from 'vue3-rich-accordion';
import ClassAccordionItem from './ClassAccordionItem.vue';
import { useFormStore } from '@/stores/form';

export default {
  setup() {
    const formStore = useFormStore();
    return { formStore };
  },
  components: {
    AccordionList,
    ClassAccordionItem,
  },
};
</script>

<template>
  <div>
    <div class="bar">
      <h2>Classes</h2>
      <button @click="formStore.addClass()">Add class</button>
    </div>
    <AccordionList
      @update:state="newState => (formStore.accordionState = newState)"
      open-multiple-items
      :state="formStore.accordionState"
    >
      <ClassAccordionItem v-for="(_, classIndex) in formStore.form.classes" :key="classIndex" :index="classIndex" />
    </AccordionList>
    <pre>{{ JSON.stringify(formStore.form, null, 2) }}</pre>
    <pre>{{ JSON.stringify(formStore.accordionState, null, 2) }}</pre>
  </div>
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
- styles
- input validation (?)
- form submit
-->
