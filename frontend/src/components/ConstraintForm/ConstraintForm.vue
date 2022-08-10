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
    <h2>Classes</h2>
    <accordion-list
      @update:state="newState => (formStore.accordionState = newState)"
      open-multiple-items
      :state="formStore.accordionState"
    >
      <class-accordion-item v-for="(_, classIndex) in formStore.form.classes" :key="classIndex" :index="classIndex" />
    </accordion-list>
    <button @click.prevent="formStore.addClass()" class="rsprd-button rsprd-button--darker">&plus; Add class</button>
    <button type="submit" class="rsprd-button rsprd-button--cta submit-button">Generate timetable</button>
    <pre>{{ JSON.stringify(formStore.form, null, 2) }}</pre>
  </form>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';

:root {
  --acco-active: var(--color-main);
}

.class-accordion:not(.accordion-item--open),
.class-accordion.accordion-item--open > .accordion-item__summary {
  background-color: var(--color-darker);
}

.subject-accordion:not(.accordion-item--open),
.subject-accordion.accordion-item--open > .accordion-item__summary {
  background-color: var(--color-dark);
}

.class-accordion:not(.accordion-item--open) > .accordion-item__summary {
  color: var(--color-lighter);
}

.accordion-list .accordion-item {
  border-color: var(--color-text);
}
</style>

<style scoped>
.submit-button {
  display: block;
}
</style>
