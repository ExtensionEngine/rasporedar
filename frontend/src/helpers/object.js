export function objectDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
