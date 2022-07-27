type Subject = {
  name: string;
  lectures: number;
};

type Lecture = {
  className: string;
  subject: Subject;
  lectureDistribution: number[];
};

type Teacher = {
  name: string;
  assigned: Lecture[];
};

const getEmpty3DArray = (x: number, y: number, z: number) => {
  const arr: (string | null)[][][] = [];
  for (let i = 0; i < x; i++) {
    arr[i] = [];
    for (let j = 0; j < y; j++) {
      arr[i][j] = [];
      for (let k = 0; k < z; k++) {
        arr[i][j][k] = null;
      }
    }
  }
  return arr;
};

export function generateSchedule(_p: any): any {
  const daysPerWeek = 5;
  const periodsPerDay = 4;

  const classes = ['1a', '1b', '1c', '2a', '2b'];
  const subjects: Subject[] = [
    { name: 'matematika', lectures: 3 },
    { name: 'hrvatski', lectures: 3 },
    { name: 'fizika', lectures: 2 },
    { name: 'engleski', lectures: 2 },
    { name: 'glazbeni', lectures: 1 },
    { name: 'likovni', lectures: 1 },
  ];
  const teachers: Teacher[] = [
    {
      name: 'Mate Matic',
      assigned: [
        { className: classes[0], subject: subjects[0], lectureDistribution: [1, 1, 1] },
        { className: classes[1], subject: subjects[0], lectureDistribution: [1, 1, 1] },
        { className: classes[2], subject: subjects[0], lectureDistribution: [1, 1, 1] },
        { className: classes[3], subject: subjects[0], lectureDistribution: [1, 1, 1] },
        { className: classes[4], subject: subjects[0], lectureDistribution: [1, 1, 1] },
      ],
    },
    {
      name: 'Ana Anic',
      assigned: [
        { className: classes[0], subject: subjects[1], lectureDistribution: [1, 1, 1] },
        { className: classes[1], subject: subjects[1], lectureDistribution: [1, 1, 1] },
        { className: classes[2], subject: subjects[1], lectureDistribution: [1, 1, 1] },
        { className: classes[3], subject: subjects[1], lectureDistribution: [2, 1] },
        { className: classes[4], subject: subjects[1], lectureDistribution: [2, 1] },
      ],
    },
    {
      name: 'Ante Antic',
      assigned: [
        { className: classes[3], subject: subjects[2], lectureDistribution: [1, 1] },
        { className: classes[4], subject: subjects[2], lectureDistribution: [1, 1] },
      ],
    },
    {
      name: 'Luka Lukic',
      assigned: [
        { className: classes[0], subject: subjects[3], lectureDistribution: [1, 1] },
        { className: classes[1], subject: subjects[3], lectureDistribution: [1, 1] },
        { className: classes[2], subject: subjects[3], lectureDistribution: [1, 1] },
        { className: classes[3], subject: subjects[3], lectureDistribution: [1, 1] },
        { className: classes[4], subject: subjects[3], lectureDistribution: [1, 1] },
      ],
    },
    {
      name: 'Iva Ivic',
      assigned: [
        { className: classes[0], subject: subjects[4], lectureDistribution: [1] },
        { className: classes[1], subject: subjects[4], lectureDistribution: [1] },
        { className: classes[2], subject: subjects[4], lectureDistribution: [1] },
      ],
    },
    {
      name: 'Maja Majic',
      assigned: [
        { className: classes[0], subject: subjects[5], lectureDistribution: [1] },
        { className: classes[1], subject: subjects[5], lectureDistribution: [1] },
        { className: classes[2], subject: subjects[5], lectureDistribution: [1] },
      ],
    },
  ];

  const finalTimetable = getEmpty3DArray(classes.length, daysPerWeek, periodsPerDay);
  const availableTeachers = getEmpty3DArray(teachers.length, daysPerWeek, periodsPerDay);
  const availableClasses = getEmpty3DArray(classes.length, daysPerWeek, periodsPerDay);

  const remainingLectures = classes.map(className =>
    teachers.map(teacher => {
      const index = teacher.assigned.findIndex(e => e.className === className);
      return index !== -1 ? teacher.assigned[index].subject.lectures : 0;
    }),
  );

  console.log('var: remainingLectures');
  console.log('row: classIndex');
  console.log('col: teacherIndex');
  console.table(remainingLectures);

  // treba ovdje provjerit jel uopce ima toliko perioda da blok satovi ne mogu izvirit vani
  const isSchedulePossible = (teacherIndex: number, classIndex: number, dayIndex: number, periodIndex: number) =>
    !(availableTeachers[teacherIndex][dayIndex][periodIndex] || availableClasses[classIndex][dayIndex][periodIndex]);

  for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
    for (let periodIndex = 0; periodIndex < periodsPerDay; periodIndex++) {
      classes.forEach((className: string, classIndex: number) => {
        if (finalTimetable[classIndex][dayIndex][periodIndex] !== null) {
          return;
        }

        for (let teacherIndex = 0; teacherIndex < teachers.length; teacherIndex++) {
          const valid = teachers[teacherIndex].assigned.findIndex(l => l.className === className);
          if (
            valid === -1 ||
            availableTeachers[teacherIndex][dayIndex].some(p => p === className) ||
            remainingLectures[classIndex][teacherIndex] === 0
          ) {
            continue;
          }

          if (isSchedulePossible(teacherIndex, classIndex, dayIndex, periodIndex)) {
            let lectureCount = 1;
            const longestLecture = teachers[teacherIndex].assigned[valid].lectureDistribution[0];
            if (
              remainingLectures[classIndex][teacherIndex] > 1 &&
              longestLecture > 1 &&
              isSchedulePossible(teacherIndex, classIndex, dayIndex, periodIndex + 1)
            ) {
              lectureCount = 2;
            }
            for (let i = 0; i < lectureCount; i++) {
              finalTimetable[classIndex][dayIndex][periodIndex + i] = teachers[teacherIndex].name;
              availableClasses[classIndex][dayIndex][periodIndex + i] = teachers[teacherIndex].name;
              availableTeachers[teacherIndex][dayIndex][periodIndex + i] = className;
              remainingLectures[classIndex][teacherIndex]--;
            }
            break;
          }
        }
      });
    }
  }

  finalTimetable.forEach((tt, i) => {
    console.log('Class: ', classes[i]);

    console.table(tt);
  });

  let remaining = 0;
  remainingLectures.forEach((lecture, i) => {
    lecture.forEach((value, j) => {
      if (value > 0) {
        remaining++;
      }
    });
  });
  console.log('Remaining Lectures: ' + remaining);

  console.table(remainingLectures);

  return 'raspored';
}
