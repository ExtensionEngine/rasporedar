<script setup>
import PageGreeting from '@/components/PageGreeting.vue';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

// eslint-disable-next-line no-import-assign
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// playground requires you to assign document definition to a variable called dd

const docDefinition = [];

function onClick() {
  pdfMake.createPdf(docDefinition).open();
}
</script>

<template>
  <div class="home">
    <PageGreeting msg="This is the About Page" />
    <button @click="onClick">click me</button>
  </div>
</template>
