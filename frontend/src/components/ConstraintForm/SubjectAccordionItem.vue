<script>
import { AccordionItem } from 'vue3-rich-accordion';
import { useFormStore } from '@/stores/form';

export default {
  props: {
    index: { type: Number, default: -1 },
    classIndex: { type: Number, default: -1 },
  },
  setup() {
    const formStore = useFormStore();
    return { formStore };
  },
  components: {
    AccordionItem,
  },
};
</script>

<template>
  <accordion-item :id="`${classIndex}_${index}`" :default-opened="formStore.accordionState[`${classIndex}_${index}`]">
    <template #summary>
      <input v-model="formStore.form.classes[classIndex].subjects[index].name" @click.stop type="text" />
    </template>
    <h3>constrains</h3>
  </accordion-item>
</template>
