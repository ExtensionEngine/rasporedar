import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const defaultSubjectFormState = {
  name: '',
  timesPerWeek: 0,
  teacher: { name: '' },
  classroom: { name: '' },
};

const defaultClassFormState = {
  name: '',
  subjects: [defaultSubjectFormState],
};

const defaultFormState = {
  classes: [defaultClassFormState],
};

export const useFormStore = defineStore('form', () => {
  const form = useStorage('form', structuredClone(defaultFormState));
  const accordionState = useStorage('accordionState', {});

  function addClass() {
    form.value.classes.push(structuredClone(defaultClassFormState));
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push(structuredClone(defaultSubjectFormState));
  }

  return { form, accordionState, addClass, addSubject };
});
