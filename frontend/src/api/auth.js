const root = 'http://localhost:3001/auth';

const loginUser = ({ email, password }) =>
  fetch(`${root}/login`, {
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
  fetch(`${root}/register`, {
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
