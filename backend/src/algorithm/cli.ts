#!npx ts-node

import { generateTimetable } from './index';
import { generateTimetableProps } from './seed';
import { Subject } from './types';
import { unhash } from './utils/hash';

const { timetable, remainingLectures } = generateTimetable(generateTimetableProps);

Object.keys(timetable).forEach(class_ => {
  console.log('Class: ', class_);
  console.table(
    timetable[class_].map(day => day.map(period => (period ? unhash<Subject>(period).name : null)).filter(d => d)),
    //                                                                                             ^^^^^^^^^^^^^^ hide empty slots in output
  );
});

console.log(
  'Remaining lectures',
  Object.values(remainingLectures).reduce((sum, ls) => sum + Object.values(ls).reduce((sum, l) => sum + l, 0), 0),
);
console.table(remainingLectures);
