import fetcher from './helpers';

const baseUrl = '/api/classrooms';

const addClassroom = ({ name, capacity }) =>
  fetcher(`${baseUrl}`, {
    method: 'POST',
    body: {
      name,
      capacity,
    },
  });

export default { addClassroom };
