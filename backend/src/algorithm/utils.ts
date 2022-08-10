import { Class, Subject } from './types';
import { range, shuffleArray } from './utils/array';
import { daysPerWeek } from './consts';

export function getTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = range(daysPerWeek, 1, -1);
  let totalPeriodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTimesPerWeek(s), 0);

  const periodsPerDay: number[] = workingDays.map(day => {
    const periods = Math.trunc(totalPeriodsPerWeek / day);
    totalPeriodsPerWeek -= periods;
    return periods;
  });

  return shuffleArray(periodsPerDay);
}
