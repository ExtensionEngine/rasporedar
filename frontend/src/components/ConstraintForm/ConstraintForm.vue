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
  <div class="main">
    <form @submit.prevent="handleSubmit">
      <div class="rsprd-bar">
        <h2 class="rsprd-bar-title">Classes</h2>
        <button @click="insertSeed" type="button" class="rsprd-button">Insert Seed</button>
      </div>
      <hr />
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
      <button @click.prevent="formStore.addClass()" class="rsprd-button rsprd-button--lighter">&plus; Add class</button>
      <button type="submit" class="rsprd-button rsprd-button--cta submit-button">Generate timetable</button>
      <pre>{{ JSON.stringify(formStore.form, null, 2) }}</pre>
      <pre>{{ JSON.stringify(formStore.accordionState, null, 2) }}</pre>
    </form>
  </div>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';

:root {
  --acco-active: var(--color-main);
}

.main {
  background-color: var(--color-lighter);
  border-radius: 20px;
  padding: 30px;
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
</style>

<style scoped>
.submit-button {
  display: block;
  margin-bottom: 24px;
}

.rsprd-button {
  margin-top: 12px;
}
</style>
