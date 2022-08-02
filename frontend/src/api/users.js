const baseUrl = '/api/users';

const getUserProfile = token =>
  fetch(`${baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json());

export default { getUserProfile };
