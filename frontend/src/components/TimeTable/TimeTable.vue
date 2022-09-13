<script setup>
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { computed } from 'vue';
import { daysInWeek } from '@/constants/day';
import { generateColor } from '@/helpers/color';
import { getDocDefinition } from '@/helpers/pdf';
import { mapObject } from '@/helpers/object';
import { maxHoursPerDay } from '@/helpers/count';
import pdfMake from 'pdfmake/build/pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const props = defineProps({
  timetable: { type: Object, default: () => ({}) },
  getCardPrimaryText: { type: Function, default: () => '' },
  getCardSecondaryText: { type: Function, default: () => '' },
  monochromeMode: { type: Boolean, default: () => false },
});

const maxHoursPerDayPerTimetable = computed(() =>
  mapObject(props.timetable, classTimetable => maxHoursPerDay(classTimetable)),
);

function handleDownload(timetableTitle, timetableData) {
  pdfMake
    .createPdf(
      getDocDefinition(
        { [timetableTitle]: timetableData },
        props.getCardPrimaryText,
        props.getCardSecondaryText,
        props.monochromeMode,
      ),
    )
    .open();
}
</script>

<template>
  <div>
    <div
      v-for="(timetableData, timetableTitle) in timetable"
      :key="timetableTitle"
      class="timetable rsprd-container__item"
    >
      <div class="rsprd-bar">
        <h2 class="rsprd-bar__title">{{ timetableTitle }}</h2>
        <button
          @click="handleDownload(timetableTitle, timetableData)"
          type="button"
          class="rsprd-btn rsprd-btn--secondary"
        >
          &darr; Download
        </button>
      </div>
      <div class="table">
        <div class="row row--bold">
          <div class="col col--small">#</div>
          <div v-for="day in daysInWeek" :key="day" class="col">{{ day }}</div>
        </div>
        <div v-for="hour in maxHoursPerDayPerTimetable[timetableTitle]" :key="hour" class="row">
          <div class="col col--small col--vertical-center">{{ hour }}</div>
          <div v-for="subject in timetableData.map(day => day[hour - 1])" :key="subject" class="col">
            <div
              v-if="subject"
              :style="{
                backgroundColor: monochromeMode
                  ? null
                  : generateColor(getCardPrimaryText(subject)) + '99' /* set background opacity to 60% */,
              }"
              class="card"
            >
              <div class="card__title">{{ getCardPrimaryText(subject) }}</div>
              <div class="card__footer">{{ getCardSecondaryText(subject) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin-top: 40px;
}

.timetable {
  background-color: var(--color-lighter);
  border-radius: 20px;
  margin-bottom: 64px;
  padding: 30px;
}

.timetable:first-child {
  margin-top: 0;
}

.row {
  display: flex;
}

.row--bold {
  font-weight: bold;
}

.col {
  width: 20%;
  padding: 8px;
}

.col--small {
  width: 35px;
  font-weight: bold;
}

.col--vertical-center {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
}

.card {
  padding: 8px;
  border: 1px solid var(--color-darker);
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.card__title {
  margin-bottom: 20px;
}

.card__footer {
  font-size: 12px;
}
</style>
