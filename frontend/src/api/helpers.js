function updateOptions(options) {
  const update = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  const token = localStorage.getItem('token');
  if (token) {
    update.headers.Authorization = `Bearer ${token}`;
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options)).then(r => r.json());
}
