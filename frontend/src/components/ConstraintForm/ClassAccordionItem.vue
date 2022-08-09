<script>
import { AccordionItem, AccordionList } from 'vue3-rich-accordion';
import SubjectAccordionItem from './SubjectAccordionItem.vue';

export default {
  components: {
    AccordionList,
    AccordionItem,
    SubjectAccordionItem,
  },
};
</script>

<template>
  <AccordionItem>
    <template #summary>
      <input @click.stop type="text" />
    </template>
    <div class="bar">
      <h3>Predmeti</h3>
      <button>Dodaj predmet</button>
    </div>
    <AccordionList open-multiple-items="true">
      <SubjectAccordionItem />
    </AccordionList>
  </AccordionItem>
</template>

<style>
.bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
