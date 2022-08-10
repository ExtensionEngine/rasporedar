import { daysPerWeek, maxPeriodsPerDay } from '../consts';
import { hash } from './hash';

export function getMatrix(x: number, y: number) {
  const matrix = new Array(x);

  for (let i = 0; i < x; ++i) {
    matrix[i] = new Array(y).fill(null);
  }

  return matrix;
}

export function getMatrixHashmap(keys: unknown[]) {
  return Object.fromEntries(keys.map(key => [hash(key), getMatrix(daysPerWeek, maxPeriodsPerDay)]));
}
