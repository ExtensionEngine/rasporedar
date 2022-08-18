<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getDocDefinition } from '@/helpers/pdf';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import TimeTable from '@/components/TimeTable';
import timetableService from '@/api/timetable';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const timetable = reactive({ data: null, loading: true, errored: false });
const monochromeMode = ref(false);

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
        monochromeMode.value,
      ),
    )
    .open();
}
</script>

<template>
  <div class="container">
    <div v-if="timetable.errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </div>
    <div v-else>
      <div v-if="timetable.loading">Loading...</div>
      <div v-else>
        <header class="rsprd-bar">
          <div>
            <a class="rsprd-link">By class</a>
            <a class="rsprd-link">By teacher</a>
            <a class="rsprd-link">By classroom</a>
          </div>
          <div>
            <button @click="monochromeMode = !monochromeMode" type="button" class="rsprd-button">
              Monochrome mode
            </button>
            <button @click="handleDownloadAll" type="button" class="rsprd-button">&darr; Download all</button>
          </div>
        </header>
        <TimeTable
          :timetable="timetable.data.timetable"
          :get-card-primary-text="subject => subject.name"
          :get-card-secondary-text="subject => `${subject.teacher.name} - ${subject.classroom?.name || ''}`"
          :monochrome-mode="monochromeMode"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 10%;
  width: 100vw;
}
header.rsprd-bar {
  margin-bottom: 1rem;
}

.rsprd-button {
  margin-top: 0;
}

.rsprd-button:not(:last-child) {
  margin-right: 12px;
}
</style>
