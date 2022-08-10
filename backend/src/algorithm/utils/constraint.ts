import { Class, MatrixHashmap, RemainingLectures, Subject, Unavailable } from '../types';
import { getLectionCountForDay } from './subject';
import { hash } from './hash';
import { maxSubjectLecturesPerDay } from '../consts';

function checkIfClassUnavailable(timetable: MatrixHashmap, class_: Class, dayIndex: number, periodIndex: number) {
  return timetable[hash(class_.name)][dayIndex][periodIndex];
}

function checkIfTeacherUnavailable(unavailable: Unavailable, subject: Subject, dayIndex: number, periodIndex: number) {
  if (subject === null) return;
  return unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex];
}

function checkIfClassroomUnavailable(
  unavailable: Unavailable,
  subject: Subject,
  dayIndex: number,
  periodIndex: number,
) {
  if (subject === null) return;
  return subject.classroom && unavailable.classrooms[hash(subject.classroom)][dayIndex][periodIndex];
}

function checkIfLectureQuantityFulfilled(remainingLectures: RemainingLectures, class_: Class, subject: Subject) {
  if (subject === null) return;
  return remainingLectures[class_.name][subject.name] === 0;
}

function checkIfDailyLimitExceeded(timetable: MatrixHashmap, class_: Class, subject: Subject, dayIndex: number) {
  const lectureCount = getLectionCountForDay(timetable, class_, subject, dayIndex) as number;
  return lectureCount > maxSubjectLecturesPerDay;
}

export function checkConstraints(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  subject: Subject,
  dayIndex: number,
  periodIndex: number,
) {
  return (
    checkIfClassUnavailable(timetable, class_, dayIndex, periodIndex) || // class in not available
    checkIfTeacherUnavailable(unavailable, subject, dayIndex, periodIndex) || // teacher is not available
    checkIfClassroomUnavailable(unavailable, subject, dayIndex, periodIndex) || // classroom is not available
    checkIfLectureQuantityFulfilled(remainingLectures, class_, subject) || // all lectures for subject are in schedule
    checkIfDailyLimitExceeded(timetable, class_, subject, dayIndex) // max lecture daily quantity is not exceeded
  );
}

export function validateSwap(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  newSubject: Subject,
  newDayIndex: number,
  newPeriodIndex: number,
  oldSubject: Subject,
  oldDayIndex: number,
  oldPeriodIndex: number,
) {
  return (
    // validate old subject to new period
    !(
      checkIfClassUnavailable(timetable, class_, newDayIndex, newPeriodIndex) ||
      checkIfTeacherUnavailable(unavailable, oldSubject, newDayIndex, newPeriodIndex) ||
      checkIfClassroomUnavailable(unavailable, oldSubject, newDayIndex, newPeriodIndex)
    ) &&
    // validate new subject to old period
    !(
      checkIfTeacherUnavailable(unavailable, newSubject, oldDayIndex, oldPeriodIndex) ||
      checkIfLectureQuantityFulfilled(remainingLectures, class_, newSubject)
    )
  );
}
