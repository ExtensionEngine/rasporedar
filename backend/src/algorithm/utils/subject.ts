import { Class, MatrixHashmap, RemainingLectures, Subject } from '../types';
import { sum, sumBy } from 'lodash';
import { hash } from './hash';

export function getTotalRemainingLecturesCount(remainingLectures: RemainingLectures) {
  const classes = Object.values(remainingLectures);
  const totalRemainingLecturesCount = sumBy(classes, subjects => {
    const lectureCounts = Object.values(subjects);
    return sum(lectureCounts);
  });

  return totalRemainingLecturesCount;
}

export function getLectureCountForDay(timetable: MatrixHashmap, class_: Class, subject: Subject, day: number) {
  const subjectLecturesOnDay = timetable[hash(class_.name)][day].filter(period => period === hash(subject));
  return subjectLecturesOnDay.length;
}
