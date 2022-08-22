import fetcher from './helpers';

const baseUrl = '/api/classrooms';

const getAllClassrooms = () => fetcher(`${baseUrl}/`);

const addClassroom = ({ name, capacity }) => {
  fetcher(`${baseUrl}`, {
    method: 'POST',
    body: {
      name,
      capacity,
    },
  });
};

export default { addClassroom, getAllClassrooms };
