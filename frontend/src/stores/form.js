import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const defaultSubjectFormState = {
  accordionOpened: true,
  name: '',
};

const defaultClassFormState = {
  accordionOpened: true,
  name: '',
  subjects: [defaultSubjectFormState],
};

const defaultFormState = {
  classes: [defaultClassFormState],
};

export const useFormStore = defineStore('form', () => {
  const form = useStorage('form', { ...defaultFormState });

  function addClass() {
    form.value.classes.push({ ...defaultClassFormState });
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push({ ...defaultSubjectFormState });
  }

  return { form, addClass, addSubject };
});
