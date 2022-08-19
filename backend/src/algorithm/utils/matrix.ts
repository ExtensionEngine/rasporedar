import { daysPerWeek, maxPeriodsPerDay } from '../consts';
import { hash } from './hash';
import { MatrixHashmap } from 'algorithm/types';

export function getMatrix(x: number, y: number) {
  const matrix = new Array(x);

  for (let i = 0; i < x; ++i) {
    matrix[i] = new Array(y).fill(null);
  }

  return matrix;
}

export function getMatrixHashmap(keys: unknown[]) {
  const matrixHashmap = keys.reduce((map: MatrixHashmap, key) => {
    map[hash(key)] = getMatrix(daysPerWeek, maxPeriodsPerDay);
    return map;
  }, {});

  return matrixHashmap;
}

export function mapMatrixHashmap(
  timetable: MatrixHashmap,
  transformCell: (cell: string | null) => unknown,
  transformTitle: (title: string) => unknown,
) {
  const transformedTimetable = Object.keys(timetable).map(timetableTitle => {
    const timetableData = timetable[timetableTitle];
    const transformedTimetableData = timetableData.map(day => day.map(transformCell));

    return [transformTitle(timetableTitle), transformedTimetableData];
  });

  return Object.fromEntries(transformedTimetable);
}
