import { mapObject } from '@/helpers/object';
import { maxHoursPerDay } from './count';
import { timetableFilters } from '@/constants/timetableFilters';

export const timetableTransform = {
  [timetableFilters.BY_CLASS]: timetable => timetable,
  [timetableFilters.BY_TEACHER]: timetable => timetableByTeacher(timetable),
  [timetableFilters.BY_CLASSROOM]: timetable => [],
};

function timetableByTeacher(timetable) {
  const timetableByTeacher = {};
  iterateOverTimetable(timetable, 'className', (subjectData, day, hour) => {
    insertInTimetable(timetableByTeacher, subjectData.teacher.name, day, hour, subjectData);
  });
  return mapObject(timetableByTeacher, cutExtraHours);
}

function iterateOverTimetable(timetable, timetableTitleKey, callback) {
  Object.keys(timetable).forEach(timetableTitle => {
    const timetableData = timetable[timetableTitle];
    Object.keys(timetableData).forEach(day => {
      timetableData[day].forEach((subject, hour) => {
        if (!subject) {
          return;
        }
        const subjectData = { ...subject, [timetableTitleKey]: timetableTitle };
        callback(subjectData, day, hour);
      });
    });
  });
}

function insertInTimetable(timetable, key, day, hour, subject) {
  if (!timetable[key]) {
    timetable[key] = [];
  }
  if (!timetable[key][day]) {
    timetable[key][day] = Array(8).fill(null);
  }
  timetable[key][day][hour] = subject;
}

function cutExtraHours(timetable) {
  const maxHours = maxHoursPerDay(timetable);
  return timetable.map(day => day.slice(0, maxHours));
}
