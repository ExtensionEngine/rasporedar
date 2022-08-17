import { Class, Classroom, MatrixHashmap, Periods, RemainingLectures, Subject, Unavailable } from '../types';
import { hash, unhash } from './hash';
import { getFallbackClassroom } from './classroom';
import { validateSwap } from './constraint';

export function swapSlots(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  newSubject: Subject,
  currentDay: number,
  currentPeriod: number,
  periods: Periods,
) {
  for (let previousDay = 0; previousDay <= currentDay; ++previousDay) {
    const periodLength = previousDay === currentDay ? currentPeriod : periods[class_.name][previousDay];

    for (let previousPeriod = 0; previousPeriod < periodLength; ++previousPeriod) {
      const oldSubject = unhash<Subject>(timetable[hash(class_.name)][previousDay][previousPeriod] as string);

      if (
        validateSwap(
          timetable,
          unavailable,
          remainingLectures,
          class_,
          newSubject,
          currentDay,
          currentPeriod,
          oldSubject,
          previousDay,
          previousPeriod,
        )
      ) {
        // set new subject to old slot
        setSlot(timetable, unavailable, remainingLectures, true, class_, newSubject, previousDay, previousPeriod);
        // set old subject to new spot
        setSlot(timetable, unavailable, remainingLectures, false, class_, oldSubject, currentDay, currentPeriod);
        return;
      }
    }
  }
}

export function setSlot(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  shouldDecrementQuantity: boolean,
  class_: Class,
  subject: Subject,
  day: number,
  period: number,
) {
  if (subject === null) return;
  // used if classroom constraint is not present
  const fallbackClassroom = getFallbackClassroom(unavailable.classrooms, day, period);
  const assignedClassroom = subject.classroom || fallbackClassroom;
  const subjectHashed = hash({ ...subject, classroom: assignedClassroom });

  timetable[hash(class_.name)][day][period] = subjectHashed;
  unavailable.teachers[hash(subject.teacher)][day][period] = subjectHashed;
  unavailable.classrooms[hash(assignedClassroom)][day][period] = subjectHashed;

  if (shouldDecrementQuantity) remainingLectures[class_.name][subject.name]--;
}
