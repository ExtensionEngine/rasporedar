import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const buildSubjectFormState = assignId => ({
  _id: assignId(),
  name: '',
  timesPerWeek: 0,
  teacher: { name: '' },
  classroom: { name: '' },
});

const buildClassFormState = assignId => ({
  _id: assignId(),
  name: '',
  subjects: [buildSubjectFormState(assignId)],
});

const buildFormState = assignId => ({
  classes: [buildClassFormState(assignId)],
});

export const useFormStore = defineStore('form', () => {
  const id = useStorage('id', 1);

  function assignId() {
    return id.value++;
  }

  const form = useStorage('form', buildFormState(assignId));
  const accordionState = useStorage('accordionState', {});

  function addClass() {
    form.value.classes.push(buildClassFormState(assignId));
  }

  function deleteClass(index) {
    form.value.classes.splice(index, 1);
  }

  function addSubject(index) {
    form.value.classes[index].subjects.push(buildSubjectFormState(assignId));
  }

  function deleteSubject(classIndex, subjectIndex) {
    form.value.classes[classIndex].subjects.splice(subjectIndex, 1);
  }

  return { form, accordionState, addClass, addSubject, deleteClass, deleteSubject };
});
