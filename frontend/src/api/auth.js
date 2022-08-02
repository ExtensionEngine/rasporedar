const baseUrl = '/api/auth';

const loginUser = ({ email, password }) =>
  fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(r => r.json());

const registerUser = ({ email, password }) =>
  fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(r => r.json());

export default { loginUser, registerUser };
