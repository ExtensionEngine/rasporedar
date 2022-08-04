import fetcher from './helpers';

const baseUrl = '/api/auth';

const loginUser = ({ email, password }) =>
  fetcher(`${baseUrl}/login`, {
    method: 'POST',
    body: { email, password },
  });

const registerUser = ({ email, password }) =>
  fetcher(`${baseUrl}/register`, {
    method: 'POST',
    body: { email, password },
  });

export default { loginUser, registerUser };
