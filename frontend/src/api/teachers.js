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

export default { addTeacher, getAllTeachers };
