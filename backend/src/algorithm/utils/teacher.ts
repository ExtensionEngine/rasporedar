import { Class } from 'algorithm/types';
import { uniq } from 'lodash';

export function getTeachers(classes: Class[]) {
  const teachersWithDuplicates = classes.flatMap(class_ => class_.subjects.map(subject => subject.teacher));
  const uniqueTeachers = uniq(teachersWithDuplicates);

  return uniqueTeachers;
}
