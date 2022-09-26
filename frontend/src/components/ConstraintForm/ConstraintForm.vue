<script>
import { AccordionList } from 'vue3-rich-accordion';
import ClassAccordionItem from './ClassAccordionItem.vue';
import timetableService from '@/api/timetable';
import { useFormStore } from '@/stores/form';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const formStore = useFormStore();
    const router = useRouter();

    const handleSubmit = () => {
      router.push({ name: 'timetables' });
    };

    const insertSeed = () => {
      timetableService.getSeed().then(json => (formStore.form = json));
    };

    return { formStore, handleSubmit, insertSeed };
  },
  components: {
    AccordionList,
    ClassAccordionItem,
  },
};
</script>

<template>
  <div class="rsprd-container__item">
    <form @submit.prevent="handleSubmit">
      <div class="rsprd-bar">
        <h2 class="rsprd-bar__title">Classes</h2>
        <div class="rsprd-btn-group">
          <button
            v-if="formStore.isCollapsed"
            @click="formStore.expandAllAccordions()"
            type="button"
            class="rsprd-btn rsprd-btn--muted"
          >
            Expand all
          </button>
          <button
            v-if="!formStore.isCollapsed"
            @click="formStore.collapseAllAccordions()"
            type="button"
            class="rsprd-btn rsprd-btn--muted"
          >
            Collapse all
          </button>
          <button @click="insertSeed" type="button" class="rsprd-btn rsprd-btn--muted">Insert Seed</button>
          <button type="submit" class="rsprd-btn rsprd-btn--primary">Generate timetable</button>
        </div>
      </div>
      <accordion-list
        @update:state="newState => (formStore.accordionState = newState)"
        open-multiple-items
        :state="formStore.accordionState"
      >
        <class-accordion-item
          v-for="classIndex in formStore.form.classes.length"
          :key="formStore.form.classes[classIndex - 1]._id"
          :index="classIndex - 1"
        />
      </accordion-list>
      <button @click.prevent="formStore.addClass()" class="rsprd-btn rsprd-btn--muted">&plus; Add class</button>
      <button type="submit" class="rsprd-btn rsprd-btn--primary rsprd-btn--l rsprd-d--block">Generate timetable</button>
    </form>
  </div>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';

:root {
  --acco-active: var(--color-main);
}

.accordion-list {
  margin: 30px 0px;
}

.accordion-item {
  margin-bottom: 12px;
}

.class-accordion:not(.accordion-item--open),
.class-accordion.accordion-item--open > .accordion-item__summary {
  background-color: var(--color-lighter);
}

.subject-accordion:not(.accordion-item--open),
.subject-accordion.accordion-item--open > .accordion-item__summary {
  background-color: var(--color-light);
}

.accordion-list .accordion-item {
  border-color: var(--color-text);
}

.rsprd-btn--l {
  margin-top: 12px;
}

.rsprd-btn-group > *:not(:last-child) {
  margin-right: 12px;
}
</style>
