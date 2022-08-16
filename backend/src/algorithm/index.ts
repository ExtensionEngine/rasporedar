import { daysPerWeek, maxPeriodsPerDay } from './consts';
import { GenerateTimetableProps, GenerateTimetableResult } from './types';
import { getPeriodsPerClass, getRemainingLectures } from './utils/class';
import { setSlot, swapSlots } from './utils/slot';
import { checkIfAnyConstraintBroken } from './utils/constraint';
import { generateTimetableProps } from './seed';
import { getMatrixHashmap } from './utils/matrix';
import { getTeachers } from './utils/teacher';
import { getTotalRemainingLecturesCount } from './utils/subject';
import { shuffle } from 'lodash';

export function generateTimetable({ classes, classrooms }: GenerateTimetableProps): GenerateTimetableResult {
  const teachers = getTeachers(classes);
  const timetable = getMatrixHashmap(classes.map(class_ => class_.name));
  const remainingLectures = getRemainingLectures(classes); // holds current state for every subject lecture count
  // holds current state for every teacher and classroom occupancy at certain time slot
  const unavailable = {
    teachers: getMatrixHashmap(teachers),
    classrooms: getMatrixHashmap(classrooms),
  };
  const periods = getPeriodsPerClass(classes);

  for (let day = 0; day < daysPerWeek; ++day) {
    for (let period = 0; period < maxPeriodsPerDay; ++period) {
      // shuffle classes for for more equal classroom distribution
      shuffle(classes).forEach(class_ => {
        // check if current period exceeds calculated period count for current class on current day
        if (period >= periods[class_.name][day]) return;
        // shuffle subjects for more equal subject distribution
        shuffle(class_.subjects).forEach(subject => {
          const isConstraintBroken = checkIfAnyConstraintBroken(
            timetable,
            unavailable,
            remainingLectures,
            class_,
            subject,
            day,
            period,
          );

          return isConstraintBroken
            ? swapSlots(timetable, unavailable, remainingLectures, class_, subject, day, period, periods)
            : setSlot(timetable, unavailable, remainingLectures, true, class_, subject, day, period);
        });
      });
    }
  }
  // recursively generates timetables until it finds one with no remaining lectures
  if (getTotalRemainingLecturesCount(remainingLectures) === 0) {
    return { timetable, remainingLectures };
  }

  return generateTimetable(generateTimetableProps);
}
