export function formatDates(objects) {
  return objects.map(obj => {
    return { ...obj, createdAt: new Date(obj.createdAt).toLocaleDateString() };
  });
}
