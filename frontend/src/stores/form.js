import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const buildSubjectFormState = () => ({
  name: '',
  timesPerWeek: 0,
  teacher: { name: '' },
  classroom: { name: '' },
});

const buildClassFormState = () => ({
  name: '',
  subjects: [buildSubjectFormState()],
});

const buildFormState = () => ({
  classes: [buildClassFormState()],
});

export const useFormStore = defineStore('form', () => {
  const form = useStorage('form', buildFormState());
  const accordionState = useStorage('accordionState', {});

  function addClass() {
    form.value.classes.push(buildClassFormState());
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push(buildSubjectFormState());
  }

  return { form, accordionState, addClass, addSubject };
});
