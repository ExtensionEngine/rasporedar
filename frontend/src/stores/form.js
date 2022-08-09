import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const defaultSubjectFormState = {
  name: '',
};

const defaultClassFormState = {
  name: '',
  subjects: [defaultSubjectFormState],
};

const defaultFormState = {
  classes: [defaultClassFormState],
};

export const useFormStore = defineStore('form', () => {
  const form = useStorage('form', { ...defaultFormState });
  const accordionState = useStorage('accordionState', {});

  function addClass() {
    form.value.classes.push({ ...defaultClassFormState });
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push({ ...defaultSubjectFormState });
  }

  return { form, accordionState, addClass, addSubject };
});
