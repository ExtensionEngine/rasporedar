import { Class, MatrixHashmap, RemainingLectures, Subject } from '../types';
import { hash } from './hash';

export function getTotalTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

export function getTotalRemainingLectures(remainingLectures: RemainingLectures) {
  return Object.values(remainingLectures).reduce(
    (sum, ls) => sum + Object.values(ls).reduce((sum, l) => sum + l, 0),
    0,
  );
}

export function getLectionCountForDay(timetable: MatrixHashmap, class_: Class, subject: Subject, dayIndex: number) {
  const subjectLecturesOnDay = timetable[hash(class_.name)][dayIndex].filter(period => period === hash(subject));

  return subjectLecturesOnDay.length;
}
