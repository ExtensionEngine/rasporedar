export interface Teacher {
  name: string;
}

export interface Classroom {
  name: string;
}

export interface Subject {
  name: string;
  timesPerWeek: number | number[];
  teacher: Teacher;
  classroom?: Classroom;
  class?: string;
}

export interface Class {
  name: string;
  subjects: Subject[];
}

export interface GenerateScheduleProps {
  classes: Class[];
  classrooms: Classroom[];
}

export interface ClassResult {
  name: string;
}

export interface TeacherResult {
  name: string;
}

export interface GenerateScheduleResult {
  classes: ClassResult[];
  teachers: TeacherResult[];
}
