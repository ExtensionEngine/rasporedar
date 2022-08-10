import { RemainingLectures, Subject } from '../types';

export function getTotalTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

export function getTotalRemainingLectures(remainingLectures: RemainingLectures) {
  return Object.values(remainingLectures).reduce(
    (sum, ls) => sum + Object.values(ls).reduce((sum, l) => sum + l, 0),
    0,
  );
}
