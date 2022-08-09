<script>
import { AccordionItem } from 'vue3-rich-accordion';

export default {
  components: {
    AccordionItem,
  },
};
</script>

<template>
  <AccordionItem>
    <template #summary>
      <input @click.stop type="text" />
    </template>
    <h3>constrains</h3>
  </AccordionItem>
</template>
