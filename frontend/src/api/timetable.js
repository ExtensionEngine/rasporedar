import fetcher from './helpers';

const baseUrl = '/api/timetable';

const getTimetable = formData => fetcher(`${baseUrl}/`, { method: 'POST', body: formData });

export default { getTimetable };
