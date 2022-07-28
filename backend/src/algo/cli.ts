#!npx ts-node

import { Class, Subject } from './types';
import { generateSchedule } from './index';
import { generateScheduleProps } from './seed';
import { unhash } from './utils';

// fix console.log printing [Array] etc
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('util').inspect.defaultOptions.depth = null;

const { timetable, remainingLectures } = generateSchedule(generateScheduleProps);

Object.keys(timetable).forEach(class_ => {
  console.log('Class: ', unhash<Class>(class_).name);
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
