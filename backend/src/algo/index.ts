const empty2DArray = (x: number, y: number): string[][] => new Array(x).fill(new Array(y).fill(null));
const empty3DArray = (x: number, y: number, z: number): string[][][] => new Array(x).fill(empty2DArray(y, z));

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

export function generateSchedule(_p: any): any {
  const daysPerWeek = 5;
  const periodsPerDay = 7;

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

  const finalTimetable = empty3DArray(classes.length, daysPerWeek, periodsPerDay);
  const availableTeachers = empty3DArray(teachers.length, daysPerWeek, periodsPerDay);
  const availableClasses = empty3DArray(classes.length, daysPerWeek, periodsPerDay);

  const remainingLectures = classes.map(className =>
    teachers.map(teacher => {
      const validIndex = teacher.assigned.findIndex(e => e.className === className);
      return validIndex !== -1 ? teacher.assigned[validIndex].subject.lectures : 0;
    }),
  );

  console.log('var: remainingLectures');
  console.log('row: classIndex');
  console.log('col: teacherIndex');
  console.table(remainingLectures);

  const isSchedulePossible = (teacherIndex: number, classIndex: number, dayIndex: number, periodIndex: number) =>
    !(availableTeachers[teacherIndex][dayIndex][periodIndex] || availableClasses[classIndex][dayIndex][periodIndex]);

  for (let dayIndex = 0; dayIndex < daysPerWeek; dayIndex++) {
    for (let periodIndex = 0; periodIndex < periodsPerDay; periodIndex++) {
      classes.forEach((className: string, classIndex: number) => {
        if (finalTimetable[classIndex][dayIndex][periodIndex] !== null) {
          return;
        }

        // ovo zaminit sa for loopon
        teachers.forEach((teacher: Teacher, teacherIndex: number) => {
          const valid = teacher.assigned.findIndex(l => l.className === className);
          if (
            valid === -1 ||
            availableTeachers[teacherIndex][dayIndex].some(l => l === className) ||
            remainingLectures[classIndex][teacherIndex] === 0
          ) {
            return;
          }

          if (isSchedulePossible(teacherIndex, classIndex, dayIndex, periodIndex)) {
            let lectureCount = 1;
            //     let longestLecture = t[teacher].assigned[valid].lecture[0];
            //     if (
            //       remainingLectures[classIndex][teacher] > 1 &&
            //       longestLecture > 1 &&
            //       isSchedulePossible(teacher, classIndex, { d: day, p: period + 1 })
            //     ) {
            //       lectureCount = 2;
            //       if (longestLecture > 2 && isSchedulePossible(teacher, classIndex, { d: day, p: period + 2 }))
            //         lectureCount = 3;
            //     }
            //     for (let i = 0; i < lectureCount; ++i) {
            //       final_tt[classIndex][day][period + i] = t[teacher].name;
            //       c_available[classIndex][day][period + i] = t[teacher].name;
            //       t_available[teacher][day][period + i] = className;
            //       remainingLectures[classIndex][teacher]--;
            //     }
            break;
          }
        });
      });
    }
  }

  return 'raspored';
}
