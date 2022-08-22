import { Class, Subject } from 'algorithm/types';

export function removeEmptyFields(classes: Class[]): Class[] {
  const subjectMapper = (subject: Subject): Subject => ({
    ...subject,
    classroom: subject.classroom?.name ? subject.classroom : undefined,
  });

  return classes.map(class_ => ({
    ...class_,
    subjects: class_.subjects.map(subjectMapper),
  }));
}
