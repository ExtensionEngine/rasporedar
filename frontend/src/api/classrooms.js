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

const editClassroom = ({ id, name, capacity }) => {
  return fetcher(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: {
      name,
      capacity,
    },
  });
};

const deleteClassroomById = id => fetcher(`${baseUrl}/${id}`, { method: 'DELETE' });

export default { getAllClassrooms, addClassroom, editClassroom, deleteClassroomById };
