import fetcher from './helpers';

const baseUrl = '/api/auth';

const loginUser = ({ email, password }) =>
  fetcher(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

const registerUser = ({ email, password }) =>
  fetcher(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

export default { loginUser, registerUser };
