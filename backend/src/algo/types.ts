interface Teacher {
  name: string;
}

interface Classroom {
  name: string;
}

interface Subject {
  name: string;
  teacher?: Teacher;
  classroom?: Classroom;
}

interface Class {
  name: string;
  subjects: Subject[];
}

export interface GenerateScheduleProps {
  classes: Class[];
  classrooms: Classroom[];
}

interface ClassResult {
  name: string;
}

interface TeacherResult {
  name: string;
}

export interface GenerateScheduleResult {
  classes: ClassResult[];
  teachers: TeacherResult[];
}
