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
      <h2>Razredi</h2>
      <button @click="formStore.addClass()">Dodaj razred</button>
    </div>
    <AccordionList :open-multiple-items="true">
      <ClassAccordionItem v-for="(_, classIndex) in formStore.form.classes" :key="classIndex" :index="classIndex" />
    </AccordionList>
    <pre>{{ JSON.stringify(formStore.form, null, 2) }}</pre>
  </div>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';
</style>
