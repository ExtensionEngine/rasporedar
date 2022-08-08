<script>
import { AccordionItem, AccordionList } from 'vue3-rich-accordion';

export default {
  components: {
    AccordionList,
    AccordionItem,
  },
};
</script>

<template>
  <div>
    <div class="bar">
      <h2>Razredi</h2>
      <button>Dodaj razred</button>
    </div>
    <AccordionList open-multiple-items="true">
      <AccordionItem>
        <template #summary>
          <input @click.stop type="text" />
        </template>
        <div class="bar">
          <h3>Predmeti</h3>
          <button>Dodaj predmet</button>
        </div>
        <AccordionList open-multiple-items="true">
          <AccordionItem>
            <template #summary>
              <input @click.stop type="text" />
            </template>
            <h3>constrains</h3>
          </AccordionItem>

          <AccordionItem>
            <template #summary>
              <input @click.stop type="text" />
            </template>
            <h3>constrains</h3>
          </AccordionItem>
        </AccordionList>
      </AccordionItem>

      <AccordionItem>
        <template #summary>
          <input @click.stop type="text" />
        </template>
        <h3>Main content</h3>
      </AccordionItem>
    </AccordionList>
  </div>
</template>

<style>
@import 'vue3-rich-accordion/accordion-library-styles.css';

.bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
