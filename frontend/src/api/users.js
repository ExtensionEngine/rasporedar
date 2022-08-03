import fetcher from './helpers';

const baseUrl = '/api/users';

const getUserProfile = () => fetcher(`${baseUrl}/profile`);

const getUserProfileFromToken = token =>
  fetcher(`${baseUrl}/profile`, { headers: { Authorization: `Bearer ${token}` } });

export default { getUserProfile, getUserProfileFromToken };
