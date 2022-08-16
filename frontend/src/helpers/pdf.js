import { generateColor } from './color';
import { maxHoursPerDay } from './count';
import zip from 'lodash.zip';

export function getDocDefinition(timetable) {
  console.log(timetable);
  const dd = {
    content: Object.keys(timetable).map((timetableTitle, i) => {
      const timetableData = timetable[timetableTitle];
      console.log(timetableData);
      console.log();
      return [
        { text: timetableTitle, fontSize: 28, bold: true, margin: [0, 0, 0, 10], pageBreak: i === 0 ? null : 'before' },
        {
          table: {
            widths: [30, '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '#', alignment: 'center', bold: true },
                { text: 'Monday', bold: true, margin: [3, 0] },
                { text: 'Tuesday', bold: true, margin: [3, 0] },
                { text: 'Wednesday', bold: true, margin: [3, 0] },
                { text: 'Thursday', bold: true, margin: [3, 0] },
                { text: 'Friday', bold: true, margin: [3, 0] },
              ],
              ...zip(...timetableData).map((row, i) => [
                { stack: ['\n', { text: i + 1, bold: true, alignment: 'center' }, '\n'], margin: [3, 4] },
                ...row.map((col, i) => {
                  if (i + 1 > maxHoursPerDay(timetableData)) {
                    return undefined;
                  }
                  if (!col) {
                    return { stack: [] };
                  }
                  const subject = JSON.parse(col);
                  return {
                    stack: [
                      { text: subject.name, bold: true },
                      '\n',
                      `${subject.teacher.name} - ${subject.classroom?.name || ''}`,
                    ],
                    fillColor: generateColor(subject.name),
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
  return dd;
}
