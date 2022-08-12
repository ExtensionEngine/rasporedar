<script>
import { AccordionItem, AccordionList } from 'vue3-rich-accordion';
import SubjectAccordionItem from './SubjectAccordionItem.vue';
import { useFormStore } from '@/stores/form';

export default {
  props: {
    index: { type: Number, default: -1 },
  },
  setup(props) {
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
  <accordion-item :id="index" :default-opened="formStore?.accordionState?.[index] ?? true" class="class-accordion">
    <template #summary>
      <input
        v-model="formStore.form.classes[index].name"
        @click.stop
        type="text"
        placeholder="3a"
        class="rsprd-input rsprd-input--shorter rsprd-input--lighter"
      />
    </template>
    <h3>Subjects</h3>
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
    <button @click="formStore.addSubject(index)" type="button" class="rsprd-button">&plus; Add subject</button>
  </accordion-item>
</template>
