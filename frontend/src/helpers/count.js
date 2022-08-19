export function maxHoursPerDay(timetable) {
  let maxHoursPerDay = 0;

  timetable.forEach(day => {
    day.forEach((hour, hourIndex) => {
      if (!hour) {
        return;
      }
      maxHoursPerDay = Math.max(maxHoursPerDay, hourIndex + 1);
    });
  });

  return maxHoursPerDay;
}
