import { Subject } from './types';

export function getConflictingSubjectIndexes(subjects: Subject[], propGetFn: (s: Subject) => unknown): number[][] {
  const indexes: number[][] = [];
  [...new Set(subjects.map(s => propGetFn(s)))].forEach(prop => {
    const subjectIndexes: number[] = [];
    subjects.forEach((subject, index) => {
      if (prop && propGetFn(subject) === prop) {
        subjectIndexes.push(index);
      }
    });
    if (subjectIndexes.length) {
      indexes.push(subjectIndexes);
    }
  });
  return indexes;
}
