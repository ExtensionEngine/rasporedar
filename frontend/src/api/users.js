import fetcher from './helpers';

const baseUrl = '/api/users';

const getUserProfile = () => fetcher(`${baseUrl}/profile`);

export default { getUserProfile };
