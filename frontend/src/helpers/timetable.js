import { timetableFilters } from '@/constants/timetableFilters';

export const timetableTransform = {
  [timetableFilters.BY_CLASS]: timetable => timetable,
  [timetableFilters.BY_TEACHER]: timetable => [],
  [timetableFilters.BY_CLASSROOM]: timetable => [],
};
