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
};

export type Class = {
  name: string;
  subjects: Subject[];
};

export type Matrix = (string | null)[][];

export type MatrixHashmap = {
  [key: string]: Matrix;
};

export type RemainingLectures = {
  [className: string]: {
    [subjectName: string]: number;
  };
};

export type Unavailable = {
  teachers: MatrixHashmap;
  classrooms: MatrixHashmap;
};

export type Periods = {
  [class_: string]: number[];
};

export type GenerateTimetableProps = {
  classes: Class[];
  classrooms: Classroom[];
};

export type GenerateTimetableResult = {
  timetable: MatrixHashmap;
  remainingLectures: RemainingLectures;
};
