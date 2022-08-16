import { Class, MatrixHashmap, RemainingLectures, Subject, Unavailable } from '../types';
import { getLectureCountForDay } from './subject';
import { hash } from './hash';
import { maxSubjectLecturesPerDay } from '../consts';

function checkIfClassUnavailable(timetable: MatrixHashmap, class_: Class, day: number, period: number) {
  return timetable[hash(class_.name)][day][period];
}

function checkIfTeacherUnavailable(unavailable: Unavailable, subject: Subject, day: number, period: number) {
  if (subject === null) return;
  return unavailable.teachers[hash(subject.teacher)][day][period];
}

function checkIfClassroomUnavailable(unavailable: Unavailable, subject: Subject, day: number, period: number) {
  if (subject === null) return;
  return subject.classroom && unavailable.classrooms[hash(subject.classroom)][day][period];
}

function checkIfLectureQuantityFulfilled(remainingLectures: RemainingLectures, class_: Class, subject: Subject) {
  if (subject === null) return;
  return remainingLectures[class_.name][subject.name] === 0;
}

function checkIfDailyLimitExceeded(timetable: MatrixHashmap, class_: Class, subject: Subject, day: number) {
  if (subject === null) return;
  const lectureCount = getLectureCountForDay(timetable, class_, subject, day) as number;
  return lectureCount >= maxSubjectLecturesPerDay;
}

export function checkIfAnyConstraintBroken(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  subject: Subject,
  day: number,
  period: number,
) {
  if (checkIfClassUnavailable(timetable, class_, day, period)) return true; // class in not available
  if (checkIfTeacherUnavailable(unavailable, subject, day, period)) return true; // teacher is not available
  if (checkIfClassroomUnavailable(unavailable, subject, day, period)) return true; // classroom is not available
  if (checkIfLectureQuantityFulfilled(remainingLectures, class_, subject)) return true; // all lectures for subject are in schedule
  if (checkIfDailyLimitExceeded(timetable, class_, subject, day)) return true; // max lecture daily quantity is exceeded
  return false;
}

export function validateSwap(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  newSubject: Subject,
  currentDay: number,
  currentPeriod: number,
  oldSubject: Subject,
  previousDay: number,
  previousPeriod: number,
) {
  // validate if old subject can be set to new time slot
  if (checkIfClassUnavailable(timetable, class_, currentDay, currentPeriod)) return false;
  if (checkIfTeacherUnavailable(unavailable, oldSubject, currentDay, currentPeriod)) return false;
  if (checkIfClassroomUnavailable(unavailable, oldSubject, currentDay, currentPeriod)) return false;
  // validate if new subject can be set to previously set time slot
  if (checkIfTeacherUnavailable(unavailable, newSubject, previousDay, previousPeriod)) return false;
  if (checkIfLectureQuantityFulfilled(remainingLectures, class_, newSubject)) return false;
  return true;
}
