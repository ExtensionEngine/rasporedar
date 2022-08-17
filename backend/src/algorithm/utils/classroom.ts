import { Classroom, MatrixHashmap } from '../types';
import { shuffle } from 'lodash';
import { unhash } from './hash';

export function getFallbackClassroom(classrooms: MatrixHashmap, day: number, period: number) {
  const availableClassrooms = Object.keys(classrooms).filter(room => !classrooms[room][day][period]);
  return unhash<Classroom>(shuffle(availableClassrooms)[0]);
}
