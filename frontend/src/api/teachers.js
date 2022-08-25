import fetcher from './helpers';

const baseUrl = '/api/teachers';

const getAllTeachers = () => fetcher(`${baseUrl}/`);

const addTeacher = ({ teacherCode, firstName, lastName }) =>
  fetcher(`${baseUrl}`, {
    method: 'POST',
    body: {
      teacherCode,
      firstName,
      lastName,
    },
  });

const deleteTeacherById = id => fetcher(`${baseUrl}/${id}`, { method: 'DELETE' });

export default { addTeacher, getAllTeachers, deleteTeacherById };
