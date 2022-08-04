import fetcher from './helpers';

const baseUrl = '/api/auth';

const loginUser = ({ email, password }) =>
  fetcher(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

const registerUser = ({ email, password }) =>
  fetcher(`${baseUrl}/register`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

export default { loginUser, registerUser };
