const root = 'http://localhost:3001/users';

const getUserProfile = token =>
  fetch(`${root}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json());

export default { getUserProfile };
