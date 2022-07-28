export type Teacher = {
  name: string;
};

export type Classroom = {
  name: string;
};

export type Subject = {
  name: string;
  timesPerWeek: number | number[];
  teacher: Teacher;
  classroom?: Classroom;
  class?: string;
};

export type Class = {
  name: string;
  subjects: Subject[];
};

export type GenerateScheduleProps = {
  classes: Class[];
  classrooms: Classroom[];
};

export type Matrix = (string | null)[][];

export type MatrixHashmap = {
  [key: string]: Matrix;
};

export type GenerateScheduleResult = {
  timetable: MatrixHashmap;
  remainingLectures: {
    [className: string]: {
      [subjectName: string]: number;
    };
  };
};
