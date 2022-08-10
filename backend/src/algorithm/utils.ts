import { Class, MatrixHashmap, Periods, RemainingLectures, Subject, Unavailable } from './types';
import { hash, unhash } from './utils/hash';
import { range, shuffleArray } from './utils/array';
import { daysPerWeek } from './consts';
import { validateSwap } from './utils/constraint';

export function getTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = range(daysPerWeek, 1, -1);
  let totalPeriodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTimesPerWeek(s), 0);

  const periodsPerDay: number[] = workingDays.map(day => {
    const periods = Math.trunc(totalPeriodsPerWeek / day);
    totalPeriodsPerWeek -= periods;
    return periods;
  });

  return shuffleArray(periodsPerDay);
}

export function swapSlots(
  timetable: MatrixHashmap,
  unavailable: Unavailable,
  remainingLectures: RemainingLectures,
  class_: Class,
  newSubject: Subject,
  dayIndex: number,
  periodIndex: number,
  periods: Periods,
) {
  let found = false;

  for (let oldDayIndex = 0; oldDayIndex <= dayIndex && !found; ++oldDayIndex) {
    const periodLength = oldDayIndex === dayIndex ? periodIndex : periods[class_.name][oldDayIndex];

    for (let oldPeriodIndex = 0; oldPeriodIndex < periodLength && !found; ++oldPeriodIndex) {
      const oldSubject = unhash<Subject>(timetable[hash(class_.name)][oldDayIndex][oldPeriodIndex] as string);

      if (
        validateSwap(
          timetable,
          unavailable,
          remainingLectures,
          class_,
          newSubject,
          dayIndex,
          periodIndex,
          oldSubject,
          oldDayIndex,
          oldPeriodIndex,
        )
      ) {
        // set new subject to old slot
        setSlot(timetable, unavailable, remainingLectures, true, class_, newSubject, oldDayIndex, oldPeriodIndex);
        // set old subject to new spot
        setSlot(timetable, unavailable, remainingLectures, false, class_, oldSubject, dayIndex, periodIndex);

        found = true;
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
  dayIndex: number,
  periodIndex: number,
) {
  // used if classroom constraint is not present
  const fallbackClassroom = shuffleArray(
    Object.keys(unavailable.classrooms).filter(room => !unavailable.classrooms[room][dayIndex][periodIndex]),
  )[0];

  timetable[hash(class_.name)][dayIndex][periodIndex] = hash(subject);
  unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex] = hash(subject);
  unavailable.classrooms[hash(subject.classroom) || fallbackClassroom][dayIndex][periodIndex] = hash(subject);

  if (shouldDecrementQuantity) remainingLectures[class_.name][subject.name]--;
}
