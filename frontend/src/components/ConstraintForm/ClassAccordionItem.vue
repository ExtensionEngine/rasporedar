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

    const handleClassDelete = () => {
      if (!confirm('Are you sure?')) {
        return;
      }

      formStore.deleteClass(props.index);
    };

    return { formStore, class_, handleClassDelete };
  },
  components: {
    AccordionList,
    AccordionItem,
    SubjectAccordionItem,
  },
};
</script>

<template>
  <accordion-item
    :id="class_._id"
    :default-opened="formStore?.accordionState?.[class_._id] ?? true"
    class="class-accordion"
  >
    <template #summary>
      <div class="rsprd-accordion-header">
        <input
          v-model="class_.name"
          @click.stop
          type="text"
          placeholder="3a"
          class="rsprd-input rsprd-input--shorter rsprd-input--lighter"
        />
        <button @click.stop="handleClassDelete" type="button" class="rsprd-icon-button">
          <img src="@/assets/img/delete_icon.svg" />
        </button>
      </div>
    </template>
    <h3>Subjects</h3>
    <accordion-list
      @update:state="newState => (formStore.accordionState = newState)"
      open-multiple-items
      :state="formStore.accordionState"
    >
      <subject-accordion-item
        v-for="subjectIndex in class_.subjects.length"
        :key="class_.subjects[subjectIndex - 1]._id"
        :class-index="index"
        :index="subjectIndex - 1"
      />
    </accordion-list>
    <button @click="formStore.addSubject(index)" type="button" class="rsprd-button">&plus; Add subject</button>
  </accordion-item>
</template>
