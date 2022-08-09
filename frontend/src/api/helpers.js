import { useUserStore } from '@/stores/user';

function updateOptions(options = {}) {
  const store = useUserStore();
  const update = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body && JSON.stringify(options.body),
  };
  if (store.token) {
    update.headers.Authorization = `Bearer ${store.token}`;
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options)).then(r => r.json());
}
