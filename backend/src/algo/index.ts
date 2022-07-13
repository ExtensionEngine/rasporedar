import { GenerateScheduleProps, GenerateScheduleResult } from './types';
import { getConflictingSubjectIndexes } from './utils';

export function generateSchedule({ classes, classrooms }: GenerateScheduleProps): GenerateScheduleResult {
  const subjects = classes.map(c => c.subjects.map(s => ({ ...s, class: c.name }))).flat();

  const conflictingIds = [
    ...getConflictingSubjectIndexes(subjects, s => s.class),
    ...getConflictingSubjectIndexes(subjects, s => s.teacher?.name),
    ...getConflictingSubjectIndexes(subjects, s => s.classroom?.name),
  ];

  console.log(conflictingIds);

  return { classes: [], teachers: [] };
}
