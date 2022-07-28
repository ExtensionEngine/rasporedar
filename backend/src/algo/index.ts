import {
  Class,
  GenerateScheduleProps,
  GenerateScheduleResult,
  MatrixHashmap,
  RemainingLectures,
  Subject,
} from './types';
import { daysPerWeek, maxPeriodsPerDay } from './consts';
import { getMatrixHashmap, getTimesPerWeek, hash, shuffleArray, unhash } from './utils';

function isPeriodAvailable(
  timetable: MatrixHashmap,
  unavailable: { teachers: MatrixHashmap; classrooms: MatrixHashmap },
  remainingLectures: RemainingLectures,
  class_: Class,
  subject: Subject,
  dayIndex: number,
  periodIndex: number,
) {
  return (
    timetable[hash(class_)][dayIndex][periodIndex] || // class in not available
    unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex] || // teacher is not available
    (subject.classroom && unavailable.classrooms[hash(subject.classroom)][dayIndex][periodIndex]) || // classroom is not available
    remainingLectures[class_.name][subject.name] === 0 // all lectures for subject are in schedule
  );
}

export function generateSchedule({ classes, classrooms }: GenerateScheduleProps): GenerateScheduleResult {
  const teachers = classes
    .map(c => c.subjects.map(s => s.teacher))
    .flat()
    .filter((t, i, arr) => arr.findIndex(ts => ts.name === t.name) === i);

  const timetable = getMatrixHashmap(classes);
  const unavailable = {
    teachers: getMatrixHashmap(teachers),
    classrooms: getMatrixHashmap(classrooms),
  };

  const remainingLectures: RemainingLectures = Object.fromEntries(
    classes.map(class_ => [
      class_.name,
      Object.fromEntries(class_.subjects.map(subject => [subject.name, getTimesPerWeek(subject)])),
    ]),
  );

  for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
    for (let periodIndex = 0; periodIndex < maxPeriodsPerDay; periodIndex++) {
      shuffleArray(classes).forEach(class_ => {
        const periodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTimesPerWeek(s), 0);
        const periodsPerDay = Math.trunc(periodsPerWeek / daysPerWeek) + 1;
        if (!(periodIndex < periodsPerDay)) {
          return;
        }

        shuffleArray(class_.subjects).forEach(subject => {
          if (isPeriodAvailable(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex)) {
            return;
          }

          // used if classroom constraint is not present
          const fallbackClassroom = shuffleArray(
            Object.keys(unavailable.classrooms).filter(r => !unavailable.classrooms[r][dayIndex][periodIndex]),
          )[0];

          timetable[hash(class_)][dayIndex][periodIndex] = hash(subject);
          unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex] = hash(subject);
          unavailable.classrooms[hash(subject.classroom) || fallbackClassroom][dayIndex][periodIndex] = hash(subject);
          remainingLectures[class_.name][subject.name]--;
        });
      });
    }
  }

  //           handle multiple hour lectures

  //         if (isSchedulePossible(teacherIndex, classIndex, dayIndex, periodIndex)) {
  //           let lectureCount = 1;
  //           const longestLecture = teachers[teacherIndex].assigned[valid].lectureDistribution[0];
  //           if (
  //             remainingLectures[classIndex][teacherIndex] > 1 &&
  //             longestLecture > 1 &&
  //             isSchedulePossible(teacherIndex, classIndex, dayIndex, periodIndex + 1)
  //           ) {
  //             lectureCount = 2;
  //           }
  //           for (let i = 0; i < lectureCount; i++) {
  //             finalTimetable[classIndex][dayIndex][periodIndex + i] = teachers[teacherIndex].name;
  //             availableClasses[classIndex][dayIndex][periodIndex + i] = teachers[teacherIndex].name;
  //             availableTeachers[teacherIndex][dayIndex][periodIndex + i] = className;
  //             remainingLectures[classIndex][teacherIndex]--;
  //           }
  //           break;

  return { timetable, remainingLectures };
}
