import { daysInWeek } from '@/constants/day';
import { generateColor } from './color';
import { maxHoursPerDay } from './count';

export function getDocDefinition(timetable, ...args) {
  const content = Object.keys(timetable).map((timetableTitle, i) => {
    const timetableData = timetable[timetableTitle];

    return [buildTableTitle(timetableTitle, i), buildTable(timetableData, args)];
  });

  return { content, pageOrientation: 'landscape' };
}

function buildTableTitle(timetableTitle, iteration) {
  const pageBreak = iteration === 0 ? null : 'before';

  return {
    text: timetableTitle,
    fontSize: 28,
    bold: true,
    margin: [0, 0, 0, 10],
    pageBreak,
  };
}

function buildTable(timetableData, args) {
  const widths = [30, '*', '*', '*', '*', '*'];
  const body = [buildBodyHeaders(), ...buildBodyRows(timetableData, args)];

  return {
    table: { widths, body },
  };
}

function buildBodyHeaders() {
  return [
    { text: '#', alignment: 'center', bold: true },
    ...daysInWeek.map(day => ({ text: day, bold: true, margin: [3, 0] })),
  ];
}

function buildBodyRows(timetableData, args) {
  const hoursPerDay = maxHoursPerDay(timetableData);

  return Array(hoursPerDay)
    .fill()
    .map((_, hourIndex) => {
      return [
        { stack: ['\n', { text: hourIndex + 1, bold: true, alignment: 'center' }, '\n'], margin: [3, 4] },
        ...buildRowCells(timetableData, hourIndex, ...args),
      ];
    });
}

function buildRowCells(timetableData, hourIndex, getCardPrimaryText, getCardSecondaryText, monochromeMode) {
  return Array(daysInWeek.length)
    .fill()
    .map((_, dayIndex) => {
      const subject = timetableData[dayIndex][hourIndex];

      if (!subject) {
        return { stack: [] };
      }

      return {
        stack: [{ text: getCardPrimaryText(subject), bold: true }, '\n', getCardSecondaryText(subject)],
        fillColor: monochromeMode ? null : generateColor(getCardPrimaryText(subject)),
        fillOpacity: 0.6,
        margin: [3, 4],
      };
    });
}
