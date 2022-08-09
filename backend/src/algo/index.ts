import {
  checkConstraints,
  getClassPeriodsPerDay,
  getMatrixHashmap,
  getTimesPerWeek,
  hash,
  shuffleArray,
} from './utils';
import { daysPerWeek, maxPeriodsPerDay } from './consts';
import { GenerateTimetableProps, GenerateTimetableResult, RemainingLectures } from './types';

export function generateTimetable({ classes, classrooms }: GenerateTimetableProps): GenerateTimetableResult {
  const teachers = classes
    .map(c => c.subjects.map(s => s.teacher))
    .flat()
    .filter((t, i, arr) => arr.findIndex(ts => ts.name === t.name) === i);

  const timetable = getMatrixHashmap(classes.map(c => c.name));
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

  const periods = Object.fromEntries(classes.map(class_ => [class_.name, getClassPeriodsPerDay(class_)]));

  for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
    for (let periodIndex = 0; periodIndex < maxPeriodsPerDay; periodIndex++) {
      shuffleArray(classes).forEach(class_ => {
        if (periodIndex < periods[class_.name][dayIndex]) {
          shuffleArray(class_.subjects).forEach(subject => {
            if (checkConstraints(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex)) {
              return;
            }

            // used if classroom constraint is not present
            const fallbackClassroom = shuffleArray(
              Object.keys(unavailable.classrooms).filter(r => !unavailable.classrooms[r][dayIndex][periodIndex]),
            )[0];

            timetable[hash(class_.name)][dayIndex][periodIndex] = hash(subject);
            unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex] = hash(subject);
            unavailable.classrooms[hash(subject.classroom) || fallbackClassroom][dayIndex][periodIndex] = hash(subject);
            remainingLectures[class_.name][subject.name]--;
          });
        }
      });
    }
  }

  //           handle multiple hour lectures

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

  return { timetable, remainingLectures };
}
