import { daysInWeek } from '@/constants/day';
import { mapObject } from '@/helpers/object';
import { maxHoursPerDay } from './count';
import { timetableFilters } from '@/constants/timetableFilters';

export const getCardPrimaryText = {
  [timetableFilters.BY_CLASS]: subject => subject.name,
  [timetableFilters.BY_TEACHER]: subject => subject.class.name,
  [timetableFilters.BY_CLASSROOM]: subject => subject.name,
};

export const getCardSecondaryText = {
  [timetableFilters.BY_CLASS]: subject => `${subject.teacher.name} - ${subject.classroom.name}`,
  [timetableFilters.BY_TEACHER]: subject => `${subject.name} - ${subject.classroom.name}`,
  [timetableFilters.BY_CLASSROOM]: subject => `${subject.teacher.name} - ${subject.class.name}`,
};

export const timetableTransform = {
  [timetableFilters.BY_CLASS]: timetable => timetable,
  [timetableFilters.BY_TEACHER]: timetable => timetableByTeacher(timetable),
  [timetableFilters.BY_CLASSROOM]: timetable => timetableByClassroom(timetable),
};

function timetableByTeacher(timetable) {
  const timetableByTeacher = {};
  iterateOverTimetable(timetable, (subjectData, day, hour) => {
    insertInTimetable(timetableByTeacher, subjectData.teacher.name, day, hour, subjectData);
  });
  return mapObject(timetableByTeacher, cutExtraHours);
}

function timetableByClassroom(timetable) {
  const timetableByClassroom = {};
  iterateOverTimetable(timetable, (subjectData, day, hour) => {
    insertInTimetable(timetableByClassroom, subjectData.classroom.name, day, hour, subjectData);
  });
  return mapObject(timetableByClassroom, cutExtraHours);
}

function iterateOverTimetable(timetable, callback) {
  Object.keys(timetable).forEach(timetableTitle => {
    const timetableData = timetable[timetableTitle];
    Object.keys(timetableData).forEach(day => {
      timetableData[day].forEach((subject, hour) => {
        if (!subject) {
          return;
        }
        const subjectData = { ...subject, class: { name: timetableTitle } };
        callback(subjectData, day, hour);
      });
    });
  });
}

function insertInTimetable(timetable, key, day, hour, subject) {
  if (!timetable[key]) {
    timetable[key] = Array(daysInWeek.length)
      .fill()
      .map(() => []);
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
