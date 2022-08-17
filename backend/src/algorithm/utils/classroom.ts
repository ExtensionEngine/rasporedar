import { MatrixHashmap } from '../types';
import { shuffle } from 'lodash';

export function getFallbackClassroom(classrooms: MatrixHashmap, day: number, period: number) {
  const availableClassrooms = Object.keys(classrooms).filter(room => !classrooms[room][day][period]);
  return shuffle(availableClassrooms)[0];
}
