import { range, shuffle } from 'lodash';
import { Class } from '../types';
import { daysPerWeek } from '../consts';

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = range(daysPerWeek, 0, -1);
  let totalPeriodsPerWeek = class_.subjects.reduce((sum, subject) => sum + subject.timesPerWeek, 0);
  const periodsPerDay: number[] = workingDays.map(day => {
    // calculate average period quantity for that day
    const periods = Math.trunc(totalPeriodsPerWeek / day);
    // subtract calculated period quantity from total amount for more equal period distribution
    totalPeriodsPerWeek -= periods;
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
