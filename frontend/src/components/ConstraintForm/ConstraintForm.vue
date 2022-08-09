<script>
import { AccordionList } from 'vue3-rich-accordion';
import ClassAccordionItem from './ClassAccordionItem.vue';

export default {
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
      <button>Dodaj razred</button>
    </div>
    <AccordionList open-multiple-items="true">
      <ClassAccordionItem />
    </AccordionList>
  </div>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';
</style>
