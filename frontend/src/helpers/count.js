export function maxHoursPerDay(timetable) {
  let maxHoursPerDay = 0;
  timetable.forEach(day => {
    const hoursPerDay = day.filter(subject => subject !== null).length;
    if (hoursPerDay > maxHoursPerDay) {
      maxHoursPerDay = hoursPerDay;
    }
  });
  return maxHoursPerDay;
}
