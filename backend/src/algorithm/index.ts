import { daysPerWeek, maxPeriodsPerDay } from './consts';
import { GenerateTimetableProps, GenerateTimetableResult, RemainingLectures } from './types';
import { getTotalRemainingLectures, getTotalTimesPerWeek } from './utils/subject';
import { setSlot, swapSlots } from './utils/slot';
import { checkConstraints } from './utils/constraint';
import { generateTimetableProps } from './seed';
import { getClassPeriodsPerDay } from './utils/class';
import { getMatrixHashmap } from './utils/matrix';
import { getTeachers } from './utils/teachers';
import { shuffle } from 'lodash';

export function generateTimetable({ classes, classrooms }: GenerateTimetableProps): GenerateTimetableResult {
  const teachers = getTeachers(classes);
  const timetable = getMatrixHashmap(classes.map(class_ => class_.name));
  // holds current state for every teacher and classroom occupancy at certain time slot
  const unavailable = {
    teachers: getMatrixHashmap(teachers),
    classrooms: getMatrixHashmap(classrooms),
  };

  // holds current state for every subject lecture count
  const remainingLectures: RemainingLectures = Object.fromEntries(
    classes.map(class_ => [
      class_.name,
      Object.fromEntries(class_.subjects.map(subject => [subject.name, getTotalTimesPerWeek(subject)])),
    ]),
  );
  // holds daily total period quantity for every class
  const periods = Object.fromEntries(classes.map(class_ => [class_.name, getClassPeriodsPerDay(class_)]));

  for (let dayIndex = 0; dayIndex < daysPerWeek; ++dayIndex) {
    for (let periodIndex = 0; periodIndex < maxPeriodsPerDay; ++periodIndex) {
      // shuffle classes for for more equal classroom distribution
      shuffle(classes).forEach(class_ => {
        if (periodIndex < periods[class_.name][dayIndex]) {
          // shuffle subjects for more equal subject distribution
          shuffle(class_.subjects).forEach(subject => {
            // check if subject breaks any of the constraints
            if (checkConstraints(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex)) {
              // constraints are not met, try to swap with any of the previously allocated time slots
              swapSlots(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex, periods);
              return;
            }
            // constraints are met, set subject to current time slot
            setSlot(timetable, unavailable, remainingLectures, true, class_, subject, dayIndex, periodIndex);
          });
        }
      });
    }
  }
  // recursively generates timetables until it finds one with no remaining lectures
  if (getTotalRemainingLectures(remainingLectures) === 0) {
    return { timetable, remainingLectures };
  }

  return generateTimetable(generateTimetableProps);
}
