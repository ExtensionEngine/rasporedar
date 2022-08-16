<script setup>
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import PageGreeting from '@/components/PageGreeting.vue';

// eslint-disable-next-line no-import-assign
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// playground requires you to assign document definition to a variable called dd

const docDefinition = {
  content: [
    { text: 'Tables', fontSize: 28, bold: true, margin: [0, 0, 0, 10] },
    {
      style: 'tableExample',
      // layout: 'noBorders',
      table: {
        widths: [30, '*', '*', '*', '*', '*'],
        headerRows: 1,
        body: [
          [
            { text: '#', alignment: 'center', bold: true },
            { text: 'Monday', bold: true, margin: [3, 0] },
            { text: 'Tuesday', bold: true, margin: [3, 0] },
            { text: 'Wednesday', bold: true, margin: [3, 0] },
            { text: 'Thursday', bold: true, margin: [3, 0] },
            { text: 'Friday', bold: true, margin: [3, 0] },
          ],
          [
            { stack: ['\n', { text: 1, bold: true, alignment: 'center' }], margin: [3, 4] },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
          ],
          [
            { stack: ['\n', { text: 2, bold: true, alignment: 'center' }], margin: [3, 4] },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
            {
              stack: [{ text: 'Hrvatski jezik', bold: true }, '\n', 'Ante Antic - '],
              fillColor: '#eeeeee',
              margin: [3, 4],
            },
          ],
        ],
      },
      pageBreak: 'after',
    },
  ],
  pageOrientation: 'landscape',
};

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
