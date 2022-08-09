import { Class, MatrixHashmap, Periods, RemainingLectures, Subject, Unavailable } from './types';
import { daysPerWeek, maxPeriodsPerDay } from './consts';

export function getMatrix(x: number, y: number) {
  const matrix = new Array(x);

  for (let i = 0; i < x; ++i) {
    matrix[i] = new Array(y).fill(null);
  }

  return matrix;
}

export function getMatrixHashmap(keys: unknown[]) {
  return Object.fromEntries(keys.map(key => [hash(key), getMatrix(daysPerWeek, maxPeriodsPerDay)]));
}

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

export function range(from: number, to: number, step = 1) {
  return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
}

export function shuffleArray<Type>(value: Type[]): Type[] {
  const array = [...value];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function hash(key: unknown): string {
  return JSON.stringify(key);
}

export function unhash<Type>(value: string): Type {
  return JSON.parse(value);
}

function checkIfClassUnavailable(timetable: MatrixHashmap, class_: Class, dayIndex: number, periodIndex: number) {
  return timetable[hash(class_.name)][dayIndex][periodIndex];
}

function checkIfTeacherUnavailable(unavailable: Unavailable, subject: Subject, dayIndex: number, periodIndex: number) {
  return unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex];
}

function checkIfClassroomUnavailable(
  unavailable: Unavailable,
  subject: Subject,
  dayIndex: number,
  periodIndex: number,
) {
  return subject.classroom && unavailable.classrooms[hash(subject.classroom)][dayIndex][periodIndex];
}

function checkIfLectureQuantityFulfilled(remainingLectures: RemainingLectures, class_: Class, subject: Subject) {
  return remainingLectures[class_.name][subject.name] === 0;
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
    checkIfLectureQuantityFulfilled(remainingLectures, class_, subject) // all lectures for subject are in schedule
  );
}

export function swapSlot(
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

  for (let i = 0; i <= dayIndex && !found; ++i) {
    const periodLength = i === dayIndex ? periodIndex : periods[class_.name][i];

    for (let j = 0; j < periodLength; ++j) {
      const oldSubject = unhash<Subject>(timetable[hash(class_.name)][i][j] as string);

      if (
        !(
          checkIfClassUnavailable(timetable, class_, dayIndex, periodIndex) ||
          checkIfTeacherUnavailable(unavailable, oldSubject, dayIndex, periodIndex) ||
          checkIfClassroomUnavailable(unavailable, oldSubject, dayIndex, periodIndex)
        ) &&
        !(
          checkIfTeacherUnavailable(unavailable, newSubject, i, j) ||
          checkIfLectureQuantityFulfilled(remainingLectures, class_, newSubject)
        )
      ) {
        // set new subject to old slot
        let fallbackClassroom = shuffleArray(
          Object.keys(unavailable.classrooms).filter(room => !unavailable.classrooms[room][dayIndex][periodIndex]),
        )[0];

        timetable[hash(class_.name)][i][j] = hash(newSubject);
        unavailable.teachers[hash(newSubject.teacher)][i][j] = hash(newSubject);
        unavailable.classrooms[hash(newSubject.classroom) || fallbackClassroom][i][j] = hash(newSubject);
        remainingLectures[class_.name][newSubject.name]--;

        // set old subject to new spot
        fallbackClassroom = shuffleArray(
          Object.keys(unavailable.classrooms).filter(room => !unavailable.classrooms[room][dayIndex][periodIndex]),
        )[0];
        timetable[hash(class_.name)][dayIndex][periodIndex] = hash(oldSubject);
        unavailable.teachers[hash(oldSubject.teacher)][dayIndex][periodIndex] = hash(oldSubject);
        unavailable.classrooms[hash(oldSubject.classroom) || fallbackClassroom][dayIndex][periodIndex] =
          hash(oldSubject);

        found = true;
        break;
      }
    }
  }
}
