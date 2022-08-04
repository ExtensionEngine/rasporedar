import { useUserStore } from '@/stores/user';

function updateOptions(options = {}) {
  const store = useUserStore();
  const update = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  if (store.token) {
    update.headers.Authorization = `Bearer ${store.token}`;
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options)).then(r => r.json());
}
