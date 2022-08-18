import fetcher from './helpers';

const baseUrl = '/api/timetable';

const getTimetable = () => fetcher(`${baseUrl}/`);

export default { getTimetable };
