<script setup>
import { onMounted, reactive } from 'vue';
import { getDocDefinition } from '@/helpers/pdf';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import TimeTable from '@/components/TimeTable';
import timetableService from '@/api/timetable';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const timetable = reactive({ data: null, loading: true, errored: false });

onMounted(() => {
  timetableService
    .getTimetable()
    .then(json => (timetable.data = json))
    .catch(error => {
      console.log(error);
      timetable.errored = true;
    })
    .finally(() => (timetable.loading = false));
});

function handleDownloadAll() {
  pdfMake
    .createPdf(
      getDocDefinition(
        timetable.data.timetable,
        subject => subject.name,
        subject => `${subject.teacher.name} - ${subject.classroom?.name || ''}`,
      ),
    )
    .open();
}
</script>

<template>
  <div>
    <div v-if="timetable.errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </div>
    <div v-else>
      <div v-if="timetable.loading">Loading...</div>
      <div v-else>
        <header class="rsprd-bar">
          <div>
            <span>By class</span>
            <span>By teacher</span>
            <span>By classroom</span>
          </div>
          <div>
            <button type="button" class="rsprd-button">Monochrome mode</button>
            <button @click="handleDownloadAll" type="button" class="rsprd-button">&darr; Download all</button>
          </div>
        </header>

        <TimeTable
          :timetable="timetable.data.timetable"
          :get-subject-primary-text="subject => subject.name"
          :get-subject-secondary-text="subject => `${subject.teacher.name} - ${subject.classroom?.name || ''}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
header.rsprd-bar {
  margin-bottom: 32px;
}
</style>
