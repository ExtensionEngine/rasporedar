<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getDocDefinition } from '@/helpers/pdf';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import TimeTable from '@/components/TimeTable';
import { timetableFilters } from '@/constants/timetableFilters';
import timetableService from '@/api/timetable';
import { timetableTransform } from '@/helpers/timetable';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const timetable = reactive({ data: null, loading: true, errored: false });
const filter = ref(timetableFilters.BY_CLASS);
const filteredTimetable = computed(() => {
  if (!timetable.data) return null;
  return timetableTransform[filter.value](timetable.data.timetable);
});

const monochromeMode = ref(false);
const modeButtonText = computed(() => (monochromeMode.value ? 'Color Mode' : 'Monochrome Mode'));

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
        filteredTimetable.value,
        subject => subject.name,
        subject => `${subject.teacher.name} - ${subject.classroom?.name || ''}`,
        monochromeMode.value,
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
    <div v-else-if="timetable.loading">Loading...</div>
    <div v-else>
      <header class="rsprd-bar">
        <div>
          <a
            @click="filter = timetableFilters.BY_CLASS"
            :class="{ 'rsprd-link--active': filter === timetableFilters.BY_CLASS }"
            class="rsprd-link"
            >By Class</a
          >
          <a
            @click="filter = timetableFilters.BY_TEACHER"
            :class="{ 'rsprd-link--active': filter === timetableFilters.BY_TEACHER }"
            class="rsprd-link"
            >By Teacher</a
          >
          <a
            @click="filter = timetableFilters.BY_CLASSROOM"
            :class="{ 'rsprd-link--active': filter === timetableFilters.BY_CLASSROOM }"
            class="rsprd-link"
            >By Classroom</a
          >
        </div>
        <div>
          <button @click="monochromeMode = !monochromeMode" type="button" class="rsprd-button">
            {{ modeButtonText }}
          </button>
          <button @click="handleDownloadAll" type="button" class="rsprd-button">&darr; Download All</button>
        </div>
      </header>

      <TimeTable
        :timetable="filteredTimetable"
        :get-card-primary-text="subject => subject.name"
        :get-card-secondary-text="subject => `${subject.teacher.name} - ${subject.classroom?.name || ''}`"
        :monochrome-mode="monochromeMode"
      />
    </div>
  </div>
</template>

<style scoped>
header.rsprd-bar {
  margin-top: 32px;
  margin-bottom: 16px;
}

.rsprd-button {
  margin-top: 0;
}

.rsprd-button:not(:last-child) {
  margin-right: 12px;
}
</style>
