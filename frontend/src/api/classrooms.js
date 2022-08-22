import fetcher from './helpers';

const baseUrl = '/api/classrooms';

const getAllClassrooms = () => fetcher(`${baseUrl}/`);

const addClassroom = ({ name, capacity }) => {
  return fetcher(`${baseUrl}`, {
    method: 'POST',
    body: {
      name,
      capacity,
    },
  });
};

const deleteClassroomById = id => fetcher(`${baseUrl}/${id}`, { method: 'DELETE' });

export default { getAllClassrooms, addClassroom, deleteClassroomById };
