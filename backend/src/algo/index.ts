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

  for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
    for (let periodIndex = 0; periodIndex < maxPeriodsPerDay; periodIndex++) {
      shuffleArray(classes).forEach(class_ => {
        if (timetable[hash(class_)][dayIndex][periodIndex] !== null) {
          return;
        }

        const periodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTimesPerWeek(s), 0);
        const periodsPerDay = Math.trunc(periodsPerWeek / daysPerWeek) + 1;
        if (!(periodIndex < periodsPerDay)) {
          return;
        }

        shuffleArray(class_.subjects).forEach(subject => {
          if (unavailable.teachers[hash(subject.teacher)][dayIndex][periodIndex]) {
            return;
          }

          if (subject.classroom && unavailable.classrooms[hash(subject.classroom)][dayIndex][periodIndex]) {
            return;
          }

          // get random classroom if not exists
          // if (!subject.classroom) {
          // const available = Object.keys(unavailable.classrooms).filter(
          //   r => !unavailable.classrooms[r][dayIndex][periodIndex],
          // );
          // subject.classroom = unhash(shuffleArray(available)[0]) as Classroom;
          // }

          // console.log(subject);
          timetable[hash(class_)][dayIndex][periodIndex] = hash(subject);
        });
      });
    }
  }

  Object.keys(timetable).forEach(class_ => {
    console.log('Class: ', unhash<Class>(class_).name);

    console.table(timetable[class_].map(day => day.map(period => (period ? unhash<Subject>(period).name : null))));
  });

  return;

  // const remainingLectures = classes.map(className =>
  //   teachers.map(teacher => {
  //     const index = teacher.assigned.findIndex(e => e.className === className);
  //     return index !== -1 ? teacher.assigned[index].lectureDistribution.reduce((a, b) => a + b, 0) : 0;
  //   }),
  // );

  // // treba ovdje provjerit jel uopce ima toliko perioda da blok satovi ne mogu izvirit vani
  // const isSchedulePossible = (teacherIndex: number, classIndex: number, dayIndex: number, periodIndex: number) =>
  //   !(availableTeachers[teacherIndex][dayIndex][periodIndex] || availableClasses[classIndex][dayIndex][periodIndex]);

  //       foreach teacher
  //       if teacher is available and for that class etc.
  //         if class is possible
  //           handle multiple hour lectures
  //           insert in final timetable and availability arrs

  // for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
  //   for (let periodIndex = 0; periodIndex < periodsPerDay; periodIndex++) {
  //     classes.forEach((className: string, classIndex: number) => {
  //       if (finalTimetable[classIndex][dayIndex][periodIndex] !== null) {
  //         return;
  //       }

  //       for (let teacherIndex = 0; teacherIndex < teachers.length; teacherIndex++) {
  //         const valid = teachers[teacherIndex].assigned.findIndex(l => l.className === className);
  //         if (
  //           valid === -1 ||
  //           availableTeachers[teacherIndex][dayIndex].some(p => p === className) ||
  //           remainingLectures[classIndex][teacherIndex] === 0
  //         ) {
  //           continue;
  //         }

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
  //         }
  //       }
  //     });
  //   }
  // }

  // // finalTimetable.keys.forEach((tt, i) => {
  // //   console.log('Class: ', classes[i]);

  // //   console.table(tt);
  // // });

  // let remaining = 0;
  // remainingLectures.forEach((lecture, i) => {
  //   lecture.forEach((value, j) => {
  //     if (value > 0) {
  //       remaining++;
  //     }
  //   });
  // });
  // console.log('Remaining Lectures: ' + remaining);

  // console.table(remainingLectures);

  return 'raspored';
}
