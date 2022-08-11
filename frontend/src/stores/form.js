import { defineStore } from 'pinia';
import { objectDeepCopy } from '@/helpers/object';
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
  const form = useStorage('form', objectDeepCopy(defaultFormState));
  const accordionState = useStorage('accordionState', {});

  function addClass() {
    form.value.classes.push(objectDeepCopy(defaultClassFormState));
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push(objectDeepCopy(defaultSubjectFormState));
  }

  return { form, accordionState, addClass, addSubject };
});
