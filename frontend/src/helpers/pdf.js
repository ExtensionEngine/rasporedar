import { generateColor } from './color';
import { maxHoursPerDay } from './count';

const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function getDocDefinition(timetable, getCardPrimaryText, getCardSecondaryText) {
  return {
    content: Object.keys(timetable).map((timetableTitle, i) => {
      const timetableData = timetable[timetableTitle];
      const hoursPerDay = maxHoursPerDay(timetableData);
      return [
        { text: timetableTitle, fontSize: 28, bold: true, margin: [0, 0, 0, 10], pageBreak: i === 0 ? null : 'before' },
        {
          table: {
            widths: [30, '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '#', alignment: 'center', bold: true },
                ...daysInWeek.map(day => ({ text: day, bold: true, margin: [3, 0] })),
              ],
              ...Array(hoursPerDay)
                .fill()
                .map((_, hourIndex) => [
                  { stack: ['\n', { text: hourIndex + 1, bold: true, alignment: 'center' }, '\n'], margin: [3, 4] },
                  ...Array(daysInWeek.length)
                    .fill()
                    .map((_, dayIndex) => {
                      if (!timetableData[dayIndex][hourIndex]) {
                        return { stack: [] };
                      }
                      const subject = JSON.parse(timetableData[dayIndex][hourIndex]);
                      return {
                        stack: [{ text: getCardPrimaryText(subject), bold: true }, '\n', getCardSecondaryText(subject)],
                        fillColor: generateColor(getCardPrimaryText(subject)),
                        fillOpacity: 0.6,
                        margin: [3, 4],
                      };
                    }),
                ]),
            ],
          },
        },
      ];
    }),
    pageOrientation: 'landscape',
  };
}
