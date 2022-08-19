import fetcher from './helpers';

const baseUrl = '/api/timetable';

const getTimetable = formData => fetcher(`${baseUrl}/`, { method: 'POST', body: formData });

const getSeed = () => fetcher(`${baseUrl}/seed`);

export default { getTimetable, getSeed };
