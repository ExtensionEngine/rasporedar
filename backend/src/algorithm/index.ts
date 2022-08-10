import { daysPerWeek, maxPeriodsPerDay } from './consts';
import { GenerateTimetableProps, GenerateTimetableResult, RemainingLectures } from './types';
import { getLectureCountForDay, getTotalRemainingLectures, getTotalTimesPerWeek } from './utils/subject';
import { setSlot, swapSlots } from './utils/slot';
import { checkConstraints } from './utils/constraint';
import { generateTimetableProps } from './seed';
import { getClassPeriodsPerDay } from './utils/class';
import { getMatrixHashmap } from './utils/matrix';
import { shuffleArray } from './utils/array';

export function generateTimetable({ classes, classrooms }: GenerateTimetableProps): GenerateTimetableResult {
  const teachers = classes
    .map(c => c.subjects.map(s => s.teacher))
    .flat()
    .filter((t, i, arr) => arr.findIndex(ts => ts.name === t.name) === i);

  const timetable = getMatrixHashmap(classes.map(c => c.name));
  const unavailable = {
    teachers: getMatrixHashmap(teachers),
    classrooms: getMatrixHashmap(classrooms),
  };

  const remainingLectures: RemainingLectures = Object.fromEntries(
    classes.map(class_ => [
      class_.name,
      Object.fromEntries(class_.subjects.map(subject => [subject.name, getTotalTimesPerWeek(subject)])),
    ]),
  );

  const periods = Object.fromEntries(classes.map(class_ => [class_.name, getClassPeriodsPerDay(class_)]));

  for (let dayIndex = 0; dayIndex < daysPerWeek; ++dayIndex) {
    for (let periodIndex = 0; periodIndex < maxPeriodsPerDay; ++periodIndex) {
      shuffleArray(classes).forEach(class_ => {
        if (periodIndex < periods[class_.name][dayIndex]) {
          shuffleArray(class_.subjects).forEach(subject => {
            if (checkConstraints(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex)) {
              swapSlots(timetable, unavailable, remainingLectures, class_, subject, dayIndex, periodIndex, periods);
              return;
            }

            setSlot(timetable, unavailable, remainingLectures, true, class_, subject, dayIndex, periodIndex);
          });
        }
      });
    }
  }

  if (getTotalRemainingLectures(remainingLectures) === 0) {
    return { timetable, remainingLectures };
  }

  return generateTimetable(generateTimetableProps);
}
