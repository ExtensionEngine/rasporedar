<script>
import { AccordionItem, AccordionList } from 'vue3-rich-accordion';
import SubjectAccordionItem from './SubjectAccordionItem.vue';
import { useFormStore } from '@/stores/form';

export default {
  props: {
    index: { type: Number, default: -1 },
  },
  setup() {
    const formStore = useFormStore();
    return { formStore };
  },
  components: {
    AccordionList,
    AccordionItem,
    SubjectAccordionItem,
  },
};
</script>

<template>
  <AccordionItem :default-opened="true">
    <template #summary>
      <input v-model="formStore.form.classes[index].name" @click.stop type="text" />
    </template>
    <div class="bar">
      <h3>Predmeti</h3>
      <button @click="formStore.addSubject(index)">Dodaj predmet</button>
    </div>
    <AccordionList :open-multiple-items="true">
      <SubjectAccordionItem
        v-for="(_, subjectIndex) in formStore.form.classes[index].subjects"
        :key="subjectIndex"
        :class-index="index"
        :index="subjectIndex"
      />
    </AccordionList>
  </AccordionItem>
</template>
