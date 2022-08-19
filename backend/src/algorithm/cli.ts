#!npx ts-node

import { generateTimetable } from './index';
import { generateTimetableProps } from './seed';
import { getTotalRemainingLecturesCount } from './utils/subject';
import { Subject } from './types';
import { unhash } from './utils/hash';

const { timetable, remainingLectures } = generateTimetable(generateTimetableProps);
// this is for debugging purposes only
// display generated timetable for every class individually
Object.keys(timetable).forEach(class_ => {
  console.log('Class: ', class_);
  console.table(
    timetable[class_].map(day =>
      day
        .map(period => (period ? `${unhash<Subject>(period).name} - ${unhash<Subject>(period).classroom?.name}` : null))
        .filter(d => d),
    ),
    //                                                                                             ^^^^^^^^^^^^^^ hide empty slots in output
  );
});
// display total remaing lecture count from all timetables and a table that displays remaing lecture count for every subject related to every class
console.log('Remaining lectures', getTotalRemainingLecturesCount(remainingLectures));
console.table(remainingLectures);
