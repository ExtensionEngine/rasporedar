import { range, shuffleArray } from './array';
import { Class } from '../types';
import { daysPerWeek } from '../consts';
import { getTotalTimesPerWeek } from './subject';

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = range(daysPerWeek, 1, -1);
  let totalPeriodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTotalTimesPerWeek(s), 0);

  const periodsPerDay: number[] = workingDays.map(day => {
    const periods = Math.trunc(totalPeriodsPerWeek / day);
    totalPeriodsPerWeek -= periods;
    return periods;
  });

  return shuffleArray(periodsPerDay);
}
