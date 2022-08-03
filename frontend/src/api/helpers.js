function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem('token')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options)).then(r => r.json());
}
