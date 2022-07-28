import { Class, Classroom, GenerateScheduleProps, Subject } from './types';

const daysPerWeek = 5;
const maxPeriodsPerDay = 8;

function getMatrix(x: number, y: number): (string | null)[][] {
  const matrix: (string | null)[][] = [];
  for (let i = 0; i < x; i++) {
    matrix[i] = [];
    for (let j = 0; j < y; j++) {
      matrix[i][j] = null;
    }
  }
  return matrix;
}

function getMatrixHashmap(keys: unknown[]) {
  return Object.fromEntries(keys.map(key => [hash(key), getMatrix(daysPerWeek, maxPeriodsPerDay)]));
}

function getTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

function shuffleArray<Type>(value: Type[]): Type[] {
  const array = [...value];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function hash(key: unknown): string {
  return JSON.stringify(key);
}

function unhash<Type>(value: string): Type {
  return JSON.parse(value);
}

export function generateSchedule({ classes, classrooms }: GenerateScheduleProps): any {
  const teachers = classes
    .map(c => c.subjects.map(s => s.teacher))
    .flat()
    .filter((t, i, arr) => arr.findIndex(ts => ts.name === t.name) === i);

  const timetable = getMatrixHashmap(classes);
  const unavailable = {
    teachers: getMatrixHashmap(teachers),
    classrooms: getMatrixHashmap(classrooms),
  };

  const remainingLectures = Object.fromEntries(
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
          if (
            timetable[hash(class_)][dayIndex][periodIndex] || // class in not available
            unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex] || // teacher is not available
            (subject.classroom && unavailable.classrooms[hash(subject.classroom)][dayIndex][periodIndex]) || // classroom is not available
            remainingLectures[class_.name][subject.name] === 0 // all lectures for subject are in schedule
          ) {
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

  Object.keys(timetable).forEach(class_ => {
    console.log('Class: ', unhash<Class>(class_).name);
    console.table(timetable[class_].map(day => day.map(period => (period ? unhash<Subject>(period).name : null))));
  });

  console.log(
    'Remaining lectures',
    Object.values(remainingLectures).reduce((sum, ls) => sum + Object.values(ls).reduce((sum, l) => sum + l, 0), 0),
  );
  console.table(remainingLectures);

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

  return 'raspored';
}
