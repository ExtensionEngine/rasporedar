import { range, shuffle, sumBy } from 'lodash';
import { Class } from '../types';
import { daysPerWeek } from '../consts';

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = range(daysPerWeek, 0, -1);
  let totalPeriodsPerWeek = sumBy(class_.subjects, 'timesPerWeek');
  const periodsPerDay: number[] = workingDays.map(day => {
    const periods = Math.trunc(totalPeriodsPerWeek / day); // calculate average period quantity for that day
    totalPeriodsPerWeek -= periods; // subtract calculated period quantity from total amount for more equal period distribution
    return periods;
  });

  return shuffle(periodsPerDay);
}

export function getRemainingLectures(classes: Class[]) {
  return Object.fromEntries(
    classes.map(class_ => [
      class_.name,
      Object.fromEntries(class_.subjects.map(subject => [subject.name, subject.timesPerWeek])),
    ]),
  );
}

export function getPeriodsPerClass(classes: Class[]) {
  return Object.fromEntries(classes.map(class_ => [class_.name, getClassPeriodsPerDay(class_)])); // holds daily total period quantity for every class
}
