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

    const class_ = formStore.form.classes[props.index];

    return { formStore, class_ };
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
        v-model="class_.name"
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
        v-for="subjectIndex in class_.subjects.length"
        :key="subjectIndex"
        :class-index="index"
        :index="subjectIndex - 1"
      />
    </accordion-list>
    <button @click="formStore.addSubject(index)" type="button" class="rsprd-button">&plus; Add subject</button>
  </accordion-item>
</template>
