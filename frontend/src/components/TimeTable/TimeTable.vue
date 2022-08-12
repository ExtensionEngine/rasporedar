<script setup>
import { generateColor } from '@/helpers/color';
import { maxHoursPerDay } from '@/helpers/count';

defineProps({
  timetable: { type: Object, default: () => ({}) },
});

const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
</script>

<template>
  <div>
    <div v-for="(classTimetable, className) in timetable" :key="className" class="timetable">
      <div class="bar">
        <h2 class="timetable__title">{{ className }}</h2>
        <button type="button" class="rsprd-button">&darr; Download</button>
      </div>
      <div class="table">
        <div class="row row--header">
          <div class="col col--small">#</div>
          <div v-for="day in daysInWeek" :key="day" class="col">{{ day }}</div>
        </div>
        <div v-for="hour in maxHoursPerDay(classTimetable)" :key="hour" class="row">
          <div class="col col--small col--vertical-center">{{ hour }}</div>
          <div v-for="subject in classTimetable.map(day => JSON.parse(day[hour - 1]))" :key="subject" class="col">
            <div v-if="subject" :style="{ backgroundColor: generateColor(subject.name) }" class="card">
              <div class="card__title">{{ subject.name }}</div>
              <div class="card__footer">{{ subject.teacher.name }} - {{ subject.classroom?.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timetable {
  margin-bottom: 64px;
}

.timetable__title {
  font-size: 32px;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row {
  display: flex;
}

.row--header {
  font-weight: bold;
}

.col {
  width: 20%;
  padding: 4px;
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
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.card__title {
  margin-bottom: 16px;
  font-weight: bold;
}

.card__footer {
  font-size: 14px;
}
</style>
