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
  <accordion-item :id="`${index}`" :default-opened="formStore.accordionState[`${index}`]">
    <template #summary>
      <input v-model="formStore.form.classes[index].name" @click.stop type="text" />
    </template>
    <div class="bar">
      <h3>Subjects</h3>
      <button @click="formStore.addSubject(index)">Add subject</button>
    </div>
    <accordion-list
      @update:state="newState => (formStore.accordionState = newState)"
      open-multiple-items
      :state="formStore.accordionState"
    >
      <subject-accordion-item
        v-for="(_, subjectIndex) in formStore.form.classes[index].subjects"
        :key="subjectIndex"
        :class-index="index"
        :index="subjectIndex"
      />
    </accordion-list>
  </accordion-item>
</template>
