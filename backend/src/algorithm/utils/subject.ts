import { Class, MatrixHashmap, RemainingLectures, Subject } from '../types';
import { hash } from './hash';

export function getTotalRemainingLectures(remainingLectures: RemainingLectures) {
  return Object.values(remainingLectures).reduce((sum, ls) => {
    const lectureSum = Object.values(ls).reduce((sum, l) => sum + l, 0);
    return sum + lectureSum;
  }, 0);
}

export function getLectureCountForDay(timetable: MatrixHashmap, class_: Class, subject: Subject, day: number) {
  const subjectLecturesOnDay = timetable[hash(class_.name)][day].filter(period => period === hash(subject));
  return subjectLecturesOnDay.length;
}
