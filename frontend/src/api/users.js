import fetcher from './helpers';

const baseUrl = '/api/users';

const getUserProfile = () => fetcher(`${baseUrl}/profile`);

const deleteUserProfile = () =>
  fetcher(`${baseUrl}/profile`, {
    method: 'DELETE',
  });

export default { getUserProfile, deleteUserProfile };
