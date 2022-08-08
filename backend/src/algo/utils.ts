import { Class, Matrix, Subject } from './types';
import { daysPerWeek, maxPeriodsPerDay } from './consts';

export function getMatrix(x: number, y: number) {
  const matrix: Matrix = [];

  for (let i = 0; i < x; i++) {
    matrix[i] = [];
    for (let j = 0; j < y; j++) {
      matrix[i][j] = null;
    }
  }
  return matrix;
}

export function getMatrixHashmap(keys: unknown[]) {
  return Object.fromEntries(keys.map(key => [hash(key), getMatrix(daysPerWeek, maxPeriodsPerDay)]));
}

export function getTimesPerWeek({ timesPerWeek }: Subject) {
  return timesPerWeek instanceof Array ? timesPerWeek.reduce((a, b) => a + b, 0) : timesPerWeek;
}

export function getClassPeriodsPerDay(class_: Class) {
  const workingDays = [5, 4, 3, 2, 1];
  let totalPeriodsPerWeek = class_.subjects.reduce((sum, s) => sum + getTimesPerWeek(s), 0);

  const periodsPerDay: number[] = workingDays.map(day => {
    const periods = Math.trunc(totalPeriodsPerWeek / day);
    totalPeriodsPerWeek -= periods;
    return periods;
  });

  return shuffleArray(periodsPerDay);
}

export function shuffleArray<Type>(value: Type[]): Type[] {
  const array = [...value];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function hash(key: unknown): string {
  return JSON.stringify(key);
}

export function unhash<Type>(value: string): Type {
  return JSON.parse(value);
}
