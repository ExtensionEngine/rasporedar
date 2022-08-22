export function parseDates(objects) {
  return objects.map(obj => {
    return { ...obj, createdAt: new Date(obj.createdAt).toLocaleDateString() };
  });
}
