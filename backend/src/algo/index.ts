import { GenerateScheduleProps, GenerateScheduleResult } from './types';
import { getExcludedSubjectIndexes } from './utils';

export function generateSchedule({ classes, classrooms }: GenerateScheduleProps): GenerateScheduleResult {
  const subjects = classes.map(c => c.subjects).flat();

  const subjectIndexesExcludedByTeacher = getExcludedSubjectIndexes(subjects, s => s.teacher?.name);
  const subjectIndexesExcludedByClassroom = getExcludedSubjectIndexes(subjects, s => s.classroom?.name);

  console.log(subjectIndexesExcludedByTeacher, subjectIndexesExcludedByClassroom);

  return { classes: [], teachers: [] };
}
